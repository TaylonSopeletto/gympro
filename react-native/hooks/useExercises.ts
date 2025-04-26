import { useSelector } from "react-redux";
import { IExercise, selectExercises } from "@/redux/userSlice";

interface Props {
    exerciseId: string;
}

export const useExercises = (props: Props) => {

    const exercises = useSelector(selectExercises);
    const currentExerciseSeries = exercises.find(item => item.id === Number(props.exerciseId))?.series ?? []

    const getExerciseById = (exerciseId: string): IExercise | null => {
        return exercises.find(item => item.id === Number(exerciseId)) ?? null
    }

    return { exercises, series: currentExerciseSeries, getExerciseById }
}