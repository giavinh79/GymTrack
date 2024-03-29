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

export enum EExercise {
  AIR_BIKE = 'AIR_BIKE',
  BARBELL_DEADLIFT = 'BARBELL_DEADLIFT',
  BARBELL_LYING_TRICEPS_EXTENSION = 'BARBELL_LYING_TRICEPS_EXTENSION',
  BARBELL_SHOULDER_PRESS = 'BARBELL_SHOULDER_PRESS',
  BARBELL_SQUATS = 'BARBELL_SQUATS',
  BENCH_PRESS = 'BENCH_PRESS',
  BICEPS_CURL = 'BICEPS_CURL',
  DIPS = 'DIPS',
  STANDING_LEG_CURLS = 'STANDING_LEG_CURLS',
  WIDE_GRIP_LAT_PULL_DOWN = 'WIDE_GRIP_LAT_PULL_DOWN',
}
