export default {
  exercise: {
    fragment: `
      fragment ExerciseFragment on Exercise {
        name
        id
        slug
        workoutConnection {
          edges {
            details
          }
        }
      }
    `
  }
}