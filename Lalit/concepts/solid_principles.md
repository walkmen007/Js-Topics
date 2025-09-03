# SOLID principles — detailed, practical guide

SOLID is an acronym for five object-oriented design principles that make software easier to maintain, extend, test and reason about. They’re guidelines, not laws — useful patterns to steer architecture toward decoupling, clear responsibilities, and testability.

I’ll explain each principle, show common violations and refactorings (TypeScript/JS examples), discuss testing/operational benefits, common misconceptions, and short notes on using SOLID ideas in microservices and functional code.

---

## 1) Single Responsibility Principle (SRP)

**Definition:** A class (module) should have one — and only one — reason to change.
**Intent:** Keep units focused so changes affect only one place.

### Symptoms of violation

* A class mixes persistence, business rules, and presentation.
* Many unrelated tests change when you modify a class.
* High churn: a small change in UI forces change in data logic.

### Anti-pattern example (JS/TS)

```ts
// user-service.ts — violates SRP
class UserService {
  async createUser(data) {
    // 1. validate
    if (!data.email) throw new Error('no email');

    // 2. persist
    await db.insert('users', data);

    // 3. send welcome email
    await emailClient.send(data.email, 'Welcome!');

    // 4. log audit
    audit.log('user_created', data);
  }
}
```

### Refactor (split responsibilities)

```ts
class UserValidator { validate(user) { /*...*/ } }
class UserRepository { async save(user) { /*...*/ } }
class WelcomeMailer { async send(user) { /*...*/ } }
class AuditService { log(evt, payload) { /*...*/ } }

class UserService {
  constructor(
    private validator: UserValidator,
    private repo: UserRepository,
    private mailer: WelcomeMailer,
    private audit: AuditService
  ) {}

  async createUser(user) {
    this.validator.validate(user);
    await this.repo.save(user);
    await this.mailer.send(user);
    this.audit.log('user_created', user);
  }
}
```

### Benefits

* Easier to test (unit test each collaborator).
* Smaller change surface when requirements change.
* Promotes composition and reuse.

---

## 2) Open/Closed Principle (OCP)

**Definition:** Software entities (classes, modules, functions) should be *open for extension* but *closed for modification*.
**Intent:** Add behavior without changing tested, working code.

### Common violation

Using `switch` or `if/else` over types and modifying that logic every time a new variation is added.

### Anti-pattern example

```ts
function calculateSalary(employee) {
  if (employee.type === 'engineer') return base * 1.2;
  if (employee.type === 'manager') return base * 1.5;
  // add new branch when new role appears...
}
```

### Refactor (polymorphism / strategy)

```ts
interface SalaryStrategy { calculate(base: number): number; }

class EngineerSalary implements SalaryStrategy { calculate(b){ return b*1.2; } }
class ManagerSalary implements SalaryStrategy { calculate(b){ return b*1.5; } }

class SalaryCalculator {
  constructor(private strategy: SalaryStrategy) {}
  calculate(base: number) { return this.strategy.calculate(base); }
}
```

To add a new role, implement a new `SalaryStrategy` — no changes to `SalaryCalculator`.

### Practical notes

* Use extension points (interfaces, abstract classes, plugin registries).
* Over-abstracting early can add complexity; favor simple strategies first, refactor when new variants appear.

---

## 3) Liskov Substitution Principle (LSP)

**Definition:** Subtypes must be substitutable for their base types — code using a base type should work with derived types without knowing it.
**Intent:** Preserve behavioral contracts; derived classes must honor expectations.

### Classic violation (Bird example)

```ts
class Bird { fly() { /*...*/ } }
class Sparrow extends Bird {}
class Penguin extends Bird { fly(){ throw new Error("can't fly"); } } // violates LSP
```

Code that expects any `Bird` to `fly()` breaks when given a `Penguin`.

### Correct approaches

* **Use interfaces for capabilities**:

  ```ts
  interface Flyable { fly(): void; }
  class Sparrow implements Flyable { fly(){/*...*/} }
  class Penguin { // no fly(), but maybe swim()
    swim(){/*...*/}
  }
  ```
* **Re-model the hierarchy** so the base type expresses the real contract (e.g., `Animal`, `CanFly`, `CanSwim`).

### Why LSP matters

* Upholds safe polymorphism — callers can rely on behavior.
* Avoids surprising runtime exceptions and special-case checks.

---

## 4) Interface Segregation Principle (ISP)

**Definition:** Clients should not be forced to depend on methods they do not use. Split fat interfaces into smaller, role-specific ones.
**Intent:** Keep abstractions fine-grained and client-focused.

### Anti-pattern

```ts
interface Worker {
  work(): void;
  eat(): void;
}

class Robot implements Worker {
  work() { /*...*/ }
  eat() { throw new Error("not supported") } // implemented but useless
}
```

### Refactor

```ts
interface Workable { work(): void; }
interface Feedable { eat(): void; }

class Human implements Workable, Feedable { work(){}, eat(){} }
class Robot implements Workable { work(){} }
```

### Benefits

* Reduces coupling and unnecessary implementations.
* Makes mock/stub creation in tests simpler.
* Prevents fragile code that must handle unsupported operations.

---

## 5) Dependency Inversion Principle (DIP)

**Definition:**

* High-level modules should not depend on low-level modules. Both should depend on abstractions.
* Abstractions should not depend on details; details should depend on abstractions.
  **Intent:** Invert conventional dependency flow so modules depend on interfaces, not concretes.

### Anti-pattern

```ts
class UserService {
  constructor() {
    this.repo = new SqlUserRepository(); // direct dependency on concrete
  }
}
```

### Refactor (depend on abstraction, inject implementation)

```ts
interface UserRepository { save(user): Promise<void>; }
class SqlUserRepository implements UserRepository { async save(u){/*...*/} }
class InMemoryUserRepository implements UserRepository { /*...*/ }

class UserService {
  constructor(private repo: UserRepository) {}
  async create(u) { await this.repo.save(u); }
}

// wiring (composition root)
const repo = new SqlUserRepository();
const svc = new UserService(repo);
```

### Benefits

* Easier to swap implementations (mocking, different storage backends).
* Facilitates unit testing (inject test doubles).
* Promotes Dependency Injection (DI) patterns and clearer composition root.

---

## Putting SOLID together — small end-to-end example

Imagine an order processing step that charges a card and persists a transaction.

Bad (violates SRP, DIP, OCP):

```ts
class PaymentProcessor {
  async charge(card, amount) {
    // builds request, calls stripe API directly,
    // writes to DB directly, logs, retries inline...
  }
}
```

Refactored (SOLID):

```ts
interface PaymentGateway { charge(card, amount): Promise<Result>; }
interface PaymentRepo { save(tx): Promise<void>; }
interface Logger { info(...any): void; }

class StripeGateway implements PaymentGateway { /*...*/ }
class SqlPaymentRepo implements PaymentRepo { /*...*/ }

class PaymentService {
  constructor(
    private gateway: PaymentGateway,
    private repo: PaymentRepo,
    private logger: Logger
  ) {}

  async process(card, amount) {
    const result = await this.gateway.charge(card, amount);
    await this.repo.save(result.tx);
    this.logger.info('charged', result.tx.id);
  }
}
```

* SRP: `PaymentService` coordinates, gateway handles remote API, repo persistence.
* DIP: `PaymentService` depends on interfaces.
* OCP: you can add new gateways without modifying `PaymentService`.

---

## Tests & maintainability

* SOLID leads to smaller, more focused units that are easy to unit test.
* Use mocks/stubs for injected abstractions (DIP makes this natural).
* Keep integration tests to verify composed behaviours; unit tests for each class.

---

## Common misconceptions & practical caveats

* **Not every class must have one method.** SRP is about reasons to change, not tiny classes for the sake of it.
* **YAGNI vs future-proofing:** OCP warns against modifying tested code; but over-abstraction early adds cognitive load. Prefer simple code, refactor when new variants appear.
* **SOLID ≠ perfect design.** Use these as heuristics. Practical tradeoffs: performance, clarity, and team familiarity matter.
* **SOLID in small scripts:** For tiny throwaway scripts, heavy SOLID structure can be overkill.

---

## SOLID in microservices & distributed systems

* **SRP → service boundaries:** A microservice should own a single business capability (aligns well with SRP at service granularity).
* **DIP → interface contracts:** Services should depend on API contracts/DTOs rather than concrete clients. Use API gateways/clients behind interfaces.
* **OCP → extend via new services or handlers** rather than modifying the core service when adding new business flows.
* **ISP → client-specific APIs:** Avoid huge API endpoints that force clients to implement unused fields; provide smaller, purpose-specific endpoints or versioned interfaces.
* **LSP → API compatibility:** New versions of a service should preserve expectations so consumers can substitute without surprise.

---

## Applying SOLID in functional programming

SOLID is OOP-focused but core ideas map to FP:

* SRP → small pure functions doing one thing.
* OCP → compose functions; add behaviors via composition rather than mutating existing functions.
* LSP → functions should respect input/output contracts; replacing one function with another should not break callers.
* ISP → expose small, focused function signatures instead of large monolithic ones.
* DIP → pass functions or effects as parameters (dependency injection via arguments).

---

## Quick checklist for code review

* Does the class/module have multiple unrelated reasons to change? → consider SRP split.
* Are we modifying existing files to add new behavior that could be added via extension? → OCP smell.
* Can subclasses be used where base is expected without surprises? → check LSP.
* Do interfaces force consumers to implement unrelated methods? → break them up (ISP).
* Are high-level modules depending on concretes? → introduce abstractions and inject implementations (DIP).

---

## TL;DR

* SOLID helps design software that’s modular, testable, and extensible.
* Use SRP to keep responsibilities narrow; OCP to add behavior without changing working code; LSP to keep subclasses safe; ISP to keep interfaces focused; DIP to depend on abstractions.
* Don’t dogmatically apply every rule — use them as tools. Start simple, refactor toward SOLID as complexity grows.
