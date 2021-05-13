const sanitizeHtml = require('sanitize-html');

/**
 * @module bodySanitizer
 */
module.exports = (req, res, next) => {
    if(req.body) {
        for (const propName in req.body) {
            req.body[propName] = sanitizeHtml(req.body[propName]);
        }
    }
    next();
}