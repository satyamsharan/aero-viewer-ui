import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '../../../../lib/prisma';

export const options:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:'Email',
            
            credentials: {
                username:{
                    label:"Username:",
                    type:"text",
                    placeholder:"Enter your email"
                },
                password:{
                    label:"Password:",
                    type:"password",
                    placeholder:"Enter your password"
                },
                
            },
            async authorize(credentials, req) {
                const users = await prisma.user.findFirst({
                    where: { 
                        email: credentials?.username,
                        password: credentials?.password
                    },
                });
                return users
            },
        })
    ],
    theme:{
        colorScheme:"auto",
        logo:"/AFRY-logo.svg"
    },
    secret: process.env.NEXTAUTH_SECRET
}