import { SortDirection, SortField } from '@/enums'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Header from '.'
import QueryInput from './QueryInput'
import RefreshButton from './RefreshButton'
import ShowRowColorButton from './ShowRowColorButton'
import SortDirectionButton from './SortDirectionButton'

describe('Header', () => {
  afterEach(cleanup)

  it("should have 'Usuarios (10)' text", () => {
    render(<Header usersCount={10}>Some children</Header>)
    screen.getByText('Usuarios (10)')
  })

  it("should have 'Some children' text", () => {
    render(<Header usersCount={10}>Some children</Header>)
    screen.getByText('Some children')
  })
})

describe('QueryInput', () => {
  afterEach(cleanup)

  it('should have a input', () => {
    render(<QueryInput setCountryQuery={() => {}} />)
    screen.getByRole('textbox')
  })

  it('must have a placeholder', () => {
    render(<QueryInput setCountryQuery={() => {}} />)
    screen.getByPlaceholderText('Netherlands, United Kingdom...')
  })

  it('must have a onChange event', () => {
    const setCountryQuery = vi.fn()
    render(<QueryInput setCountryQuery={setCountryQuery} />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })
    expect(setCountryQuery).toHaveBeenCalledWith('test')
  })
})

describe('RefreshButton', () => {
  afterEach(cleanup)

  it('should have a RefreshIcon', () => {
    render(<RefreshButton refreshUsers={() => {}} loading={false} />)
    screen.getByTestId('refresh-icon')
  })

  it('should have a onClick event', () => {
    const refreshUsers = vi.fn()
    render(<RefreshButton refreshUsers={refreshUsers} loading={false} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(refreshUsers).toHaveBeenCalled()
  })

  it('should have a loading animation when loading is true', () => {
    render(<RefreshButton refreshUsers={() => {}} loading />)
    const button = screen.getByTestId('refresh-icon')
    expect(button).toHaveProperty('className', 'animate-spin')
  })
})

describe('SortDirectionButton', () => {
  afterEach(cleanup)

  it('should have a SortIcon', () => {
    render(<SortDirectionButton sorting={SortField.NONE} sortDirection={SortDirection.ASC} toggleSortDirection={() => {}} changeSorting={() => {}} />)
    screen.getByTestId('sort-icon')
  })

  it('should have a onClick event', () => {
    const toggleSortDirection = vi.fn()
    const changeSorting = vi.fn()
    render(
      <SortDirectionButton
        sorting={SortField.NONE}
        sortDirection={SortDirection.ASC}
        toggleSortDirection={toggleSortDirection}
        changeSorting={changeSorting}
      />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(toggleSortDirection).toHaveBeenCalled()
  })

  it('must change the sorting when clicked and the previous sorting is not null', () => {
    const toggleSortDirection = vi.fn()
    const changeSorting = vi.fn()
    const { rerender } = render(
      <SortDirectionButton
        sorting={SortField.COUNTRY}
        sortDirection={SortDirection.ASC}
        toggleSortDirection={toggleSortDirection}
        changeSorting={changeSorting}
      />
    )

    rerender(
      <SortDirectionButton
        sorting={SortField.NONE}
        sortDirection={SortDirection.ASC}
        toggleSortDirection={toggleSortDirection}
        changeSorting={changeSorting}
      />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(changeSorting).toHaveBeenCalledWith(SortField.COUNTRY)
  })
})

describe('ShowRowColorButton', () => {
  afterEach(cleanup)

  it('should have a row color icon', () => {
    render(<ShowRowColorButton showRowColor={false} setShowRowColor={() => {}} />)
    screen.getByTestId('row-color-icon')
  })

  it('should change the showRowColor when clicked', () => {
    const setShowRowColor = vi.fn()
    render(<ShowRowColorButton showRowColor={false} setShowRowColor={setShowRowColor} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(setShowRowColor).toHaveBeenCalledWith(true)
  })
})
