import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Enano {
    id: number;
    nombre: string;
    imagen: string;
    salud: number;
    estamina: number;
    fuerza: number;
    resistencia: number;
    agilidad: number;
    inteligencia: number;
    velocidad: number;
}

const PeleaDeEnanos: React.FC = () => {
    const router = useRouter();
    const [enanos, setEnanos] = useState<Enano[]>([]);
    const [enano1Id, setEnano1Id] = useState<number | null>(null);
    const [enano2Id, setEnano2Id] = useState<number | null>(null);
    const [enano1, setEnano1] = useState<Enano | null>(null);
    const [enano2, setEnano2] = useState<Enano | null>(null);

    useEffect(() => {
        const obtenerEnanos = async () => {
            try {
                const response = await fetch('http://localhost:3001/enano');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de los enanos');
                }
                const data = await response.json();
                setEnanos(data);
            } catch (error) {
                console.error('Error al obtener los datos de los enanos:', error);
            }
        };
        obtenerEnanos();
    }, []);

    const handleEnano1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEnano1Id(parseInt(event.target.value));
    };

    const handleEnano2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEnano2Id(parseInt(event.target.value));
    };

    const iniciarPelea = async () => {
        console.log('Iniciando pelea...');
        try {
            const response = await fetch(`http://localhost:3001/duelo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enano1: enano1Id, enano2: enano2Id }),
            });
    
            if (!response.ok) {
                throw new Error('Error al iniciar la pelea');
            }
    
            const data = await response.json();
            const idDelDuelo = data.id; // Obtener el ID del duelo desde la respuesta
    
            console.log('Pelea iniciada correctamente');
    
            // Redirecciona a la nueva página y pasa el ID del duelo como query param
            router.push({
                pathname: '/resultadoPelea',
                query: { idDuelo: idDelDuelo }, // Pasar el ID del duelo como query param
            });
        } catch (error) {
            console.error('Error al iniciar la pelea:', error);
        }
    };
    

    
    

    return (
        <div style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Pelea de Enanos</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', width: '100%' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%', backgroundColor: '#333', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ color: '#ff5722' }}>Enano 1</h2>
                    <select value={enano1Id || ''} onChange={(e) => {
                        setEnano1Id(parseInt(e.target.value));
                        const selectedEnano = enanos.find(enano => enano.id === parseInt(e.target.value));
                        setEnano1(selectedEnano || null);
                    }} style={{ marginBottom: '10px' }}>
                        <option value="">Selecciona un enano</option>
                        {enanos.map((enano) => (
                            <option key={enano.id} value={enano.id}>{enano.nombre}</option>
                        ))}
                    </select>
                    {enano1 && (
                        <>
                            <img src={enano1.imagen} alt={enano1.nombre} style={{ height: '200px', width: 'auto', maxWidth: '100%', borderRadius: '5px', marginBottom: '10px' }} />
                            <p>Salud: {enano1.salud}</p>
                            <p>Estamina: {enano1.estamina}</p>
                            <p>Fuerza: {enano1.fuerza}</p>
                            <p>Resistencia: {enano1.resistencia}</p>
                            <p>Agilidad: {enano1.agilidad}</p>
                            <p>Inteligencia: {enano1.inteligencia}</p>
                            <p>Velocidad: {enano1.velocidad}</p>
                            {/* Agregar aquí el resto de las características del enano 1 */}
                        </>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '10%', height: '100%' }}>
                    <button style={{ backgroundColor: '#ff5722', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', height: '100%' }} onClick={iniciarPelea}>Iniciar Pelea</button>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%', backgroundColor: '#333', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ color: '#ff5722' }}>Enano 2</h2>
                    <select value={enano2Id || ''} onChange={(e) => {
                        setEnano2Id(parseInt(e.target.value));
                        const selectedEnano = enanos.find(enano => enano.id === parseInt(e.target.value));
                        setEnano2(selectedEnano || null);
                    }} style={{ marginBottom: '10px' }}>
                        <option value="">Selecciona un enano</option>
                        {enanos.map((enano) => (
                            <option key={enano.id} value={enano.id}>{enano.nombre}</option>
                        ))}
                    </select>
                    {enano2 && (
                        <>
                            <img src={enano2.imagen} alt={enano2.nombre} style={{ height: '200px', width: 'auto', maxWidth: '100%', borderRadius: '5px', marginBottom: '10px' }} />
                            <p>Salud: {enano2.salud}</p>
                            <p>Estamina: {enano2.estamina}</p>
                            <p>Fuerza: {enano2.fuerza}</p>
                            <p>Resistencia: {enano2.resistencia}</p>
                            <p>Agilidad: {enano2.agilidad}</p>
                            <p>Inteligencia: {enano2.inteligencia}</p>
                            <p>Velocidad: {enano2.velocidad}</p>
                        {/* Agregar aquí el resto de las características del enano 2 */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    
};

export default PeleaDeEnanos;

                                        