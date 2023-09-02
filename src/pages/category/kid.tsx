import { NextPage } from 'next';

import { useProducts } from '@/hooks';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { Typography } from '@mui/material';

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts(`/products?gender=kid`);

  return (
    <ShopLayout
      title='Categoría - Kid'
      pageDescription='Página con las prendas para niños'
    >
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>

      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los productos para niños
      </Typography>

      {/* Contenedor principal de nuestro aplicación */}

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
