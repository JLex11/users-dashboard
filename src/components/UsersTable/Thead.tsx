import { SortField } from '@/enums'
import SortableField from './SortableField'
import { Props } from './types'

interface TheadProps extends Pick<Props, 'sorting' | 'changeSorting'> {}

export default function Thead({ sorting, changeSorting }: TheadProps) {
  return (
    <thead className="border dark:border-white/15" data-testid="table-header" role="rowgroup">
      <tr>
        <th className="w-20 border-b px-2 pb-1 pt-0 dark:border-white/15">Foto</th>
        {Object.values(SortField)
          .filter(Boolean)
          .map((field) => (
            <SortableField key={field} isActive={sorting === field} handleClick={() => changeSorting(field)}>
              {field}
            </SortableField>
          ))}
        <th className="w-28 min-w-28 border-b border-black/15 px-2 pb-1 pt-0 dark:border-white/15"></th>
      </tr>
    </thead>
  )
}
