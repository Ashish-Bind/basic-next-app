import React from 'react'

function Profile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-3xl">Profile</h1>
      <p>{params.id}</p>
    </div>
  )
}

export default Profile
