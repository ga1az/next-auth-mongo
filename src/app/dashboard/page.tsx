"use client";

import {useSession} from 'next-auth/react'

function DashBoardPage(){

  const {data: session, status} = useSession()

  console.log(session, status)

  return (
    <div>
      sadf
    </div>
  )
}

export default DashBoardPage