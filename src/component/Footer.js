import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
        <Container>
            <p>이 사이트의 콘텐츠는 저작권 보호를 받고 있는 H & M Hennes & Mauritz AB의 자산입니다.</p>
            <address>법인명 에이치앤엠헤네스 앤 모리츠 주식회사 | 통신판매업신고번호 : 2022-서울강남-01184 / 사업자등록| 번호: 220-87-83339 | 대표자: 아담 칼슨, 선 보라미, 아네타 포쿠친스카 서울특별시 강남구 영동대로 421, 9층 삼탄빌딩 (대치동) 06182 | 대표번호 080-822-0220 info.kr@hm.com </address>
            <h2><img src='./assets/hnm-logo.png' alt='로고 이미지'/></h2>
        </Container>
    </footer>
  )
}

export default Footer
