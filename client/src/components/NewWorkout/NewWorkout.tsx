import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Tag } from 'antd';
import AppLayout from '../Layouts/AppLayout'
import StepChoose from './StepChoose'
import { User } from '../../data/types';
import tailwindConfig from '../../../tailwind.config';
import NewWorkoutSkeleton from './NewWorkoutSkeleton';
import AppLayoutSkeleton from '../Layouts/AppLayoutSkeleton';

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

  const { data: exercisesData } = useQuery(GET_WORKOUT_DATA);
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
  if(exercisesData) {
    exercisesData.exercises.forEach(element => {
      const categories = (element.focus && element.focus.split(",")) || [];
      exerciseCategories.push(...categories);
    })
  }
  exerciseCategories = exerciseCategories.map((item, index) => ({id: index, name: item, slug: item}));

  const selectedExercisesList = exercisesData && exercisesData.exercises.filter(item => selectedExercises.indexOf(item.id.toString()) !== -1);
  
  if(!exercisesData) {
    return (
      <AppLayoutSkeleton>
        <NewWorkoutSkeleton />
      </AppLayoutSkeleton>
    )
  }

  return (
    <AppLayout title="Add Workout" subTitle={userData.name}>
      {exercisesData &&
      <div className="px-4">
        <div className="sticky top-0 py-4 z-10 bg-white flex flex-col gap-y-4">
          <div>
            <input placeholder='Search' className='w-full rounded-md p-2 border-body-secondary' type="text" onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
          </div>
          {selectedExercisesList && 
            <div>
              {selectedExercisesList.map((item) => (
                <Tag closable onClose={() => onExerciseSelect(item.id)} className="rounded-md my-1">{item.name}</Tag>
              ))}
            </div>
          }
        </div>
        <StepChoose 
          options={exercisesData.exercises.filter(ex => ex.name.toLowerCase().includes(searchInput.toLowerCase()))}
          onItemClick={onExerciseSelect}
          activeItems={selectedExercises}
        />
        <div className="mt-4">
          <button disabled={selectedExercises.length === 0} className="button footer-btn fixed left-0 bottom-0 w-full rounded-none" type='button' onClick={handleStartWorkout}>Start Workout</button>
        </div>
        </div>
      }
    </AppLayout>
  )
}

export default NewWorkout
