import React from 'react'

interface Props {
  stat: number | React.ReactElement,
  label: string | React.ReactElement,
}

function StatCard(props: Props) {
  const {
    stat = 0,
    label = '',
  } = props

  return (
    <div className="flex shadow-md p-2 text-center w-full bg-white rounded-md bg-gradient-primary">
      <div className="flex flex-col w-full">
        <h1 className="mb-0 text-white">{stat}</h1>
        <div className='text-white'>{label}</div>
      </div>
    </div>
  )
}

export default StatCard
