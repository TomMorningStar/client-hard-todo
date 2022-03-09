import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import { fetchAllTodos } from "../../redux/todos";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.items);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  return (
    <div className="todo">
      {loading
        ? <div className="loading">идет загрузка...</div>
        : todos.map((item, index) => {
            return (
              <div key={index}>
                <Todo favorite={item.favorite} index={item._id} text={item.text} />
              </div>
            );
          })}
    </div>
  );
};

export default Todos;
