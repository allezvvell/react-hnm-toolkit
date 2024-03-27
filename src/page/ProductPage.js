import React, { useEffect, useState } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';

const ProductPage = () => { 
  const [productList,setProductList] = useState(null);
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

  if(!productList){
    return <Container>
      <Row>
        상품을 불러오는중입니다.
      </Row>
    </Container>
  }else if (productList && productList.length === 0){
    return <Container>
      <Row>
        해당하는 상품이 없습니다.
      </Row>
    </Container>
  }else{
    return <Container>
    <Row>
      {
        productList?.map((item,index) => {
          return <Col lg={3} key={index}><ProductCard item={item}/></Col>
        })
      }
    </Row>
  </Container>
  }
}

export default ProductPage


// productList.length !== 0 ? (
//   <div>
//   <Container>
//     <Row>
//       {
//         productList?.map((item,index) => {
//           return <Col lg={3} key={index}><ProductCard item={item}/></Col>
//         })
//       }
//     </Row>
//   </Container>
// </div>
// ) : (
//   <div>
//     <Container>
//       <Row>
//         해당하는 상품이 없습니다.
//       </Row>
//     </Container>
//   </div>
// )