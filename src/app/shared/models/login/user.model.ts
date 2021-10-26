export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    success: boolean;
    token: string;

    constructor() {
        this.success = false;
    }
}