'use server'

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({
                                          email,
                                          password,
                                          fullName,
                                          country,
                                          investmentGoals,
                                          riskTolerance,
                                          preferredIndustry
                                      }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {email, password, name: fullName,}
        })
        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry,
                }
            })
        }
        return {success: false, data: response}
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }


}


export const signOut = async () => {

    try {
        await auth.api.signOut({headers: await headers()})
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }

}

export const signInWithEmail = async ({email, password}: SignInFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email, password
            }
        })
        return {success: false, data: response}
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }


}
