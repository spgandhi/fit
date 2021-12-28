import React from 'react'

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
  const {data} = props

  return (
    <div key={data.slug} onClick={() => props.onItemClick(data.id, data)} className={`rounded-sm px-4 py-2 ${props.isActive ? 'bg-secondary': 'bg-primary-light'}`}>
      <div key={data.id} className="text-center">
        <h6>{data.name}</h6>
      </div>
    </div>
)
}

export default SelectableCard
