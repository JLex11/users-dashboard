import { useEffect, useRef } from 'react'
import TRow from './Trow'
import { Props } from './types'

interface TbodyProps extends Pick<Props, 'users' | 'showingRowColor' | 'deleteUser'> {}

export default function Tbody({ users, showingRowColor, deleteUser }: TbodyProps) {
  const lastUsersCount = useRef(Math.random())

  useEffect(() => {
    lastUsersCount.current = users.length
  })

  const getAnimationDelay = (i: number) => Math.max(0, (i - lastUsersCount.current) * 0.1)

  return (
    <tbody>
      {users.map((user, i) => (
        <TRow user={user} animationDelay={getAnimationDelay(i)} showingRowColor={showingRowColor} deleteUser={deleteUser} />
      ))}
    </tbody>
  )
}
