'use client';

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'


const transferSchema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  description: z.string().optional(),
})

type TransferFormData = z.infer<typeof transferSchema>

const TransfersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  })

  const onSubmit = async (data: TransferFormData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Transfer submitted:', data)
    setIsLoading(false)
    reset()
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Transfer Money</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Recipient (email or custom tag)"
              {...register('recipient')}
              error={errors.recipient?.message}
            />
          </div>
          <div>
            <Input
              type="number"
              step="0.01"
              placeholder="Amount"
              {...register('amount', { valueAsNumber: true })}
              error={errors.amount?.message}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Description (optional)"
              {...register('description')}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Send Money'}
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  )
}

export default TransfersPage