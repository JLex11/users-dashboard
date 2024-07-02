import { SortField } from '@/enums'
import { User } from '@/types'

export interface Props {
  users: User[]
  currentPage: number
  showingRowColor: boolean
  sorting: SortField
  deleteUser: (userId: User['login']['uuid']) => void
  changeSorting: (sorting: SortField) => void
}
