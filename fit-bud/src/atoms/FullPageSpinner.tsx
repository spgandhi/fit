import React from 'react'
import { IonContent, IonPage, IonSpinner } from '@ionic/react';

function FullPageSpinner() {

  return (
    <div className='flex justify-center items-center h-screen'><IonSpinner name="dots" duration={1000} className="text-lg"/></div>
  )
}

export default FullPageSpinner
