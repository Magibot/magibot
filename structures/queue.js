class Queue {
  constructor() {
    this.q = [];
  }

  add(element) {
    this.q.push(element);
  }

  addMany(elements) {
    this.q.push(...elements);
  }

  shift() {
    return this.q.shift();
  }

  clear() {
    this.q = [];
  }

  insert(element, position) {
    this.q.insert(position, element);
  }

  length() {
    return this.q.length;
  }
}

module.exports = Queue;
