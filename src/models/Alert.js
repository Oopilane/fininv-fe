/* eslint-disable */
const AlertType = {
    NOTIFICATION: 0,
    WARNING: 1,
    ERROR: 2
}

class Alert {
    type;
    message;
    length = 30;

    constructor (type, message, length) {
        this.type = type,
        this.message = message,
        this.length = length
    }
}

export {
    AlertType,
    Alert
}

export default Alert