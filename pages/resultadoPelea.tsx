import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Duelo {
    id: number;
    enano1Nombre: string | null;
    enano2Nombre: string | null;
    enano1Salud: number | null;
    enano2Salud: number | null;
    enano1Estamina: number | null;
    enano2Estamina: number | null;
}

const PeleaDeEnanos: React.FC = () => {
    const router = useRouter();
    const [duelo, setDuelo] = useState<Duelo | null>(null);

    useEffect(() => {
        const { idDuelo } = router.query;
        console.log('Valor de idDuelo:', idDuelo);
        if (idDuelo) {
            obtenerDatosDeDuelo(idDuelo);
        } 
    }, [router.query]);
    
    
    const obtenerDatosDeDuelo = async (idDuelo: string | string[]) => {
        try {
            const response = await fetch(`http://localhost:3001/duelo/${idDuelo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error al obtener los datos del duelo');
            } else {
                console.error('Response status:', response.status);
                console.error('Respondio correctamente');
            }

            const data = await response.json();
            console.log('Datos del duelo:', data.enano1Nombre, data.enano2Nombre);
            setDuelo(data);
        } catch (error) {
            console.error('Error al obtener los datos del duelo:', error);
        }
    };
    

    const siguienteTurno = async () => {
        if (!duelo || !duelo.id) {
            console.error('No hay duelo válido para continuar');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/duelo/siguiente-turno/${duelo.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error al avanzar al siguiente turno');
            }
            console.log('Siguiente turno ejecutado correctamente');
            // Aquí puedes actualizar el estado de 'duelo' si es necesario
        } catch (error) {
            console.error('Error al avanzar al siguiente turno:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Pelea de Enanos</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', width: '100%' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%', backgroundColor: '#333', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ color: '#ff5722' }}>Enano 1</h2>
                    {duelo && (
                        <>
                            <p>Nombre: {duelo.enano1Nombre}</p>
                            <p>Salud: {duelo.enano1Salud}</p>
                            <p>Estamina: {duelo.enano1Estamina}</p>
                        </>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '10%', height: '100%' }}>
                    <button style={{ backgroundColor: '#ff5722', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', height: '100%' }} onClick={siguienteTurno}>Siguiente Turno</button>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%', backgroundColor: '#333', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ color: '#ff5722' }}>Enano 2</h2>
                    {duelo && (
                        <>
                            <p>Nombre: {duelo.enano2Nombre}</p>
                            <p>Salud: {duelo.enano2Salud}</p>
                            <p>Estamina: {duelo.enano2Estamina}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PeleaDeEnanos;
