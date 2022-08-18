import React, { useState } from "react";
import { useSelector } from "react-redux";

function Practise() {
  const category = useSelector((state) => state.category);
  console.log(category);
  const [todos, setTodos] = useState([
    { title: "walk", selected: "false", id: 0 },
    { title: "meditate", selected: "false", id: 1 },
    { title: "dane", selected: "false", id: 2 },
  ]);

  const handleClick = () => {};

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
export default Practise;
// <select onChange={(e) => setSort(e.target.value)}>
