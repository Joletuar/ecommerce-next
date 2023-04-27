export const formatPrice = (value: number) => {
    // Creamos nuestro formateador
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2, // Los nuúmeros de dígitos mínimos
        maximumSignificantDigits: 2, // Los números de dígitos máximos
    });

    return formatter.format(value); // Esto retorna un string
};
