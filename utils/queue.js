class Queue {
  constructor({ elementsPerPage = 10 }) {
    this.q = [];
    this.elementsPerPage = elementsPerPage;
  }

  get head() {
    if (this.q.length === 0) {
      return null;
    }

    return this.q[0];
  }

  get isEmpty() {
    return this.q.length === 0;
  }

  get totalOfElements() {
    return this.q.length;
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

  paginate(page) {
    if (this.q.length < this.elementsPerPage) {
      return { needPagination: false, pagination: this.q };
    }

    const end = page * this.elementsPerPage;
    const start = (end - this.elementsPerPage > 0) ? end - this.elementsPerPage : 1;
    return {
      needPagination: true,
      pagination: this.q.slice(start, end),
      totalOfPages: Math.ceil(this.q.length / this.elementsPerPage),
    };
  }

  remove(index) {
    if (index >= this.q.length) {
      return null;
    }

    const element = this.q[index];
    this.q.splice(index, 1);
    return element;
  }
}

module.exports = Queue;
