import {userService} from "./api/UserService.ts";
import type {User} from "../types";
import bcrypt from "bcryptjs";

class AuthService {
    LOGIN_ERROR_MESSAGE = "Invalid email or password";
    PASSWORD_SALT_LENGTH = 12;
    public async login(email: string, password: string): Promise<User> {
        const existingUser = await userService.getByEmail(email);
        if (!existingUser) {
            throw new Error(this.LOGIN_ERROR_MESSAGE);
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error(this.LOGIN_ERROR_MESSAGE);
        }
        return existingUser;
    }

    public async register(email: string, password: string): Promise<User> {
        const existingUser = await userService.getByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, this.PASSWORD_SALT_LENGTH);
        return await userService.createUser(email, hashedPassword);
    }
}

export const authService = new AuthService();