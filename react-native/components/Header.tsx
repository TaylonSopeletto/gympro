import { ThemedView } from "./ThemedView"
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSession } from "@/ctx";
import { ThemedText } from "./ThemedText";

interface Props {
    title: string;
    subtitle: string;
}

const Header = (props: Props) => {
    const { signOut } = useSession();

    return (
        <ThemedView style={styles.container}>
            <ThemedView>
                <ThemedText type="subtitle">{props.title}</ThemedText>
                <ThemedText>{props.subtitle}</ThemedText>
            </ThemedView>
            <TouchableOpacity onPress={() => signOut()}>
                <Image
                    source={{ uri: 'https://avatars.githubusercontent.com/u/42319708?v=4' }}
                    style={styles.profilePicture}
                />
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingBottom: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    profilePicture: {
        height: 40,
        width: 40,
        borderRadius: 50
    }
})

export default Header