import RefreshIcon from '@/components/icons/RefreshIcon'
import { withTransition } from '@/utils'
import clsx from 'clsx'
import HeaderButton from './HeaderButton'

interface Props {
  refreshUsers: () => void
  loading?: boolean
}

export default function RefreshButton({ refreshUsers, loading = false }: Props) {
  const handleRefreshUsers = () => withTransition(() => refreshUsers())

  return (
    <HeaderButton onClick={handleRefreshUsers}>
      <RefreshIcon className={clsx({ 'animate-spin': loading })} data-testid="refresh-icon" />
    </HeaderButton>
  )
}
