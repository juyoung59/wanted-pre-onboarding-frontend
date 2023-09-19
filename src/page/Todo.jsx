import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Noto+Sans+KR&display=swap" rel="stylesheet"></link>

const Wrapper = styled.div`
    padding: 0 16px 0 16px;
    width: calc(100% - 32px);
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-top: 10px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Container = styled.div`
  width: 550px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  flex-direction: column;
  background-color: #FFF4E8;
  display: ${(props) => (props.isEmpty ? 'none' : 'flex')};
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 50px;
  margin-right: 20px;
  width: 430px;
  border: 1px solid #434343;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Nanum Gothic', sans-serif;
`;

const AddButton = styled.button`
  padding: 10px;
  width: 70px;
  border-radius: 10px;
  border: 1px solid #434343;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 16px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  background-color: #606060;
  cursor: pointer;
  &:hover {
    background-color: #484848;
  }
`

const TodoList = styled.ul`
  font-size: 18px;
  font-family: 'Nanum Gothic', sans-serif;
`

const TodoCheck = styled.input`
  margin-right: 10px;
  width: 15px;
  height: 15px;
`

const TodoItem = styled.li`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

const EditButton = styled.button`
  width: 50px;
  height: 28px;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #606060;
  color: #FF7033;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  background-color: #FCD3A3;
  cursor: pointer;
  &:hover {
    background-color: #FFBD6F;
  }
`



function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const response = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setTodos(data);
        } else {
          console.error('Failed to fetch todos:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {

      const addTodo = async () => {
        try {
          const response = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: newTodo }),
          });

          if (response.status === 201) {
            const data = await response.json();
            setTodos([...todos, data]);
            setNewTodo('');
          } else {
            console.error('Failed to add todo:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      };

      addTodo();
    }
  };

  const handleDeleteTodo = async (id) => {

    try {
      const response = await fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 204) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        console.error('Failed to delete todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id, isCompleted) => {

    try {
      const response = await fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: todos.find(todo => todo.id === id).todo, isCompleted: !isCompleted }),
      });

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
        );
        setTodos(updatedTodos);
      } else {
        console.error('Failed to toggle todo completion:', response.statusText);
      }
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };
  
  const handleEditClick = (id, text) => {

    setEditTodo(id);
    setEditText(text);
  };

  const handleEditCancel = () => {

    setEditTodo(null);
    setEditText('');
  };

  const handleEditSubmit = async (id) => {

    try {
      const response = await fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: editText, isCompleted: todos.find(todo => todo.id === id).isCompleted }),
      });

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, todo: editText } : todo
        );
        setTodos(updatedTodos);
        setEditTodo(null);
        setEditText('');
      } else {
        console.error('Failed to submit todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
  };

  return (
    <Wrapper>
      <Title>Todo List</Title>
      <div>
        <Input
          type="text"
          value={newTodo}
          placeholder='할 일을 입력하세요.'
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <AddButton onClick={handleAddTodo}>추가</AddButton>
      </div>
      <Container isEmpty={todos.length === 0}>
        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo.id}>
              <label>
                <TodoCheck
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleComplete(todo.id, todo.isCompleted)}
                />
                {editTodo === todo.id ? (
                  <>
                    <input
                      data-testid="modify-input"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <EditButton data-testid="submit-button" onClick={() => handleEditSubmit(todo.id)}>제출</EditButton>
                    <EditButton data-testid="cancel-button" onClick={handleEditCancel}>취소</EditButton>
                  </>
                ) : (
                  <>
                    <span>{todo.todo}</span>
                    <EditButton data-testid="modify-button" onClick={() => handleEditClick(todo.id, todo.todo)}>수정</EditButton>
                  </>
                )}
              </label>
              {editTodo !== todo.id && (
                <EditButton data-testid="delete-button" onClick={() => handleDeleteTodo(todo.id)}>삭제</EditButton>
              )}
            </TodoItem>
          ))}
        </TodoList>
      </Container>
    </Wrapper>
  );
}

export default TodoApp;
