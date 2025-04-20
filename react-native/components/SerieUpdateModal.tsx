import React, { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, useColorScheme } from "react-native"
import { useDays } from "@/hooks/useDays"
import { cardStyle } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateExerciseList } from '@/redux/userSlice';
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface Props {
    isOpened: boolean;
    onClose: () => void;
}

const SerieUpdateModal = (props: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const colorScheme = useColorScheme()
    const [repetitions, setRepetitions] = useState<string>()
    const [weight, setWeight] = useState<string>()

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