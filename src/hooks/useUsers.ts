import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SortDirection, SortField, User } from '../types.d'
import { matchSort } from '../utils'

interface Props {
  usersFn: ({ page }: { page: number }) => Promise<{ users: User[]; nextPage: number }>
  usersPerPage?: number
}

export const useUsers = ({ usersFn, usersPerPage = 5 }: Props) => {
  const { data, isError, isFetchNextPageError, isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => usersFn({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false
  })

  const [users, setUsers] = useState<User[]>([])
  const [sorting, setSorting] = useState<SortField>(SortField.NONE)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC)
  const [showRowColor, setShowRowColor] = useState(false)
  const [countryQuery, setCountryQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const originalUsers = useRef<User[]>([])
  const deletedUsersIds = useRef<User['login']['uuid'][]>([])

  useEffect(() => {
    const users = data?.pages.flatMap((page) => page.users) ?? []
    originalUsers.current = users
    setUsers(users.filter((user) => !deletedUsersIds.current.includes(user.login.uuid)))
  }, [data])

  const deleteUser = (userId: User['login']['uuid']) => {
    const newUsers = users.filter((user) => user.login.uuid !== userId)
    setUsers(newUsers)
    deletedUsersIds.current.push(userId)
  }

  const changeSorting = (sorting: SortField) => {
    setSorting((prevSorting) => (prevSorting === sorting ? SortField.NONE : sorting))
  }

  const toggleSortDirection = () => {
    setSortDirection((prevSortDirection) => (prevSortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC))
  }

  const restoreUsers = () => {
    setUsers(originalUsers.current)
    deletedUsersIds.current = []
  }

  const changeCountryQuery = (countryQuery: string) => setCountryQuery(countryQuery)

  const filteredUsers = useMemo(() => {
    return countryQuery.length === 0 ? users : users.filter(({ location }) => location.country.toLowerCase().includes(countryQuery.toLowerCase()))
  }, [countryQuery, users])

  const sortedUsers = useMemo(() => matchSort(sorting, sortDirection, filteredUsers), [sorting, sortDirection, filteredUsers])

  const pageOffset = useMemo(() => Math.floor(currentPage * usersPerPage), [currentPage])
  const totalPages = useMemo(() => Math.ceil(filteredUsers.length / usersPerPage), [filteredUsers])
  const pageLimit = useMemo(() => Math.min(pageOffset + usersPerPage), [pageOffset])
  console.log({ pageOffset, totalPages, pageLimit })

  return {
    users: sortedUsers.slice(pageOffset, pageLimit),
    pagination: {
      totalPages,
      pageLimit,
      currentPage,
      setCurrentPage
    },
    isLoading: isLoading || isFetchingNextPage,
    isError: isError || isFetchNextPageError,
    loadMoreUsers: () => fetchNextPage(),
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
