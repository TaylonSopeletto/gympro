import React from "react";
import { Button, Modal, StyleSheet, useColorScheme } from "react-native"
import { ThemedView } from "./ThemedView"
import { ThemedText } from "./ThemedText"
import { useDays } from "@/hooks/useDays"
import { cardStyle } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateExerciseList } from '@/redux/userSlice';

interface Props {
    isOpened: boolean;
    onClose: () => void
}

const ExerciseSelectionModal = (props: Props) => {
    const dispatch = useDispatch();
    const { days } = useDays()
    const router = useRouter();
    const colorScheme = useColorScheme()
    const [currentDay, setCurrentDay] = React.useState<number>(0)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isOpened}
            onRequestClose={() => props.onClose()}
        >
            <ThemedView style={styles.modalOverlay}>
                {days?.length > 0 &&
                    <ThemedView style={{ ...styles.modalContent, ...cardStyle[colorScheme ?? 'light'] }}>
                        <ThemedText style={styles.modalText}>Select the exercise:</ThemedText>
                        <ThemedView style={styles.exercisePicker}>
                            <Button title="<" onPress={() => setCurrentDay(currentDay - 1)}></Button>
                            <ThemedText>{days[currentDay]?.name}</ThemedText>
                            <Button title=">" onPress={() => setCurrentDay(currentDay + 1)}></Button>
                        </ThemedView>
                        <Button title="Confirm" onPress={() => {
                            router.push('/exercise')
                            dispatch(updateExerciseList(days[currentDay].exercises.map(item => ({ ...item, isDone: false }))))
                            props.onClose()
                        }} />
                    </ThemedView>}
            </ThemedView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    exercisePicker: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 30
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
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

export default ExerciseSelectionModal;