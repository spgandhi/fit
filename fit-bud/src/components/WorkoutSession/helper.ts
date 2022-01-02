export const transformWorkoutGraphqlData = (workout: any) => {
  const exercises = workout.exercises.map((exercise: any) => {
    let rounds = [];
    try {
      rounds = exercise.workoutConnection.edges[0].details ? JSON.parse(exercise.workoutConnection.edges[0].details) : []
    }catch(e){
      console.log(e)
    }

    return {
      id: exercise.id,
      name: exercise.name,
      slug: exercise.slug,
      focus: exercise.focus,
      rounds
    };
  })

  return {
    ...workout,
    exercises
  }
}