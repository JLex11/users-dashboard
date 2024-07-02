import { useUsers } from '@/hooks/useUsers'
import { getUsers } from '@/services/getUsers'
import { withTransition } from '@/utils'
import Header from './Header'
import QueryInput from './Header/QueryInput'
import RefreshButton from './Header/RefreshButton'
import ShowRowColorButton from './Header/ShowRowColorButton'
import SortDirectionButton from './Header/SortDirectionButton'
import UsersTable from './UsersTable'
import TablePagination from './UsersTable/TablePagination'

export default function UsersDashboard() {
  const { users, totalUsers, isError, isLoading, deleteUser, restoreUsers, filters, pagination } = useUsers({ usersFn: getUsers })
  const { sorting, setSorting, showRowColor, setShowRowColor, sortDirection, toggleSortDirection, setCountryQuery } = filters
  const { totalPages, currentPage, changePage } = pagination

  return (
    <main className="flex w-full flex-col gap-2 p-2">
      <Header usersCount={totalUsers}>
        <SortDirectionButton sorting={sorting} sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} changeSorting={setSorting} />
        <ShowRowColorButton showRowColor={showRowColor} setShowRowColor={setShowRowColor} />
        <RefreshButton refreshUsers={restoreUsers} loading={isLoading} />
        <QueryInput setCountryQuery={setCountryQuery} />
      </Header>
      <section className="flex flex-col gap-2">
        <UsersTable
          users={users}
          currentPage={currentPage}
          showingRowColor={showRowColor}
          sorting={sorting}
          deleteUser={deleteUser}
          changeSorting={setSorting}
        />
        <footer className="flex w-full flex-col gap-2">
          <div className="flex w-full justify-between gap-2">
            <div></div>
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              disabled={isLoading}
              handlePageChange={(page: number) => withTransition(() => changePage(page))}
              nextPage={async () => withTransition(() => changePage(currentPage + 1))}
            />
          </div>
          <div className="w-full max-w-full text-ellipsis text-nowrap">
            {isError && <p className="w-full rounded bg-black/5 p-2 text-red-500">Ups, parece que algo salio mal.</p>}
          </div>
        </footer>
      </section>
    </main>
  )
}
