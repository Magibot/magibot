class Queue {
  constructor() {
    this.q = [];
  }

  get head() {
    if (this.q.length === 0) {
      return null;
    }

    return this.q[0];
  }

  insert(element) {
    this.q.push(element);
    return this.q.length - 1;
  }

  next() {
    return this.q.shift();
  }

  clear() {
    this.q = [];
  }

  totalOfElements() {
    return this.q;
  }
}

module.exports = Queue;
