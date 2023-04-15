import NextLink from 'next/link';

import { AuthLayout } from '@/components/layouts';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

const RegisterPage = () => {
    return (
        <AuthLayout title={'Registrarse'}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>
                            Crear Cuenta
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant='filled'
                            label='Nombre Completo'
                            type='text'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant='filled'
                            label='Correo'
                            type='text'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant='filled'
                            label='Contraseña'
                            type='password'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant='filled'
                            label='Repetir Contraseña'
                            type='password'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
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
                        <NextLink href='/auth/login' legacyBehavior passHref>
                            <Link underline='always' color='secondary'>
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
};

export default RegisterPage;
