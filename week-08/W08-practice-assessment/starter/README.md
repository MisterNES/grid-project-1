
# W08 - Practice Assessment

### Usage

  1. `cd` into the folder and `npm install` to install dependencies.
  2. Run the tests by typing `npm test` or `mocha`.
  3. Your objective is to implement the code in each of the following JavaScript files so that when you run npm test, all tests pass.

## Problem 1: Tree Quantity

    In this problem, you will write a function that traverses a tree counting the number
    of times a given node occurs in the tree.

    Your function will take a root node and a target node.
    Your function should search the graph in DEPTH-FIRST ORDER to determine how many
    times the given target node occurs in the tree.

    Return the count if the node exisits and 0 if the tree doesn't contain the target.

## Problem 2: BST Min Max

    In this problem, you will write a function that traverses a *BINARY SEARCH TREE*
    inorder to identify the min and max values. Your function will then determine
    whether the min or max is closer in value to the target.

    Your function will take a root node and a target node.
    Your function can traverse the graph in either depth-first or bread-first order.

    Return the closer of the min and max values or null if given an empty tree.

## Problem 3:  Mutual Friends

    In this problem, you will write a function that allows you to search a graph
    using its adjacency list to determine if two nodes are friends or mutal friends
    with each other.

    Your function will take a starting name, ending name and an adjacency List.
    Your function will search the graph in BREADTH-FIRST ORDER to determine if you
    could get from one name to another.

    Return true if they are or false if they are not friends or mutual friends.
    
    ```javascript
    const adjacencyList = {
      'derek':['selam', 'dean'],
      'joe':['selam'],
      'selam': ['derek', 'joe', 'dean', 'evan'],
      'dean': ['derek', 'evan', 'selam'],
      'sam': ['jen'],
      'evan': ['selam', 'jesse', 'dean'],
      'jen':['sam', 'javier'],
      'javier':['jen'],
      'chris':[],
      'jesse': ['evan'],
    };
    ```
