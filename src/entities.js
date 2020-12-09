class FakeDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

class FakeLib {
  constructor() {
    this.counter = 0;
    this.books = [];
  }

  create(book) {
    book.isbn = ++this.counter;
    book.available = this.counter % 3 === 0;
    book.authors = [];
    this.books.push(book);
    return book;
  }

  select(filter) {
    return this.books.filter(filter);
  }

  delete(criteria) {
    const index = this.books.find(criteria);
    if (index > -1) {
      return this.books.splice(index, 1);
    }
    return [];
  }

  update(criteria, selector) {
    this.books = this.books.map(criteria);
    return this.select(selector)[0];
  }
}

class Some {
  constructor(data) {
    this.data = data;
  }
}

class None {
  constructor(error) {
    this.error = error;
  }
}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Admin extends User {
  constructor(id, name, title, roles) {
    super(id, name);
    this.title = title;
    this.roles = roles;
  }
}

class Guest extends User {
  constructor(id, name, token) {
    super(id, name);
    this.token = token;
  }
}

module.exports = {
  FakeDie,
  FakeLib,
  Some,
  None,
  Admin,
  Guest,
};
