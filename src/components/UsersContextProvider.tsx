import { useUsers } from '@/hooks/useUsers'
import { User } from '@/types'
import { UsersContext } from './context/UsersContext'

export function UsersContextProvider({
  children,
  usersFn
}: {
  children: React.ReactNode
  usersFn: ({ page }: { page: number }) => Promise<{ users: User[]; nextPage: number }>
}) {
  return <UsersContext.Provider value={useUsers({ usersFn })}>{children}</UsersContext.Provider>
}
