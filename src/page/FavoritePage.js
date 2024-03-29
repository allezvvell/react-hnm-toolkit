import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FavProductCard from '../component/FavProductCard';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';




const FavoritePage = () => {
  const [favProducts,setFavProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favList,setFavList] = useState(JSON.parse(localStorage.getItem('favId')));
  const getFavProduct = async () => {
    const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products`;
    setLoading(true);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const favData = data.filter((item) => 
      favList.includes(item.id)
      );
      setFavProducts(favData); 
    } catch (error) {
      console.log(error);
    }
    setLoading(false);  
  }

  useEffect(()=>{
    getFavProduct();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[favList])
  
  if(!favProducts || favProducts.length === 0){
    return <div className='fav-wrap'>
    <Container>
      <h2>즐겨찾기</h2>
      <Row className='loading-row'>
        <ClipLoader 
          loading={loading}
          color={'#CC071E'}
          size={100} 
          data-testid="clip-loader-two"
        />
      </Row>
      <Row className='no-fav-row'>
        <p>좋아하는 아이템을 저장하세요.<br/> 아이템의 하트 기호를 클릭하면 여기에 나타납니다!</p>
        <div><Link to='/'>지금 찾아보기</Link></div>
      </Row>
    </Container>
  </div>
  }else{
    return <div className='fav-wrap'>
    <Container>
      <h2>즐겨찾기</h2>
      <Row>
          {favProducts?.map((item,index)=>{
            return <Col key={index} lg={3}>
              <FavProductCard item={item} setFavList={setFavList} favList={favList}/>
          </Col>})}
      </Row>
    </Container>
  </div>
  } 

}

export default FavoritePage