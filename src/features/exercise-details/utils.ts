import type { IRoutineDayExercise, IRoutineExercise } from 'src/types';

export const transformRoutineExerciseToRoutineDayExercise = (
  routineExercise: IRoutineExercise
): IRoutineDayExercise => {
  const { exercise, exerciseOrder, sets } = routineExercise;

  return {
    ...exercise,
    exerciseOrder,
    sets,
  };
};
