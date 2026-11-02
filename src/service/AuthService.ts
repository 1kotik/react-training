import {userService} from "./api/UserService.ts";
import type {User} from "../types";

class AuthService {
    public async login(email: string, password: string): Promise<User> {
        const existingUser = await userService.getById(email);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (existingUser.password !== password) {
            throw new Error("Invalid password");
        }
        return existingUser;
    }

    public async register(email: string, password: string): Promise<User> {
        const existingUser = await userService.getById(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        return await userService.createUser(email, password);
    }
}

export const authService = new AuthService();