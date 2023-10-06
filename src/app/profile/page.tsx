'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = React.useState('')

  async function onLogout() {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout Successful')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  async function getUserDetails() {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setUser(res.data.user._id)
  }

  React.useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-3xl">Profile</h1>
      <p>
        {user === '' ? (
          'Processing'
        ) : (
          <div className="text-center">
            <h1>User Details</h1>
            <p>
              {!user ? (
                'NOTHING'
              ) : (
                <Link
                  href={`/profile/${user}`}
                  className="underline text-sm text-gray-400"
                >
                  See user details
                </Link>
              )}
            </p>
          </div>
        )}
      </p>
      <button
        onClick={onLogout}
        className="py-2 px-4 bg-gray-800 rounded-md hover:bg-slate-700"
        type="button"
      >
        Logout
      </button>
      <Toaster />
    </div>
  )
}

export default ProfilePage
