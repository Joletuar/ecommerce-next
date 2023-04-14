import { FC } from 'react';

import { ISize } from '@/interfaces';

import { Box, Button } from '@mui/material';

interface Props {
    children?: JSX.Element[] | JSX.Element;
    sizes: ISize[];
    selectedSize?: ISize;
}

export const ProductSelectSizesSelector: FC<Props> = ({
    sizes,
    selectedSize,
}) => {
    return (
        <Box>
            {sizes.map((size) => (
                // La prop "size" especifica el tamaño del button
                <Button
                    key={size}
                    size='small'
                    // El color por default de los botones es "info"
                    color={selectedSize === size ? 'primary' : 'info'}
                >
                    {size}
                </Button>
            ))}
        </Box>
    );
};
