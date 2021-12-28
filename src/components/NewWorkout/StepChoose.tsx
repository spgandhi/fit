import React from 'react'
import SelectableCard from '../../atoms/SelectableCard'

type Item = {
  id: string,
  name: string,
  slug: string,
}

interface Props {
  title: string,
  options: Item[],
  onItemClick: (item: string) => void,
  activeItems: string[],
}

function StepChoose(props: Props) {
  const {
    title,
    options,
    onItemClick,
    activeItems
  } = props

  return (
    <div>
      <h4>{title}</h4>
      <div className='grid grid-cols-3 gap-x-4 gap-y-4'>
        {options.map(option => (
          <SelectableCard 
            key={option.slug} 
            data={option} 
            onItemClick={onItemClick} 
            isActive={activeItems.includes(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default StepChoose
