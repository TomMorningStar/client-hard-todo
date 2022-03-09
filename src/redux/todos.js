const initialState = {
  loading: false,
  items: [],
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/fetch/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case "todos/fetch/reject":
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case "todos/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "addTodo/fetch/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case "todos/fetch/delete":
      return {
        ...state,
        items: state.items.filter((todo) => {
          return todo._id !== action.payload;
        }),
        loading: false,
      };

    case "todos/fetch/favorite":
      return {
        ...state,
        items: state.items.map((todo) => {
          if(todo._id === action.payload) {
            todo.favorite = !todo.favorite
          };
          return todo
        }),
        loading: false,
      }

    default:
      return state;
  }
};

export const fetchAllTodos = () => {
  return async (dispatch) => {
    dispatch({ type: "todos/fetch/pending" });
    try {
      const response = await fetch("http://localhost:3567/todos");
      const todo = await response.json();

      dispatch({ type: "todos/fetch/fulfilled", payload: todo });
    } catch (e) {
      dispatch({ type: "todos/fetch/rejected", error: e.toString() });
    }
  };
};

export const AddTodo = (text) => {
  return async (dispatch) => {
    dispatch({ type: "todos/fetch/pending" });
    try {
      const todo = { text: text };
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(todo),
      };
      const res = await fetch("http://localhost:3567/todos", params);
      const data = await res.json();
      dispatch({ type: "addTodo/fetch/fulfilled", payload: data });
    } catch (e) {
      dispatch({ type: "todo/fetch/rejected", error: e.toString() });
    }
  };
};

export const deleteTodo = (index) => {
  console.log(index);
  return async (dispatch) => {
    dispatch({ type: "todos/fetch/pending" });
    try {
      await fetch(`http://localhost:3567/todos/${index}`, { method: "DELETE" });
      dispatch({ type: "todos/fetch/delete", payload: index });
    } catch (e) {
      dispatch({ type: "todo/fetch/rejected", error: e.toString() });
    }
  };
};

export const getSelect = (index, favorite) => {
  return async (dispatch) => {
    dispatch({ type: "todos/fetch/pending" });
    try {
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ favorite: favorite }),
      };

      await fetch(`http://localhost:3567/todos/${index}`, params);
      dispatch({ type: "todos/fetch/favorite", payload: index });
    } catch (e) {
      dispatch({ type: "todo/fetch/rejected", error: e.toString() });
    }
  };
};
