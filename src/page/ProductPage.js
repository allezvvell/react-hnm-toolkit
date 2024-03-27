import React, { useEffect, useState } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';

const ProductPage = () => { 
  const [productList,setProductList] = useState([]);
  const [searchParams] = useSearchParams();
  const getProductList = async () => {
    const query = searchParams.get('q') || '';
    let URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products/?q=${query}`; 
    try {
      let res = await fetch(URL);
      let data = await res.json();
      const newData = [...data].sort(()=>Math.random()-0.5);
      setProductList(newData);
    } catch (error) {
      console.log(error);
    }
      }     
  useEffect(() => {
    getProductList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchParams]);

  return (
    productList.length !== 0 ? (
      <div>
      <Container>
        <Row>
          {
            productList?.map((item,index) => {
              return <Col lg={3} key={index}><ProductCard item={item}/></Col>
            })
          }
        </Row>
      </Container>
    </div>
    ) : (
      <div>
        <Container>
          <Row>
            해당하는 상품이 없습니다.
          </Row>
        </Container>
      </div>
    )
  )
}

export default ProductPage