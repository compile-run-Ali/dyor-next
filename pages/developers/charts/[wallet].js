import BaseLayout from '@/components/BaseLayout/BaseLayout'
import Charts from '@/components/Developer/Charts'
import { useRouter } from 'next/router';
import React from 'react'

export default function ChartsPage() {
    const router = useRouter();
    const { wallet } = router.query;


    return (

        <BaseLayout title={"Charts"}>
            {wallet &&
                <Charts wallet={wallet} />
            }
        </BaseLayout>
    )
}