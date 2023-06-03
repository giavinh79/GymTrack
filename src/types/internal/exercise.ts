import { EDay } from './common';

interface IImage {
  url: string;
  fileId?: string;
}

interface IExerciseMuscles {
  id: number;
  name: string;
}

export interface IExerciseValueTypeUnit {
  id: number;
  name: string;
}

export interface IExerciseValueType {
  id: number;
  name: string;

  exerciseValueTypeUnits: IExerciseValueTypeUnit[];
}

export interface ISet {
  id: number;
  numReps: number;
  value: string;
  exerciseValueTypeId: number;
  exerciseValueTypeUnitId: number;
}

export interface IRoutineDayExercise {
  id: number;
  name: string;
  description?: string;
  exerciseId: number;
  exerciseOrder: number;
  creatorId?: number;
  imageId?: number;

  image: IImage;
  musclesUsed: IExerciseMuscles[];
  sets: ISet[];
}

export interface IExercise {
  id: number;
  name: string;
  description: string;
  exerciseValueType: IExerciseValueType;
  creatorId: number;
  createdAt: string;
  musclesUsed: IExerciseMuscles[];
  image: IImage;
}

export interface IRoutineExercise {
  exercise: IExercise;
  day: string;
  exerciseOrder: number;
  id: number;
  sets: ISet[];
}

// Represents the exercises for a certain day
export type IWorkout = {
  [key in EDay]: IRoutineDayExercise[];
};
