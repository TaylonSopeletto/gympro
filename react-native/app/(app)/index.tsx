import { useState } from 'react'
import { StyleSheet } from 'react-native'
import ExerciseSelectionModal from '@/components/ExerciseSelectionModal'
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import Calendar from "@/components/Calendar"
import { ThemedTouchable } from '@/components/ThemedTouchable'
import { ThemedCta } from '@/components/ThemedCta'
import { ThemedIcon } from '@/components/ThemedIcon'

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ThemedView style={{ height: '100%', paddingHorizontal: 40 }}>
            <ExerciseSelectionModal isOpened={modalVisible} onClose={() => setModalVisible(false)} />
            <Header title='Taylon Sopeletto' subtitle='Saturday' />
            <Calendar />
            <ThemedTouchable
                style={styles.classifier}
            >
                <ThemedView style={styles.classifierTitle}>
                    <ThemedIcon name="qr-code-scanner" size={20} />
                    <ThemedText style={{ marginRight: 'auto' }}>Equipment Classifier</ThemedText>
                    <ThemedIcon name="arrow-forward" size={20} />
                </ThemedView>
                <ThemedText style={styles.classifierText}>
                    Scan equipment to see its name and related exercises.
                </ThemedText>
            </ThemedTouchable>

            <ThemedCta style={{ marginTop: 20, marginBottom: 50 }} onPress={() => setModalVisible(true)}>
                <ThemedText lightColor='#fff' darkColor='#000'>
                    Workout
                </ThemedText>
            </ThemedCta>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    classifier: {
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
    }
})

export default HomeScreen