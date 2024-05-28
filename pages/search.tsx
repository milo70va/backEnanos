import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Enano {
    id: number;
    nombre: string;
    edad: number;
    imagenUrl: string;
    descripcion: string;
}

const BuscarEnanos: React.FC = () => {
    const router = useRouter();
    const [enanos, setEnanos] = useState<Enano[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch all enanos when the component mounts
        obtenerTodosLosEnanos();
    }, []);

    const obtenerTodosLosEnanos = async () => {
        try {
            const response = await fetch('http://localhost:3001/enanos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error al obtener los datos de los enanos');
            }

            const data = await response.json();
            setEnanos(data);
        } catch (error) {
            console.error('Error al obtener los datos de los enanos:', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleEnanoClick = (id: number) => {
        router.push(`/enano/${id}`);
    };

    const filteredEnanos = enanos.filter((enano) =>
        enano.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Buscar Enanos</h1>
            <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ margin: '20px 0', padding: '10px', width: '80%', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {filteredEnanos.map((enano) => (
                    <div key={enano.id} style={{ margin: '10px', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleEnanoClick(enano.id)}>
                        <img src={enano.imagenUrl} alt={enano.nombre} style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />
                        <p style={{ marginTop: '10px', color: '#ff5722' }}>{enano.nombre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuscarEnanos;
