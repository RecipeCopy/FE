import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../api/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", formData);
      localStorage.setItem("token", response.data.data.token); // JWT 토큰 저장
      alert("로그인 성공!");
      navigate("/main"); // 로그인 후 스크랩 페이지로 이동
    } catch (error) {
      alert("로그인 실패: " + error.response.data.message);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>로그인</Title>

        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>아이디</Label>
            <Input
              type="text"
              name="userId"
              placeholder="아이디를 입력하세요"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputWrapper>

          <Button type="submit">로그인</Button>
        </form>

        <Divider>또는</Divider>

        <SignupLink to="/signup">회원가입 하러가기</SignupLink>
      </FormWrapper>
    </Container>
  );
};

export default LoginForm;

// 스타일링
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const FormWrapper = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 25px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Divider = styled.div`
  margin: 1.5rem 0;
  font-size: 0.9rem;
  color: #aaa;
`;

const SignupLink = styled(Link)`
  display: inline-block;
  font-size: 0.9rem;
  color: #4caf50;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #388e3c;
  }
`;
