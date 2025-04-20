import { TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { selectExercises } from "@/redux/userSlice";
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { cardStyle } from "@/constants/Colors";
import { useState } from "react";
import SerieUpdateModal from "@/components/SerieUpdateModal";

const SerieScreen = () => {
    const exercises = useSelector(selectExercises);
    const { exerciseId } = useLocalSearchParams();
    const [repetitions, setRepetitions] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [serieId, setSerieId] = useState<string>('')
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    const router = useRouter();
    const colorScheme = useColorScheme()
    const currentExerciseSeries = exercises.find(item => item.id === Number(exerciseId))?.series

    return (
        <ThemedView style={{ height: '100%' }}>
            <Header />
            <ThemedText style={styles.title}>Todo</ThemedText>
            <ThemedView style={styles.exercises}>
                {currentExerciseSeries?.map((serie, index) =>
                    <TouchableOpacity
                        key={index}
                        style={{
                            ...styles.exercise,
                            ...cardStyle[colorScheme ?? 'light']
                        }} >
                        <ThemedText>Serie {index + 1}</ThemedText>
                        <ThemedText>{serie.repetitions}x - {serie.weight}KG</ThemedText>
                        <ThemedText onPress={() => {
                            setIsModalOpened(true)
                            setWeight(String(serie.weight))
                            setRepetitions(String(serie.repetitions))
                            setSerieId(String(serie.id))
                        }}>
                            Edit
                        </ThemedText>
                    </TouchableOpacity>
                )}
            </ThemedView>
            <TouchableOpacity
                onPress={() => router.replace('/exercise')}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 100,
                    width: '100%',
                    marginTop: 40
                }}>
                <ThemedText>Back</ThemedText>
            </TouchableOpacity>
            <SerieUpdateModal
                serieId={Number(serieId)}
                exerciseId={Number(exerciseId)}
                isOpened={isModalOpened}
                onClose={() => setIsModalOpened(false)}
                weight={weight}
                setWeight={setWeight}
                repetitions={repetitions}
                setRepetitions={setRepetitions}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
        width: '80%',
        marginHorizontal: 'auto',
        marginTop: 'auto'
    },
    exercises: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '80%',
        marginHorizontal: 'auto',
    },
    exercise: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15
    }
})

export default SerieScreen