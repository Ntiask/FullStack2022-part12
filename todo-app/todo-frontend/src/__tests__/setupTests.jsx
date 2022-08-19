// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import List from '../Todos/List'
import React from 'react';
import { render } from '@testing-library/react'

const deleteTodo = () => console.log('testing')
const completeTodo = () => console.log('testing')

const data = [
    {
    "_id": "62fe20d53c768fad6f37fe70",
    "text": "HAHAA",
    "done": false,
    "__v": 0
    }
    ]


describe('test', () => {
    it('renders all needed elements', () => {
      const { debug, getByText } = render(<List todos={data} deleteTodo={deleteTodo} completeTodo={completeTodo}/>);
      debug();
      expect(getByText('HAHAA')).toBeDefined();

    });
  });