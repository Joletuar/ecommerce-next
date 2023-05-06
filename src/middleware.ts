// Este middleware se va a ejecutar siempre antes de que se muestran las páginas de esta ruta

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from './utils';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    // Aqui podemos leer las cookies
    // const token = req.cookies.get('token')?.value ?? '';
    // const newUrl = new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url);

    const newUrl = req.nextUrl.clone();
    newUrl.pathname = '/auth/login';
    newUrl.search = `p=${req.nextUrl.pathname}`;

    // Obtenemos la sesión de next auth
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Si tenemos una sesión dejamos pasar al user
    if (session) {
        return NextResponse.next();
    }

    // Si no lo redirigimos al login
    return NextResponse.redirect(newUrl);

    // try {
    //     await jwt.isValidToken(token);

    //     return NextResponse.next();
    // } catch (error) {
    //     return NextResponse.redirect(newUrl);
    // }
}

// Aqui podemos especificar las rutas donde solo se ejecutará este middleware
export const config = {
    // matcher: ['/api/:path*', '/api/entries/:path*'],
    matcher: ['/checkout/:path*'],
};
