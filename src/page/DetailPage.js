import React, { useEffect } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productAction } from '../redux/actions/productAction';




const DetailPage = ({}) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector(state=>state.product.productDetail);
  const cartList = useSelector(state => state.product.cartList);
  const getProductDetail = async () => {
    dispatch(productAction.getProductDetail(id)) 
  }
  const addCart = () => {
    dispatch({type:'ADD_CART',payload:{id:parseInt(id)}})
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
          <button className='btn btn-dark btn-cart' onClick={addCart}>쇼핑백 담기</button>
          <button className='btn btn-danger btn-buy'>바로 구매하기</button>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
