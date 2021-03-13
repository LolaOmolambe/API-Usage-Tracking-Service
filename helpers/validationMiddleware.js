const Joi = require("joi");
const {errorResponse} = require("../helpers/responseBody");


const middleware = (schema, property) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        const valid = error == null;

        if(valid){
            next();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(",");

            errorResponse(res, 422, "Invalid Payload", message);

        }
    }
}
module.exports = middleware;