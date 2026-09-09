import BaseLayout from '@/components/BaseLayout/BaseLayout'
import ComingSoon from '@/components/ComingSoon/ComingSoon'
import React from 'react'

const map = () => {
  return (
    <BaseLayout title={"Map"} footer>
      <ComingSoon />
    </BaseLayout>
  )
}

export default map