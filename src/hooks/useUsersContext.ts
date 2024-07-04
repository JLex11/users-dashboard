import { UsersContext } from '@/components/context/UsersContext'
import { useContext } from 'react'

export default function useUsersContext() {
  const context = useContext(UsersContext)
  if (!context) throw new Error('useUsersContext must be used within a UsersProvider')
  return context
}
