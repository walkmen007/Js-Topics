function FindMissingNumberFromArray(arr){
    let missingNum = 0;
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i];
    }
    let totalSeriesSum = ((arr.length+1) * (arr.length+2))/2
    missingNum = totalSeriesSum - sum;
    missingNum = missingNum ==0 ? 'No Number is missing' : missingNum;
    return missingNum;
}