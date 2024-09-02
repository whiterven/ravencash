'use client';

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export const Header: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-gray-900">
              RavenCash
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/transfers" className="text-gray-600 hover:text-gray-900">
                  Transfers
                </Link>
                <Link href="/accounts" className="text-gray-600 hover:text-gray-900">
                  Accounts
                </Link>
                <Button onClick={logout} variant="ghost">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Log In
                </Link>
                <Link href="/register" className="text-gray-600 hover:text-gray-900">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}