import NextAuth from "next-auth/next"
import CredentialProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialProvider({
            name: "Login",
            credentials: {
                username: {
                    label: "Username",
                    type: 'text',
                    placeholder: "Enter Your User Name"
                },
                password: {
                    label: "Password",
                    type: 'password',
                    placeholder: '*******'
                },

            },

            async authorize(credentials, req) {
                try {
                    const res = await fetch("http://localhost:3000/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials?.username,
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
            return {...token,...user}
        },
        async session({ session, token }) {
            session.user = token
            return session
        }
    },
})

export { handler as GET, handler as POST }