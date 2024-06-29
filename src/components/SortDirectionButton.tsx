import { useRef } from 'react'
import { SortDirection, SortField } from '../types.d'
import { withTransition } from '../utils'
import HeaderButton from './HeaderButton'
import ArrowShuffleIcon from './icons/ArrowShuffleIcon'
import SortIcon from './icons/SortIcon'

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
        {sorting !== SortField.NONE ? (
          <SortIcon
            direction={sortDirection}
            /* className={clsx('transition-transform', sortDirection === SortDirection.ASC && 'rotate-y-180 rotate-x-180')} */
          />
        ) : (
          <ArrowShuffleIcon />
        )}
      </span>
    </HeaderButton>
  )
}
