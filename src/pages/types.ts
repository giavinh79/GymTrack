interface ISet {
  amount: number;
  unit: string;
}

interface IExercise {
  name: string;
  sets: ISet[];
  gifs?: string[];
}

interface IRoutine {
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
    monday: IRoutine;
    tuesday: IRoutine;
    wednesday: IRoutine;
    thursday: IRoutine;
    friday: IRoutine;
    saturday: IRoutine;
    sunday: IRoutine;
  };
}

export enum EVisualization {
  CALENDAR = 'CALENDAR',
  GRAPH = 'GRAPH',
  MODEL = 'MODEL',
}
