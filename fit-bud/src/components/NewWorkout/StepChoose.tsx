// import { List } from 'antd'
import { IonItem, IonList } from '@ionic/react'
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
        <IonList>
          {options.map((item: Item) => (
            <IonItem key={item.slug}>
              <SelectableCard 
                data={item} 
                onItemClick={onItemClick} 
                isActive={activeItems.includes(item.id)}
              />
            </IonItem>
          ))}
        </IonList>
      </div>
    </div>
  )
}

export default StepChoose
