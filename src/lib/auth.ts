import prisma from "@/lib/database";
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { checkout, polar, portal } from '@polar-sh/better-auth'; 
import { polarClient } from "@/lib/polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }), 
    emailAndPassword: {
        enabled: true, 
        autoSignIn: true,
    }, 
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "593a3bb8-3531-4d97-8050-dcec0054a1be",
                            slug: "pro", 
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL!,
                    authenticatedUsersOnly: true,
                }),
                portal(), 
            ]
        })
    ]
}); 