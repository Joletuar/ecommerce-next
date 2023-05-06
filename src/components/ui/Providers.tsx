import { useEffect, useState } from 'react';

import { getProviders, signIn } from 'next-auth/react';

import { Button, Divider, Grid } from '@mui/material';

export const Providers = () => {
    const [providers, setProviders] = useState<any>({});
    useEffect(() => {
        // Esta función retorna una promesa con todos los proveedores registrados
        getProviders().then((prov) => {
            // console.log(prov);
            setProviders(prov);
        });
    }, []);

    return (
        <Grid
            item
            xs={12}
            display='flex'
            justifyContent='end'
            flexDirection='column'
        >
            <Divider sx={{ width: '100%', mb: 2 }} />
            {Object.values(providers).map((prov: any) => {
                if (prov.id === 'credentials') return null;

                return (
                    <Button
                        key={prov.id}
                        fullWidth
                        variant='outlined'
                        color='primary'
                        sx={{
                            mb: 1,
                            ':hover': {
                                backgroundColor: 'rgb(19, 143, 232)',
                            },
                        }}
                        // El signIn pide el id del provider (su nombre)
                        onClick={() => signIn(prov.id)}
                    >
                        {prov.name}
                    </Button>
                );
            })}
        </Grid>
    );
};
