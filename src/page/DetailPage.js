import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useParams } from 'react-router-dom';



const DetailPage = () => {
  const [productDetail,setProductDetail] = useState(null);
  const {id} = useParams();
  const getProductDetail = async () => {
    const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products/${id}`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setProductDetail(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getProductDetail();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className='detail-wrap container'>
      <div className='row'>
        <div className='col-md-6 col-12'>
          <img src={productDetail?.img} alt={productDetail?.title}/>
        </div>
        <div className='desc-box col-md-6 col-12'>
          <h3>{productDetail?.title}</h3>
          <strong>₩ {productDetail?.price}</strong>
          <span className='choice'>{productDetail && productDetail.choice === true?'Conscious Choice':''}</span>
          <Dropdown className='select-size'>
            <DropdownToggle variant='outline-dark'>사이즈 선택</DropdownToggle>
            <DropdownMenu>
              {productDetail?.size.map((size,index) => <DropdownItem key={index}>{size}</DropdownItem>)}
            </DropdownMenu>
          </Dropdown>
          <button className='btn btn-dark btn-cart'>추가</button>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
