import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Enano {
    id: number;
    imagen: string;
    nombre: string;
    biografia: string;
    habilidadEspecial: string[];
    historia: string;
    arteMarcial: string[];
    victorias: number;
    derrotas: number;
    ratio: number;
    salud: number;
    estamina: number;
    fuerza: number;
    resistencia: number;
    agilidad: number;
    inteligencia: number;
    velocidad: number;
}

const BuscarEnanos: React.FC = () => {
    const router = useRouter();
    const [enanos, setEnanos] = useState<Enano[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEnano, setSelectedEnano] = useState<Enano | null>(null);

    useEffect(() => {
        obtenerTodosLosEnanos();
    }, []);

    const obtenerTodosLosEnanos = async () => {
        try {
            const response = await fetch('http://localhost:3001/enano', {
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

    const eliminarEnano = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3001/enano/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el enano');
            }

            setEnanos(enanos.filter(enano => enano.id !== id));
            setSelectedEnano(null);
        } catch (error) {
            console.error('Error al eliminar el enano:', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleEnanoClick = (enano: Enano) => {
        setSelectedEnano(enano);
    };

    const closeModal = () => {
        setSelectedEnano(null);
    };

    const filteredEnanos = enanos
        .filter((enano) => enano.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 20);

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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', justifyContent: 'center' }}>
                {filteredEnanos.map((enano) => (
                    <div key={enano.id} style={{ textAlign: 'center', cursor: 'pointer', position: 'relative' }} onClick={() => handleEnanoClick(enano)}>
                        <img src={enano.imagen} alt={enano.nombre} style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />
                        <p style={{ marginTop: '10px', color: '#ff5722' }}>{enano.nombre}</p>
                    </div>
                ))}
            </div>
            {selectedEnano && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <span onClick={closeModal} style={closeButtonStyle}>&times;</span>
                        <img src={selectedEnano.imagen} alt={selectedEnano.nombre} style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />
                        <h2>{selectedEnano.nombre}</h2>
                        <p><strong>Biografía:</strong> {selectedEnano.biografia}</p>
                        <p><strong>Habilidad Especial:</strong> {selectedEnano.habilidadEspecial.join(', ')}</p>
                        <p><strong>Historia:</strong> {selectedEnano.historia}</p>
                        <p><strong>Arte Marcial:</strong> {selectedEnano.arteMarcial.join(', ')}</p>
                        <p><strong>Victorias:</strong> {selectedEnano.victorias}</p>
                        <p><strong>Derrotas:</strong> {selectedEnano.derrotas}</p>
                        <p><strong>Ratio:</strong> {selectedEnano.ratio}</p>
                        <p><strong>Salud:</strong> {selectedEnano.salud}</p>
                        <p><strong>Estamina:</strong> {selectedEnano.estamina}</p>
                        <p><strong>Fuerza:</strong> {selectedEnano.fuerza}</p>
                        <p><strong>Resistencia:</strong> {selectedEnano.resistencia}</p>
                        <p><strong>Agilidad:</strong> {selectedEnano.agilidad}</p>
                        <p><strong>Inteligencia:</strong> {selectedEnano.inteligencia}</p>
                        <p><strong>Velocidad:</strong> {selectedEnano.velocidad}</p>
                        <button onClick={() => eliminarEnano(selectedEnano.id)} style={{ ...buttonStyle, backgroundColor: '#ff0000' }}>Eliminar Enano</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalStyle = {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '600px',
    position: 'relative',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontSize: '30px',
    cursor: 'pointer',
};

const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    margin: '20px 0',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff5722',
    color: '#fff',
    cursor: 'pointer',
};

export default BuscarEnanos;
