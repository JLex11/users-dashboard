import { User } from '@/types'
import clsx from 'clsx'
import { Props } from './types.d'

interface TrowProps extends Pick<Props, 'showingRowColor' | 'deleteUser'> {
  user: User
  setActiveUser: (user: User) => void
  animationDelay: number
  isActive: boolean
}

export default function TRow({ user, setActiveUser, showingRowColor, deleteUser, animationDelay, isActive }: TrowProps) {
  return (
    <tr
      key={user.login.uuid}
      style={{ viewTransitionName: `table-row-${user.login.uuid}`, animationDelay: `${animationDelay}s` }}
      role="row"
      className={clsx(
        'animate-appear opacity-0 transition-colors hover:cursor-pointer hover:bg-black/5 dark:hover:bg-white/5',
        showingRowColor && 'even:bg-black/[0.025] dark:even:bg-white/[0.025]',
        isActive && 'bg-blue-500 text-white hover:cursor-default hover:bg-blue-600 dark:hover:bg-blue-400'
      )}
      onClick={() => setActiveUser(user)}
    >
      <td className="rounded-l p-2 transition-colors">
        <img
          src={user.picture.thumbnail}
          alt={user.name.first}
          role="img"
          className={clsx('size-10 rounded-full border border-black/25 dark:border-white/25', isActive && 'opacity-50 grayscale-0')}
          loading="lazy"
          decoding="async"
          style={{ viewTransitionName: !isActive ? `user-image-${user.login.uuid}` : undefined }}
        />
      </td>
      <td className="p-2 transition-colors">{user.name.first}</td>
      <td className="p-2 transition-colors">{user.name.last}</td>
      <td className="p-2 transition-colors">{user.location.country}</td>
      <td className="rounded-r p-2 text-right transition-colors">
        <button
          className="rounded bg-black/5 px-2 py-1 transition-colors hover:bg-red-700 hover:text-white dark:bg-white/5 dark:text-white"
          role="button"
          onClick={() => deleteUser(user.login.uuid)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}
