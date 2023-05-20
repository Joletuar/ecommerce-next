import { useContext, useEffect, useState } from 'react';

import { SummaryTitle } from '@/components/admin';
import { AdminLayout } from '@/components/layouts';
import {
    AccessTimeOutlined,
    AttachMoneyOutlined,
    CancelPresentationOutlined,
    CategoryOutlined,
    CreditCardOffOutlined,
    CreditCardOutlined,
    DashboardOutlined,
    GroupOutlined,
    ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import useSWR from 'swr';
import { tesloApi } from '@/api';
import { AuthContext } from '@/context';

interface Statistics {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productWithNotInventory: number;
    lowInventory: number;
}

interface Respuesta {
    ok: boolean;
    message?: string;
    statistics?: Statistics;
}

const fetchWithToken = ([url, token]: [string, string]) =>
    tesloApi
        .get(url, { headers: { 'x-token': token } })
        .then((res) => res.data);

const DashboardPage = () => {
    const { user } = useContext(AuthContext);

    const { data, error } = useSWR<Respuesta>(
        ['http://localhost:3452/api/admin/dashboard', user?.token], // Parámetros que serán pasados el fetcher, deben ser en forma de lista
        fetchWithToken, // función que hará el fetch a la api
        {
            refreshInterval: 30 * 1000, // 30 segundos
        }
    );

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const intervalo = setInterval(
            () =>
                setRefreshIn((oldValue) => (oldValue > 0 ? oldValue - 1 : 30)),
            1000
        );

        return () => clearInterval(intervalo);
    }, []);

    if (!error && !data) {
        return <></>;
    }

    if (error) {
        return <Typography>Error al cargar la información</Typography>;
    }

    const { statistics } = data!;

    return (
        <AdminLayout
            title='Dashboard'
            subTitle='Estadísticas generales'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SummaryTitle
                    icon={
                        <CreditCardOutlined
                            color={'secondary'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={statistics!.numberOfOrders}
                    subTitle='Ordenes Totales'
                />

                <SummaryTitle
                    icon={
                        <AttachMoneyOutlined
                            color={'success'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={statistics!.paidOrders}
                    subTitle='Ordenes Pagados'
                />

                <SummaryTitle
                    icon={
                        <CreditCardOffOutlined
                            color={'error'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={statistics!.notPaidOrders}
                    subTitle='Ordenes Pendientes'
                />

                <SummaryTitle
                    icon={
                        <GroupOutlined
                            color={'primary'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={statistics!.numberOfClients}
                    subTitle='Clientes'
                />

                <SummaryTitle
                    icon={
                        <CategoryOutlined
                            color={'warning'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={statistics!.numberOfProducts}
                    subTitle='Productos'
                />

                <SummaryTitle
                    icon={
                        <CancelPresentationOutlined
                            color={'error'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={statistics!.productWithNotInventory}
                    subTitle='Productos sin Stock'
                />

                <SummaryTitle
                    icon={
                        <ProductionQuantityLimitsOutlined
                            color={'warning'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={statistics!.lowInventory}
                    subTitle='Bajo Inventario'
                />

                <SummaryTitle
                    icon={
                        <AccessTimeOutlined
                            color={'secondary'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={refreshIn}
                    subTitle='Actualización en: '
                />
            </Grid>
        </AdminLayout>
    );
};

export default DashboardPage;
