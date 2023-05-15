import { tesloApi } from '@/api';
import { AdminLayout } from '@/components/layouts';
import { IUser } from '@/interfaces';
import { PeopleAltOutlined } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import useSWR from 'swr';

// De esta manera se indica el formato de como será la data dento del data grid

const UserPage = () => {
    const { data, error } = useSWR<{ ok: boolean; users: IUser[] }>(
        'http://localhost:3452/api/users'
    );

    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        if (data) {
            setUsers(data.users);
        }
    }, [data]);

    const onRolUpdate = async (userId: string, rol: string) => {
        // Copiar un objeto y romper su refeencia
        const prevUsers = users.map((user) => ({ ...user }));

        // Para mejora la exp de usuarios
        const updatedUsers = users.map((user) => ({
            ...user,
            rol: userId === user._id ? rol : user.role,
        }));

        setUsers(updatedUsers);

        try {
            await tesloApi.put('/admin/users', {
                body: {
                    userId,
                    rol,
                },
            });
        } catch (error) {
            setUsers(prevUsers);
            console.log(error);
            alert('No se pudo actualizar el rol del usuario');
        }
    };

    // Construimos las columnas de la tabla
    const columns: GridColDef[] = [
        {
            field: 'email',
            headerName: 'Correo',
            width: 250,
        },
        {
            field: 'name',
            headerName: 'Nombre Completo',
            width: 300,
        },
        {
            field: 'role',
            headerName: 'Rol',
            width: 300,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Select
                        value={row.role}
                        label='Rol'
                        sx={{ width: '300px' }}
                        onChange={(e) => onRolUpdate(row.id, e.target.value)}
                    >
                        <MenuItem value={'admin'}>Admin</MenuItem>
                        <MenuItem value={'client'}>Client</MenuItem>
                        <MenuItem value={'SEO'}>SEO</MenuItem>
                        <MenuItem value={'super-user'}>Super User</MenuItem>
                    </Select>
                );
            },
        },
    ];

    if (!data && !error) return <></>;

    // Construimos las filas de la tabla con la info obtenido del backend
    const rows = users.map((user) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }));

    return (
        <AdminLayout
            title='Usuarios'
            subTitle='Mantenimiento de usuarios'
            icon={<PeopleAltOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    {/* Este componente siempre necesita las columnas y rows
                    pagesize: indica el numero de elementos por página */}

                    <DataGrid columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default UserPage;
