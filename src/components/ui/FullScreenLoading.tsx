import { Box, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
    text?: string;
}

export const FullScreenLoading: FC<Props> = ({ text = 'Cargando...' }) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
        >
            {/* La prop "thickness" indica el grosor de la linea del circulo */}
            <Typography mb={2} variant='h2' fontWeight={200} fontSize={20}>
                {text}
            </Typography>
            <CircularProgress thickness={2} />
        </Box>
    );
};
