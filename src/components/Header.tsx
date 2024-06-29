interface Props {
  children: React.ReactNode
  usersCount: number
}

export default function Header({ children, usersCount }: Props) {
  return (
    <header
      className="sticky top-0 z-10 mx-auto flex w-full items-center justify-between bg-white/60 py-2 dark:bg-[#242424cc]"
      style={{ viewTransitionName: 'header' }}
    >
      <h2 className="text-2xl font-bold">Usuarios ({usersCount})</h2>
      <div className="flex items-center gap-1">{children}</div>
    </header>
  )
}
