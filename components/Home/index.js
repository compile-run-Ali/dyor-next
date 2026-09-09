import React from 'react'
import BaseLayout from '../BaseLayout/BaseLayout'
import Home from './Home'

export default function HomeBase() {
  return (
    <BaseLayout footer title={"Dyor"}>
        <Home />
    </BaseLayout>
  )
}
