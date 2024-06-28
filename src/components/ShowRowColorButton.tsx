import HeaderButton from './HeaderButton'
import TableFilledIcon from './icons/TableFilledIcon'
import TableOutlineIcon from './icons/TableOutlineIcon'

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
