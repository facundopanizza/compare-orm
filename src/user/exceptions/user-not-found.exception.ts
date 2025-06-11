export const USER_NOT_FOUND = 'User not found';

export class UserNotFoundException extends Error {
    constructor() {
        super(USER_NOT_FOUND);
        this.name = 'UserNotFoundException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserNotFoundException);
        }
    }
}