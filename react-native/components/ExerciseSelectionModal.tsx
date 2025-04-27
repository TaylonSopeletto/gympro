import React from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native"
import { ThemedView } from "./ThemedView"
import { ThemedText } from "./ThemedText"
import { useDays } from "@/hooks/useDays"
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateDayName, updateExerciseList } from '@/redux/userSlice';
import { ThemedCta } from "./ThemedCta";
import { ThemedIcon } from "./ThemedIcon";

interface Props {
    isOpened: boolean;
    onClose: () => void
}

const ExerciseSelectionModal = (props: Props) => {
    const dispatch = useDispatch();
    const { days } = useDays()
    const router = useRouter();
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
                    <ThemedView
                        lightColor="#fff"
                        darkColor="#333"
                        style={styles.modalContent}
                    >
                        <ThemedText style={styles.modalText}>
                            Select the exercise:
                        </ThemedText>
                        <ThemedView style={styles.exercisePicker}>
                            <TouchableOpacity
                                onPress={() => currentDay > 0 && setCurrentDay(currentDay - 1)}
                            >
                                <ThemedIcon name="arrow-left" size={20} />
                            </TouchableOpacity>
                            <ThemedText>{days[currentDay]?.name}</ThemedText>
                            <TouchableOpacity
                                onPress={() => currentDay < days.length - 1 && setCurrentDay(currentDay + 1)}
                            >
                                <ThemedIcon name="arrow-right" size={20} />
                            </TouchableOpacity>
                        </ThemedView>
                        <ThemedCta
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                router.push('/exercise')
                                dispatch(updateDayName(days[currentDay].name))
                                dispatch(updateExerciseList(days[currentDay].exercises.map(item => ({
                                    ...item,
                                    isDone: false
                                }))))
                                props.onClose()
                            }} >
                            <ThemedText
                                lightColor='#fff'
                                darkColor='#000'
                            >
                                Confirm
                            </ThemedText>
                        </ThemedCta>
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
        marginVertical: 30,
        padding: 20,
        borderWidth: 1,
        borderColor: '#666',
        backgroundColor: 'transparent',
        borderRadius: 20
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
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
    },
})

export default ExerciseSelectionModal;