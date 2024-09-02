'use client';

import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'  // Add this import
import { User } from '@/types'
import { api } from '@/lib/api'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: Partial<User>) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me')
        setUser(response.data)
      } catch (error) {
        console.error('Error checking authentication:', error)
      }
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      setUser(response.data)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    api.post('/auth/logout')
      .then(() => setUser(null))
      .catch((error) => console.error('Logout error:', error))
  }

  const register = async (userData: Partial<User>) => {
    try {
      console.log('Attempting to register user:', userData)
      const response = await api.post('/auth/register', userData)
      console.log('Registration response:', response.data)
      setUser(response.data.user)
      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message)
      } else {
        throw new Error('An unexpected error occurred during registration')
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}