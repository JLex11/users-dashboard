import { useEffect, useRef } from 'react'
import { Props } from '.'
import { withTransition } from '../../utils'

export default function Tbody({ users, showingRowColor, deleteUser }: Pick<Props, 'users' | 'showingRowColor' | 'deleteUser'>) {
  const lastUsersCount = useRef(Math.random())

  useEffect(() => {
    lastUsersCount.current = users.length
  })

  const getAnimationDelay = (i: number) => Math.max(0, (i - lastUsersCount.current) * 0.1)

  return (
    <tbody>
      {users.map((user, i) => (
        <tr
          key={user.login.uuid}
          style={{ viewTransitionName: `table-row-${user.login.uuid}`, animationDelay: `${getAnimationDelay(i)}s` }}
          className={`animate-appear opacity-0 transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${showingRowColor ? 'even:bg-black/[0.025] dark:even:bg-white/[0.025]' : ''}`}
        >
          <td className="p-2">
            <img
              src={user.picture.thumbnail}
              alt={user.name.first}
              className="size-10 rounded-full border border-black/25 dark:border-white/25"
              loading="lazy"
              decoding="async"
            />
          </td>
          <td className="p-2">
            {user.name.first} {user.name.last}
          </td>
          <td className="p-2">{user.name.last}</td>
          <td className="p-2">{user.location.country}</td>
          <td className="p-2 text-right">
            <button
              className="rounded px-2 py-1 font-bold transition-colors hover:bg-red-700 hover:text-white dark:text-white"
              onClick={() => withTransition(() => deleteUser(user.login.uuid))}
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
