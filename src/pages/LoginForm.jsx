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
      console.log("로그인 응답 데이터:", response.data);

      if (!response.data.data) {
        console.error("response.data.data가 없습니다!", response.data);
        alert("서버 응답 오류 발생. 다시 시도해주세요.");
        return;
      }

      const { token } = response.data.data; // userId 대신 token만 받음
      console.log("받은 토큰:", token);

      if (!token) {
        console.error("로그인 응답에서 `token`이 없습니다!", response.data.data);
        alert("서버에서 토큰 값을 반환하지 않습니다. 백엔드 API 확인 필요!");
        return;
      }

      // 2️⃣ 토큰 저장
      localStorage.setItem("token", token);

      // 3️⃣ 닉네임 조회 요청 (토큰을 헤더에 포함)
      const userResponse = await API.get("/user", {
        headers: { Authorization: `Bearer ${token}` }, //헤더에 토큰 추가
      });

      console.log("닉네임 조회 응답:", userResponse.data);
      const { nickName } = userResponse.data;

      if (nickName) {
        localStorage.setItem("nickName", nickName); // 닉네임 저장
      } else {
        console.warn("닉네임을 가져오지 못했습니다.");
      }

      alert("로그인 성공!");
      navigate("/main");

    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error);
      alert("로그인 실패: " + (error.response?.data?.message || "서버 오류 발생"));
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
