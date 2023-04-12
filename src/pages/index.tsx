import { NextPage } from 'next';

import { ShopLayout } from '@/components/layouts';
import Typography from '@mui/material/Typography'; // Es recomendable usar este tipo de importaciones porque es más rapido

const HomePage: NextPage = () => {
    return (
        <ShopLayout
            title='Teslo Shop | Next'
            pageDescription='Productos de ropas'
        >
            {/* El prop "component" es importante para el SEO, ya que especifica como el componente será renderizado dentro del documento html */}

            <Typography variant='h1' component='h1'>
                Tienda
            </Typography>

            <Typography variant='h2' sx={{ mb: 1 }}>
                Todos los productos
            </Typography>
        </ShopLayout>
    );
};

export default HomePage;
