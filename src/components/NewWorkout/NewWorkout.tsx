import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import AppLayout from '../Layouts/AppLayout'
import StepChoose from './StepChoose'

// Define mutation
const INCREMENT_COUNTER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation CreateWorkouts($input: [WorkoutCreateInput!]!) {
    createWorkouts(input: $input) {
      workouts {
        startTime
      }
    }
  }
`;

const GET_WORKOUT_DATA = gql`
  query GetWorkoutData {
    exercises {
      id
      name
      slug
      focus
    }
  }
`


function NewWorkout() {

  const router = useRouter();

  // Exercises
  const { data: adminData } = useQuery(GET_WORKOUT_DATA);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])

  const [selectedWorkoutFocus, setSelectedWorkoutFocus] = useState<any>([])
  
  const [mutateFunction] = useMutation(INCREMENT_COUNTER);

  const onWorkoutSelect = (item: string) => {
    const workouts = [...selectedWorkoutFocus];
    if(workouts.indexOf(item) === -1) {
      workouts.push(item);
    }else {
      workouts.splice(workouts.indexOf(item), 1);
    }
    setSelectedWorkoutFocus(workouts);
  }

  const onExerciseSelect = (item: string) => {
    const exercises = [...selectedExercises];
    if(exercises.indexOf(item) === -1) {
      exercises.push(item);
    }else {
      exercises.splice(exercises.indexOf(item), 1);
    }
    setSelectedExercises(exercises);
    console.log(exercises);
  }

  const handleStartWorkout = () => {
    mutateFunction({
      variables: {
        input: {
          isActive: true,
          user: {
            connectOrCreate: {
              where: {node: {id: 0}},
              onCreate: {node: {name: "New User"}}
            }
          },
          "exercises": {
            "connectOrCreate": [
              ...(selectedExercises.map(exercise => ({
                  "onCreate": {
                    "node": {
                      "name": "New Exercise",
                      "slug": "new-exercise"
                    } 
                  },
                  "where": {
                    "node": {
                      "id": exercise
                    }
                  }
              })))
            ]
          }
        },
      }
    });
    router.push('/workouts');
  }

  let exerciseCategories = [];
  if(adminData) {
    adminData.exercises.forEach(element => {
      const categories = (element.focus && element.focus.split(",")) || [];
      exerciseCategories.push(...categories);
    })
  }
  exerciseCategories = exerciseCategories.map((item, index) => ({id: index, name: item, slug: item}));
    
  console.log(adminData);
  return (
    <AppLayout title="Add New Workout">
      {adminData &&
      <>
        <StepChoose title="Choose Focus" options={exerciseCategories} onItemClick={onWorkoutSelect} activeItems={selectedWorkoutFocus} />
        <StepChoose title="Choose Exercises" options={adminData.exercises} onItemClick={onExerciseSelect} activeItems={selectedExercises} />
        <div className="mt-4">
          <button className="button white" type='button' onClick={handleStartWorkout}>Start Workout</button>
        </div>
        </>
      }
    </AppLayout>
  )
}

export default NewWorkout
