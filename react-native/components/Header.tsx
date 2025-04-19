import { ThemedView } from "./ThemedView"
import { Image, StyleSheet } from 'react-native'

const Header = () => {
    return (
        <ThemedView>
            <Image source={{ uri: 'https://avatars.githubusercontent.com/u/42319708?v=4' }} style={styles.profilePicture} />
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