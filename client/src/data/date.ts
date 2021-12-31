import dayjs from 'dayjs';
import { Workout } from './types';

export default {
  format: (date: Date) => dayjs(date).format('ddd, MMM D'),

  last7DayWorkoutCount: (workouts: Workout[]) => {
    const last7Days = dayjs().subtract(7, 'day');
    const last7DaysWorkouts = workouts.filter(workout => dayjs(workout.startTime).isAfter(last7Days));
    return last7DaysWorkouts.length;
  },

  workoutsThisWeekCount: (workouts: Workout[]) => {
    const thisWeek = dayjs().startOf('week');
    const thisWeekWorkouts = workouts.filter(workout => dayjs(workout.startTime).isAfter(thisWeek));
    return thisWeekWorkouts.length;
  }
}