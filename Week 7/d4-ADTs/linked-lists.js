/*
Linked Lists are data structures that represent a linear sequence of "vertices"
(or nodes) and track three important properties: 
-head: first node in the list
-tail: last node in the list 
-length: number of nodes in the list

Each individual instance of a node tracks some other important properties as
well: 
-value: value represented by the node 
-next: the next node in the list
-previous: the previous node in the list

Linked Lists contain ORDERED DATA, similar to arrays. While they exhibit some
very similar traits, the difference is how data is stored.

Arrays store data in a contiguous manner: each element is stored next to it's
neighboring element in a single block of memory. In Linked Lists, elements are
stored non-contiguously. They are randomly dispersed around your computer. Even
though elements are stored randomly, because each node has a previous and a next
property, we are able to retrieve neighboring elements easily.

**Because of this feature, a Linked List has NO INDICES and it is not possible
to look up individual nodes in constant time. In order to find a node, we must 
iterate over the entire list until we find our target node.

**In order to implement a Linked List, you MUST implement the Node class as well
as the LinkedList class. 
    -The actual data lives in the node instances

There are several types of Linked Lists:


List Type	        Description	                                                        Directionality
Singly Linked	    Nodes have a single pointer connecting                              Head→Tail
                    them in a single direction.	                                       
Doubly Linked	    Nodes have two pointers connecting them bi-directionally.	        Head⇄Tail
Multiply Linked	    Nodes have two or more pointers, providing a variety of 
                    potential node orderings.	                                        Head⇄Tail, A→Z, 
                                                                                        Jan→Dec, etc.
Circularly Linked	Final node's next pointer points to the first node, 
                    creating a non-linear, circular version of a Linked List.	        Head→Tail→Head→Tail

- Methods of a linked list that we should know are:
  - addToTail: Adds a new node to the end of the list.
  - addToHead: Adds a new node to the front of the list.
  - insertAt: Adds a new node at the specified position (we need to traverse to
  that point, then update pointers)
  - removeTail: Removes the last node of the list.
  - removeHead: Removes the first node of the list.
  - removeFrom: Removes the node at the specified position.
  - contains: Traverses the list and returns a boolean to indicate if the value
  was found at any node.
  - get: Returns a reference to the node at the specified position.
  - set: Updates the value of the node at the specified position.
  - size: Returns the current length of the list.
- Time complexities for these methods:
  - Accessing a node: O(n), because we may have to traverse the entire list.
  - Searching a list: O(n), because we may have to traverse the entire list.
  - Inserting a value: O(1), under the assumption that we have a reference to
  the node that we want to insert it after/before. If we don't have this
  reference we would first have to access it (O(n) from above), but the actual
  creation is O(1)
  - Deleting a node: O(1), for the same reasons as insertion. If we first need
  to find the previous and next nodes, we would need to access them (O(n) from
  above), but the actual deletion is O(1)

The first step is to create a Node class:
*/

class _Node {
  constructor() {}
}
//Then we can implement the Linked List class:

class LinkedList {
  constructor() {}
}
