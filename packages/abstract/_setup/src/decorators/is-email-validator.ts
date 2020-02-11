import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { isEmail } from 'validator'

export const IsEmailValidator = (validationOptions?: ValidationOptions) => 
    (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'IsEmailValidator',
            target: object.constructor,
            propertyName,
            constraints: [propertyName],
            options: validationOptions,
            validator: {
                validate(value: string, validationsArguments: ValidationArguments) {
                    return !value || isEmail(value)
                }
            }
        })
    }