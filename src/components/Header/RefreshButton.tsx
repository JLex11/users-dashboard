import RefreshIcon from '@/components/icons/RefreshIcon'
import clsx from 'clsx'
import HeaderButton from './HeaderButton'

interface Props {
  refreshUsers: () => void
  loading?: boolean
}

export default function RefreshButton({ refreshUsers, loading = false }: Props) {
  return (
    <HeaderButton onClick={refreshUsers}>
      <RefreshIcon className={clsx({ 'animate-spin': loading })} data-testid="refresh-icon" />
    </HeaderButton>
  )
}
