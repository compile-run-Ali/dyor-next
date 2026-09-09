import BaseLayout from '@/components/BaseLayout/BaseLayout'
import ComingSoon from '@/components/ComingSoon/ComingSoon'
import React from 'react'

const search = () => {
  return (
    <BaseLayout title={"Search"} footer>
      <ComingSoon />
    </BaseLayout>
  )
}

export default search