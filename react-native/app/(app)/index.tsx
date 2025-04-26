import { useState } from 'react'
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import ExerciseSelectionModal from '@/components/ExerciseSelectionModal'
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import Calendar from "@/components/Calendar"
import { cardStyle } from '@/constants/Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const HomeScreen = () => {
    const colorScheme = useColorScheme()
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ThemedView style={{ height: '100%' }}>
            <ExerciseSelectionModal isOpened={modalVisible} onClose={() => setModalVisible(false)} />
            <Header />
            <Calendar />
            <TouchableOpacity style={{ ...styles.classifier, ...cardStyle[colorScheme ?? 'light'] }}>
                <ThemedView style={styles.classifierTitle}>
                    <MaterialIcons
                        name={'qr-code-scanner'}
                        size={20} color={colorScheme === 'light' ? 'black' : 'white'}
                    />
                    <ThemedText style={{ marginRight: 'auto' }}>Equipment Classifier</ThemedText>
                    <MaterialIcons
                        name={'arrow-forward'}
                        size={20} color={colorScheme === 'light' ? 'black' : 'white'}
                    />
                </ThemedView>
                <ThemedText style={styles.classifierText}>
                    Scan equipment to see its name and related exercises.
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.cta}>
                <ThemedText style={styles.ctaText} >
                    Workout
                </ThemedText>
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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
        gap: 8
    },
    classifierText: {
        textAlign: 'left',
        fontSize: 13,
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
    },
})

export default HomeScreen