import React from "react";

export default function Component(props) {
  const { state, onClick, pageNumbers } = props;

  const pageItem = pageNumbers.slice(0, 3).map((item) => {
    return (
      <li
        key={item}
        className={
          state.current === item
            ? "pagination__numbers active"
            : "pagination__numbers"
        }
        onClick={onClick}
      >
        {item}
      </li>
    );
  });

  return (
    <ul className="pagination">
      <li className="pagination__btn" onClick={onClick}>
        Prev
      </li>
      {pageItem}
      {/* <li className="pagination__dots" disabled>
        ...
      </li> */}
      <li className="pagination__btn" onClick={onClick}>
        Next
      </li>
    </ul>
  );
}
