export default function handleError(error) {
    console.log(error)
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        case 401: {
            // this.communicationServce.callClearInterval();
            localStorage.clear();
            this.router.navigate(['login']);
            this.message.create('error', error.error);
            return `Unauthorized: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}