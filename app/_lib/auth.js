import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // callbacks are functions that are called at different stages of the authentication process. We can use them to control what happens when a user tries to sign in, or when a session is checked.
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          // await here because we need to wait for the guest to be created before we can return true and allow the sign in to succeed.
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    // This callback is called whenever a session is checked. We can use it to add custom properties to the session object.
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      // Add the guest ID to the session object so we can use it in our app.
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
