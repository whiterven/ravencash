import React from 'react'
import { RegisterForm } from '@/components/forms/RegisterForm'

const RegisterPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage