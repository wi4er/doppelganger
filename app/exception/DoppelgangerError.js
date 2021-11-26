/**
 *
 */
module.exports = class DoppelgangerError extends Error {
    static assert(value, message) {
        if (!value) {
            throw new this(message);
        }
    }
}
