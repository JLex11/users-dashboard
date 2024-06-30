import { SortField, User } from '../../types.d'
import Tbody from './Tbody'
import Thead from './Thead'

export interface Props {
  users: User[]
  currentPage: number
  showingRowColor: boolean
  sorting: SortField
  deleteUser: (userId: User['login']['uuid']) => void
  changeSorting: (sorting: SortField) => void
}

export default function UsersTable({ users, currentPage, showingRowColor, sorting, deleteUser, changeSorting }: Props) {
  return (
    <table className="table-auto border-separate border-spacing-0 rounded-md border p-2 text-left shadow-sm dark:border-white/15">
      <Thead sorting={sorting} changeSorting={changeSorting} />
      <Tbody key={currentPage} users={users} showingRowColor={showingRowColor} deleteUser={deleteUser} />
    </table>
  )
}
