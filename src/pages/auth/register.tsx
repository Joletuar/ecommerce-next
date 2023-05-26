import { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
// import authOptions from '../api/auth/[...nextauth]';
// import { getServerSession } from 'next-auth';

import { AuthLayout } from '@/components/layouts';
import {
    Box,
    Button,
    Chip,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '@/context';
import { Providers } from '@/components/ui';
import { getToken } from 'next-auth/jwt';

// Tipado de los campos del formulario
type FormData = {
    email: string;
    password: string;
    name: string;
};

const RegisterPage = () => {
    const router = useRouter();
    const { registerUser } = useContext(AuthContext);

    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const {
        register, // Con este función podemos enlazar los campos
        handleSubmit, // Se encarga que la página haga un full refresh. Necesita de un función a ejecutar si todo va bien
        formState: { errors }, // Retorna un objeto con cada uno de los inputs del form y su respectivo error
    } = useForm<FormData>();

    const onRegisterUser = async ({ email, password, name }: FormData) => {
        setShowError(false);

        const { hasError, message = '' } = await registerUser(
            email,
            password,
            name
        );

        if (hasError) {
            setMessage(message);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setMessage('');
            }, 2500);
            return;
        }

        // Si el query viene en la url del login, entonces el destino será dicha ruta
        // const destination = router.query.p?.toLocaleString() || '/';

        // router.replace(destination);

        // Función de next auth que se usa para logearse, require de un provider y las opciones, por defecto hace refresh esto
        await signIn('credentials', {
            email,
            password,
        });
    };
    return (
        <AuthLayout title={'Registrarse'}>
            <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h1'
                                component='h1'
                                textAlign='center'
                            >
                                Crear Cuenta
                            </Typography>

                            {showError && (
                                <Chip
                                    label={message}
                                    color='error'
                                    icon={<ErrorOutline />}
                                    className='fadeIn'
                                    sx={{ display: 'flex' }}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                label='Nombre Completo'
                                type='text'
                                fullWidth
                                {...register('name', {
                                    required: 'El nombre es obligatorio',
                                    minLength: {
                                        value: 3,
                                        message:
                                            'Debe tener mínimo 3 caracteres',
                                    },
                                })}
                                error={!!errors.name} // Esta propiedad hace que el input se ponga de color rojo
                                helperText={errors.name?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                label='Correo'
                                type='email'
                                fullWidth
                                {...register('email', {
                                    required: 'El email es obligatorio',
                                    validate: validations.isEmail,
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                label='Contraseña'
                                type='password'
                                fullWidth
                                {...register('password', {
                                    required: 'El password es obligatorio',
                                    minLength: {
                                        // Cantidad mínima de caracteres
                                        value: 6,
                                        message: 'Mínimo 6 caracteres',
                                    },
                                })} // Enlazamos los inputs
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <TextField
                                variant='filled'
                                label='Repetir Contraseña'
                                type='password'
                                fullWidth
                            />
                        </Grid> */}

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                className='circular-btn'
                                // Esto determina el tamaño del boton
                                size='large'
                                fullWidth
                                sx={{
                                    ':hover': {
                                        backgroundColor: 'rgb(19, 143, 232)',
                                    },
                                }}
                            >
                                Crear cuenta
                            </Button>
                        </Grid>

                        {/* Los Grid item no tiene el flex por defecto */}

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink
                                href={
                                    router.query.p
                                        ? `/auth/login?p=${router.query.p}`
                                        : '/auth/login'
                                }
                                legacyBehavior
                                passHref
                            >
                                <Link underline='always' color='secondary'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                        {/* Sección de providers */}

                        <Providers />
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async ({
    req,
    // res,
    query,
}) => {
    // Con esto poodemos obtenemer la información de la sesión activa
    // const session = (await getServerSession(req, res, authOptions)) as {
    //     user?: {
    //         name: string;
    //         email: string;
    //         image: string;
    //     };
    //     expires?: string;
    // };

    // Obtenemos el token para saber si tenemos alguna sesión activa
    const token = await getToken({ req });

    // Obtenemos el query que viene delo login
    const { p = '/' } = query;

    // Si tenemos un sesión activa redireccionamos al usuario hacia la página principal o hacia la dirección que tenga el query
    if (token?.user) {
        return {
            redirect: {
                destination: p.toLocaleString(),
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
