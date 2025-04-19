import { ThemedView } from "./ThemedView"
import { Button, Image, StyleSheet } from 'react-native'
import * as Keychain from 'react-native-keychain';
import { useRouter } from 'expo-router';
import { useSession } from "@/ctx";

const Header = () => {

    const router = useRouter();
    const { signOut } = useSession();


    return (
        <ThemedView>
            <Image source={{ uri: 'https://avatars.githubusercontent.com/u/42319708?v=4' }} style={styles.profilePicture} />
            <Button title="logout " onPress={() => signOut()}></Button>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    profilePicture: {
        marginTop: 80,
        marginLeft: 'auto',
        marginRight: 30,
        height: 40,
        width: 40,
        borderRadius: 50
    }
})

export default Header