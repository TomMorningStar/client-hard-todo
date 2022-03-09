import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, getSelect } from "../../redux/todos";

const Todo = (props) => {
  const dispatch = useDispatch();

  const hundleFavorite = (id) => {
    if (props.favorite) {
      dispatch(getSelect(id, false));
    } else {
      dispatch(getSelect(id, true));
    }
  };

  const hundleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  return (
    <>
      <div className={props.favorite ? "favorite-complited" : "todo-item"}>
        <div onClick={() => hundleFavorite(props.index)} className="favorite">
          ✔
        </div>
        <div className="todo-text">{props.text}</div>
        <div
          onClick={() => hundleDeleteTodo(props.index)}
          className="todo-delete-botton"
        >
          ❌
        </div>
      </div>
    </>
  );
};

export default Todo;
