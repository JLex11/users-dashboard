import clsx from 'clsx'
import { withTransition } from '../utils'
import HeaderButton from './HeaderButton'
import RefreshIcon from './icons/RefreshIcon'

interface Props {
  refreshUsers: () => void
  loading?: boolean
}

export default function RefreshButton({ refreshUsers, loading = false }: Props) {
  const handleRefreshUsers = () => withTransition(() => refreshUsers())

  return (
    <HeaderButton onClick={handleRefreshUsers}>
      <RefreshIcon className={clsx({ 'animate-spin': loading })} />
    </HeaderButton>
  )
}
