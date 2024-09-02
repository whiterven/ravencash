'use client';

import React from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { BankAccount } from '@/types'
import { Button } from '@/components/ui/Button'


// Mock data (replace with API calls in a real application)
const mockAccounts: BankAccount[] = [
  { id: '1', name: 'Checking', type: 'checking', accountNumber: '1234', routingNumber: '5678', balance: 5000 },
  { id: '2', name: 'Savings', type: 'savings', accountNumber: '5678', routingNumber: '5678', balance: 10000 },
]

const AccountsPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Accounts</h1>
        <div className="space-y-4">
          {mockAccounts.map((account) => (
            <div key={account.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{account.name}</h2>
              <p className="text-gray-600 mb-2">Account Type: {account.type}</p>
              <p className="text-gray-600 mb-2">Account Number: ****{account.accountNumber.slice(-4)}</p>
              <p className="text-gray-600 mb-2">Routing Number: {account.routingNumber}</p>
              <p className="text-2xl font-bold mt-4">${account.balance.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <Button className="mt-6">Add New Account</Button>
      </div>
    </ProtectedRoute>
  )
}

export default AccountsPage