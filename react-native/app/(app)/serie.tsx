import { useState } from "react";
import { TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { setCurrentSerie } from "@/redux/userSlice";
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { cardStyle } from "@/constants/Colors";
import SerieUpdateModal from "@/components/SerieUpdateModal";
import { useExercises } from "@/hooks/useExercises";

const SerieScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { exerciseId } = useLocalSearchParams();
    const colorScheme = useColorScheme()
    const { series, getExerciseById } = useExercises({ exerciseId: String(exerciseId) })
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

    return (
        <ThemedView style={{ height: '100%' }}>
            <Header title={getExerciseById(String(exerciseId))?.name ?? ''} subtitle="Saturday" />
            <ThemedText style={styles.title}>Todo</ThemedText>
            <ThemedView style={styles.series}>
                {series?.map((serie, index) =>
                    <TouchableOpacity
                        key={index}
                        style={{
                            ...styles.serie,
                            ...cardStyle[colorScheme ?? 'light']
                        }} >
                        <ThemedText>Serie {index + 1}</ThemedText>
                        <ThemedText>{serie.repetitions}x - {serie.weight}KG</ThemedText>
                        <ThemedText onPress={() => {
                            setIsModalOpened(true)
                            dispatch(setCurrentSerie(serie))
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
                exerciseId={Number(exerciseId)}
                isOpened={isModalOpened}
                onClose={() => setIsModalOpened(false)}
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
    series: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '80%',
        marginHorizontal: 'auto',
    },
    serie: {
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