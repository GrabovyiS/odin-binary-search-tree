# Odin BST

A lot of the tree methods probably should be implemented recursively. For example, height could (and maybe should) have been done recursively, just because of the fact that BST itself is recursive and therefore is convenient for recursive approaches.
DFS is also very easy to do recursively, although I did make an iterative version for pre-order and post-order DFS.

## Algorithm for iterative post-order DFS

I came up with a fun way to do post-order DFS iteratively. The idea is to completely mimic the way the function call stack would behave if we did it recursively with a real stack. This is achieved by marking the traversed elements with the info about whether or not their left/right children were already added to the stack, so that when we return to these elements, we know if we should push their children onto the stack, or if we should just process the element itself.
