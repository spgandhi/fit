// import { Skeleton } from 'antd'
import React from 'react'

function SelectableCardSkeleton() {

  return (
    <div className="rounded-sm w-full flex gap-x-4">
      <div className='relative'>
        {/* <Skeleton.Image style={{width: 64, height: 64}} /> */}
      </div>
      <div>
        {/* <Skeleton.Input style={{width: 200}} active /> */}
      </div>
    </div>
  )
}

export default SelectableCardSkeleton
