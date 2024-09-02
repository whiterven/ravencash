export interface User {
    id: string
    email: string
    name: string
    customTag: string
    phoneNumber?: string
  }
  
  export interface Transaction {
    id: string
    amount: number
    type: 'send' | 'receive' | 'deposit' | 'withdraw'
    status: 'pending' | 'completed' | 'failed'
    description: string
    date: string
    recipientId?: string
    senderId?: string
  }
  
  export interface BankAccount {
    id: string
    name: string
    type: 'checking' | 'savings'
    accountNumber: string
    routingNumber: string
    balance: number
  }