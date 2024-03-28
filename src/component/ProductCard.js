import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';



const ProductCard = ({item,productList,setProductList}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const goToDetail = () => {
    navigate(`/products/${item.id}`);
  }
  const addToFav = (event) => {
    event.stopPropagation();
    if(localStorage.getItem('favId') === null){
      localStorage.setItem('favId',JSON.stringify([item.id]));
      event.target.parentElement.classList.add('active');
      const newProductList = productList.map((obj) => {
        if(obj.id === item.id){
          obj.fav = true;
          return obj
        }else{
          return obj
        }
      });
      setProductList(newProductList);
    }else{
      const favList = JSON.parse(localStorage.getItem('favId'));
      if(favList.includes(item.id) === false){
        favList.push(item.id);
        localStorage.setItem('favId',JSON.stringify(favList));
        event.target.parentElement.classList.add('active');
      }else{
        const newFavList = favList.filter((num) => num !== item.id);
        localStorage.setItem('favId',JSON.stringify(newFavList));
        event.target.parentElement.classList.remove('active');
      }
    }
  }

const query = searchParams.get('q') || '';
const itemTitle = item?.title;
const titleLineStart = itemTitle.indexOf(query);
const lineLength = query?.length;


const isFavProduct = () => {
  if(localStorage.getItem('favId') !== null && JSON.parse(localStorage.getItem('favId')).includes(item.id)){  
    document.querySelector(`.btn${item.id}`).classList.add('active');
    console.log('its included');
  }
}

useEffect(() => {
  isFavProduct();
  //eslint-disable-next-line react-hooks/exhaustive-deps
},[searchParams])

  return (
    <div className='card' onClick={goToDetail}>
      <div className='img-box'>
        {item?.fav === true ? <button>취향</button>:''}
        <img src={item?.img} alt={item?.title}/>
        <button className={`btn${item.id} fav-btn`} onClick={(e) => {addToFav(e)}}><FontAwesomeIcon icon={faHeart} /></button>
      </div>
      <span className='choice'>{item?.choice === true ? 'Conscious Choice' : ''}</span>
      {<h3>{itemTitle.slice(0,titleLineStart)}<span className='yellow'>{itemTitle.slice(titleLineStart,titleLineStart+lineLength)}</span>{itemTitle.slice(titleLineStart+lineLength,itemTitle.length)}</h3>}
      <strong>₩{item?.price}</strong>
      <em>{item?.new === true ? '신제품' : ''}</em>  
    </div>
  )
}

export default ProductCard
