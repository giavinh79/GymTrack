interface Exercise {
  name: string;
  reps: number;
  weight: number;
  units: 'lb' | 'kg' | 's' | 'reps';
  gif?: string;
}

interface DayRoutine {
  name?: string;
  exercises: Exercise[];
}

export interface RoutineObject {
  name: string;
  date: Date | null;
  description: string;
  token: string;
  userId: string;
  userEmail?: string;
  workouts: {
    monday: DayRoutine;
    tuesday: DayRoutine;
    wednesday: DayRoutine;
    thursday: DayRoutine;
    friday: DayRoutine;
  };
}

export const VISUALIZATION = {
  CALENDAR: 'calendar',
  GRAPH: 'graph',
  MODEL: 'model',
};
