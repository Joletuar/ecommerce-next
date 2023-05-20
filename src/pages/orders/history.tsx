import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

import { ShopLayout } from '@/components/layouts';

import { Chip, Grid, Typography, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { tesloApi } from '@/api';
import { IOrder } from '@/interfaces';

// De esta manera se indica el formato de como será la data dento del data grid

const columns: GridColDef[] | GridColDef<JSX.Element> = [
    {
        // Nombre de la columna
        field: 'id',
        // Texto que se mostrará en el table
        headerName: 'ID',
        // Ancho de la columna
        width: 100,
    },
    {
        field: 'fullName',
        headerName: 'Nombre Completo',
        width: 300,
    },
    {
        field: 'paid',
        headerName: 'Estado',
        // Texto que se muestra cuando se pasa el mouse sobre el header la columna
        description: 'Muestra información si la orden está pagada o no',
        width: 200,
        // Esta es una función que nosotros podemos llamar y tiene que regresar algo
        renderCell: (params: GridRenderCellParams) => {
            return params.row.paid ? (
                <>
                    <Chip color='success' label='Pagada' variant='outlined' />
                </>
            ) : (
                <>
                    <Chip color='error' label='No Pagada' variant='outlined' />
                </>
            );
        },
    },
    {
        field: 'order',
        headerName: 'Revisar Orden',
        width: 150,
        // Aqui indicamos si podemos o no ordenar esta columna
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                // Para acceder a los valores de las filas se usa el params.row.nombre_de_la_columna
                <NextLink
                    href={`/orders/${params.row.orderId}`}
                    legacyBehavior
                    passHref
                >
                    <Link underline='always' color='secondary'>
                        Ver Orden
                    </Link>
                </NextLink>
            );
        },
    },
];

interface Props {
    orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
    const rows = orders.map((order, index) => ({
        id: index + 1,
        paid: order.isPaid,
        fullName:
            order.shippingAddress.firstName +
            ' ' +
            order.shippingAddress.lastName,
        orderId: order._id,
    }));
    return (
        <ShopLayout
            title='Historial de ordenes'
            pageDescription='Historial de las ordenes del cliente'
        >
            <Typography variant='h1' component='h1'>
                Historial de Ordenes
            </Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    {/* Este componente siempre necesita las columnas y rows
                    pagesize: indica el numero de elementos por página */}

                    <DataGrid columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default HistoryPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req });
    const id = session?.user._id || session?.user.id;

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/history`,
                permanent: false,
            },
        };
    }

    try {
        const { data } = await tesloApi.get<{
            ok: boolean;
            message?: string;
            orders?: IOrder[];
        }>(`/orders/user/${id}`);

        let { ok, orders } = data;

        if (!ok) {
            return {
                redirect: {
                    destination: `/`,
                    permanent: false,
                },
            };
        }

        orders = orders?.filter((order) => order?.user?.toString() === id);

        return {
            props: { orders },
        };
    } catch (error) {
        console.log(error);

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};
