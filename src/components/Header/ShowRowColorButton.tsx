import TableFilledIcon from '@/components/icons/TableFilledIcon'
import TableOutlineIcon from '@/components/icons/TableOutlineIcon'
import HeaderButton from './HeaderButton'

interface Props {
  showRowColor: boolean
  setShowRowColor: (showingRowColor: boolean) => void
}

export default function ShowRowColorButton({ showRowColor, setShowRowColor }: Props) {
  const handleShowingRowColor = () => setShowRowColor(!showRowColor)

  return (
    <HeaderButton isActive={showRowColor} onClick={handleShowingRowColor}>
      {showRowColor ? <TableFilledIcon /> : <TableOutlineIcon />}
    </HeaderButton>
  )
}
