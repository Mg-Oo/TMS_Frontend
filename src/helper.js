import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
    }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const shortenText = (text, maxLength = 10) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};
