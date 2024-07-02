import { SortDirection, SortField } from '@/enums'
import { flushSync } from 'react-dom'
import { User } from './types.d'

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const withTransition = (cb: () => void) => {
  if (!('startViewTransition' in document)) return cb()

  document.startViewTransition(() => {
    flushSync(() => {
      cb()
    })
  })
}

export const matchSort = (sorting: SortField, sortDirection: SortDirection, users: User[]) => {
  if (sorting === SortField.NONE) return users

  const compareProperties: Record<Exclude<SortField, SortField.NONE>, (user: User) => string> = {
    [SortField.COUNTRY]: (user) => user.location.country,
    [SortField.NAME]: (user) => user.name.first,
    [SortField.LASTNAME]: (user) => user.name.last
  }

  return users.toSorted((a, b) => {
    const aProperty = compareProperties[sorting](a)
    const bProperty = compareProperties[sorting](b)
    return sortDirection === SortDirection.ASC ? aProperty.localeCompare(bProperty) : bProperty.localeCompare(aProperty)
  })
}
