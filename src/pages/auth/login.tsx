import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';

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

// Tipado de los campos del formulario
type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [showError, setShowError] = useState(false);
    const router = useRouter();
    const { loginUser } = useContext(AuthContext);

    const {
        register, // Con este función podemos enlazar los campos
        handleSubmit, // Se encarga que la página haga un full refresh. Necesita de un función a ejecutar si todo va bien
        formState: { errors }, // Retorna un objeto con cada uno de los inputs del form y su respectivo error
    } = useForm<FormData>();

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);

        // Realizamos el dispatch de la acción de logeo
        const isValidLogin = await loginUser(email, password);

        // Si el logeo no es válido mostramos los errores
        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => setShowError(false), 2500);
            return;
        }

        // Si el query viene en la url del login, entonces el destino será dicha ruta
        const destination = router.query.p?.toLocaleString() || '/';

        router.replace(destination);
    };

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h1'
                                component='h1'
                                textAlign='center'
                            >
                                Iniciar Sesión
                            </Typography>
                            {showError && (
                                <Chip
                                    label='Usuario o contaseña incorrectos'
                                    color='error'
                                    icon={<ErrorOutline />}
                                    className='fadeIn'
                                    sx={{ display: 'flex' }}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                {...register('email', {
                                    // Como segundo argumento recibe un objeto con opciones
                                    required: 'El email es obligatorio', // Este es el valor que va aparecer en el campo required del objeto errors
                                    validate: validations.isEmail, // Ejecuta una validación personalizada
                                })} // Propagación de propiedades. Enlazamos los inputs al estado del formulario
                                variant='filled'
                                type='email'
                                label='Correo'
                                fullWidth
                                error={!!errors.email} // Esta propiedad hace que el input se ponga de color rojo
                                helperText={errors.email?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                {...register('password', {
                                    required: 'El password es obligatorio',
                                    minLength: {
                                        // Cantidad mínima de caracteres
                                        value: 6,
                                        message: 'Mínimo 6 caracteres',
                                    },
                                })} // Enlazamos los inputs
                                variant='filled'
                                label='Contraseña'
                                type='password'
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

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
                                Ingresar
                            </Button>
                        </Grid>

                        {/* Los Grid item no tiene el flex por defecto */}

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink
                                href={
                                    router.query.p
                                        ? `/auth/register?p=${router.query.p}`
                                        : '/auth/register'
                                }
                                legacyBehavior
                                passHref
                            >
                                <Link underline='always' color='secondary'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
