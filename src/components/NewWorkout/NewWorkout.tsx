import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import AppLayout from '../Layouts/AppLayout'
import StepChoose from './StepChoose'
import { User } from '../../data/types';

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

interface Props {
  userPath: string,
  userData: User,
}

function NewWorkout(props:Props) {

  const { userPath, userData } = props;

  const router = useRouter();

  const { data: adminData } = useQuery(GET_WORKOUT_DATA);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])
  // const [selectedWorkoutFocus, setSelectedWorkoutFocus] = useState<any>([])
  const [searchInput, setSearchInput] = useState<string>("");
  
  const [mutateFunction] = useMutation(INCREMENT_COUNTER);

  // const onWorkoutSelect = (item: string) => {
  //   const workouts = [...selectedWorkoutFocus];
  //   if(workouts.indexOf(item) === -1) {
  //     workouts.push(item);
  //   }else {
  //     workouts.splice(workouts.indexOf(item), 1);
  //   }
  //   setSelectedWorkoutFocus(workouts);
  // }

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
    router.push(`${userPath}`);
  }

  let exerciseCategories = [];
  if(adminData) {
    adminData.exercises.forEach(element => {
      const categories = (element.focus && element.focus.split(",")) || [];
      exerciseCategories.push(...categories);
    })
  }
  exerciseCategories = exerciseCategories.map((item, index) => ({id: index, name: item, slug: item}));
    
  return (
    <AppLayout title="Add Workout" subTitle={userData.name}>
      {adminData &&
      <>
        <div className="pb-8">
          <div>Search</div>
          <input className='w-full rounded-md p-2' type="text" onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
        </div>
        <StepChoose 
          title="Choose Exercises"
          options={adminData.exercises.filter(ex => ex.name.toLowerCase().includes(searchInput.toLowerCase()))}
          onItemClick={onExerciseSelect}
          activeItems={selectedExercises}
        />
        <div className="mt-4">
          <button className="button white fixed right-[12px] bottom-[64px]" type='button' onClick={handleStartWorkout}>Start Workout</button>
        </div>
        </>
      }
    </AppLayout>
  )
}

export default NewWorkout
