import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Email", type: "text", placeholder: "john@doe.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••••••",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          "https://petadoptioncenter-production.up.railway.app/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              login: credentials?.login,
              password: credentials?.password,
            }),
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token.exp && Date.now() > token.exp) {
        return { ...token, expired: true };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log("session", session);
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
