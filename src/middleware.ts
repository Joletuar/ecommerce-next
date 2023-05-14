import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Este middleware se va a ejecutar siempre antes de que se muestran las páginas de esta ruta
// Aqui podemos leer las cookies
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    // Obtenemos la sesión de next auth
    const session: any = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const newUrl = req.nextUrl.clone();
    newUrl.pathname = '/auth/login';
    newUrl.search = `p=${req.nextUrl.pathname}`;

    if (req.nextUrl.pathname.startsWith('/checkout')) {
        // Si tenemos una sesión dejamos pasar al user
        if (!session) {
            return NextResponse.redirect(newUrl);
        }

        // Si no lo redirigimos al login
        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith('/admin')) {
        // Si tenemos una sesión dejamos pasar al user
        if (!session) {
            return NextResponse.redirect(newUrl);
        }

        const validRol = ['admin', 'super-user', 'SEO'];

        if (!validRol.includes(session?.user?.role)) {
            return NextResponse.redirect(req.nextUrl.origin);
        }

        return NextResponse.next();
    }
}

// Aqui podemos especificar las rutas donde solo se ejecutará este middleware
export const config = {
    // matcher: ['/api/:path*', '/api/entries/:path*'],
    matcher: ['/checkout/:path*', '/admin/:path*'],
};
