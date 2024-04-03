import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FavProductCard from '../component/FavProductCard';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFav, productActions } from '../redux/reducers/productSlice';




const FavoritePage = () => {
  const favList = useSelector(state=>state.product.favList);
  const favProducts = useSelector(state => state.product.favProducts);
  const loadingFav = useSelector(state=>state.product.loadingFav);
  const dispatch = useDispatch();
  const getFavProduct = () => {
    dispatch(productActions.trueLoadingFav());
    dispatch(fetchFav()); 
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
          loading={loadingFav}
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
              <FavProductCard item={item} />
          </Col>})}
      </Row>
    </Container>
  </div>
  } 

}

export default FavoritePage