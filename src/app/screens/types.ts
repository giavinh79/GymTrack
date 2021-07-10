interface IExercise {
  name: string;
  reps: number;
  weight: number;
  units: 'lb' | 'kg' | 's' | 'reps';
  gif?: string;
}

interface IDayRoutine {
  name?: string;
  exercises: IExercise[];
}

export interface IRoutineObject {
  name: string;
  date: Date | null;
  description: string;
  token: string;
  userId: string;
  userEmail?: string;
  _id: string;
  workouts: {
    monday: IDayRoutine;
    tuesday: IDayRoutine;
    wednesday: IDayRoutine;
    thursday: IDayRoutine;
    friday: IDayRoutine;
    saturday: IDayRoutine;
    sunday: IDayRoutine;
  };
}

export enum EVisualization {
  CALENDAR = 'calendar',
  GRAPH = 'graph',
  MODEL = 'model',
};
