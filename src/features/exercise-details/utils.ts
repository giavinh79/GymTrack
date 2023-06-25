import type { IRoutineDayExercise, IRoutineExercise } from 'src/types';

export const transformRoutineExerciseToRoutineDayExercise = (
  routineExercise: IRoutineExercise
): IRoutineDayExercise => {
  const { exercise, exerciseOrder, id, sets } = routineExercise;

  return {
    ...exercise,
    id,
    exerciseId: exercise.id,
    exerciseOrder,
    sets,
  };
};
