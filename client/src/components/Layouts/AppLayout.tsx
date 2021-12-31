import React from 'react'
import { PageHeader } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode,
  title?: string | React.ReactNode,
  showNavigation?: boolean,
  subTitle?: string | React.ReactElement,
}

function AppLayout(props: Props) {
  const {
    children,
    title,
    showNavigation = true,
    subTitle
  } = props
  const router = useRouter()

  const routesWithoutBack = ['/', '/workouts'];

  return (
    <div className='min-h-screen h-full w-full'>
      <PageHeader 
        className='' 
        title={title || "Fit"} 
        onBack={routesWithoutBack.indexOf(router.pathname) > -1 ? null : () => router.back()} 
        subTitle={subTitle || null} 
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

export default AppLayout
