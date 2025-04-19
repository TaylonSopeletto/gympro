import { View, TextInput, StyleSheet, Image, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { textInputStyle } from '@/constants/Colors';
import { useSession } from '@/ctx';
import { loginService } from '@/services/fetchUser';


const LoginScreen = () => {
    const router = useRouter();
    const { signIn } = useSession();
    const colorScheme = useColorScheme()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('')

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
                <TouchableOpacity style={styles.button} onPress={async () => {
                    handleLogin()
                }}>
                    <ThemedText style={styles.buttonText}>Login</ThemedText>
                </TouchableOpacity>
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
        width: '80%',
        marginBottom: 10,
        fontSize: 12
    },
    input: {
        height: 50,
        width: '80%',
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '50%',
        marginTop: 30,
        marginBottom: 120
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