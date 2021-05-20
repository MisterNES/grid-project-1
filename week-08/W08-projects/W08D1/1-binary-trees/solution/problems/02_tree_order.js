function preOrderArray(root) {
    if (!root) return [];

    return [
        root.val,
        ...preOrderArray(root.left),
        ...preOrderArray(root.right)
    ];
}

function preOrderArrayV2(root, array = []) {
    if (!root) return [];

    array.push(root.val);
    preOrderArrayV2(root.left, array)
    preOrderArrayV2(root.right, array)

    return array

}

function inOrderArray(root) {
    if (!root) return [];

    return [
        ...inOrderArray(root.left),
        root.val,
        ...inOrderArray(root.right)
    ];
}

function inOrderArrayV2(root, array = []) {
    if (!root) return [];

    inOrderArrayV2(root.left, array)
    array.push(root.val)
    inOrderArrayV2(root.right, array)

    return array
}

function postOrderArray(root) {
    if (!root) return [];

    return [
        ...postOrderArray(root.left),
        ...postOrderArray(root.right),
        root.val,
    ];
}

function postOrderArrayV2(root, array = []) {
    if (!root) return [];

    postOrderArrayV2(root.left, array)
    postOrderArrayV2(root.right, array)
    array.push(root.val)

    return array
}


module.exports = {
    preOrderArray,
    inOrderArray,
    postOrderArray
};