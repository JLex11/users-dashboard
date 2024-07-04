import { useUsers } from '@/hooks/useUsers'
import { createContext } from 'react'

type UsersContextType = ReturnType<typeof useUsers>

export const UsersContext = createContext<UsersContextType | null>(null)
