function RotateArray(arr, rotateCount, direction){
    let length=arr.length;
    let memo = 0;
    let count= 0;
    rotateCount = rotateCount>length ? rotateCount%length : rotateCount;
    let position =0;
    let temp = 0;
    let i=0;
    while(count<length){
        position = i + rotateCount;
        position = position >= (length) ? position - (length) : position;
        console.log("Position---", position)
        temp = arr[position];
       // console.log("Start---", arr)
        i++;
        count++;
    }
    return arr;
}

arr = [1,2,3,4,5,6,7];
arr = RotateArray(arr,2, 1);
//console.log("Arr", arr);