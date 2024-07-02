import Tbody from './Tbody'
import Thead from './Thead'
import { Props } from './types'

export default function UsersTable({ users, currentPage, showingRowColor, sorting, deleteUser, changeSorting }: Props) {
  return (
    <table className="table-auto border-separate border-spacing-y-1 rounded-md border pb-1 pl-2 pr-2 text-left shadow-inner dark:border-white/15">
      <Thead sorting={sorting} changeSorting={changeSorting} />
      <Tbody key={currentPage} users={users} showingRowColor={showingRowColor} deleteUser={deleteUser} />
    </table>
  )
}
