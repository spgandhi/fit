export type ExerciseRound = {
  reps?: number;
  weight?: number;
}

export type Exercise = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  rounds?: ExerciseRound[];
}

export type Workout = {
  id: string;
  isActive: boolean;
  exercises: Exercise[];
  startTime: Date;
}

export type User = {
  id: string;
  name: string;
}