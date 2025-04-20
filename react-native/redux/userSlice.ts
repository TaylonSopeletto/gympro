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
        }
    },
});

export const { updateExerciseList } = userSlice.actions;
export const selectExercises = (state: { user: { exercises: IExercise[] } }) => state.user.exercises;
export default userSlice.reducer;