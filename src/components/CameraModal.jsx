import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const CameraModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recognizedIngredient, setRecognizedIngredient] = useState(null);
  const [isMobile , setIsMobile] = useState(false);

  // 카메라 자동 실행 (모달 열릴 때)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 노트북 카메라 실행
  useEffect(() => {
    if (!isMobile) {
      StartCamera();
    }
  }, [isMobile]);

  // 모달 닫기 (카메라 중지 후 종료)
  const handleClose = () => {
    stopCamera();
    onClose();
  };


  //  노트북 카메라 시작 
  const StartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("카메라 접근 오류:", err);
      alert("카메라를 사용할 수 없습니다.");
    }
  };

  // 핸드폰 카메라에서 사진 업로드 
  const handleImageUpload = (event) => {
    const file =event.target.files[0];
    if(file){
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);  // 캡쳐된 이미지 화면에 표시 
    }
  }; 

  
  // 노트북 사진 찍기 함수 
  const captureImage = () => {
    if (isMobile) return;  // 모바일에션 x 
  
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
  
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    const imageDataURL = canvas.toDataURL("image/png");
    setCapturedImage(imageDataURL);
  };
  
  //서버에 사진 전송
  const sendToServer = async () => {
    if (!capturedImage) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", dataURItoBlob(capturedImage));

      const response = await axios.post(`${API_BASE_URL}/api/camera/open`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRecognizedIngredient(response.data.ingredient);
    } catch (error) {
      console.error("이미지 분석 실패:", error);
      alert("이미지 분석에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Data URL을 Blob으로 변환 (파일 전송을 위해 필요)
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <ModalOverlay>
      <ModalContent>
      <CloseButton onClick ={onClose}>X</CloseButton>
        <h3>카메라로 재료 인식</h3>
        
        
        {isMobile && ( 
        <input 
          type = "file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          style = {{display:"none"}}
          ref={fileInputRef}
        />
        )}
        
        <VideoWrapper>
          {!capturedImage ? (
            isMobile ? (
              <p>재료 사진을 찍어주세요.</p>
            ) : (
              <video ref={videoRef} autoPlay playsInline />
            )
          ) : (
            <img src={capturedImage} alt="Captured" />
          )}
        </VideoWrapper>

        <ButtonContainer>
          {/* 모바일: 핸드폰 카메라 실행 버튼 / 노트북: 사진 찍기 */}
          <Button onClick={() => isMobile ? fileInputRef.current.click() : captureImage()}>
            📸 {isMobile ? "사진 찍기" : "캡처"}
          </Button>

          {/* 서버 전송 버튼 */}
          {capturedImage && (
            <Button onClick={sendToServer} disabled={loading}>
              {loading ? "분석 중..." : "재료 찾기"}
            </Button>
          )}
        </ButtonContainer>

        {recognizedIngredient && (
          <ResultContainer>
            <p>인식된 재료: <strong>{recognizedIngredient}</strong></p>
          </ResultContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CameraModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 8px 12px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #ff5252;
  }
`;

const ResultContainer = styled.div`
  margin-top: 15px;
  font-size: 16px;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  font-size: 16px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: darkred;
  }
`;