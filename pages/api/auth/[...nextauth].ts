import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email !== process.env.EMAIL || password !== process.env.PASSWORD) {
          throw new Error('Invalid Credentials');
        }

        return { id: '5758', name: 'admin', email: process.env.EMAIL };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
