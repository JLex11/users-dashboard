import clsx from 'clsx'
import { withTransition } from '../utils'

interface Props {
  isActive?: boolean
  handleClick: () => void
  children?: React.ReactNode
}

export default function SortableField({ isActive = false, handleClick, children }: Props) {
  const handleChangeSort = () => {
    withTransition(() => handleClick())
  }

  return (
    <th className="border-b p-2 dark:border-white/15" onClick={() => handleChangeSort()}>
      <button
        data-sorting-field={isActive ? 'active' : ''}
        className={clsx(
          'relative w-full rounded-md p-2 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5',
          isActive && 'text-white'
        )}
      >
        {children}
      </button>
    </th>
  )
}
