import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useUsers } from '../hooks/useUsers'
import { getUsers } from '../services/getUsers'
import Header from './Header'
import QueryInput from './QueryInput'
import RefreshButton from './RefreshButton'
import ShowRowColorButton from './ShowRowColorButton'
import SortDirectionButton from './SortDirectionButton'
import UsersTable from './UsersTable'
import MoreButton from './icons/MoreButton'

export default function UsersDashboard() {
  const { data, error, isLoading, isFetchingNextPage, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => getUsers({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false
  })
  const allUsersPages = useMemo(() => (data?.pages ?? []).flatMap((page) => page.users), [data])

  useEffect(() => setUsers(allUsersPages), [allUsersPages])

  const { users, setUsers, deleteUser, restoreUsers, filters } = useUsers()
  const { sorting, setSorting, showRowColor, setShowRowColor, sortDirection, toggleSortDirection, setCountryQuery } = filters

  return (
    <main className="flex w-full flex-col gap-2">
      <Header usersCount={users.length}>
        <SortDirectionButton sorting={sorting} sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} changeSorting={setSorting} />
        <ShowRowColorButton showRowColor={showRowColor} setShowRowColor={setShowRowColor} />
        <RefreshButton refreshUsers={restoreUsers} loading={isLoading || isFetchingNextPage} />
        <QueryInput setCountryQuery={setCountryQuery} />
      </Header>
      <section className="flex flex-col gap-2 px-4">
        <UsersTable users={users} showingRowColor={showRowColor} sorting={sorting} deleteUser={deleteUser} changeSorting={setSorting} />
        <footer className="flex w-full justify-between gap-2">
          <div>{isError && <p className="rounded bg-black/5 p-2 text-red-500">Error: {error.message}</p>}</div>
          <button
            onClick={() => fetchNextPage()}
            disabled={isLoading || isFetchingNextPage}
            className="flex items-center gap-2 rounded bg-blue-500 p-2 font-bold text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <MoreButton />
          </button>
        </footer>
      </section>
    </main>
  )
}
