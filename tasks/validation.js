const {body} = require('express-validator')
const {errorMessages} = require('../validator')

const taskValidationRules = () => {
    return [
      body('task_description')
        .exists().withMessage(errorMessages.missingField)
        .isString().withMessage(errorMessages.invalidString)
        .notEmpty().withMessage(errorMessages.emptyString)
    ]
  }

module.exports = {
    taskValidationRules
}