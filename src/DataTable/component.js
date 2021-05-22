import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.array.isRequired,
};

const defaultProps = {};

export default function Component(props) {
  const { columns, data } = props;

  let isKey;
  const columnItem = columns.map((item, idx) => {
    if (item.isKey) {
      isKey = item.dataField;
    }
    return <th key={idx}>{item.text}</th>;
  });

  const dataItem = data.map((data) => {
    return (
      <tr key={data[isKey]}>
        {columns.map((col, idx) => {
          return <td key={idx}>{data[col.dataField]}</td>;
        })}
      </tr>
    );
  });

  return (
    <>
      <div style={{ overflowX: "auto"}}>
        <table className="table">
          <thead className="table__head">
            <tr>{columnItem}</tr>
          </thead>
          <tbody>{dataItem}</tbody>
        </table>
      </div>
    </>
  );
}

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
