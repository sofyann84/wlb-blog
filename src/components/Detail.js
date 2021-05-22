import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { loadPostDetail } from "../actions/detail";

export default function Component() {
  const dispatch = useDispatch();
  const location = useLocation();

  const pathId = location.pathname.split("/");
  const pathIdLength = pathId.length - 1;
  const id = pathId[pathIdLength];

  const data = useSelector((state) => state.detail.data);


  useEffect(() => {
    dispatch(loadPostDetail(id));
    
  }, [dispatch]);

  return (
    <>
      <div className="page-title">
        <h4>{data.title}</h4>
      </div>
      <p>{data.body}</p>
    </>
  );
}