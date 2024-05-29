import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Duelo {
    id: number;
    resultado: string | null;
    enano1Nombre: string | null;
    enano2Nombre: string | null;
    enano1Imagen: string | null;
    enano2Imagen: string | null;
}

const PeleaDeEnanos: React.FC = () => {
    const router = useRouter();
    const [duelo, setDuelo] = useState<Duelo | null>(null);

    const otraPelea = () => {
        router.push('/pelea');
    };

    useEffect(() => {
        const { idDuelo } = router.query;
        console.log('Valor de idDuelo:', idDuelo);

        if (router.isReady && idDuelo) {
            obtenerDatosDeDuelo(idDuelo);
        }
    }, [router.isReady, router.query]);
    
    const obtenerDatosDeDuelo = async (idDuelo: string | string[]) => {
        try {
            const response = await fetch(`http://localhost:3001/duelo/${idDuelo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos del duelo');
            }

            const data = await response.json();
            console.log('Datos del duelo recibidos:', data);
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

            const updatedDuelo = await response.json();
            console.log('Siguiente turno ejecutado correctamente:', updatedDuelo);
            setDuelo(updatedDuelo);
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
                    {duelo ? (
                        <>
                            {duelo.enano1Imagen && <img src={duelo.enano1Imagen} alt={duelo.enano1Nombre || "Enano 1"} style={{ height: '200px', width: 'auto', maxWidth: '100%', borderRadius: '5px', marginBottom: '10px' }} />}
                            <p>Nombre: {duelo.enano1Nombre}</p>
                        </>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '10%', height: '100%' }}>
                    <button style={{ backgroundColor: '#ff5722', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', height: '100%' }} onClick={otraPelea}>Otra pelea</button>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%', backgroundColor: '#333', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ color: '#ff5722' }}>Enano 2</h2>
                    {duelo ? (
                        <>
                            {duelo.enano2Imagen && <img src={duelo.enano2Imagen} alt={duelo.enano2Nombre || "Enano 2"} style={{ height: '200px', width: 'auto', maxWidth: '100%', borderRadius: '5px', marginBottom: '10px' }} />}
                            <p>Nombre: {duelo.enano2Nombre}</p>
                        </>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
                </div>
                    {/* Aquí se mostrará el resultado del ganador */}
                    {duelo && duelo.resultado && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <h2 style={{ color: '#ff5722' }}>Resultado</h2>
                        <p>{duelo.resultado}</p>
                    </div>)}
            </div> 
)};

export default PeleaDeEnanos;