import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, TextInput, useColorScheme } from "react-native"
import { cardStyle, textInputStyle } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSerie, updateExerciseSerie } from '@/redux/userSlice';
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedCta } from "./ThemedCta";

interface Props {
    exerciseId: number;
    isOpened: boolean;
    onClose: () => void;
}

const SerieUpdateModal = (props: Props) => {
    const serie = useSelector(selectCurrentSerie);
    const colorScheme = useColorScheme()
    const dispatch = useDispatch();
    const [repetitions, setRepetitions] = useState<string>()
    const [weight, setWeight] = useState<string>()

    useEffect(() => {
        setRepetitions(String(serie?.repetitions))
        setWeight(String(serie?.weight))
    }, [props.isOpened])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isOpened}
            onRequestClose={() => props.onClose()}
        >
            <ThemedView style={styles.modalOverlay}>
                <ThemedView
                    style={styles.modalContent}>
                    <ThemedText style={styles.modalText}>
                        Update serie:
                    </ThemedText>
                    <ThemedText style={styles.text}>Repetitions:</ThemedText>
                    <TextInput
                        style={{ ...styles.input, ...textInputStyle[colorScheme ?? 'light'] }}
                        placeholder="repetitions"
                        value={repetitions}
                        onChangeText={setRepetitions}
                        placeholderTextColor="#666"
                        autoCapitalize="none"
                    />
                    <ThemedText style={styles.text}>Weight:</ThemedText>
                    <TextInput
                        style={{ ...styles.input, ...textInputStyle[colorScheme ?? 'light'] }}
                        placeholder="weight"
                        value={weight}
                        onChangeText={setWeight}
                        placeholderTextColor="#666"
                        autoCapitalize="none"
                    />

                    <ThemedCta
                        style={{ marginTop: 40 }}
                        onPress={() => {
                            dispatch(updateExerciseSerie({
                                exerciseId: props.exerciseId,
                                serieId: serie.id,
                                repetitions: Number(repetitions),
                                weight: Number(weight)
                            }))
                            props.onClose()
                        }}>
                        <ThemedText
                            lightColor='#fff'
                            darkColor='#000'
                        >
                            Confirm
                        </ThemedText>
                    </ThemedCta>
                </ThemedView>
            </ThemedView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#666',
    },
    text: {
        width: '100%',
        marginBottom: 10,
        fontSize: 12
    },
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
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
    },
})

export default SerieUpdateModal;