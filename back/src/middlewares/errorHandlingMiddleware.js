// class Error {
//     constructor(message) {
//     this.message = message;
//     this.name = "Error";
//     };
// }

class NotFoundError extends Error {
    constructor(message) {
    super(message);
    this.name = "Not Found";
    this.statusCode = 404;
    }
}

module.exports = { NotFoundError }

