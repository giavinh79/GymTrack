import { EDay } from './common';

export interface IExercise {
  name?: string;
  exercises: unknown[];
}

// Represents the exercises for a certain day
export type IWorkout = {
  [key in EDay]: IExercise;
};
