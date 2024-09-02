'use client';

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

type LoginFormData = z.infer<typeof schema>

export const LoginForm: React.FC = () => {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      // Redirect to dashboard or show success message
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>
      <Button type="submit" className="w-full">
        Log In
      </Button>
    </form>
  )
}