import { EDay } from './common';

export interface IExercise {
  name?: string;
  exercises: any[];
}

// Represents the exercises for a certain day
export type IWorkout = {
  [key in EDay]: IExercise;
};
