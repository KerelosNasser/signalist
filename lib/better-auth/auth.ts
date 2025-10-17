import { betterAuth } from "better-auth";
import { mongodbAdapter }  from "better-auth/adapters/mongodb";
import {connectToDB} from "@/database/mongose";
import{ nextCookies} from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export  const getAuth = async() => {
    if (authInstance) return authInstance;

    const mongoose = await connectToDB();
    const db = mongoose.connection.db;

    if (!db) throw new Error("MongoDB connection failed");

    authInstance = betterAuth({
        database: mongodbAdapter(db),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword:{
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            autoSignIn: true,
            minPasswordLength:8,
            maxPasswordLength: 128,
        },
        plugins: [nextCookies()],
    })
    return authInstance;
}
export const auth= await getAuth();