import { Skeleton , List } from 'antd'
import React from 'react'
import StatCard from '../../atoms/StatCard'
import AppLayout from '../Layouts/AppLayout'

const arr = [0,1,2]

function WorkoutListSkeleton() {

  return (
    <AppLayout title={<Skeleton.Input style={{ width: 240 }} active />}>
        <div className="grid grid-cols-2 gap-4 bg-body-light p-4">
          <StatCard 
            stat={<Skeleton.Input style={{ width: 48 }} active />} 
            label={<Skeleton.Input style={{ width: 120}} active />}
            />
          <StatCard 
            stat={<Skeleton.Input style={{width: 48}} active />} 
            label={<Skeleton.Input style={{ width: 120}} active />}
          />
        </div>
      <div className="p-4 rounded-t-md shadow-lg">
            <List
              dataSource={arr}
              renderItem={(item: any) => (
                <List.Item>
                  <div className="w-full flex flex-col">
                    <Skeleton.Input className='mb-1' style={{width: 120}} active />
                    <Skeleton.Input style={{width: '100 %'}} active />
                  </div>
                </List.Item>
              )}
            />
      </div>
    </AppLayout>
  )
}


export default WorkoutListSkeleton;