/*
Stacks and queues both represent a linear collection of nodes or values, and in
that way are similar to linked lists. Stacks and queues are also somewhat
similar to each other, but differ in the order that nodes can be added or
removed.


Stacks: LIFO(Last In, First Out) data structures.
    -the last Node added is always the first Node to be removed
    -the first Node added is always the last Node to be removed

**It is helpful to visualize a stack as a vertical stack of items.
    -we add to the top of the stack. We remove from the top of the stack.

Queues: FIFO (First In, First Out) data structures.
    -the first Node added is the first Node to be removed
**It is helpful to visualize a queue as a line of people waiting to get in somewhere
    -people add themselves to the back of the line and exit at the front

Stacks and Queues are so similar that we can look at both of their properties together:

Stack Property	        Description	                    Queue Property	        Description
top	                The first node in the Stack	        front	                The first node in the Queue.
----	            Stacks do not have an equivalent	back	                The last node in the Queue.

length	            The number of nodes in the Stack;   length                  The number of nodes in the Queue;
                    the Stack's length.	                	                    the Queue's length.    
                                                                                


Like Linked Lists, we look at the individual Node properties as well:

Property	Description
value	    The actual value this node represents.
next	    The next node in the Stack (relative to this node).


Stack Methods:
Type	        Name	Description	                                Returns
Insertion	    push	Adds a Node to the top of the Stack.	    Integer - New size of stack
Deletion	    pop	    Removes a Node from the top of the Stack.	Node removed from top of Stack
Meta	        size	Returns the current size of the Stack.	    Integer

Queue Methods:
Type	        Name	    Description	                                    Returns
Insertion	    enqueue	    Adds a Node to the back of the Queue.	        Integer - New size of Queue
Deletion	    dequeue	    Removes a Node from the front of the Queue.	    Node removed from front of Queue
Meta	        size	    Returns the current size of the Queue.	        Integer
*/

class Node {
    constructor() {
        
    }
}

class Stack{
    constructor() {

    }
}

class Queue {
    constructor() {
        
    }
}