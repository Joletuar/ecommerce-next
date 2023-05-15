import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { AdminLayout } from '@/components/layouts';
import { IProduct } from '@/interfaces';
import { tesloApi } from '@/api';
import { useForm } from 'react-hook-form';

import {
    DriveFileRenameOutline,
    SaveOutlined,
    UploadOutlined,
} from '@mui/icons-material';

import {
    Box,
    Button,
    capitalize,
    Card,
    CardActions,
    CardMedia,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    ListItem,
    Paper,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
    _id?: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    type: string;
    gender: string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues, // Esta función obtiene todo el valor del formulario
        setValue, // Permite establecer un valor de manera controlada, esto no dispara el rerender de React
    } = useForm<FormData>({
        defaultValues: product, // Hacemos que el formulario ya tenga como valor inicial el product obtenido en el GetServerSideProps
    });

    const onDeleteTag = (tag: string) => {};

    const onSubmitForm = async (form: FormData) => {};

    return (
        <AdminLayout
            title={'Producto'}
            subTitle={`Editando: ${product.title}`}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        color='secondary'
                        startIcon={<SaveOutlined />}
                        sx={{ width: '150px' }}
                        type='submit'
                    >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Título'
                            variant='filled'
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('title', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 3,
                                    message: 'Mínimo 3 caracteres',
                                },
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />

                        <TextField
                            label='Descripción'
                            variant='filled'
                            fullWidth
                            multiline
                            sx={{ mb: 1 }}
                            {...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                        <TextField
                            label='Inventario'
                            type='number'
                            variant='filled'
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('inStock', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 0,
                                    message: 'El valor mínimo es 1',
                                },
                            })}
                            error={!!errors.inStock}
                            helperText={errors.inStock?.message}
                        />

                        <TextField
                            label='Precio'
                            type='number'
                            variant='filled'
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('price', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 0,
                                    message: 'El valor mínimo es 1',
                                },
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('type')} // Accedemos al valor del campo "type" usando la función
                                onChange={(e) =>
                                    setValue('type', e.target.value, {
                                        shouldValidate: true, // dispara el rerender cada vez que cambia el valor
                                    })
                                } // Modificamos el valor del campo "gender", el tercer argumento permite enviar un arreglo opciones.
                            >
                                {validTypes.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio color='secondary' />}
                                        label={capitalize(option)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('gender')} // Accedemos al valor del campo "gender" usando la función
                                onChange={(e) =>
                                    setValue('gender', e.target.value, {
                                        shouldValidate: true, // dispara el rerender cada vez que cambia el valor
                                    })
                                } // Modificamos el valor del campo "gender", el tercer argumento permite enviar un arreglo opciones.
                            >
                                {validGender.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio color='secondary' />}
                                        label={capitalize(option)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {validSizes.map((size) => (
                                <FormControlLabel
                                    key={size}
                                    control={<Checkbox />}
                                    label={size}
                                />
                            ))}
                        </FormGroup>
                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Slug - URL'
                            variant='filled'
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) =>
                                    val.trim().includes('')
                                        ? 'El slug no puede contener espacios'
                                        : undefined,
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        />

                        <TextField
                            label='Etiquetas'
                            variant='filled'
                            fullWidth
                            sx={{ mb: 1 }}
                            helperText='Presiona [spacebar] para agregar'
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0,
                                m: 0,
                            }}
                            component='ul'
                        >
                            {product.tags.map((tag) => {
                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={() => onDeleteTag(tag)}
                                        color='primary'
                                        size='small'
                                        sx={{ ml: 1, mt: 1 }}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display='flex' flexDirection='column'>
                            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                            <Button
                                color='secondary'
                                fullWidth
                                startIcon={<UploadOutlined />}
                                sx={{ mb: 3 }}
                            >
                                Cargar imagen
                            </Button>

                            <Chip
                                label='Es necesario al 2 imagenes'
                                color='error'
                                variant='outlined'
                            />

                            <Grid container spacing={2}>
                                {product.images.map((img) => (
                                    <Grid item xs={4} sm={3} key={img}>
                                        <Card>
                                            <CardMedia
                                                component='img'
                                                className='fadeIn'
                                                image={`/products/${img}`}
                                                alt={img}
                                            />
                                            <CardActions>
                                                <Button fullWidth color='error'>
                                                    Borrar
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </AdminLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { slug = '' } = query;

    const product = await tesloApi.get(
        `http://localhost:3452/api/products/${slug}`
    );

    if (!product) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            },
        };
    }

    return {
        props: {
            product,
        },
    };
};

export default ProductAdminPage;
