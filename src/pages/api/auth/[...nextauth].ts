import { dbUsers } from '@/database';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

// Dentro de este archivo nosotros podemos añadir configuraciones y los proveedores que queremos utilizar para autenticarnos en nuestra aplicación

export default NextAuth({
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
            // Función que permite setear el usuario obtenido de nuestro login personalizado
            async authorize(credentials, req) {
                const result = await dbUsers.checkUserEmailPassword(
                    credentials!.email,
                    credentials!.password
                );

                if (!result?.user) {
                    return null;
                }

                const user = result.user;
                const token = result.token;

                return {
                    id: user._id, // Siempre hay que retornar un id, o si no tira error
                    email: user.email,
                    role: user.role,
                    name: user.name,
                    token,
                };
            },
        }),
    ],

    // Custom Pages

    // Le decimos a next auth que usaremos una página personaliza para el login y registro
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    // Callbacks

    session: {
        maxAge: 2592000, // 30d, el tiempo que durará la sesión
        strategy: 'jwt', // forma de validar la sessión
        updateAge: 86400, // 1d, el tiempo que la sessión se revalida/actualiza
    },

    // Por defecto trabaja con JWT si no se especifica nada
    // Aqui se especifica como se firman los jwt, que data irá en el payload, etc
    callbacks: {
        // Función que se ejecuta cuando se genera el jwt, primero se genera esto antes de la session
        async jwt({ token, account, user }) {
            if (account) {
                // Seteamos el token que viene de la cuenta
                token.accesToken = account.access_token;

                switch (account.type) {
                    // Si utilizo alguna red para autenticarse
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser(
                            user?.email || '',
                            user?.name || ''
                        );

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

// Cuando usamos un sistema personaliza el type del account será CREDENTIALS, pero cuando es alguna red social es OAUTH
