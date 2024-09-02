'use client';

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  customTag: z.string().min(3, { message: 'Custom tag must be at least 3 characters long' }),
})

type RegisterFormData = z.infer<typeof schema>

export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      await registerUser(data)
      console.log('Registration successful')
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Name"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>
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
      <div>
        <Input
          type="text"
          placeholder="Custom Tag"
          {...register('customTag')}
          error={errors.customTag?.message}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  )
}