'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function VerifyEmailPage() {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  async function verifyEmail() {
    try {
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  return <div>page</div>
}

export default VerifyEmailPage
