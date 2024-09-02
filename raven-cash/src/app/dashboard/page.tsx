'use client';

import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { BankAccount, Transaction } from '@/types'

// Mock data (replace with API calls in a real application)
const mockAccounts: BankAccount[] = [
  { id: '1', name: 'Checking', type: 'checking', accountNumber: '1234', routingNumber: '5678', balance: 5000 },
  { id: '2', name: 'Savings', type: 'savings', accountNumber: '5678', routingNumber: '5678', balance: 10000 },
]

const mockTransactions: Transaction[] = [
  { id: '1', amount: 100, type: 'send', status: 'completed', description: 'Payment to John', date: '2023-04-15' },
  { id: '2', amount: 500, type: 'receive', status: 'completed', description: 'Salary', date: '2023-04-14' },
  { id: '3', amount: 50, type: 'send', status: 'pending', description: 'Online purchase', date: '2023-04-13' },
]

const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Account Balances</h2>
            {mockAccounts.map((account) => (
              <div key={account.id} className="flex justify-between items-center mb-2">
                <span>{account.name}</span>
                <span className="font-semibold">${account.balance.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center mb-2">
                <span>{transaction.description}</span>
                <span className={`font-semibold ${transaction.type === 'receive' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'receive' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full">Send Money</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Request Money</button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default DashboardPage