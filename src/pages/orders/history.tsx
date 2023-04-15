import { NextPage } from 'next';
import NextLink from 'next/link';

import { ShopLayout } from '@/components/layouts';

import { Chip, Grid, Typography, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

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
                    href={`/orders/${params.row.id}`}
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

const rows = [
    { id: 1, paid: true, fullName: 'Johan Tuarez Vega' },
    { id: 2, paid: false, fullName: 'Leonardo Tuarez Vega' },
    { id: 3, paid: true, fullName: 'Junior Tuarez Vega' },
    { id: 4, paid: true, fullName: 'Carlos Tuarez Vega' },
    { id: 5, paid: false, fullName: 'Eduardo Tuarez Vega' },
    { id: 6, paid: false, fullName: 'Ronald Tuarez Vega' },
    { id: 7, paid: false, fullName: 'Diego Tuarez Vega' },
    { id: 8, paid: true, fullName: 'Sebastian Tuarez Vega' },
    { id: 9, paid: true, fullName: 'Miguel Tuarez Vega' },
];

const HistoryPage: NextPage = () => {
    return (
        <ShopLayout
            title='Historial de ordenes'
            pageDescription='Historial de las ordenes del cliente'
        >
            <Typography variant='h1' component='h1'>
                Historial de Ordenes
            </Typography>

            <Grid container>
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
