const API_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }

        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};

export const registerUser = async (userData) => {
    try {
        // Validar datos antes de enviar
        if (!userData.username || !userData.password || !userData.email) {
            throw new Error('Todos los campos son requeridos');
        }

        if (userData.password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
        }

        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw new Error(error.message || 'Error al registrar usuario');
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};