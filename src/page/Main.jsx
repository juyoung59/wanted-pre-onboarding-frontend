import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Noto+Sans+KR&display=swap" rel="stylesheet"></link>

const Header = styled.header`
  display: flex;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  color: black;
  padding: 15px 50px;
`;

const MainTitle = styled.h1`
  margin: 0;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    
  }

  li {
    margin-left: 20px;
    color: #6D6D6D;
    font-weight: bold;
    font-family: 'Nanum Gothic', sans-serif;
  }

  a {
    text-decoration: none;
    color: #6D6D6D;
    
  }
`;

const Title = styled.h2`
  font-size: 35px;
  margin-top: 80px;
  margin-left: 130px;
  font-family: 'Noto Sans KR', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
`;

const Comment = styled.p`
  font-size: 25px;
  margin-top: 10px;
  margin-left: 160px;
`

const Button = styled.button`
  padding: 10px;
  width: 180px;
  height: 55px;
  border-radius: 30px;
  border: 1px solid #434343;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  color: black;
  font-size: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 680px;
  cursor: pointer;
  &:hover {
    background-color: #D2D2D2;
  }
`

const Main = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/todo');
    };

  return (
    <div>
      <Header>
        <MainTitle>Main Page</MainTitle>
        <Nav>
          <ul>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li> | </li>
            <li>
              <Link to="/signin">로그인</Link>
            </li>
          </ul>
        </Nav>
      </Header>
      <main>
        <Title>Todo List</Title>
        <Comment>📝 Todo List를 작성해보세요.</Comment>
        <Comment>✅ 체크박스를 통해 리스트를 관리할 수 있어요.</Comment>
        <Comment>🪄 추가, 수정, 삭제가 자유로워요.</Comment>
        <Button onClick={handleButtonClick}>바로 가기</Button>
      </main>
    </div>
  );
};

export default Main;
