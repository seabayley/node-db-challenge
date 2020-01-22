const {body} = require('express-validator')
const {errorMessages} = require('../validator')

const ValidationRules = () => {
    return [
      body('project_name')
        .exists().withMessage(errorMessages.missingField)
        .isString().withMessage(errorMessages.invalidString)
        .notEmpty().withMessage(errorMessages.emptyString)
        .isLength({ max: 128 }).withMessage(errorMessages.maxChar(128))
    ]
  }

module.exports = {
    ValidationRules
}