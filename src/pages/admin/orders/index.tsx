import { tesloApi } from '@/api';
import { AdminLayout } from '@/components/layouts';
import { AuthContext } from '@/context';
import { IOrder, IUser } from '@/interfaces';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useContext } from 'react';

import useSWR from 'swr';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Order ID',
    width: 250,
  },
  {
    field: 'email',
    headerName: 'Correo',
    width: 250,
  },
  {
    field: 'name',
    headerName: 'Nombre Completo',
    width: 300,
  },
  {
    field: 'total',
    headerName: 'Monto total', //TODO: Usar la función que permite formatear cantidades
    width: 300,
  },
  {
    field: 'noProducts',
    headerName: 'Número de Productos',
    width: 250,
    align: 'center', // Propiedad que nos permite alinear el valor dentro de la celda
  },
  {
    field: 'check',
    headerName: 'Ver Orden',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
          Ver Orden
        </a>
      );
    },
  },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Pagada' color='success' />
      ) : (
        <Chip variant='outlined' label='Pagada' color='error' />
      );
    },
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de creación',
    width: 250,
  },
];

const fetchWithToken = ([url, token]: [string, string]) =>
  tesloApi.get(url, { headers: { 'x-token': token } }).then((res) => res.data);

const OrdersPage = () => {
  const { user } = useContext(AuthContext);

  const { data, error } = useSWR<{ ok: boolean; orders: IOrder[] }>(
    [process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/orders', user?.token], // Parámetros que serán pasados el fetcher, deben ser en forma de lista
    fetchWithToken // función que hará el fetch a la api
  );

  if (!data && !error) return <></>;

  if (error) {
    return <Typography>Error al cargar la información</Typography>;
  }

  const rows = data!.orders.map((order) => {
    const { email, name } = order.user as IUser;

    return {
      id: order._id,
      email,
      isPaid: order.isPaid,
      name,
      total: order.total,
      noProducts: order.numberOfItems,
      createdAt: order.createdAt,
    };
  });

  return (
    <AdminLayout
      title='Ordenes'
      subTitle='Mantenimiento de ordenes'
      icon={<ConfirmationNumberOutlined />}
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

export default OrdersPage;
