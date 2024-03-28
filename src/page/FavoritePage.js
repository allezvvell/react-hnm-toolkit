import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FavProductCard from '../component/FavProductCard';



const FavoritePage = () => {
  const [favProducts,setFavProducts] = useState(null);
  const [favList,setFavList] = useState(JSON.parse(localStorage.getItem('favId')));
  const getFavProduct = async () => {
    const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products`;
    const response = await fetch(URL);
    const data = await response.json();
    const favData = data.filter((item) => 
        favList.includes(item.id)
    );
    setFavProducts(favData);   
  }
  const navigate = useNavigate();
  const goDetailPage = (id) => {
    navigate(`/products/${id}`)
  }

  useEffect(()=>{
    getFavProduct();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[favList])
  return (
    <div className='fav-wrap'>
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
  )
}

export default FavoritePage
