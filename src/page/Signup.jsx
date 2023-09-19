import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    justify-content: center;
    
`;

const Title = styled.h2`
  font-size: 50px;
  margin-top: 10px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const SignupWrapper = styled.div`
  display: flex;
  justify-Content: space-between;
`

const Container = styled.div`
  text-align: center;
  width: 550px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 430px;
  border: 1px solid #434343;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Nanum Gothic', sans-serif;
`;

const Mention = styled.p`
  margin-top: 0px;
  color: #616161;
  font-size: 16px;
  font-family: 'Nanum Gothic', sans-serif;
`

const SignupButton = styled.button`
  width: 450px;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #434343;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.disabled ? '#C1C1C1' : '#606060')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(props) => (props.disabled ? '#C1C1C1' : '#484848')};
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validateForm(name, value);
  };

  const validateForm = (name, value) => {
    if (name === 'email') {
      setIsValid(value.includes('@') && values.password.length >= 8);
    } else if (name === 'password') {
      setIsValid(values.email.includes('@') && value.length >= 8);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isValid) {
      try {
        const response = await fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.status === 201) {
          console.log('회원가입 성공');
          navigate('/signin');

        } else {
          console.error('회원가입 실패');
        }
      } catch (error) {
        console.error('회원가입 요청 오류', error);
      }
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Signup</Title>
        <form onSubmit={handleSubmit}>
          <SignupWrapper>
            <Input
              type="email"
              name="email"
              value={values.email}
              placeholder='이메일을 입력해주세요.'
              onChange={handleChange}
              data-testid="email-input"
            />
          </SignupWrapper>
          <SignupWrapper>
            <Input
              type="password"
              name="password"
              value={values.password}
              placeholder='비밀번호를 입력해주세요.'
              onChange={handleChange}
              data-testid="password-input"
            />
          </SignupWrapper>
          <Mention>
            8자 이상의 비밀번호를 입력해주세요.
          </Mention>
          <SignupButton
            type="submit"
            data-testid="signup-button"
            disabled={!isValid}
          >
            회원가입
          </SignupButton>
        </form>
      </Container>
    </Wrapper>
  );
}

export default Signup;