const TOKEN_KEY = "Tralalelo Tralala";

const encryptToken = (token: string): string => {
    return btoa(token);
};

const decryptToken = (encryptedToken: string): string => {
    return atob(encryptedToken);
};

export const saveToken = (token: string): void => {
    const encrypted = encryptToken(token);
    localStorage.setItem(TOKEN_KEY, encrypted);
};

export const getToken = (): string | null => {
    const encrypted = localStorage.getItem(TOKEN_KEY);
    return encrypted ? decryptToken(encrypted) : null;
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};
