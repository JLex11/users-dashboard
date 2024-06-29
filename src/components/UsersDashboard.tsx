import { useUsers } from '../hooks/useUsers'
import { getUsers } from '../services/getUsers'
import { withTransition } from '../utils'
import Header from './Header'
import TablePagination from './Pagination'
import QueryInput from './QueryInput'
import RefreshButton from './RefreshButton'
import ShowRowColorButton from './ShowRowColorButton'
import SortDirectionButton from './SortDirectionButton'
import UsersTable from './UsersTable'
import MoreButton from './icons/MoreButton'

export default function UsersDashboard() {
  const { users, isError, isLoading, deleteUser, restoreUsers, loadMoreUsers, filters, pagination } = useUsers({ usersFn: getUsers })
  const { sorting, setSorting, showRowColor, setShowRowColor, sortDirection, toggleSortDirection, setCountryQuery } = filters
  const { totalPages, currentPage, setCurrentPage } = pagination

  return (
    <main className="flex w-full flex-col gap-2 p-2">
      <Header usersCount={users.length}>
        <SortDirectionButton sorting={sorting} sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} changeSorting={setSorting} />
        <ShowRowColorButton showRowColor={showRowColor} setShowRowColor={setShowRowColor} />
        <RefreshButton refreshUsers={restoreUsers} loading={isLoading} />
        <QueryInput setCountryQuery={setCountryQuery} />
      </Header>
      <section className="flex flex-col gap-2">
        <UsersTable users={users} showingRowColor={showRowColor} sorting={sorting} deleteUser={deleteUser} changeSorting={setSorting} />
        <footer className="flex w-full justify-between gap-2">
          <div>{isError && <p className="rounded bg-black/5 p-2 text-red-500">Ups, parece que algo salio mal.</p>}</div>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            disabled={isLoading}
            handlePageChange={(page: number) => withTransition(() => setCurrentPage(page))}
          />
          <button
            onClick={() => loadMoreUsers()}
            disabled={isLoading}
            className="flex items-center gap-2 rounded bg-blue-500 p-2 font-bold text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <MoreButton />
          </button>
        </footer>
      </section>
    </main>
  )
}
