import { Props } from '.'
import { SortField } from '../../types.d'
import SortableField from '../SortableField'

export default function Thead({ sorting, changeSorting }: Pick<Props, 'sorting' | 'changeSorting'>) {
  return (
    <thead className="border dark:border-white/15">
      <tr>
        <th className="w-20 border-b px-2 pb-2 pt-0 dark:border-white/15">Foto</th>
        <SortableField isActive={sorting === SortField.NAME} handleClick={() => changeSorting(SortField.NAME)}>
          Nombre
        </SortableField>
        <SortableField isActive={sorting === SortField.LASTNAME} handleClick={() => changeSorting(SortField.LASTNAME)}>
          Apellido
        </SortableField>
        <SortableField isActive={sorting === SortField.COUNTRY} handleClick={() => changeSorting(SortField.COUNTRY)}>
          Pais
        </SortableField>
        <th className="w-28 min-w-28 border-b border-black/15 px-2 pb-2 pt-0 dark:border-white/15"></th>
      </tr>
    </thead>
  )
}
