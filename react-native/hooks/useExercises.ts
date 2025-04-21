import { useSelector } from "react-redux";
import { selectExercises } from "@/redux/userSlice";

interface Props {
    exerciseId: string;
}

export const useExercises = (props: Props) => {

    const exercises = useSelector(selectExercises);
    const currentExerciseSeries = exercises.find(item => item.id === Number(props.exerciseId))?.series ?? []

    return { exercises, series: currentExerciseSeries }
}