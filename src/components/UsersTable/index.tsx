import Tbody from './Tbody'
import Thead from './Thead'

export default function UsersTable({ currentPage }: { currentPage: number }) {
  return (
    <table
      role="table"
      className="table-auto border-separate border-spacing-y-1 rounded-md border pb-1 pl-2 pr-2 text-left shadow-inner dark:border-white/15"
    >
      <Thead />
      <Tbody key={currentPage} />
    </table>
  )
}
