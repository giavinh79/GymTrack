import { IWorkout } from './exercise';

export interface IRoutine {
  id: string;
  name: string;
  date: string;
  description: string;
  creatorId: string;
  workouts: IWorkout;
}
