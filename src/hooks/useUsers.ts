import { useMemo, useRef, useState } from 'react'
import { SortDirection, SortField, User } from '../types.d'
import { matchSort } from '../utils'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [sorting, setSorting] = useState<SortField>(SortField.NONE)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC)
  const [showRowColor, setShowRowColor] = useState(false)
  const [countryQuery, setCountryQuery] = useState('')

  const originalUsers = useRef<User[]>([])

  const deleteUser = (userId: User['login']['uuid']) => {
    const newUsers = users.filter((user) => user.login.uuid !== userId)
    setUsers(newUsers)
  }

  const changeSorting = (sorting: SortField) => {
    setSorting((prevSorting) => (prevSorting === sorting ? SortField.NONE : sorting))
  }

  const toggleSortDirection = () => {
    setSortDirection((prevSortDirection) => (prevSortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC))
  }

  const restoreUsers = () => setUsers(originalUsers.current)

  const changeCountryQuery = (countryQuery: string) => setCountryQuery(countryQuery)

  const filteredUsers = useMemo(() => {
    return countryQuery.length === 0 ? users : users.filter(({ location }) => location.country.toLowerCase().includes(countryQuery.toLowerCase()))
  }, [countryQuery, users])

  const sortedUsers = useMemo(() => matchSort(sorting, sortDirection, filteredUsers), [sorting, sortDirection, filteredUsers])

  return {
    users: sortedUsers,
    setUsers: (newUsers: User[]) => {
      originalUsers.current = newUsers
      setUsers(newUsers)
    },
    deleteUser,
    restoreUsers,
    filters: {
      showRowColor,
      sorting,
      sortDirection,
      setShowRowColor,
      setSorting: changeSorting,
      setCountryQuery: changeCountryQuery,
      toggleSortDirection
    }
  }
}
