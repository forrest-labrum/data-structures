'use strict';

const Node = function(value, next) {
  this.value = value;
  this.next = next || null;
}

const LinkedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

LinkedList.prototype.toString = function() {
  let currNode = this.head;
  let str = '';

  while(currNode) {
    str += `{ ${currNode.value} }`
    currNode = currNode.next;
  }

  return str;
}

LinkedList.prototype.add = function(value) {
  const newNode = new Node(value);

  if(!this.head) {
    this.head = this.tail = newNode;
  } else {
    this.tail = this.tail.next = newNode;
  }

  this.length++;

  return newNode;
}

LinkedList.prototype.addToFront = function(value) {
  const newNode = new Node(value);

  if(this.head) {
    newNode.next = this.head;
  } else {
    this.tail = newNode;
  }

  this.length++;
  this.head = newNode;
}

LinkedList.prototype.insert = function(index, value) {
  const newNode = new Node(value);
  let currentNode = this.head;

  if(index === 1) {
    return this.addToFront(value);
  }

  if(index === this.size() + 1 || !this.size()) {
    return this.add(value);
  }

  this.forEach((val, i, node) => {
    if(i + 1 === index) {
      newNode.next = currentNode.next;
      currentNode.next = newNode;
      this.length++;
    }
  });

  return newNode;
}

LinkedList.prototype.remove = function() {
  let oldHead = this.head;

  if(oldHead) {
    this.head = oldHead.next;
  }

  this.length--;

  return oldHead.value;
}

LinkedList.prototype.removeBack = function() {
  let tail = this.tail;
  let currNode = this.head;

  if(tail !== currNode) {
    while(currNode && currNode.next !== tail) {
      currNode = currNode.next;
    }

    this.tail = currNode;
    this.tail.next = null;
  } else {
    this.tail = this.head = null;
  }

  return tail;
}

LinkedList.prototype.erase = function(index) {
  let erased = null;

  this.forEach((val, i, node) => {
    if(i + 1 === index) {
      erased = node.next.value;
      node.next = node.next.next;
      this.length--;
    }
  })

  return erased;
}

LinkedList.prototype.valueAt = function(index) {
  let i = 1;
  let currNode = this.head;

  while(currNode) {
    if(index === i) {
      return currNode.value;
    }

    i++;
    currNode = currNode.next;
  }

  return null;
}

LinkedList.prototype.size = function() {
  return this.length;
}

LinkedList.prototype.empty = function() {
  return this.head === null;
}

LinkedList.prototype.front = function() {
  return this.head ? this.head.value : null;
}

LinkedList.prototype.back = function() {
  return this.tail ? this.tail.value : null;
}

LinkedList.prototype.forEach = function(cb) {
  let currNode = this.head;

  for(var i = 1; currNode; i++) {
    cb(currNode.value, i, currNode);
    currNode = currNode.next;
  }
}

LinkedList.prototype.filter = function(predicate) {
  const filtered = new LinkedList;

  this.forEach((val, i, node) => {
    if(predicate(val, i, node)) {
      filtered.add(val);
    }
  });

  return filtered;
}

LinkedList.prototype.map = function(cb) {
  const mapped = new LinkedList;

  this.forEach((val, i, node) => {
    mapped.add(cb(val, i, node));
  })

  return mapped;
}

LinkedList.prototype.reduce = function(cb, startVal) {
  this.forEach((val, i, node) => {
    if(i === 1 && !startVal) {
      startVal = val;
    } else {
      startVal = cb(startVal, val, i, node);
    }
  });

  return startVal;
}

LinkedList.prototype.toArray = function() {
  return this.reduce((arr, val) => {
    arr.push(val);
    return arr;
  }, []);
}

// Node references will be different
LinkedList.prototype.reverse = function() {
  const tmpStack = this.toArray();
  const reversed = new LinkedList;

  while(tmpStack.length) {
    reversed.add(tmpStack.pop());
  }

  return reversed;
}

LinkedList.prototype.reverseInPlace = function() {
  let currNode = this.head;
  let lastNode = null;

  while(currNode) {
    let nextNode = currNode.next;
    currNode.next = lastNode;
    lastNode = currNode;
    currNode = nextNode;
  }

  let oldHead = this.head;
  this.head = this.tail;
  this.tail = oldHead;
}

LinkedList.prototype.hasCycle = function() {
  let hare = this.head.next;
  let tortoise = this.head;

  while(hare && hare.next) {
    if(hare === tortoise) {
      return true;
    }

    hare = hare.next.next;
    tortoise = tortoise.next;
  }

  return false;
}

LinkedList.prototype.valueNFromEnd = function(dist) {
  let result;

  this.forEach((val, i) => {
    if(i === this.size() - dist) {
      result = val;
    }
  });

  return result;
}

module.exports = { LinkedList, Node };