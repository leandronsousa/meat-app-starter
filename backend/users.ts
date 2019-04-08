export class User {
    constructor (public email: string,
                public name: string,
                private password: string) {}

    matches(another: User) : boolean {
        return another != undefined && another.email === this.email && another.password === this.password;
    }

}

export const users: {[key: string] : User} = {
    "leandro@gmail.com": new User('leandro@gmail.com', 'Leandro', 'leandro@!'),
    "sabrina@gmail.com": new User('sabrina@gmail.com', 'Sabrina', 'sabrina@!'),
    "lara@gmail.com": new User('lara@gmail.com', 'Lara', 'lara@!')
}