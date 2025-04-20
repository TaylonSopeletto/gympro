import { TouchableOpacity, StyleSheet, useColorScheme, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectExercises } from "@/redux/userSlice";
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { cardStyle } from "@/constants/Colors";
import { useRouter } from "expo-router";

const ExerciseScreen = () => {
    const colorScheme = useColorScheme()
    const exercises = useSelector(selectExercises);
    const router = useRouter();

    return (
        <ThemedView style={{ height: '100%' }}>
            <Header />
            <ThemedText style={styles.title}>Todo</ThemedText>
            <ThemedView style={styles.exercises}>
                {exercises.map((exercise, index) =>
                    <TouchableOpacity
                        onPress={() => {
                            router.push({
                                pathname: '/(app)/serie',
                                params: {
                                    exerciseId: exercise.id
                                }
                            })
                        }}
                        key={index}
                        style={{
                            ...styles.exercise,
                            ...cardStyle[colorScheme ?? 'light']
                        }} >
                        <ThemedText>{exercise.name}</ThemedText>
                    </TouchableOpacity>
                )}
            </ThemedView>
            <TouchableOpacity
                onPress={() => router.replace('/')}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 100,
                    width: '100%',
                    marginTop: 40
                }}>
                <ThemedText>Stop</ThemedText>
            </TouchableOpacity>
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
        textAlign: 'center',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15
    }
})

export default ExerciseScreen