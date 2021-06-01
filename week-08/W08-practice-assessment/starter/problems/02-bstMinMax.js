//Please read the README before starting to work on the problem

// inorder: left. self, right

//  target === 10

// min = 2
// max = 13

// return null if tree is empty

function bstMinMax(root, target) {
    if(!root) return null;

    //  farthest left === min
    
    let min = root

    while(min.left){
        min = min.left
    }

    // -------------------------- Should have min value

    let max = root

    while(max.right){
        max = max.right
    }
    // -------------------------- Should have max value

    


    let minVal =min.val;
    let maxVal = max.val;

    // let minDiff = target - minVal;
    // let maxDiff = maxVal - target;

    // if (minDiff < maxDiff){
    //     return minVal;
    // }else{
    //     return maxVal;
    // }

    // Math.abs(-100) // 100


    if(Math.abs(minVal - target) < Math.abs(maxVal - target)){
        return minVal
    }else{
        return maxVal
    }



    // farthest right === max
}
module.exports = { bstMinMax };