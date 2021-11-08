import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "../TodoList";

test("renders the correct initial DOM", () => {
  const doc = render(<TodoList />);
  const inputElement = doc.getByTestId("input");
  const todos = doc.queryAllByTestId("todo");

  // The input should be blank.
  expect(inputElement.getAttribute("value")).toBe("");

  // There should be 0 todos in the document.
  expect(todos.length).toBe(0);
});
