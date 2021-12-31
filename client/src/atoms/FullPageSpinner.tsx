import { Spin } from 'antd'
import React from 'react'

function FullPageSpinner() {

  return (
    <div className='flex flex-col h-screen flex-1 justify-center'><Spin /></div>
  )
}

export default FullPageSpinner
