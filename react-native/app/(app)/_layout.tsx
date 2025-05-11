import { Text } from 'react-native';
import { Stack, Redirect } from 'expo-router';
import { useSession } from '../../ctx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserInfo } from '@/redux/userSlice';
import { parseJwt } from '@/utils';

export default function AppLayout() {
    const user = useSelector(selectUser);
    const { session, isLoading } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateUserInfo({ username: '', isStudent: false }))
        if (!user.userInfo.username && session) {
            const { username, is_student } = parseJwt(session)
            dispatch(updateUserInfo({ username, isStudent: is_student }))
        }
    }, [session])

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!session) {
        return <Redirect href="/login" />;
    }

    return <Stack screenOptions={{
        headerShown: false
    }} />;
}