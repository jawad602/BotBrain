export default function getMessageData(data, message) {
    message = {
        message: message,
        data: (data) ? data : null,
    }

    return message;
}