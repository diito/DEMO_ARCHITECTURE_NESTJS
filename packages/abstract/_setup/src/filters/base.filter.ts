export class BaseFilter {
    constructor() {}

    parseToHttpExceptionFormat(exception: any): { statusCode: number, error: string, message: any } {
        const getResponse = exception['getResponse']
        const getStatus = exception['getStatus']
        const exceptionKeys = Object.keys(exception)
         
        if (getResponse instanceof Function && getStatus instanceof Function) {
            const response = getResponse.call(exception)
            return response instanceof Object ? response : { statusCode: getStatus.call(exception), message: response }
        }
        else if (
            exceptionKeys.includes('response') 
            && exceptionKeys.includes('status')
            && exceptionKeys.includes('message')
        ) {
            return typeof exception['response'] === 'object' ? exception['response'] : exception
        }
        else if (exception['statusCode'] && exception['error'])
            return exception
            
        return null
    }
}