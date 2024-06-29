import { Pagination } from 'react-headless-pagination'

interface Props {
  currentPage: number
  totalPages: number
  disabled: boolean
  handlePageChange: (page: number) => void
}

export default function TablePagination({ currentPage, totalPages, disabled, handlePageChange }: Props) {
  return (
    <>
      Current page: {currentPage + 1}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
        edgePageCount={1}
        middlePagesSiblingCount={1}
        className="flex items-center gap-2"
        truncableText="..."
        truncableClassName=""
      >
        <Pagination.PrevButton className="">⬅️</Pagination.PrevButton>

        <nav className="flex flex-grow justify-center">
          <ul className="flex items-center gap-2">
            <Pagination.PageButton disabled={disabled} activeClassName="" inactiveClassName="" className="disabled:cursor-not-allowed" />
          </ul>
        </nav>

        <Pagination.NextButton className="">➡️</Pagination.NextButton>
      </Pagination>
    </>
  )
}
