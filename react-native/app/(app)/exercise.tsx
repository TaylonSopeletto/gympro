import { TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectExercises, toggleExercise } from "@/redux/userSlice";
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useRouter } from "expo-router";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedTouchable } from "@/components/ThemedTouchable";
import { ThemedCta } from "@/components/ThemedCta";

const ExerciseScreen = () => {
    const exercises = useSelector(selectExercises);
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <ThemedView style={{ height: '100%', paddingHorizontal: 40 }}>
            <Header title='Exercises' subtitle="Saturday" />
            <ThemedText style={styles.title}>Todo</ThemedText>
            <ThemedView style={styles.exercises}>
                {exercises.map((exercise, index) =>
                    <ThemedTouchable
                        key={index}
                        onPress={() => {
                            router.push({
                                pathname: '/(app)/serie',
                                params: {
                                    exerciseId: exercise.id
                                }
                            })
                        }}

                        style={styles.exercise}>
                        <ThemedText>{exercise.name}</ThemedText>
                        <TouchableOpacity onPress={() => dispatch(toggleExercise({ exerciseId: exercise.id }))}>
                            <ThemedIcon
                                name={exercise.isDone ? 'check-circle' : 'check-circle-outline'}
                                size={20}
                                color={'green'}
                            />
                        </TouchableOpacity>
                    </ThemedTouchable>
                )}
            </ThemedView>
            <ThemedCta style={{ marginTop: 20, marginBottom: 50 }} onPress={() => router.replace('/')}>
                <ThemedText lightColor="#fff" darkColor="#000">Stop</ThemedText>
            </ThemedCta>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
        marginTop: 'auto',
    },
    exercises: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
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

export default ExerciseScreen