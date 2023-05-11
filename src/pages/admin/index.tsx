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
import { Grid } from '@mui/material';

const DashboardPage = () => {
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
                    title={1}
                    subTitle='Ordenes Totales'
                />

                <SummaryTitle
                    icon={
                        <AttachMoneyOutlined
                            color={'success'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={2}
                    subTitle='Ordenes Pagados'
                />

                <SummaryTitle
                    icon={
                        <CreditCardOffOutlined
                            color={'error'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={3}
                    subTitle='Ordenes Pendientes'
                />

                <SummaryTitle
                    icon={
                        <GroupOutlined
                            color={'primary'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={3}
                    subTitle='Clientes'
                />

                <SummaryTitle
                    icon={
                        <CategoryOutlined
                            color={'warning'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={3}
                    subTitle='Productos'
                />

                <SummaryTitle
                    icon={
                        <CancelPresentationOutlined
                            color={'error'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={24}
                    subTitle='Productos sin Stock'
                />

                <SummaryTitle
                    icon={
                        <ProductionQuantityLimitsOutlined
                            color={'warning'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={24}
                    subTitle='Bajo Inventario'
                />

                <SummaryTitle
                    icon={
                        <AccessTimeOutlined
                            color={'secondary'}
                            sx={{ fontSize: 40 }} // Con esto modificamos el tamaño del icono
                        />
                    }
                    title={24}
                    subTitle='Actualización en: '
                />
            </Grid>
        </AdminLayout>
    );
};

export default DashboardPage;


