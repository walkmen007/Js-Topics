var findMedianSortedArrays = function(arr1, arr2) {
    let median =null;
    let length =  arr1.length + arr2.length;
    let i=0;
    let j =0;
    let newArr = [];
    if(!length){
        return 0;
    }
    for(let k=0; k<length;k++){
        let num = 0;
        if(i == arr1.length){
            num = arr2[j];
            j++;
        }else if(j == arr2.length){
            num = arr1[i];
            i++;
        }else{
            num = arr1[i] <= arr2[j] ? arr1[i] : arr2[j];
            if(arr1[i] < arr2[j]){
             i++;
            }else if(arr1[i] > arr2[j]){
             j++;
            }else{
                i++;
                j++;
                newArr.push(num);
            }
        }
        newArr.push(num);
        if((i+j) >= length){
            break;
        }
    }
    median = calculateMedian(newArr)
    return median;
}

function calculateMedian(arr){
    if(arr.length%2 ==0){
        let index =  Math.floor(arr.length/2);
        let num = arr[index-1] + arr[index];
        num = num && num===0 ? 0 : num/2;
        return num;
    }else{
       let index =  Math.floor(arr.length/2);
       return arr[index];
    }
}