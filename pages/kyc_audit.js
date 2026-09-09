import BaseLayout from '@/components/BaseLayout/BaseLayout'
import ComingSoon from '@/components/ComingSoon/ComingSoon'
import React from 'react'

const kyc_audit = () => {
  return (
    <BaseLayout title={"KYC Audit"} footer>
      <ComingSoon />
    </BaseLayout>
  )
}

export default kyc_audit