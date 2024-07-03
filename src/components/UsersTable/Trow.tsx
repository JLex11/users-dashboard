import { User } from '@/types'
import { withTransition } from '@/utils'
import { Props } from './types.d'

interface TrowProps extends Pick<Props, 'showingRowColor' | 'deleteUser'> {
  user: User
  animationDelay: number
}

export default function TRow({ user, showingRowColor, deleteUser, animationDelay }: TrowProps) {
  return (
    <tr
      key={user.login.uuid}
      style={{ viewTransitionName: `table-row-${user.login.uuid}`, animationDelay: `${animationDelay}s` }}
      role="row"
      className={`animate-appear opacity-0 transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${showingRowColor ? 'even:bg-black/[0.025] dark:even:bg-white/[0.025]' : ''}`}
    >
      <td className="rounded-l p-2 transition-colors">
        <img
          src={user.picture.thumbnail}
          alt={user.name.first}
          role="img"
          className="size-10 rounded-full border border-black/25 dark:border-white/25"
          loading="lazy"
          decoding="async"
        />
      </td>
      <td className="p-2 transition-colors">{user.name.first}</td>
      <td className="p-2 transition-colors">{user.name.last}</td>
      <td className="p-2 transition-colors">{user.location.country}</td>
      <td className="rounded-r p-2 text-right transition-colors">
        <button
          className="rounded bg-black/5 px-2 py-1 transition-colors hover:bg-red-700 hover:text-white dark:bg-white/5 dark:text-white"
          role="button"
          onClick={() => withTransition(() => deleteUser(user.login.uuid))}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}
