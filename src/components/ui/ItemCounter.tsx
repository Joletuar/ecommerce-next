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
        if (signo === '-') {
            if (currentValue === 1) return;
            updatedValue(currentValue - 1);
        } else {
            if (currentValue >= maxValue) return;
            updatedValue(currentValue + 1);
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
