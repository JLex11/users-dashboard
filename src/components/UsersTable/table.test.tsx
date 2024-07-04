import { describe, expect, it } from 'vitest'

function suma(a: number, b: number): number {
  return a + b
}

describe('Función Suma', () => {
  it('Suma debe ser una función', () => {
    expect(typeof suma).toBe('function')
  })
})

// import { SortField } from '@/enums'
// import { users } from '@/mocks/users'
// import { cleanup, fireEvent, render, screen } from '@testing-library/react'
// import { afterEach, describe, expect, it, vi } from 'vitest'
// import UsersTable from '.'
// import TablePagination from './TablePagination'
// import Tbody from './Tbody'
// import Thead from './Thead'
// import TRow from './Trow'

// describe('UsersTable', () => {
//   afterEach(cleanup)

//   it('Should have a table', () => {
//     render(<UsersTable users={[]} currentPage={1} showingRowColor={false} sorting={SortField.NONE} deleteUser={() => {}} changeSorting={() => {}} />)
//     screen.getByRole('table')
//   })

//   it('Should have a thead', () => {
//     render(<UsersTable users={[]} currentPage={1} showingRowColor={false} sorting={SortField.NONE} deleteUser={() => {}} changeSorting={() => {}} />)
//     screen.getByTestId('table-header')
//   })

//   it('Should have a tbody', () => {
//     render(<UsersTable users={[]} currentPage={1} showingRowColor={false} sorting={SortField.NONE} deleteUser={() => {}} changeSorting={() => {}} />)
//     screen.getByTestId('table-body')
//   })
// })

// describe('THead', () => {
//   afterEach(cleanup)

//   it('Should have a table row', () => {
//     render(<Thead sorting={SortField.NONE} changeSorting={() => {}} />)
//     screen.getByRole('row')
//   })

//   it('Should have a table cell with text "Foto"', () => {
//     render(<Thead sorting={SortField.NONE} changeSorting={() => {}} />)
//     screen.getByText('Foto')
//   })

//   Object.values(SortField)
//     .filter(Boolean)
//     .forEach((field) => {
//       it(`Should have a table cell with text "${field}"`, () => {
//         render(<Thead sorting={SortField.NONE} changeSorting={() => {}} />)
//         screen.getByText(field)
//       })
//     })
// })

// describe('Tbody', () => {
//   afterEach(cleanup)

//   it('Should render a row for each user', () => {
//     render(<Tbody users={users} showingRowColor={false} deleteUser={() => {}} />)
//     expect(screen.getAllByRole('row')).toHaveLength(users.length)
//   })
// })

// describe('Trow', () => {
//   afterEach(cleanup)

//   it('Should render an user image thumbnail and have alt attribute with the user first name', () => {
//     render(<TRow user={users[0]} animationDelay={0} showingRowColor={false} deleteUser={() => {}} />)
//     screen.getByRole('img', { name: users[0].name.first })
//   })

//   it('Should ')

//   it('Should render an user first name', () => {
//     render(<TRow user={users[0]} animationDelay={0} showingRowColor={false} deleteUser={() => {}} />)
//     screen.getByText(users[0].name.first)
//   })

//   it('Should render an user last name', () => {
//     render(<TRow user={users[0]} animationDelay={0} showingRowColor={false} deleteUser={() => {}} />)
//     screen.getByText(users[0].name.last)
//   })

//   it('Should render an user country', () => {
//     render(<TRow user={users[0]} animationDelay={0} showingRowColor={false} deleteUser={() => {}} />)
//     screen.getByText(users[0].location.country)
//   })

//   it('Should render a delete button', () => {
//     render(<TRow user={users[0]} animationDelay={0} showingRowColor={false} deleteUser={() => {}} />)
//     screen.getByRole('button', { name: 'Eliminar' })
//   })

//   it('Should call deleteUser when the delete button is clicked', () => {
//     const deleteUser = vi.fn()
//     render(<TRow user={users[0]} animationDelay={0} showingRowColor={false} deleteUser={deleteUser} />)
//     const button = screen.getByRole('button', { name: 'Eliminar' })
//     fireEvent.click(button)
//     expect(deleteUser).toHaveBeenCalledWith(users[0].login.uuid)
//   })

//   it('Should have a even class when showingRowColor is true', () => {
//     render(<TRow user={users[0]} animationDelay={0} showingRowColor={true} deleteUser={() => {}} />)
//     const row = screen.getByRole('row')
//     expect(row.className).match(/even:bg-.+ dark:even:bg-.+/)
//   })
// })

// describe('TablePagination', () => {
//   afterEach(cleanup)

//   it('Should have a pagination', () => {
//     render(<TablePagination currentPage={1} totalPages={10} disabled={false} handlePageChange={() => {}} nextPage={() => {}} />)
//     screen.getByRole('navigation')
//   })

//   it('Should have a pagination with a prev button', () => {
//     render(<TablePagination currentPage={1} totalPages={10} disabled={false} handlePageChange={() => {}} nextPage={() => {}} />)
//     screen.getByRole('button', { name: 'Atras' })
//   })

//   it('Should have a pagination with a next button', () => {
//     render(<TablePagination currentPage={1} totalPages={10} disabled={false} handlePageChange={() => {}} nextPage={() => {}} />)
//     screen.getByRole('button', { name: 'Siguiente' })
//   })

//   it('Should have a pagination with a page button', () => {
//     render(<TablePagination currentPage={1} totalPages={10} disabled={false} handlePageChange={() => {}} nextPage={() => {}} />)
//     screen.getByRole('tab', { name: '1' })
//   })

//   it('Should have a pagination with a page button with the active class', () => {
//     render(<TablePagination currentPage={5} totalPages={10} disabled={false} handlePageChange={() => {}} nextPage={() => {}} />)
//     screen.getByRole('tab', { name: '5', selected: true })
//   })

//   it('Should call handlePageChange when the page button is clicked', () => {
//     const handlePageChange = vi.fn()
//     render(<TablePagination currentPage={1} totalPages={10} disabled={false} handlePageChange={handlePageChange} nextPage={() => {}} />)

//     const nextPageNumber = 2
//     const button = screen.getByRole('tab', { name: nextPageNumber.toString() })
//     fireEvent.click(button)
//     expect(handlePageChange).toHaveBeenCalledWith(nextPageNumber - 1)
//   })

//   it('Should call nextPage when the next button is clicked', () => {
//     const nextPage = vi.fn()
//     render(<TablePagination currentPage={1} totalPages={10} disabled={false} handlePageChange={() => {}} nextPage={nextPage} />)
//     const button = screen.getByRole('button', { name: 'Siguiente' })
//     fireEvent.click(button)
//     expect(nextPage).toHaveBeenCalled()
//   })
// })
