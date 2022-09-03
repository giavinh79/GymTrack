import { EDay } from 'src/types';

export interface IWorkoutCard {
  title: string;
  contentTitle: string;
  day: EDay;
  backgroundColor: string;
  iconColor: string;
  textColor: string;
  text: string;
}

export const WORKOUT_CARDS: IWorkoutCard[] = [
  {
    title: 'MON',
    contentTitle: 'Monday',
    day: EDay.MONDAY,
    backgroundColor: 'rgba(113, 104, 193, 0.13)',
    iconColor: 'rgba(113, 104, 193, 0.75)',
    textColor: '#7168c1',
    text: "Placeholder for list of this day's exercises",
  },
  {
    title: 'TUES',
    contentTitle: 'Tuesday',
    day: EDay.TUESDAY,
    backgroundColor: '#388ccd29',
    iconColor: '#388ccdab',
    textColor: '#388ccd',
    text: 'Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl',
  },
  {
    title: 'WED',
    contentTitle: 'Wednesday',
    day: EDay.WEDNESDAY,
    backgroundColor: 'rgba(84, 174, 110, 0.25)',
    iconColor: 'rgba(84, 174, 110, 0.74)',
    textColor: 'rgb(84, 174, 110)',
    text: 'Air bike, Ab Wheel, Sit-ups, Crunches',
  },
  {
    title: 'THUR',
    contentTitle: 'Thursday',
    day: EDay.THURSDAY,
    backgroundColor: '#FFEFB3',
    iconColor: '#e6b707ab',
    textColor: '#e6b707',
    text: 'Running, jogging, sitting, slapping',
  },
  {
    title: 'FRI',
    contentTitle: 'Friday',
    day: EDay.FRIDAY,
    backgroundColor: '#FFD9C7',
    iconColor: '#ff7231b8',
    textColor: '#FF7231',
    text: 'Push-ups, Incline Bench-press, Decline Press Machine',
  },
  {
    title: 'SAT',
    contentTitle: 'Saturday',
    day: EDay.SATURDAY,
    backgroundColor: '#B6EDDE',
    iconColor: '#32c89f99',
    textColor: '#32C89F',
    text: 'Push-ups, Incline Bench-press, Decline Press Machine',
  },
  {
    title: 'SUN',
    contentTitle: 'Sunday',
    day: EDay.SUNDAY,
    backgroundColor: '#5a626842',
    iconColor: '#5a6268ab',
    textColor: '#5A6268',
    text: 'Push-ups, Incline Bench-press, Decline Press Machine',
  },
];
