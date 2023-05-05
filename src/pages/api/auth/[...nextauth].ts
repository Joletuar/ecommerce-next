import { dbUsers } from '@/database';
import NextAuth from 'next-auth';
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
                    placeholder: '*****',
                },
            },
            async authorize(credentials, req) {
                const user = await dbUsers.checkUserEmailPassword(
                    credentials!.email,
                    credentials!.password
                );

                if (!user) {
                    return null;
                }

                return {
                    id: user._id, // Siempre hay que retornar un id, o si no tira error
                    email: user.email,
                    role: user.role,
                    name: user.role,
                };
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
                    // Si utilizo alguna red para autenticarse
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

// Cuando usamos un sistema personalizd el type del account será CREDENTIALS, pero cuando es alguna red social es OAUTH
