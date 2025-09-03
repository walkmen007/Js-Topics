function printNestedObj(obj, parent=''){
    for(let k in obj){
        if(!obj[k].object){
            let path = `${parent ? parent + '.' :''}${k}  `
            console.log("Key--", path)
        }
        if(typeof obj[k] == 'object' && obj[k] !=null && !Array.isArray(obj[k])){
            let key = parent ? parent + `.${k}` : k;
            printNestedObj(obj[k], key)
        }
    }

}


const data = {
  name: "John",
  address: {
    city: "Delhi",
    pin: 110001,
    geo: {
      lat: 28.61,
      long: 77.23
    },
    prizeList: {
        realGame:{
            tournament:{
                sng:{
                    poker:{
                        cash: 123
                    }
                }
            }
        }
    }
  },
  hobbies: ["cricket", "reading"]
};

printNestedObj(data)