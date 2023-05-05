import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

// Dentro de este archivo nosotros podemos añadir configuraciones y los proveedores que queremos utilizar para autenticarnos en nuestra aplicación

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Credentials({
            name: 'Custom Login', // Nombre del proveedor de autenticación
            credentials: {
                // Se definen los campos necesarios para realizar la autenticación

                email: {
                    label: 'Correo',
                    type: 'email',
                    placeholder: 'correo@google.com',
                },
                password: {
                    label: 'Contraseña',
                    type: 'password',
                    placeholder: '123456',
                },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = {
                    id: '1',
                    name: 'J Smith',
                    email: 'jsmith@example.com',
                };

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],

    // Callbacks

    // Por defecto trabaja con JWT si no se especifica nada
    // Aqui se especifica como se firman los jwt, que data irá en el payload, etc
    callbacks: {
        // Función que se ejecuta cuando se genera el jwt
        async jwt({ token, account, user }) {
            if (account) {
                // Seteamos el token que viene de la cuenta
                token.accesToken = account.access_token;

                switch (account.type) {
                    // Si utilizó alguna red para autenticarse
                    case 'oauth':
                        // TODO: crear un usuario o verificar si existe en la bd
                        break;

                    // Si el tipo es de credentials el token user será igual al user que viene
                    case 'credentials':
                        token.user = user;
                        break;
                }
            }

            // Se regresa un token
            return token;
        },

        // Función que se ejecuta cuando se crea un nueva sesión
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.user = token.user as any;

            // Se regresa un session
            return session;
        },
    },
});
