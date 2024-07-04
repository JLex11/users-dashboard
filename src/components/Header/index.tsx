import useUsersContext from '@/hooks/useUsersContext'
import QueryInput from './QueryInput'
import RefreshButton from './RefreshButton'
import ShowRowColorButton from './ShowRowColorButton'
import SortDirectionButton from './SortDirectionButton'

export default function Header() {
  const { isLoading, restoreUsers, filters, totalUsers } = useUsersContext()
  const { sorting, setSorting, showRowColor, setShowRowColor, sortDirection, toggleSortDirection, setCountryQuery } = filters

  return (
    <header
      className="sticky top-0 mx-auto flex w-full items-center justify-between bg-white/60 py-2 dark:bg-[#242424cc]"
      style={{ viewTransitionName: 'header' }}
    >
      <h2 className="text-2xl font-bold">Usuarios ({totalUsers})</h2>
      <div className="flex items-center gap-1">
        <SortDirectionButton sorting={sorting} sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} changeSorting={setSorting} />
        <ShowRowColorButton showRowColor={showRowColor} setShowRowColor={setShowRowColor} />
        <RefreshButton refreshUsers={restoreUsers} loading={isLoading} />
        <QueryInput setCountryQuery={setCountryQuery} />
      </div>
    </header>
  )
}
