import NextLink from 'next/link';

import { tesloApi } from '@/api';
import { AdminLayout } from '@/components/layouts';
import { AuthContext } from '@/context';
import { IProduct } from '@/interfaces';
import { CategoryOutlined } from '@mui/icons-material';
import { CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useContext } from 'react';

import useSWR from 'swr';

const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Imagen',
        // Si no se especifica el width el ancho lo determinará en base al contenido
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a
                    href={`/product/${row.slug}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    {/* Componente que permite renderizar imagenes */}
                    <CardMedia
                        alt={`${row.title}`}
                        component='img'
                        className='fadeIn'
                        image={`/products/${row.img}`}
                    />
                </a>
            );
        },
    },
    {
        field: 'title',
        headerName: 'Nombre del producto',
        width: 300,
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <NextLink
                    legacyBehavior
                    passHref
                    href={`/admin/products/${row.slug}`}
                >
                    <Link underline='always'>{row.title}</Link>
                </NextLink>
            );
        },
    },
    {
        field: 'gender',
        headerName: 'Género',
    },
    {
        field: 'type',
        headerName: 'Tipo',
    },
    {
        field: 'inStock',
        headerName: 'Inventario',
    },
    {
        field: 'price',
        headerName: 'Precio', // TODO: formatear el precio
    },
    {
        field: 'sizes',
        headerName: 'Tallas',
        width: 250,
    },
];

const fetchWithToken = ([url, token]: [string, string]) =>
    tesloApi
        .get(url, { headers: { 'x-token': token } })
        .then((res) => res.data);

const ProductsPage = () => {
    const { user } = useContext(AuthContext);

    const { data, error } = useSWR<{ ok: boolean; products: IProduct[] }>(
        ['http://localhost:3452/api/admin/products', user?.token], // Parámetros que serán pasados el fetcher, deben ser en forma de lista
        fetchWithToken // función que hará el fetch a la api
    );

    if (!data && !error) return <></>;

    const rows = data!.products.map((product) => ({
        id: product._id,
        img: product.images[1],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }));

    return (
        <AdminLayout
            title={`Productos (${data?.products.length})`}
            subTitle='Mantenimiento de productos'
            icon={<CategoryOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    {/* Este componente siempre necesita las columnas y rows
                    pagesize: indica el numero de elementos por página */}

                    <DataGrid columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default ProductsPage;
