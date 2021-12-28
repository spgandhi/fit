import React, { useEffect } from 'react'
import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader'

import Link from 'next/link'
import AppLayout from '../components/Layouts/AppLayout'
import WorkoutList from '../components/WorkoutList/WorkoutList'

function Workouts({ Component, pageProps }) {
  useEffect(() => {
    ionDefineCustomElements(window)
  })
  return (
    <AppLayout>
      <WorkoutList />
    </AppLayout>
  )
}

export default Workouts
