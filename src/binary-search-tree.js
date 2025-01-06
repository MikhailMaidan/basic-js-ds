const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/





class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null; // we'll store the reference to the tree's root here
  }

  root() {
    // return the root node of the tree
    return this._root;
  }

  add(data) {
    // add node with data to the tree
    this._root = addWithin(this._root, data);

    function addWithin(node, value) {
      // if there is no node, create it
      if (!node) {
        return new Node(value);
      }
      // if the value is already in the tree, do not add duplicates
      if (node.data === value) {
        return node;
      }
      // if value is less, go to the left subtree
      if (value < node.data) {
        node.left = addWithin(node.left, value);
      }
      // if value is greater, go to the right subtree
      else {
        node.right = addWithin(node.right, value);
      }
      return node;
    }
  }

  has(data) {
    // returns true if node with the data exists in the tree, false otherwise
    return searchWithin(this._root, data);

    function searchWithin(node, value) {
      if (!node) return false;

      if (node.data === value) return true;

      return value < node.data 
        ? searchWithin(node.left, value) 
        : searchWithin(node.right, value);
    }
  }

  find(data) {
    // returns node with the data if it exists in the tree, or null otherwise
    return findWithin(this._root, data);

    function findWithin(node, value) {
      if (!node) return null;
      if (node.data === value) return node;

      return value < node.data 
        ? findWithin(node.left, value) 
        : findWithin(node.right, value);
    }
  }

  remove(data) {
    // removes node with the data from the tree if such node exists
    this._root = removeNode(this._root, data);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // value === node.data => this is the node to remove

        // no children
        if (!node.left && !node.right) {
          return null;
        }
        // only right child
        if (!node.left) {
          return node.right;
        }
        // only left child
        if (!node.right) {
          return node.left;
        }
        // both children => replace this node with the minimal from the right subtree
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data; // copy value
        node.right = removeNode(node.right, minFromRight.data); // remove duplicate
        return node;
      }
    }
  }

  min() {
    // returns minimal value stored in the tree (or null if the tree has no nodes)
    if (!this._root) return null;

    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    // returns maximal value stored in the tree (or null if the tree has no nodes)
    if (!this._root) return null;

    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};