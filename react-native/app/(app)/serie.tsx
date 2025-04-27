import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { setCurrentSerie } from "@/redux/userSlice";
import Header from "@/components/Header"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import SerieUpdateModal from "@/components/SerieUpdateModal";
import { useExercises } from "@/hooks/useExercises";
import { ThemedTouchable } from "@/components/ThemedTouchable";
import { ThemedCta } from "@/components/ThemedCta";
import { ThemedIcon } from "@/components/ThemedIcon";

const SerieScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { exerciseId } = useLocalSearchParams();
    const { series, getExerciseById } = useExercises({ exerciseId: String(exerciseId) })
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

    return (
        <ThemedView style={{ height: '100%', paddingHorizontal: 40 }}>
            <Header
                title={getExerciseById(String(exerciseId))?.name ?? ''}
                subtitle="Saturday"
            />
            <ThemedText style={styles.title}>Todo</ThemedText>
            <ThemedView style={styles.series}>
                {series?.map((serie, index) =>
                    <ThemedTouchable
                        key={index}
                        style={styles.serie} >
                        <ThemedText>Serie {index + 1}</ThemedText>
                        <ThemedText>
                            {serie.repetitions}x - {serie.weight}KG
                        </ThemedText>
                        <ThemedText onPress={() => {
                            setIsModalOpened(true)
                            dispatch(setCurrentSerie(serie))
                        }}>
                            <ThemedIcon
                                name={"edit"}
                                size={20}
                                color={'#008000'}
                            />
                        </ThemedText>
                    </ThemedTouchable>
                )}
            </ThemedView>
            <ThemedCta style={{
                marginTop: 20,
                marginBottom: 50
            }}
                onPress={() => router.replace('/exercise')}>
                <ThemedText
                    lightColor="#fff"
                    darkColor="#333">
                    Back
                </ThemedText>
            </ThemedCta>
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
        marginTop: 'auto'
    },
    series: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
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