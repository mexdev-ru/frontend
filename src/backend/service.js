import { users } from "./fake-backend.js"

export function get(username, password) {
    for (let user in users) {
        if (username === users[user].username && password === users[user].password) {
            return users[user];
        }
    }
    return null;
}


