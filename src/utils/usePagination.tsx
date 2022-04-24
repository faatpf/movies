import React, { useMemo } from 'react';

// Generate a sequence of numbers
const range = (start:number, end:number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * @interface IUsePaginationArguments
 */
interface IUsePaginationArguments {
  numberOfPages: number;
  currentPage: number;
  siblingCount: number;
  boundaries: number;
}

/**
 * @function usePaginaton
 * @description hook to handle pagination
 * @param IUsePaginationArguments
 */
export const usePagination = ({ numberOfPages, currentPage, siblingCount, boundaries }: IUsePaginationArguments) => {
  const paginationRange = useMemo(() => {
    // PagesToShow is determined as siblings (left/right) + boundaries(left/right) + currentPage + 2*DOTS
    const pagesToShow = 2 * siblingCount + 2 * boundaries + 3;

    /*
      If the number of pages is less than the page to show, we return the range [1..totalPageCount]
    */
    if (pagesToShow >= numberOfPages) {
      return range(1, numberOfPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaries);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, numberOfPages - boundaries);

    /*
      We do not want to show dots if there is only one position left 
      after/before the current page 
    */
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 1;
    const shouldShowRightDots = rightSiblingIndex < numberOfPages - boundaries;

    if (!shouldShowLeftDots || !shouldShowRightDots) {
      const leftItemCount = (pagesToShow - 1) / 2;
      const leftContents = range(1, leftItemCount);
      const rightContents = range(numberOfPages - leftItemCount + 1, numberOfPages);

      return [...leftContents, 'dots', ...rightContents];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        ...range(1, boundaries),
        ,
        'dots',
        ...middleRange,
        'dots',
        ...range(numberOfPages - boundaries + 1, numberOfPages),
      ];
    }
  }, [numberOfPages, siblingCount, currentPage]);

  return paginationRange;
};
