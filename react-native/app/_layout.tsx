import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { Slot } from 'expo-router';
import { SessionProvider } from '../ctx';

export default function Root() {
    return (
        <Provider store={store}>
            <SessionProvider>
                <Slot />
            </SessionProvider>
        </Provider>
    );
}