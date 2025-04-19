import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import Calendar from "@/components/Calendar"
import { cardStyle } from '@/constants/Colors'
import { useSession } from '@/ctx'

const HomeScreen = () => {
    const colorScheme = useColorScheme()

    return (
        <ThemedView style={{ height: '100%' }}>
            <Header />
            <Calendar />
            <ThemedView style={{ ...styles.classifier, ...cardStyle[colorScheme ?? 'light'] }}>
                <ThemedText style={styles.classifierTitle}>Equipment Classifier</ThemedText>
                <ThemedText style={styles.classifierText}>Scan an equipment and get to know it is name and what exercises can be done with it</ThemedText>

            </ThemedView>
            <TouchableOpacity style={styles.cta}>
                <ThemedText style={styles.ctaText}>Workout</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    classifier: {
        maxWidth: '80%',
        margin: 'auto',
        marginTop: 48,
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    classifierTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16
    },
    classifierText: {
        textAlign: 'center',
        fontSize: 13
    },
    cta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '50%',
        margin: 'auto',
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#888',
        paddingHorizontal: 32,
        paddingVertical: 8,
        borderRadius: 10
    },
    ctaText: {
        fontSize: 14
    }
})

export default HomeScreen