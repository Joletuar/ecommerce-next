import { FC } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
    currentValue: number;
    updatedValue: (quantity: number) => void;
    maxValue: number;
}

export const ItemCounter: FC<Props> = ({
    currentValue,
    updatedValue,
    maxValue,
}) => {
    const onChangeValue = (signo: string) => {
        if (currentValue >= maxValue || currentValue <= 0) return; 

        if (signo === '-') {
            updatedValue(currentValue--);
        } else {
            updatedValue(currentValue++);
        }
    };

    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={() => onChangeValue('-')}>
                <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: 'center' }}>
                {currentValue}
            </Typography>

            <IconButton onClick={() => onChangeValue('+')}>
                <AddCircleOutline />
            </IconButton>
        </Box>
    );
};
