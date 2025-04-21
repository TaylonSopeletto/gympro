import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, TextInput, useColorScheme } from "react-native"
import { cardStyle } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSerie, updateExerciseSerie } from '@/redux/userSlice';
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface Props {
    exerciseId: number;
    isOpened: boolean;
    onClose: () => void;
}

const SerieUpdateModal = (props: Props) => {
    const serie = useSelector(selectCurrentSerie);

    const colorScheme = useColorScheme()
    const dispatch = useDispatch();

    const [repetitions, setRepetitions] = useState<string>(String(serie.repetitions))
    const [weight, setWeight] = useState<string>(String(serie.weight))

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isOpened}
            onRequestClose={() => props.onClose()}
        >
            <ThemedView style={styles.modalOverlay}>
                <ThemedView style={{ ...styles.modalContent, ...cardStyle[colorScheme ?? 'light'] }}>
                    <ThemedText style={styles.modalText}>Update serie:</ThemedText>

                    <TextInput
                        placeholder="repetitions"
                        value={repetitions}
                        onChangeText={setRepetitions}
                        placeholderTextColor="#666"
                        autoCapitalize="none"
                    />

                    <TextInput
                        placeholder="weight"
                        value={weight}
                        onChangeText={setWeight}
                        placeholderTextColor="#666"
                        autoCapitalize="none"
                    />

                    <Button title="Confirm" onPress={() => {
                        dispatch(updateExerciseSerie({
                            exerciseId: props.exerciseId,
                            serieId: serie.id,
                            repetitions: Number(repetitions),
                            weight: Number(weight)
                        }))
                        props.onClose()
                    }} />
                </ThemedView>
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

export default SerieUpdateModal;