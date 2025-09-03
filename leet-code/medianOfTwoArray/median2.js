    var findMedianSortedArrays = function(arr1, arr2) {
        let length = arr1.length + arr2.length;
        let mid = Math.floor(length/2);
        let mid2;
        if(length%2 ===0){
            mid2 = mid-1;
        }else{
            mid2 = -Infinity;
        }
        let counter=i=j=0;
        while(counter <= Math.floor(length/2)){
            let num;
            if(arr1[i]<=arr2[j]){
                num = arr1[i]
                i++;
            }else{
                num = arr2[j]
                j++;
            }
            if(counter == mid){
                mid=num
            }
            if(counter == mid2 && mid2 != Infinity){
                mid2 = num;
            }
            counter++;
        }
        console.log("Median---", mid, mid2)
        let median = Number.isFinite(mid2) ? (mid +mid2)/2 : mid;
        return median;
        
    }

let arr1 = [1,3];
let arr2 = [2,3,6,15];
let median = findMedianSortedArrays(arr1, arr2);
console.log("Median Of Two Array", median);

