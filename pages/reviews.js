import BaseLayout from '@/components/BaseLayout/BaseLayout'
import ComingSoon from '@/components/ComingSoon/ComingSoon'
import React from 'react'

const reviews = () => {
  return (
    <BaseLayout title={"Reviews"} footer>
      <ComingSoon />
    </BaseLayout>
  )
}

export default reviews