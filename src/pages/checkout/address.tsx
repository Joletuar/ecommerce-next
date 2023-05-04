import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { ShopLayout } from '@/components/layouts';
import { countries } from '@/utils';

import Cookie from 'js-cookie';

import {
    Box,
    Button,
    FormControl,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '@/context';

type FormData = {
    firtsName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
};

// Función que obtiene las cookies con la info de la dirección
const getAddressFromCookies = (): FormData => {
    return {
        firtsName: Cookie.get('firtsName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
    };
};

const AddressPage = () => {
    const {
        register, // Con esto enlazamos los campos
        handleSubmit, // Se encarga que la página haga un full refresh. Necesita de un función a ejecutar si todo va bien
        formState: { errors }, // Retorna un objeto con cada uno de los inputs del form y su respectivo error
    } = useForm<FormData>({
        defaultValues: getAddressFromCookies(), // Se puede pasar un valor inicial
    });

    const { updateAddress } = useContext(CartContext);

    const router = useRouter();

    // Esta función va recbir todos los campos del formulario
    const onChekData = async ({
        firtsName,
        lastName,
        address,
        address2 = '',
        zip,
        city,
        country,
        phone,
    }: FormData) => {
        updateAddress({
            firtsName,
            lastName,
            address,
            address2,
            zip,
            city,
            country,
            phone,
        });

        router.push('/');
    };

    return (
        <ShopLayout
            title='Dirección'
            pageDescription='Confirmar dirección del destino'
        >
            <Typography variant='h1' component='h1'>
                Datos Personales
            </Typography>

            {/* El handleSubmit require de la función a ejecutar en caso de que los datos estén correctos */}
            <form onSubmit={handleSubmit(onChekData)}>
                {/* Cuando se usa "Grid" no hace flata especifica el "flex" porque ya lo tiene implicito */}

                <Grid container gap={1} justifyContent='center' sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label='Nombre'
                            fullWidth
                            variant='filled'
                            type='text'
                            {...register('firtsName', {
                                // El primer argumento corresponde al campo que vamos a enlazar del FormData
                                required: 'El nombre es obligatorio', // Este es el valor que va aparecer en el campo required del objeto errors
                            })}
                            error={!!errors.firtsName} // Esta propiedad hace que el input se ponga de color rojo
                            helperText={errors.firtsName?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                        />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField
                            label='Apellidos'
                            fullWidth
                            variant='filled'
                            type='text'
                            {...register('lastName', {
                                // El primer argumento corresponde al campo que vamos a enlazar del FormData
                                required: 'El apellido es obligatorio', // Este es el valor que va aparecer en el campo required del objeto errors
                            })}
                            error={!!errors.lastName} // Esta propiedad hace que el input se ponga de color rojo
                            helperText={errors.lastName?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                        />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField
                            label='Dirección'
                            fullWidth
                            variant='filled'
                            type='text'
                            {...register('address', {
                                // El primer argumento corresponde al campo que vamos a enlazar del FormData
                                required: 'La dirección es obligatoria', // Este es el valor que va aparecer en el campo required del objeto errors
                            })}
                            error={!!errors.address} // Esta propiedad hace que el input se ponga de color rojo
                            helperText={errors.address?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                        />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField
                            label='Dirección 2 (opcional)'
                            fullWidth
                            variant='filled'
                            type='text'
                            {...register('address2', {
                                // El primer argumento corresponde al campo que vamos a enlazar del FormData
                            })}
                        />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField
                            label='Código Postal'
                            fullWidth
                            variant='filled'
                            type='text'
                            {...register('zip', {
                                // El primer argumento corresponde al campo que vamos a enlazar del FormData
                                required: 'El código postal es obligatorio', // Este es el valor que va aparecer en el campo required del objeto errors
                            })}
                            error={!!errors.zip} // Esta propiedad hace que el input se ponga de color rojo
                            helperText={errors.zip?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                        />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField
                            label='Ciudad'
                            fullWidth
                            variant='filled'
                            type='text'
                            {...register('city', {
                                // El primer argumento corresponde al campo que vamos a enlazar del FormData
                                required: 'La ciudad es obligatoria', // Este es el valor que va aparecer en el campo required del objeto errors
                            })}
                            error={!!errors.city} // Esta propiedad hace que el input se ponga de color rojo
                            helperText={errors.city?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                        />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        {/* FormControl: corresponde a un componente que nos permite crear un elemento de un formulario */}

                        <FormControl fullWidth>
                            {/* Select: corresponde a un componente que nos permite crear
                        un menú desplegable con diferentes valore */}
                            <TextField
                                variant='filled'
                                label='País'
                                defaultValue={Cookie.get('country') || 'ECU'}
                            >
                                {countries.map((country) => (
                                    // MenuItem: es un componente que corresponde a un itemn dentro del menu desplegable
                                    <MenuItem
                                        key={country.code}
                                        value={country.code}
                                    >
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField
                            label='Teléfono'
                            fullWidth
                            variant='filled'
                            type='tel'
                            {...register('phone', {
                                // El primer argumento corresponde al campo que vamos a enlazar del FormData
                                required: 'El teléfono es obligatorio', // Este es el valor que va aparecer en el campo required del objeto errors
                            })}
                            error={!!errors.phone} // Esta propiedad hace que el input se ponga de color rojo
                            helperText={errors.phone?.message} // Esta propieda muestra un pequeño mensaje debajo del input con el texto que se le pase
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button
                        type='submit'
                        color='secondary'
                        className='circular-btn'
                        size='large'
                        sx={{
                            ':hover': {
                                backgroundColor: 'rgb(19, 143, 232)',
                            },
                        }}
                    >
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    );
};

export default AddressPage;
