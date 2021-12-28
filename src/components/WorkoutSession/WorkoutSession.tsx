import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Tabs } from 'antd';
import { ExerciseRound, Workout } from '../../data/types';
import AppLayout from '../Layouts/AppLayout';
import WorkoutSessionExercise from './WorkoutSessionExercise';
import { transformWorkoutGraphqlData } from './helper';
import WorkoutSummary from './WorkoutSummary';
import date from '../../data/date';

const { TabPane } = Tabs;

const GET_DATA = gql`
query Workouts($where: WorkoutWhere, $workoutConnectionWhere: ExerciseWorkoutConnectionWhere) {
  workouts(where: $where) {
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

interface Props {
  workoutId: string,
}

function WorkoutSession(props: Props) {
  const { workoutId } = props;

  const { data } = useQuery(GET_DATA, {
    variables: {
      where: {
        id: workoutId,
      },
      workoutConnectionWhere: {
        node: {
          id: workoutId,
        },
      },
    },
  });

  const [updateWorkoutMutation, { data: updatedData }] = useMutation(UPDATE_WORKOUT);

  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [workoutData, setWorkoutData] = useState<Workout>();

  useEffect(() => {
    if (data && data.workouts.length > 0) {
      const workoutData = transformWorkoutGraphqlData(data.workouts[0]);
      setWorkoutData(workoutData);
    }
  }, [data]);

  useEffect(() => {
    if (updatedData && updatedData.updateWorkouts.workouts) {
      const workoutData = transformWorkoutGraphqlData(updatedData.updateWorkouts.workouts[0]);
      setWorkoutData(workoutData);
    }
  }, [updatedData]);

  const handleUpdateWorkout = (exerciseId: string, roundData: any) => {
    updateWorkoutMutation({
      variables: {
        where: {
          id: props.workoutId,
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
            id: props.workoutId,
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

  console.log(workoutData);

  return (
    <AppLayout showNavigation={false} title={workoutData && date.format(workoutData.startTime)}>
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
        <div>
          <button className="button white" type="button" onClick={() => setShowSummary(false)}>Go Back</button>
          <button className="button" type="button">End Workout</button>
        </div>
        </>
      )}
    </AppLayout>
  );
}

export default WorkoutSession;
