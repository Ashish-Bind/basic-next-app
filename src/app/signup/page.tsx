'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])

  async function onSignup() {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/signup', user)
      console.log('Signup success ', res.data)
      toast.success('Signup success ', res.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed')
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-3xl">{loading ? 'Processing' : 'Sign Up'}</h1>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        className="py-1 px-2 bg-transparent border border-gray-400 rounded-md"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="py-1 px-2 bg-transparent border border-gray-400 rounded-md"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="py-1 px-2 bg-transparent border border-gray-400 rounded-md"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onSignup}
        className="py-2 px-4 bg-gray-800 rounded-md hover:bg-slate-700"
      >
        {disabled ? 'No Sign Up' : 'Sign Up'}
      </button>
      <p>
        Already Signed up ?
        <Link href={'/login'} className="underline">
          Login
        </Link>
      </p>
      <Toaster />
    </div>
  )
}

export default SignUpPage
