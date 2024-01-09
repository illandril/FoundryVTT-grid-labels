const emptyNode = (node: Node) => {
  while (node.lastChild) {
    node.lastChild.remove();
  }
};

export default emptyNode;
