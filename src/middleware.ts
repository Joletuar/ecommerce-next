// Este middleware se va a ejecutar siempre antes de que se muestran las páginas de esta ruta

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from './utils';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    // Aqui podemos leer las cookies

    const newUrl =
        req.nextUrl.origin + '/auth/login' + `?p=${req.nextUrl.pathname}`;

    const token = req.cookies.get('token')?.value ?? '';

    try {
        await jwt.isValidToken(token);

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(newUrl);
    }
}

// Aqui podemos especificar las rutas donde solo se ejecutará este middleware
export const config = {
    // matcher: '/about/:path*',

    // matcher: ['/api/:path*', '/api/entries/:path*'],
    matcher: ['/checkout/:path*'],
};
