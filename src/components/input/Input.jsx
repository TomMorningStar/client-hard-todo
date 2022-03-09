import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTodo } from "../../redux/todos";

const Input = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const todos = useSelector((state) => state.items);
  const itemCheck = todos.find(item => item.text === text)

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    if (!itemCheck) {
    if (text !== "") {
      dispatch(AddTodo(text));
    }
    setText("");
    }
  };

  return (
    <>
      <div className="title">Список дел</div>
      <div className="input-container">
        <input
          value={text}
          onChange={handleText}
          placeholder="Введите текст.."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </>
  );
};

export default Input;
