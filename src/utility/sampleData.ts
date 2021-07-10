// File for hardcoded sample JSON data that would be retrieved from backend

export const user = {
  id: 0,
  username: 'tester@gmail.com',
};

export const getData = {
  routines: [
    {
      id: 1,
      name: 'BigMon',
      days: [
        {
          day: 'Monday',
          name: 'Push Day',
          exercises: [
            {
              name: 'Bicep Curls',
              description: 'A simple exercise where...',
              gif: '',
              sets: '3',
              reps: '8',
              history: [],
            },
          ],
        },
      ],
    },
  ],
};
