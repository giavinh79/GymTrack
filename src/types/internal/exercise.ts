import { EDay } from './common';

interface IImage {
  url?: string;
  fileId?: string;
}

interface IExerciseMuscles {
  id: number;
  name: string;
}

interface IExerciseValueTypeUnit {
  id: number;
  name: string;
}

interface IExerciseValueType {
  id: number;
  name: string;

  exerciseValueTypeUnits: IExerciseValueTypeUnit[];
}

export interface IExercise {
  id: number;
  name: string;
  description?: string;
  defaultExerciseValueType?: number;
  creatorId?: number;
  imageId?: number;

  image: IImage;
  exerciseValueType: IExerciseValueType;
  musclesUsed: IExerciseMuscles[];
}

// Represents the exercises for a certain day
export type IWorkout = {
  [key in EDay]: IExercise[];
};
