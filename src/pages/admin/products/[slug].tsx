import {
    ChangeEvent,
    FC,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { GetServerSideProps } from 'next';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { AdminLayout } from '@/components/layouts';
import { IProduct } from '@/interfaces';
import { tesloApi } from '@/api';

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
    const { user } = useContext(AuthContext);
    const [newTag, setNewTag] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null); // Apuntamos hacia el elemento html respectivo

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues, // Esta función obtiene todo el valor del formulario
        setValue, // Permite establecer un valor de manera controlada, esto no dispara el rerender de React
        watch, // Permite estar al pendiente de los cambios de un valor
    } = useForm<FormData>({
        defaultValues: product, // Hacemos que el formulario ya tenga como valor inicial el product obtenido en el GetServerSideProps
    });

    useEffect(() => {
        // El watch es un observable. Esto indica que siempre va estar ejecutandose aunque salgamos de la página
        // Por estos motivos hay que limpiarlo

        const subscription = watch((value, { name, type }) => {
            // console.log({ value, name, type });

            // Generación del slug de manera automática
            if (name === 'title') {
                const newSlug =
                    value.title
                        ?.trim() // Quitamos espacios atras y adelante
                        .replaceAll(' ', '_') // Reemplazamos los espacios por guiones bajos
                        .replaceAll("'", '') // Reemplazamos los apóstrofes por guiones bajos
                        .toLocaleLowerCase() || '';

                setValue('slug', newSlug);
            }
        });

        return () => {
            // Nos desuscribimos
            subscription.unsubscribe();
        };
    }, [watch, setValue]);

    const onNewTag = () => {
        // Limpiamos el tag almacena en el estado
        const newTagValue = newTag.toLocaleLowerCase().trim();

        // Limpiamos el textfield
        setNewTag('');

        // Obtenemos los tags actuales
        const currentTags = getValues('tags');

        // El el tag ya existe, no hacemos nada
        if (currentTags.includes(newTagValue)) return;

        // Agregamos el nuevo tag al arreglo de tags
        currentTags.push(newTagValue);

        // Debido a que estamos mutando un estado, provoca que se renderice automáticamente
        // setValue('tags', currentTags, {
        //     shouldValidate: true,
        // });
    };

    const onDeleteTag = (tag: string) => {
        // Obtenemos los tags actuales
        const prevTags = getValues('tags');

        // Eliminamos el tag
        setValue(
            'tags',
            prevTags.filter((ele) => ele !== tag),
            {
                shouldValidate: true,
            }
        );
    };

    const onChangeSize = (size: string) => {
        const currentSizes = getValues('sizes');

        if (currentSizes.includes(size)) {
            return setValue(
                'sizes',
                currentSizes.filter((s) => s !== size),
                {
                    shouldValidate: true,
                }
            );
        }

        setValue('sizes', [...currentSizes, size], {
            shouldValidate: true,
        });
    };

    const onSubmitForm = async (form: FormData) => {
        if (form.images.length < 2) return 'Mínimo 2 imágenes';

        setIsUpdating(true);

        try {
            await tesloApi<{ ok: boolean }>({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',
                data: { product: form },
                headers: {
                    'x-token': user?.token,
                },
            });

            if (!form._id) {
                router.replace(`/admin/products/${form.slug}`);
                router.push('/admin/products');
            } else {
                setIsUpdating(false);
            }
        } catch (error) {
            console.log(error);
            setIsUpdating(false);
        }
    };

    const onFileSelected = async ({
        target,
    }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }

        try {
            // Recorremos los files seleccionados por inputFile
            for (const file of target.files) {
                const formData = new FormData();
                // console.log(file);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                        disabled={isUpdating}
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
                            rows={5}
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
                                    control={
                                        <Checkbox
                                            checked={getValues(
                                                'sizes'
                                            ).includes(size)}
                                        />
                                    }
                                    label={size}
                                    onChange={() => onChangeSize(size)}
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
                                    val.trim().includes(' ')
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
                            onChange={(e) => setNewTag(e.target.value)}
                            value={newTag}
                            // Cuando el usuario presione la tecla spaces agregamos la etiqueta
                            onKeyDown={(e) => {
                                e.key === ' ' ? onNewTag() : null;
                            }}
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
                            {getValues('tags').map((tag) => {
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
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Cargar imagen
                            </Button>

                            {/* Procedimiento para generar un elemento que nos permita seleccionar un archivo */}
                            <input
                                onChange={onFileSelected} // Cuando este input cambie disparamos un evento que nos permita recuperar los nombres de los files seleccionados
                                ref={fileInputRef} // Creamos la referencia al elemento html
                                style={{ display: 'none' }} // Ponemos este display para que no se muestre
                                type='file'
                                multiple
                                accept='image/png, image/gif, image/jpeg'
                            />

                            <Chip
                                label='Es necesario al 2 imagenes'
                                color='error'
                                variant='outlined'
                                sx={{ mb: 3 }}
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

    let dataTemp;

    if (slug === 'new') {
        const { data } = await tesloApi.get<{
            ok: boolean;
            producto?: IProduct;
        }>(`http://localhost:3452/api/products/new`);

        dataTemp = data;
    } else {
        const { data } = await tesloApi.get<{
            ok: boolean;
            producto?: IProduct;
        }>(`http://localhost:3452/api/products/${slug}`);

        dataTemp = data;
    }

    const { ok, producto: product } = dataTemp;

    if (!ok) {
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
