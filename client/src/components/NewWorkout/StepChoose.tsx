import { List } from 'antd'
import React from 'react'
import SelectableCard from '../../atoms/SelectableCard'

type Item = {
  id: string,
  name: string,
  slug: string,
}

interface Props {
  options: Item[],
  onItemClick: (item: string) => void,
  activeItems: string[],
}

function StepChoose(props: Props) {
  const {
    options,
    onItemClick,
    activeItems
  } = props

  return (
    <div>
      <div className='flex'>
        <List 
          dataSource={options}
          renderItem={(item: Item) => (
            <List.Item>
            <SelectableCard 
              key={item.slug} 
              data={item} 
              onItemClick={onItemClick} 
              isActive={activeItems.includes(item.id)}
            />
          </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default StepChoose
