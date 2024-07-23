const prettyPrintTree = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }

  if (node.rightChild !== null) {
    prettyPrintTree(
      node.rightChild,
      `${prefix}${isLeft ? '│   ' : '    '}`,
      false
    );
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrintTree(
      node.leftChild,
      `${prefix}${isLeft ? '    ' : '│   '}`,
      true
    );
  }
};

export default prettyPrintTree;
