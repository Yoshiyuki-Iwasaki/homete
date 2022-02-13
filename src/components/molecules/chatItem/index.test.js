import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import ChatInput from '../ChatInput';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    };
  },
}));

describe('ChatInput 初期表示の確認', () => {
  test('ChatInput', () => {
    const { asFragment } = render(<ChatInput />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the correct initial DOM', () => {
    const doc = render(<ChatInput />);
    const inputElement = doc.getByTestId('input');
    // The input should be blank.
    expect(inputElement.getAttribute('value')).toBe('');
  });

  test('it creates a new todo', () => {
    const doc = render(<ChatInput />);

    const inputElement = doc.getByTestId('input');
    const createButton = doc.getByTestId('createButton');

    fireEvent.change(inputElement, { target: { value: 'ChatItem.' } });
    fireEvent.click(createButton);

    const todos = doc.queryAllByTestId('todo');
    const todoInput = doc.queryByTestId('todoInput');

    // The name should be in the document as "Feed my dog."
    // expect(todoInput.value).toBe('ChatItem.');

    // expect(inputElement.value).toBe('');

    // // The todo should be in the document.
    // expect(todoInput).toBeInTheDocument();

    // // There should be 1 todo in the document.
    // expect(todos.length).toBe(1);
  });
});
