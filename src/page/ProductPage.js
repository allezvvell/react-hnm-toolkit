import React, { useEffect, useState } from 'react';
import { Container,Row,Col, Alert } from 'react-bootstrap';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { productAction } from '../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';



const ProductPage = () => { 
  
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const productList = useSelector(state=>state.product.productList);
  const getProductList = () => {
    const query = searchParams.get('q') || '';
    setLoading(true);
    dispatch(productAction.getProductList(query));
    setLoading(false);
    }    

  useEffect(() => {
    getProductList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchParams]);

  if(!productList){
    return <Container>
      <Row className='loading-row'>
        <ClipLoader
          loading={loading}
          color={'#CC071E'}
          size={100} 
          data-testid="clip-loader"
        />
      </Row>
    </Container>
  }else if (productList && productList.length === 0){
    return <Container>
      <Row>
        <Alert variant='danger'>검색하신 {searchParams.get('q')}에 해당하는 상품이 없습니다.</Alert>
      </Row>
    </Container>
  }else{
    return <Container>
    <Row>
      {
        productList?.map((item,index) => {
          return <Col lg={3} md={6} key={index}><ProductCard item={item}/></Col>
        })
      }
    </Row>
  </Container>
  }
}

export default ProductPage