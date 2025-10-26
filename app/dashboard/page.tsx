"use client"
import React from 'react'
import StatCard from '../Components/StateCard'
import logo from "@/public/Frame (1).png"
import RevenueChart from '../Components/RevenueChart'
import SubscriberStaticsChart from '../Components/SubscriberStaticsChart'
export default function page() {
  return (
    <div>

    <div className='py-6 mx-6 flex gap-4'>
       <StatCard
        title="Total subscription"
        value={20}
        percent={6}
        period="Last Month"
        Icon={logo}
      />
       <StatCard
        title="On Going Work"
        value={20}
        percent={6}
        period="Last Month"
        Icon={logo}
      />
       <StatCard
        title="Revenue"
        value={20}
        percent={6}
        period="Last Month"
        Icon={logo}
      />
       <StatCard
        title="Social Request"
        value={20}
        percent={6}
        period="Last Month"
        Icon={logo}
      />
    </div>
    <div className='flex justify-between'>

      <RevenueChart/>
      <SubscriberStaticsChart/>
    </div>
    </div>
  )
}
