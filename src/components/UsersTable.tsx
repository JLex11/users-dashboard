import { useEffect, useRef } from 'react'
import { SortField, User } from '../types.d'
import { withTransition } from '../utils'
import SortableField from './SortableField'

interface Props {
  users: User[]
  showingRowColor: boolean
  sorting: SortField
  deleteUser: (userId: User['login']['uuid']) => void
  changeSorting: (sorting: SortField) => void
}

export default function UsersTable({ users, showingRowColor, sorting, deleteUser, changeSorting }: Props) {
  return (
    <table className="table-auto border-separate border-spacing-0 rounded-md border p-2 text-left shadow-sm dark:border-white/15">
      <Thead sorting={sorting} changeSorting={changeSorting} />
      <Tbody users={users} showingRowColor={showingRowColor} deleteUser={deleteUser} />
    </table>
  )
}

function Thead({ sorting, changeSorting }: Pick<Props, 'sorting' | 'changeSorting'>) {
  return (
    <thead className="border dark:border-white/15">
      <tr>
        <th className="w-20 border-b px-2 pb-3 pt-1 dark:border-white/15">Foto</th>
        <SortableField isActive={sorting === SortField.NAME} handleClick={() => changeSorting(SortField.NAME)}>
          Nombre
        </SortableField>
        <SortableField isActive={sorting === SortField.LASTNAME} handleClick={() => changeSorting(SortField.LASTNAME)}>
          Apellido
        </SortableField>
        <SortableField isActive={sorting === SortField.COUNTRY} handleClick={() => changeSorting(SortField.COUNTRY)}>
          Pais
        </SortableField>
        <th className="border-b border-black/15 px-2 pb-3 pt-1 dark:border-white/15"></th>
      </tr>
    </thead>
  )
}

function Tbody({ users, showingRowColor, deleteUser }: Pick<Props, 'users' | 'showingRowColor' | 'deleteUser'>) {
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
          <td className="w-20 p-2">
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
          <td className="w-36 p-2 text-right">
            <button
              className="rounded bg-black/5 px-2 py-1 font-bold transition-colors hover:bg-red-700 hover:text-white dark:bg-white/5 dark:text-white"
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
