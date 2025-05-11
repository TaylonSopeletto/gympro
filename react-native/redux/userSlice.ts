import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISerie {
    id: number;
    weight: number;
    repetitions: number;
}

export interface IExercise {
    id: number;
    name: string;
    isDone: boolean;
    series: ISerie[]
}

export interface IUserInfo {
    username: string,
    isStudent: false,
}

interface UserState {
    workoutStartTimeDate: string;
    dayName: string;
    currentSerie: ISerie | null;
    exercises: IExercise[];
    userInfo: IUserInfo
}

const initialState: UserState = {
    workoutStartTimeDate: '',
    dayName: '',
    currentSerie: null,
    exercises: [],
    userInfo: {
        username: '',
        isStudent: false
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            state.userInfo = action.payload
        },
        updateDayName: (state, action: PayloadAction<string>) => {
            state.dayName = action.payload
        },
        setCurrentSerie: (state, action: PayloadAction<ISerie>) => {
            state.currentSerie = action.payload
        },
        updateExerciseList: (state, action: PayloadAction<IExercise[]>) => {
            state.exercises = action.payload
        },
        toggleExercise: (state, action: PayloadAction<{ exerciseId: number }>) => {
            const updatedExercises = state.exercises.map(exercise => {
                if (exercise.id === action.payload.exerciseId) {
                    return {
                        ...exercise,
                        isDone: !exercise.isDone
                    }
                }

                return exercise
            })

            state.exercises = updatedExercises

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

export const { updateExerciseList, updateExerciseSerie, toggleExercise, setCurrentSerie, updateDayName, updateUserInfo } = userSlice.actions;
export const selectExercises = (state: { user: { exercises: IExercise[] } }) => state.user.exercises;
export const selectCurrentSerie = (state: { user: { currentSerie: ISerie } }) => state.user.currentSerie;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;