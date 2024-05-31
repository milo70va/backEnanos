import React, { useState } from 'react';
import { useRouter } from 'next/router';

const InsertarEnano: React.FC = () => {
    const router = useRouter();
    const [enano, setEnano] = useState({
        imagen: '',
        nombre: '',
        biografia: '',
        habilidadEspecial: '',
        historia: '',
        arteMarcial: '',
        victorias: 0,
        derrotas: 0,
        ratio: 0,
        salud: 0,
        estamina: 0,
        fuerza: 0,
        resistencia: 0,
        agilidad: 0,
        inteligencia: 0,
        velocidad: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEnano({
            ...enano,
            [name]: name === 'victorias' || name === 'derrotas' || name === 'salud' || name === 'estamina' || name === 'fuerza' || name === 'resistencia' || name === 'agilidad' || name === 'inteligencia' || name === 'velocidad' ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/enano', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...enano,
                    habilidadEspecial: enano.habilidadEspecial.split(',').map(h => h.trim()),
                    arteMarcial: enano.arteMarcial.split(',').map(a => a.trim()),
                    ratio: enano.victorias / enano.derrotas,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al insertar el enano');
            }

            router.push('/search'); // Redirect to home page or enano list page
        } catch (error) {
            console.error('Error al insertar el enano:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Insertar Enano</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <input type="text" name="imagen" placeholder="URL de la imagen" value={enano.imagen} onChange={handleChange} style={inputStyle} />
                <input type="text" name="nombre" placeholder="Nombre" value={enano.nombre} onChange={handleChange} style={inputStyle} />
                <textarea name="biografia" placeholder="Biografía" value={enano.biografia} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} />
                <input type="text" name="habilidadEspecial" placeholder="Habilidad Especial (separadas por comas)" value={enano.habilidadEspecial} onChange={handleChange} style={inputStyle} />
                <textarea name="historia" placeholder="Historia" value={enano.historia} onChange={handleChange} style={{ ...inputStyle, height: '100px' }} />
                <input type="text" name="arteMarcial" placeholder="Arte Marcial (separadas por comas)" value={enano.arteMarcial} onChange={handleChange} style={inputStyle} />
                <input type="number" name="victorias" placeholder="Victorias" value={enano.victorias} onChange={handleChange} style={inputStyle} />
                <input type="number" name="derrotas" placeholder="Derrotas" value={enano.derrotas} onChange={handleChange} style={inputStyle} />
                <input type="number" name="salud" placeholder="Salud" value={enano.salud} onChange={handleChange} style={inputStyle} />
                <input type="number" name="estamina" placeholder="Estamina" value={enano.estamina} onChange={handleChange} style={inputStyle} />
                <input type="number" name="fuerza" placeholder="Fuerza" value={enano.fuerza} onChange={handleChange} style={inputStyle} />
                <input type="number" name="resistencia" placeholder="Resistencia" value={enano.resistencia} onChange={handleChange} style={inputStyle} />
                <input type="number" name="agilidad" placeholder="Agilidad" value={enano.agilidad} onChange={handleChange} style={inputStyle} />
                <input type="number" name="inteligencia" placeholder="Inteligencia" value={enano.inteligencia} onChange={handleChange} style={inputStyle} />
                <input type="number" name="velocidad" placeholder="Velocidad" value={enano.velocidad} onChange={handleChange} style={inputStyle} />
                <button type="submit" style={buttonStyle}>Insertar Enano</button>
            </form>
        </div>
    );
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

export default InsertarEnano;