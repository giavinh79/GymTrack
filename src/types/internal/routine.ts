import { IWorkout } from './exercise';

export interface IRoutine {
  id: number;
  name: string;
  creatorId: number;

  createdAt: string;
  description?: string;
  imageId?: number;
  rating?: number;

  workout: IWorkout;
}

export interface IUserRoutine extends IRoutine {
  isSelected: boolean;
}
