import { ShopLayout } from '@/components/layouts';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';

const AddressPage = () => {
    return (
        <ShopLayout
            title='Dirección'
            pageDescription='Confirmar dirección del destino'
        >
            <Typography variant='h1' component='h1'>
                Datos Personales
            </Typography>

            {/* Cuando se usa "Grid" no hace flata especifica el "flex" porque ya lo tiene implicito */}

            <Grid container gap={1} justifyContent='center' sx={{ mt: 2 }}>
                <Grid item xs={12} sm={5}>
                    <TextField
                        label='Nombre'
                        fullWidth
                        variant='filled'
                        type='text'
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <TextField
                        label='Apellidos'
                        fullWidth
                        variant='filled'
                        type='text'
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <TextField
                        label='Dirección'
                        fullWidth
                        variant='filled'
                        type='text'
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <TextField
                        label='Dirección 2 (opcional)'
                        fullWidth
                        variant='filled'
                        type='text'
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <TextField
                        label='Código Postal'
                        fullWidth
                        variant='filled'
                        type='text'
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <TextField
                        label='Ciudad'
                        fullWidth
                        variant='filled'
                        type='text'
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                        <Select variant='filled' label='País' value={1}>
                            <MenuItem value={1}>Ecuador</MenuItem>
                            <MenuItem value={1}>Costa Rica</MenuItem>
                            <MenuItem value={1}>México</MenuItem>
                            <MenuItem value={1}>Canadá</MenuItem>
                            <MenuItem value={1}>Perú</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <TextField
                        label='Teléfono'
                        fullWidth
                        variant='filled'
                        type='tel'
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button
                    color='secondary'
                    className='circular-btn'
                    size='large'
                    sx={{
                        ':hover': {
                            backgroundColor: 'rgb(19, 143, 232)',
                        },
                    }}
                >
                    Revisar pedido
                </Button>
            </Box>
        </ShopLayout>
    );
};

export default AddressPage;
