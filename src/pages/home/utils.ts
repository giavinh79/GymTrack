import { IRoutine } from 'src/types/internal/routine';
import { EDay } from 'src/types/internal/common';

export const defaultRoutineObject: IRoutine = {
  id: 'testId',
  name: '',
  date: new Date().toUTCString(),
  description: '',
  creatorId: '',
  workouts: {
    [EDay.MONDAY]: {
      exercises: [],
    },
    [EDay.TUESDAY]: {
      exercises: [],
    },
    [EDay.WEDNESDAY]: {
      exercises: [],
    },
    [EDay.THURSDAY]: {
      exercises: [],
    },
    [EDay.FRIDAY]: {
      exercises: [],
    },
    [EDay.SATURDAY]: {
      exercises: [],
    },
    [EDay.SUNDAY]: {
      exercises: [],
    },
  },
};
