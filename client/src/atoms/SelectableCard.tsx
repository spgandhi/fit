import React from 'react'
import { CheckCircleFilled } from '@ant-design/icons'
import tailwind from '../../tailwind.config';

type Item = {
  id: string,
  slug: string,
  name: string,
  
}

interface Props {
  data: Item,
  onItemClick: (id: string, item: Item) => void,
  isActive: boolean
}

function SelectableCard(props: Props) {
  const {data, isActive} = props

  return (
    <div key={data.slug} onClick={() => props.onItemClick(data.id, data)} className="rounded-sm w-full flex gap-x-4">
      <div className='relative'>
        <img width={64} src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" />
        {isActive && 
        <div className='absolute bottom-[-8px] right-[-8px]'>
        <CheckCircleFilled style={{color: tailwind.theme.extend.colors.accent.DEFAULT}} />
        </div>}
      </div>
      <div key={data.id} className={`${isActive ? 'text-accent' : ''} font-bold`}>
        {data.name}
      </div>
    </div>
  )
}

export default SelectableCard
