import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface User {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/usuario', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const users: User[] = await response.json();
            const user = users.find((user) => user.username === username && user.password === password);

            if (user) {
                router.push('/search'); // Redirect to home page on successful login
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            setErrorMessage('Error logging in');
        }
    };

    return (
        <div style={{ backgroundColor: '#1c1c1c', color: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    style={{ margin: '10px 0', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{ margin: '10px 0', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ margin: '20px 0', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#ff5722', color: '#fff', cursor: 'pointer' }}>
                    Login
                </button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
