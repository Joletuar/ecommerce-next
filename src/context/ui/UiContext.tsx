import { createContext } from 'react';

interface ContextProps {
    // Estado
    isMenuOpen: boolean;

    // Métodos
    toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
