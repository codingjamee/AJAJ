class Error {
    constructor(message) {
    this.message = message;
    this.name = "Error";
    };
}

class ValidationError extends Error {
    constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 404;
    }
}

class EmptyValueError extends Error {
    constructor(message) {
    super(message);
    this.name = "EmptyValueError";
    this.statusCode = 400;
    }
}

class AuthorityError extends Error {
    constructor(message) {
    super(message);
    this.name = "AuthorityError";
    this.statusCode = 401;
    }
}

module.exports = { ValidationError,  EmptyValueError, AuthorityError }

