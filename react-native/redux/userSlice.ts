import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IExercise {
    id: number;
    name: string;
    isDone: boolean;
    series: {
        id: number;
        weight: number;
        repetitions: number;
    }[]
}

interface UserState {
    exercises: IExercise[];
}

const initialState: UserState = {
    exercises: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateExerciseList: (state, action: PayloadAction<IExercise[]>) => {
            state.exercises = action.payload
        },
        updateExerciseSerie: (
            state,
            action: PayloadAction<{
                exerciseId: number;
                serieId: number;
                repetitions: number;
                weight: number;
            }>
        ) => {
            const { exerciseId, serieId, repetitions, weight } = action.payload;

            const updatedExercises = state.exercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    return {
                        ...exercise,
                        series: exercise.series.map(serie => {
                            if (serie.id === serieId) {
                                return {
                                    ...serie,
                                    repetitions,
                                    weight,
                                };
                            }
                            return serie;
                        }),
                    };
                }
                return exercise;
            });

            state.exercises = updatedExercises;
        }
    },
});

export const { updateExerciseList, updateExerciseSerie } = userSlice.actions;
export const selectExercises = (state: { user: { exercises: IExercise[] } }) => state.user.exercises;
export default userSlice.reducer;