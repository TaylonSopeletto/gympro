import { View, TextInput, StyleSheet, Image, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { textInputStyle } from '@/constants/Colors';
import { useSession } from '@/ctx';
import { loginService } from '@/services/fetchUser';
import { ThemedCta } from '@/components/ThemedCta';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
    const router = useRouter();
    const { signIn } = useSession();
    const colorScheme = useColorScheme()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('')
    const dispatch = useDispatch();

    const handleLogin = () => {
        loginService({ email: username, password }).then(res => {
            signIn(res.data.access);
            router.replace('/');
        }).catch(e => {
            setError(JSON.stringify(e.message))
        })
    }

    return (
        <>
            <ThemedView style={styles.container}>
                <View style={styles.logo}>
                    <Image source={colorScheme === 'light' ?
                        require('@/assets/images/gympro-logo-light.png')
                        : require('@/assets/images/gympro-logo-dark.png')}
                        style={styles.logoImage}
                    />
                    <ThemedText style={styles.logoText}>Gympro</ThemedText>
                </View>
                <ThemedText style={styles.text}>E-mail:</ThemedText>
                <TextInput
                    style={{ ...styles.input, ...textInputStyle[colorScheme ?? 'light'] }}
                    placeholder="E-mail"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                />
                <ThemedText style={styles.text}>Password:</ThemedText>
                <TextInput
                    style={{ ...styles.input, ...textInputStyle[colorScheme ?? 'light'] }}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#666"
                />
                <ThemedText style={styles.forgotPassword}>Forgot password?</ThemedText>
                <ThemedCta
                    style={{ marginBottom: 60 }}
                    onPress={async () => {
                        handleLogin()
                    }}>
                    <ThemedText
                        lightColor='#fff'
                        darkColor='#000'
                    >
                        Login
                    </ThemedText>
                </ThemedCta>
                <ThemedText>{error}</ThemedText>
            </ThemedView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal: 40
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
        marginBottom: 'auto',
        marginTop: 140
    },
    logoImage: {
        width: 40,
        height: 40
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        width: '100%',
        marginBottom: 10,
        fontSize: 12
    },
    input: {
        width: '100%',
        height: 50,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    forgotPassword: {
        marginVertical: 20
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 14
    }
});

export default LoginScreen;