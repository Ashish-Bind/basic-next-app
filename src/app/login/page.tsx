'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])

  async function onLogin() {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/login', user)
      toast.success('Login success')
      router.push('/profile')
    } catch (error: any) {
      console.log('Signup failed')
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-3xl">{loading ? 'Processing ' : 'Login'}</h1>
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
        onClick={onLogin}
        className="py-2 px-4 bg-gray-800 rounded-md hover:bg-slate-700"
      >
        {disabled ? 'No Login' : 'Login'}
      </button>
      <p>
        New here, register now ?
        <Link href="/signup" className="underline">
          Signup
        </Link>
      </p>
      <Toaster />
    </div>
  )
}

export default LoginPage
