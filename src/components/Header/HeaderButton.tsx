import clsx from 'clsx'

interface Props {
  isActive?: boolean
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  props?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
}

export default function HeaderButton({ isActive = false, children, onClick, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e)
  }

  return (
    <button
      {...props}
      role="button"
      className={clsx(
        'rounded-md border px-3 py-2 font-bold transition-colors hover:bg-black/5 hover:text-black dark:text-white dark:hover:bg-blue-700 dark:hover:text-white',
        isActive ? 'border-black/15 bg-blue-700 text-white dark:border-white/15 dark:bg-white/5' : 'border-transparent'
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
