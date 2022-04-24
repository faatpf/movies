import React, { useEffect, useState } from "react";
import Button from "src/components/Button";
import { usePagination } from "src/utils/usePagination";
import "./style.scss";

interface IPagination {
  defaultPage?: number;
  pageSize?: number;
  total: number;
  onChange?: (page: number) => void;
  // the id of the element which you want to scroll to after going to different a page
  siblingCount?: number;
  boundaries?: number;
  className?: string;
  sendPageNumber?: (value: number) => void;
}

const pageItem =
  (
    currentPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ): React.FC<{ pageNumber?: number | string }> =>
  ({ pageNumber }) => {
    return (
      <>
        <span
          className={`gj-pagination__page-item ${
            pageNumber === currentPage
              ? "gj-pagination__page-item--selected"
              : ""
          }`.trim()}
          onClick={() => setPage(pageNumber as number)}
        >
          {pageNumber ?? ""}
        </span>
      </>
    );
  };
const ThreeDots: React.FC = () => (
  <div className="gj-pagination__page-item gj-pagination__page-item--dot">
    ...
  </div>
);

const Pagination: React.FC<IPagination> = (props: IPagination) => {
  const {
    defaultPage = 1,
    pageSize = 40,
    total,
    onChange,
    className = "",
    siblingCount = 2,
    boundaries = 1,
    sendPageNumber,
    ...rest
  } = props;
  const [page, setPage] = useState<number>(defaultPage);
  const numberOfPages: number = Math.ceil(total / pageSize);
  const PageItem = pageItem(page, setPage);

  const paginationRange = usePagination({
    numberOfPages: numberOfPages,
    currentPage: page,
    siblingCount: siblingCount,
    boundaries: boundaries,
  });

  useEffect(() => {
    onChange && onChange(page);
  }, [page]);

  useEffect(() => {
    sendPageNumber?.(page);
  }, [page]);

  useEffect(() => {
    setPage(defaultPage);
  }, [pageSize, defaultPage]);

  return (
    <div
      className={`gj-pagination${className ? `${className}` : ""}`}
      {...rest}
    >
      <Button
        className="gj-pagination__btn"
        aria-label="first-page"
        onClick={() => setPage(1)}
        disabled={page <= 1}
        title="<<"
      />
      <Button
        className="gj-pagination__btn"
        aria-label="previous-page"
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        title="<"
      />

      <div className="gj-pagination__item-wrapper">
        {paginationRange?.map((pageNumber, idx) => {
          if (pageNumber === "dots") {
            return <ThreeDots key={idx} />;
          }
          return <PageItem key={idx} pageNumber={pageNumber} />;
        })}
      </div>

      <Button
        className="gj-pagination__btn"
        aria-label="next-page"
        onClick={() => setPage(page + 1)}
        disabled={page >= numberOfPages}
        title=">"
      />
      <Button
        className="gj-pagination__btn"
        aria-label="last-page"
        onClick={() => {
          setPage(numberOfPages);
        }}
        disabled={page >= numberOfPages}
        title=">>"
      />
    </div>
  );
};

export default Pagination;
