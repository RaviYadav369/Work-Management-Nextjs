import { connetToDB } from "@database/db"
import User from "@models/user"
import NextAuth from "next-auth/next"
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    pages:'/login',
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialProvider(
            {
                name: "Login",
                // credentials: {
                //     username: {
                //         label: "Username",
                //         type: 'text',
                //         placeholder: "Enter Your User Name"
                //     },
                //     password: {
                //         label: "Password",
                //         type: 'password',
                //         placeholder: '*******'
                //     },

                // },

                async authorize(credentials, req) {
                    console.log(credentials);
                    try {
                        const res = await fetch("http://localhost:3000/api/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password
                            })
                        })
                        const user = await res.json()
                        console.log(user);
                        if (user) {
                            return user
                        } else {
                            return null
                        }
                    } catch (error) {
                        console.log("error occured in authorize");
                    }
                }
            })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            console.log(session,token);
            if(session?.name){
                const sessionUser = await User.findOne({email:session.user.email})
                session.user.id = sessionUser._id.toString()
            }
            session.user = token
            return session
        },
        // async signIn({profile}){
        //     try {
        //         await connetToDB()
        //         const userExit = await User.findOne({email:profile.email})
        //         if(!userExit){
        //             await User.create({
        //                 email:profile.email,
        //                 userName:profile.name,
        //                 image:profile.picture,
        //             })
        //         }
        //         return true
                
        //     } catch (error) {
        //         console.log(error);
        //         return false
        //     }
        // }
    },
})

export { handler as GET, handler as POST }