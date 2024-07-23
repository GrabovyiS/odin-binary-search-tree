import mergeSort from './merge-sort.mjs';
import removeDuplicates from './remove-duplicates.mjs';
import prettyPrintTree from './pretty-print-tree.mjs';

class Node {
  leftChild = null;
  rightChild = null;

  constructor(value) {
    this.value = value;
  }
}

class Tree {
  root;

  constructor(inputArray) {
    this.root = this.buildTree(inputArray);
  }

  buildTree(array) {
    let noDuplicatesArray = removeDuplicates(array);
    let sortedArray = mergeSort(noDuplicatesArray);
    const root = this.sortedArrayToBST(sortedArray);
    return root;
  }

  sortedArrayToBST(array, start = 0, end) {
    if (end === undefined) {
      end = array.length - 1;
    }

    if (start > end) {
      return null;
    }

    const middleIndex = Math.floor((start + end) / 2);
    const root = new Node(array[middleIndex]);

    // i think cutting the array is easier than this end start stuff
    // but also worse in terms of time complexity probably because you just add O(n) for copying things of EVERY recursive call
    const leftStart = start;
    const leftEnd = middleIndex - 1;
    root.leftChild = this.sortedArrayToBST(array, leftStart, leftEnd);

    const rightStart = middleIndex + 1;
    const rightEnd = end;
    root.rightChild = this.sortedArrayToBST(array, rightStart, rightEnd);

    return root;
  }

  insert(value) {
    let currentRoot = this.root;

    while (currentRoot) {
      if (value > currentRoot.value) {
        if (!currentRoot.rightChild) {
          currentRoot.rightChild = new Node(value);
          break;
        }

        currentRoot = currentRoot.rightChild;
      }

      if (value < currentRoot.value) {
        if (!currentRoot.leftChild) {
          currentRoot.leftChild = new Node(value);
          break;
        }

        currentRoot = currentRoot.leftChild;
      }
    }
  }

  deleteItem(value) {
    // The root is the edge case because it does not have a parent
    if (this.root.value === value) {
      this.root = null;
      return;
    }

    let currentRoot = this.root;

    // Find the parent of a node with given value
    // And delete the child node with the given value from the parent
    while (currentRoot) {
      let parent;

      if (currentRoot.rightChild.value === value) {
        parent = currentRoot;
        parent.rightChild = null;
        return true;
      }

      if (currentRoot.leftChild.value === value) {
        parent = currentRoot;
        parent.leftChild = null;
        return true;
      }

      if (value > currentRoot.value) {
        currentRoot = currentRoot.rightChild;
      }

      if (value < currentRoot.value) {
        currentRoot = currentRoot.leftChild;
      }
    }

    return false;
  }

  find(value) {
    let currentRoot = this.root;

    while (currentRoot) {
      if (currentRoot.value === value) {
        return currentRoot;
      }

      if (value > currentRoot.value) {
        currentRoot = currentRoot.rightChild;
      } else if (value < currentRoot.value) {
        currentRoot = currentRoot.leftChild;
      } else {
        // The value is not the same, not bigger and not smaller - incomparable
        // Like an object in a tree of primitives
        return null;
      }
    }

    return null;
  }

  levelOrder(providedCallback) {
    let callback;
    const items = [];

    if (!providedCallback) {
      const defaultCallback = (item) => items.push(item.value);
      callback = defaultCallback;
    } else {
      callback = providedCallback;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let current = queue.shift();

      callback(current);

      if (current.leftChild) {
        queue.push(current.leftChild);
      }

      if (current.rightChild) {
        queue.push(current.rightChild);
      }
    }

    if (!providedCallback) {
      return items;
    }
  }

  preOrderIterative(providedCallback) {
    let callback;
    const items = [];

    if (!providedCallback) {
      const defaultCallback = (item) => items.push(item.value);
      callback = defaultCallback;
    } else {
      callback = providedCallback;
    }

    const stack = [];
    stack.push(this.root);

    while (stack.length > 0) {
      // The top node in the stack is processed
      // The right child is pushed first, then left
      // Left children get processed together in a row until you hit a node with no left children
      // Right children pile up at the bottom of the stack
      const current = stack.pop();
      callback(current);

      if (current.rightChild) {
        stack.push(current.rightChild);
      }
      if (current.leftChild) {
        stack.push(current.leftChild);
      }
    }

    if (!providedCallback) {
      return items;
    }
  }

  postOrderIterative(providedCallback) {
    let callback;
    const items = [];

    if (!providedCallback) {
      const defaultCallback = (item) => items.push(item.value);
      callback = defaultCallback;
    } else {
      callback = providedCallback;
    }

    const stack = [];
    stack.push({ node: this.root });

    while (stack.length > 0) {
      const current = stack.pop();

      if (current.node.leftChild && !current.leftChildStacked) {
        stack.push({ node: current.node, leftChildStacked: true });
        stack.push({ node: current.node.leftChild });
        continue;
      }

      if (current.node.rightChild && !current.rightChildStacked) {
        stack.push({
          node: current.node,
          leftChildStacked: true,
          rightChildStacked: true,
        });
        stack.push({ node: current.node.rightChild });
        continue;
      }

      callback(current.node);
    }

    if (!providedCallback) {
      return items;
    }
  }

  preOrder(providedCallback) {
    let callback;
    const items = [];

    if (!providedCallback) {
      const defaultCallback = (item) => items.push(item.value);
      callback = defaultCallback;
    } else {
      callback = providedCallback;
    }

    // The traversal is abstracted so that we do not make
    // checks about callback every recursive function call
    this.traversePreOrder(callback, this.root);

    if (!providedCallback) {
      return items;
    }
  }

  traversePreOrder(callback, currentRoot) {
    if (currentRoot === null) {
      return;
    }

    callback(currentRoot);
    this.traversePreOrder(callback, currentRoot.leftChild);
    this.traversePreOrder(callback, currentRoot.rightChild);
  }

  inOrder(providedCallback) {
    let callback;
    const items = [];

    if (!providedCallback) {
      const defaultCallback = (item) => items.push(item.value);
      callback = defaultCallback;
    } else {
      callback = providedCallback;
    }

    this.traverseInOrder(callback, this.root);

    if (!providedCallback) {
      return items;
    }
  }

  traverseInOrder(callback, currentRoot) {
    if (currentRoot === null) {
      return;
    }

    this.traverseInOrder(callback, currentRoot.leftChild);
    callback(currentRoot);
    this.traverseInOrder(callback, currentRoot.rightChild);
  }

  postOrder(providedCallback) {
    let callback;
    const items = [];

    if (!providedCallback) {
      const defaultCallback = (item) => items.push(item.value);
      callback = defaultCallback;
    } else {
      callback = providedCallback;
    }

    this.traversePostOrder(callback, this.root);

    if (!providedCallback) {
      return items;
    }
  }

  traversePostOrder(callback, currentRoot) {
    if (currentRoot === null) {
      return;
    }

    this.traversePostOrder(callback, currentRoot.leftChild);
    this.traversePostOrder(callback, currentRoot.rightChild);
    callback(currentRoot);
  }

  height(node) {
    if (Object.getPrototypeOf(node) !== Node.prototype) {
      return false;
    }

    if (!this.find(node.value)) {
      return false;
    }

    let maxHeight = 0;
    let height = 0;

    // Performing a DFS you always go down to leafs before going on other branch
    // Performing a pre-order DFS you count the root, then the left subtree, then the right
    this.traversePreOrder((current) => {
      if (!current.rightChild && !current.leftChild) {
        if (height > maxHeight) {
          maxHeight = height;
        }
        height = 0;
      }

      height++;
    }, node);

    return maxHeight;
  }

  depth(node) {
    let currentRoot = this.root;
    let depth = 0;

    while (currentRoot) {
      if (currentRoot === node) {
        return depth;
      }

      if (node.value > currentRoot.value) {
        currentRoot = currentRoot.rightChild;
      } else if (node.value < currentRoot.value) {
        currentRoot = currentRoot.leftChild;
      } else {
        return null;
      }

      depth++;
    }

    return null;
  }

  isBalanced() {
    let balanced = true;

    this.levelOrder((current) => {
      if (!current.leftChild || !current.rightChild) {
        return;
      }

      if (
        Math.abs(
          this.height(current.leftChild) - this.height(current.rightChild)
        ) > 1
      ) {
        balanced = false;
      }
    });

    return balanced;
  }

  rebalance() {
    const arrayOfItems = this.levelOrder();

    this.root = this.buildTree(arrayOfItems);
  }
}

const randomArray = getRandomArray(30, 100);
const tree = new Tree(randomArray);

prettyPrintTree(tree.root);
console.log('Is balanced:', tree.isBalanced(), '\n\n');

tree.insert(110);
tree.insert(111);
tree.insert(112);
tree.insert(113);
tree.insert(114);
tree.insert(115);

prettyPrintTree(tree.root);
console.log('Is balanced:', tree.isBalanced(), '\n\n');

tree.rebalance();
prettyPrintTree(tree.root);
console.log('Is balanced:', tree.isBalanced(), '\n\n');

console.log('Level order:\n', tree.levelOrder(), '\n');
console.log('Pre-order:\n', tree.preOrderIterative(), '\n');
console.log('In-order:\n', tree.inOrder(), '\n');
console.log('Post-order:\n', tree.postOrderIterative(), '\n');

function getRandomArray(size, maxNum) {
  const array = [];

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (maxNum + 1)));
  }

  return array;
}
