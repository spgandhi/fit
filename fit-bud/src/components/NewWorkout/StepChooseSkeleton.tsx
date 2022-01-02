// import { List } from 'antd'
import React from 'react'
import SelectableCardSkeleton from '../../atoms/SelectableCardSkeleton';

const items = [0,0,0,0,0,0];

function StepChooseSkeleton() {

  return (
    <div>
      <div className='flex'>
        {/* <List 
          dataSource={items}
          renderItem={(item: any) => (
            <List.Item>
              <SelectableCardSkeleton />
            </List.Item>
          )}
        /> */}
      </div>
    </div>
  )
}

export default StepChooseSkeleton
