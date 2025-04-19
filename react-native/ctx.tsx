import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    setSession('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1MTY4Njg5LCJpYXQiOjE3NDUwODIyODksImp0aSI6ImIyZjAyMjIxNzZjODQxMzE4Njg0MmU5MDgxYWE5NWE5IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJ0YXlsb24iLCJpc19zdHVkZW50Ijp0cnVlLCJpc190ZWFjaGVyIjpmYWxzZX0.PadPN22-Rc00c29YRHbCDS3jLIgSe');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }
            }>
            {children}
        </AuthContext.Provider>
    );
}