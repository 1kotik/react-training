import { createContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type { ColorModeContextType } from '../types';

export const ColorModeContext = createContext<ColorModeContextType>({
    mode: 'light',
    toggleColorMode: () => {},
});

export function ColorModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('colorMode') as 'light' | 'dark') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('colorMode', mode);
        document.body.setAttribute('data-theme', mode);
    }, [mode]);

    const colorMode = useMemo(() => ({
        mode,
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            {children}
        </ColorModeContext.Provider>
    );
}