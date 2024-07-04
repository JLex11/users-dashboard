import useUsersContext from '@/hooks/useUsersContext'
import { useEffect, useRef } from 'react'
import TRow from './Trow'

export default function Tbody() {
  const { users, activeUser, changeActiveUser, filters, deleteUser } = useUsersContext()
  const { showRowColor: showingRowColor } = filters

  const lastUsersCount = useRef(0)

  useEffect(() => {
    lastUsersCount.current = users.length
  })

  const getAnimationDelay = (i: number) => Math.max(0, (i - lastUsersCount.current) * 0.05)

  return (
    <tbody data-testid="table-body" role="rowgroup">
      {users.map((user, i) => (
        <TRow
          key={user.login.uuid}
          user={user}
          setActiveUser={changeActiveUser}
          isActive={user.login.uuid === activeUser?.login.uuid}
          animationDelay={getAnimationDelay(i)}
          showingRowColor={showingRowColor}
          deleteUser={deleteUser}
        />
      ))}
    </tbody>
  )
}
