import React from 'react'
import { LoginForm } from '@/components/forms/LoginForm'

const LoginPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Log In</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage