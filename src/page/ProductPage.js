import React, { useEffect, useState } from 'react';
import { Container,Row,Col, Alert } from 'react-bootstrap';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';

const ProductPage = ({}) => { 
  const [productList,setProductList] = useState(null);
  const [searchParams] = useSearchParams();
  const getProductList = async () => {
    const query = searchParams.get('q') || '';
    let URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products/?q=${query}`; 
    try {
      let res = await fetch(URL);
      let data = await res.json();
      setProductList(data);
    } catch (error) {
      console.log(error);
    }
      }    

  useEffect(() => {
    getProductList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchParams]);

  if(!productList){
    return <Container>
      <Row>
        상품을 불러오는중입니다.
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
          return <Col lg={3} key={index}><ProductCard item={item} productList={productList} setProductList={setProductList}/></Col>
        })
      }
    </Row>
  </Container>
  }
}

export default ProductPage