//Please read the README before starting to work on the problem


// inorder: left self right

// target = 15

// min = 3

// max = 17



// if given an empty tree, return null

// least value is as far left as you can go
// greatest is as far right as you can go


function bstMinMax(root, target) {

    if(!root) return null;

    // ---------Find Min-------------

    let min = root;

    while(min.left){
        min = min.left
    };

    // ---------- We should have min set to the smallest node

    let minValue = min.val;

    // ---------Find Max-------------

    let max = root;

    while(max.right){
        max = max.right
    };

     // ---------- We should have max set to the largest node

     let maxValue = max.val;


    //  Math.abs(-150) 150

    if(Math.abs(minValue - target) < Math.abs(maxValue - target)){
        return minValue;
    }else{
        return maxValue;
    };

}
module.exports = { bstMinMax };