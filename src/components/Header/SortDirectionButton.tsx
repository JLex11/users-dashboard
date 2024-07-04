import ArrowShuffleIcon from '@/components/icons/ArrowShuffleIcon'
import SortIcon from '@/components/icons/SortIcon'
import { SortDirection, SortField } from '@/enums'
import { useRef } from 'react'
import HeaderButton from './HeaderButton'

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
      changeSorting(previousSorting.current!)
      return
    }
    toggleSortDirection()
  }

  return (
    <HeaderButton isActive={sorting !== SortField.NONE} onClick={() => handleChangeSortDirection()}>
      {sorting !== SortField.NONE ? <SortIcon direction={sortDirection} data-testid="sort-icon" /> : <ArrowShuffleIcon data-testid="sort-icon" />}
    </HeaderButton>
  )
}
