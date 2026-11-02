import axios from "axios";
import {API_URL} from "../../utils/contants.ts";
import type {User} from "../../types";

class UserService {
    entityName: string = "users";

    async getById(email: string): Promise<User | null> {
        const response = await axios.get(`${API_URL}${this.entityName}`, {
            params: {
                email: email
            }
        });
        const users: User[] = response.data;
        if (users && users.length > 0) {
            return users[0];
        }
        return null;
    }

    async createUser(email: string, password: string): Promise<User> {
        const newUser = {
            email: email,
            password: password,
            favorites: []
        }
        const response = await axios.post(`${API_URL}${this.entityName}`, newUser);
        return response.data;
    }

    async toggleFavorite(userId: string, favorites: string[]): Promise<User> {
        const response = await axios.patch(`${API_URL}${this.entityName}/${userId}`, {
            favorites: favorites
        });
        return response.data;
    }
}

export const userService = new UserService();