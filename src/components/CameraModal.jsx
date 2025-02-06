import React , {useRef, useState} from "react";
import styled from  "styled-components";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const CameraModal = ({onClose}) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage , setCaptruedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ recognizedIngredeint , setRecognizedIngredient] = useState(null);

    // 카메라 시작작
    const StartCamera = async () =>{
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video : true});
            if(videoRef.current){
                videoRef.current.srcObject= stream; 
            }
        } catch(eff){
            console.error("카메라 접근 오류: ",err);
            alert("카메라를 사용할 수 없습니다.");
        }
    };

    // 사진 찍기
    const captureImage = ()=>{
        const video =videoRef.current;
        const canvas = canvasRef.current;
        if(!video || !canvas ) return ;

        const context = canvas.getContext("2d");
        context.drawImage(VscEditorLayout, 0,0 ,canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL("image/png");
        setCaptruedImage(imageDataURL);
    }

    // 서버에 사진 전송 
    const sendToServer = async() =>{
        if(!captureImage) return;
        setLoading(true);

        try {
            const response = await axios.get(`${API_BASE_URL}/api/camera/open`);
            setRecognizedIngredient(response.data.ingredient);
        }catch (error){
            console.error("이미지 분석 실패", error);
            alert("이미지 분석에 실패했습니다.");
        }finally{
            setLoading(false);
        }
    };

    return (
        <ModalOverLay>
            <ModalContent>
                <h3>카메라로 재료인식</h3>
                <VideoWrapper>
                    {!captureImage ? (
                        <video ref = {videoRef} autoPlay playsInline />
                    ): (
                        <img src = {captureImage} alt = "Captured" />
                    )}
                </VideoWrapper>
                <canvas ref = {canvasRef} style = {{display:"none"}} />
                <ButtonContainer>
                    {!captureImage ? (
                        <Button onClick = {StartCamera}>카메라 켜기</Button>
                    ): (
                        <Button onClick={sendToServer} disabled ={loading}>
                            {loading ? "분석 중 ..." : "재료 찾기"}
                        </Button>
                    )}
                    <Button onClick={captureImage} disabled={!videoRef.current}>
                        사진찍기 
                    </Button>
                    <Button onClick ={onClose}>닫기</Button>
                </ButtonContainer>

                {recognizedIngredeint && (
                    <ResultContainer>
                        <p>인식된 재료: {recignizedIngredient}</p>
                    </ResultContainer>
                )}
            </ModalContent>
        </ModalOverLay>
    )

}

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
  width: 100%;
  max-width: 400px;
  height: 300px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;

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