import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ExerciseRound, User, Workout } from '../../data/types';
import AppLayout from '../Layouts/AppLayout';
import WorkoutSessionExercise from './WorkoutSessionExercise';
import { transformWorkoutGraphqlData } from './helper';
import WorkoutSummary from './WorkoutSummary';
import date from '../../data/date';
import gqlQueries from '../../data/gqlQueries';

const { TabPane } = Tabs;

const GET_DATA = gql`
${gqlQueries.exercise.fragment}
query Workouts($where: WorkoutWhere, $userWhere: UserWhere) {
  workouts(where: $where) {
    id
    isActive
    startTime
    exercises {
     ... ExerciseFragment
    }
  }
  users (where: $userWhere) {
    id
    name
  }
}
`;

const UPDATE_WORKOUT = gql`
mutation Mutation($where: WorkoutWhere, $update: WorkoutUpdateInput, $workoutConnectionWhere: ExerciseWorkoutConnectionWhere) {
  updateWorkouts(where: $where, update: $update) {
    workouts {
      id
      isActive
      startTime
      exercises {
        name
        id
        slug
        workoutConnection(where: $workoutConnectionWhere) {
          edges {
            details
          }
        }
      }
    }
  }
}
`;

const END_WORKOUT = gql`
mutation UpdateWorkouts($where: WorkoutWhere, $update: WorkoutUpdateInput, $workoutConnectionWhere: ExerciseWorkoutConnectionWhere) {
  updateWorkouts(update: $update, where: $where) {
    workouts {
      id
      isActive
      startTime
      exercises {
        name
        id
        slug
        workoutConnection(where: $workoutConnectionWhere) {
          edges {
            details
          }
        }
      }
    } 
  }
}
`

interface Props {
  workoutId: string,
  userPath: string,
  userData: User,
}

function WorkoutSession(props: Props) {
  const { workoutId, userPath, userData} = props;
  const router = useRouter();

  const { data } = useQuery(GET_DATA, {
    variables: {
      where: {
        id: workoutId,
      },
      userWhere: {
        id: userData.id,
      }
    },
  });

  console.log(data);

  const [updateWorkoutMutation, { data: updatedData }] = useMutation(UPDATE_WORKOUT);
  const [endMutation , { data: endWorkoutData }] = useMutation(END_WORKOUT);

  const [showSummary, setShowSummary] = useState<boolean>();
  const [workoutData, setWorkoutData] = useState<Workout>();

  useEffect(() => {
    if (data && data.workouts.length > 0) {
      const workoutData = transformWorkoutGraphqlData(data.workouts[0]);
      setWorkoutData(workoutData);
      setShowSummary(!workoutData.isActive);
    }
  }, [data]);

  // useEffect(() => {
  //   if (updatedData && updatedData.updateWorkouts.workouts) {
  //     // const workoutData = transformWorkoutGraphqlData(updatedData.updateWorkouts.workouts[0]);
  //     // setWorkoutData(workoutData);
  //   }
  // }, [updatedData]);

  const updateRoundDataLocally = (exerciseId: string, roundData: any) => {
    const newWorkoutData = { ...workoutData };
    const exerciseIndex = newWorkoutData.exercises.findIndex(exercise => exercise.id === exerciseId);
    newWorkoutData.exercises[exerciseIndex].rounds = roundData;
    setWorkoutData(newWorkoutData);
  }

  const handleUpdateWorkout = (exerciseId: string, roundData: any) => {
    updateRoundDataLocally(exerciseId, roundData);
    updateWorkoutMutation({
      variables: {
        where: {
          id: workoutId,
        },
        update: {
          exercises: [
            {
              where: {
                node: {
                  id: exerciseId,
                },
              },
              update: {
                edge: {
                  details: JSON.stringify(roundData),
                },
              },
            },
          ],
        },
        workoutConnectionWhere: {
          node: {
            id: workoutId,
          },
        },
      },
    });
  };

  const handleStartRound = (exerciseSlug: string, data: ExerciseRound) => {
    const exercises = [...workoutData.exercises];
    const index: number = exercises.findIndex((exercise) => exercise.slug === exerciseSlug);
    exercises[index].rounds.push({
      reps: 8, // can be overwritten by data
      ...data,
    });
    handleUpdateWorkout(exercises[index].id, exercises[index].rounds);
  };

  const handleRoundRemove = (exerciseSlug: string, roundIndex: number) => {
    const exercises = [...workoutData.exercises];
    const index: number = exercises.findIndex((exercise) => exercise.slug === exerciseSlug);
    exercises[index].rounds.splice(roundIndex, 1);
    handleUpdateWorkout(exercises[index].id, exercises[index].rounds);
  };

  const handleRoundDataUpdate = (exerciseSlug: string, roundIndex: number, data: ExerciseRound) => {
    const exercises = [...workoutData.exercises];
    const index: number = exercises.findIndex((exercise) => exercise.slug === exerciseSlug);
    exercises[index].rounds[roundIndex] = { ...exercises[index].rounds[roundIndex], ...data };
    handleUpdateWorkout(exercises[index].id, exercises[index].rounds);
  };

  const handleEndWorkout = () => {
    endMutation({
      variables: {
        where: {
          id: workoutId,
        },
        update: {
          isActive: false,
        },
      },
    });
    router.push(`${userPath}/workouts`); 
  }


  return (
    <AppLayout showNavigation={false} title={workoutData && date.format(workoutData.startTime)} subTitle={data && data.users && data.users[0].name}>
      {workoutData
      && !showSummary &&(
        <>
         <Tabs defaultActiveKey="0">
            {workoutData.exercises.map((exercise, index) => (
              <TabPane tab={exercise.name} key={index}>
                <WorkoutSessionExercise
                  data={exercise}
                  onRoundRemove={handleRoundRemove}
                  onRoundupdate={handleRoundDataUpdate}
                  onStartRound={handleStartRound}
                />
              </TabPane>
            ))}
          </Tabs>
          {workoutData.isActive && (
            <button className='fixed right-[12px] bottom-[12px] button white sm' type="button" onClick={() => {setShowSummary(true)}}>End Workout</button>
          )}
        </>
      )}
      {showSummary && (
        <>
        <WorkoutSummary exercises={workoutData.exercises} />
        {workoutData.isActive && (
          <div className="flex gap-x-4">
            <button className="button white" type="button" onClick={() => setShowSummary(false)}>Go Back</button>
            <button className="button" type="button" onClick={handleEndWorkout}>End Workout</button>
          </div>
        )}
        </>
      )}
    </AppLayout>
  );
}

export default WorkoutSession;
