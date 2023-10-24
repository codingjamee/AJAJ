class NotFoundError extends Error {
    constructor(message) {
    super(message);
    this.name = "Not Found";
    this.statusCode = 404;
    }
}

// class UnauthorizedError extends Error {
//     constructor(message) {
//     super(message);
//     this.name = "UnauthorizedError";
//     this.statusCode = 401;
//     }
// }

module.exports = { NotFoundError }

