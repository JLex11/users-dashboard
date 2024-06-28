import { useRef } from 'react'
import { SortDirection, SortField } from '../types.d'
import { withTransition } from '../utils'
import HeaderButton from './HeaderButton'
import ArrowShuffle from './icons/ArrowShuffle'
import SortAscending from './icons/SortAscending'
import SortDescending from './icons/SortDescending'

interface Props {
  sorting: SortField
  sortDirection: SortDirection
  toggleSortDirection: () => void
  changeSorting: (sorting: SortField) => void
}

export default function SortDirectionButton({ sorting, sortDirection, toggleSortDirection, changeSorting }: Props) {
  const previousSorting = useRef<SortField | null>(null)
  if (sorting !== SortField.NONE) previousSorting.current = sorting

  const handleChangeSortDirection = () => {
    if (sorting === SortField.NONE && previousSorting.current !== null) {
      withTransition(() => changeSorting(previousSorting.current!))
      return
    }
    withTransition(() => toggleSortDirection())
  }

  return (
    <HeaderButton isActive={sorting !== SortField.NONE} onClick={() => handleChangeSortDirection()}>
      <span className="flex items-center gap-1">
        {sorting !== SortField.NONE ? sortDirection === SortDirection.ASC ? <SortAscending /> : <SortDescending /> : <ArrowShuffle />}
      </span>
    </HeaderButton>
  )
}
