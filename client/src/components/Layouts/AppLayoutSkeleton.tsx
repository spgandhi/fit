import { PageHeader, Skeleton } from 'antd'
import React from 'react'

interface Props {
  children: React.ReactNode
}

function AppLayoutSkeleton(props: Props) {
  const { children } = props

  return (
    <div className='min-h-screen h-full w-full'>
      <PageHeader 
        className='' 
        title={<Skeleton.Input style={{ width: 240 }} active />} 
      />
      <div className=''>
        {children}
      </div>
      {/* {showNavigation && (
        <div className='flex flex-row justify-between fixed w-full bottom-0 py-4 bg-white'>
          <div className="flex-1 text-center text-black">
            <Link  href="/">Home</Link>
          </div>
          <div className="flex-1 text-center text-black">
            <Link  href="/workouts">Workouts</Link>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default AppLayoutSkeleton
