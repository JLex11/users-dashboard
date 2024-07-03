import { useEffect, useRef } from 'react'
import TRow from './Trow'
import { Props } from './types'

interface TbodyProps extends Pick<Props, 'users' | 'showingRowColor' | 'deleteUser'> {}

export default function Tbody({ users, showingRowColor, deleteUser }: TbodyProps) {
  const lastUsersCount = useRef(0)

  useEffect(() => {
    lastUsersCount.current = users.length
  })

  const getAnimationDelay = (i: number) => Math.max(0, (i - lastUsersCount.current) * 0.05)

  return (
    <tbody data-testid="table-body" role="rowgroup">
      {users.map((user, i) => (
        <TRow key={user.login.uuid} user={user} animationDelay={getAnimationDelay(i)} showingRowColor={showingRowColor} deleteUser={deleteUser} />
      ))}
    </tbody>
  )
}
