import useUsersContext from '@/hooks/useUsersContext'
import Header from './Header'
import UsersTable from './UsersTable'
import TablePagination from './UsersTable/TablePagination'

export default function UsersDashboard() {
  const {
    isError,
    pagination: { currentPage }
  } = useUsersContext()

  return (
    <main className="flex w-full flex-col gap-2 p-2">
      <Header />
      <section className="flex flex-col gap-2">
        <UsersTable currentPage={currentPage} />
        <footer className="flex w-full flex-col gap-2">
          <div className="flex w-full justify-between gap-2">
            <div></div>
            <TablePagination />
          </div>
          <div className="w-full max-w-full text-ellipsis text-nowrap">
            {isError && <p className="w-full rounded bg-black/5 p-2 text-red-500">Ups, parece que algo salio mal.</p>}
          </div>
        </footer>
      </section>
    </main>
  )
}
