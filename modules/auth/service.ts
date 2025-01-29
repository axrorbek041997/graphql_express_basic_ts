import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prismaClient from "../../config/database.js";

const UserModel = prismaClient.user;

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export class AuthService {
    static async register(name: string, email: string, password: string) {
        const existingUser = await UserModel.findUnique({ where: { email } });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            data: { name, email, password: hashedPassword },
        });

        return { ...user, token: this.generateToken(user.id) };
    }

    static async login(email: string, password: string) {
        const user = await UserModel.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { ...user, token: this.generateToken(user.id) };
    }

    static generateToken(userId: number) {
        return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });
    }

    static async getUserFromToken(token: string) {
        try {
            const decoded: any = jwt.verify(token, SECRET_KEY);
            return UserModel.findUnique({ where: { id: decoded.userId } });
        } catch {
            return null;
        }
    }
}
