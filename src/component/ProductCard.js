import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';




const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [random,setRandom] = useState(0);
  const goToDetail = () => {
    navigate(`/products/${item.id}`);
  }
  const addToFav = async (event) => {
    event.stopPropagation();
    if(localStorage.getItem('favId') === null){
      localStorage.setItem('favId',JSON.stringify([item.id]));
      event.target.parentElement.classList.add('active');
      const res = await fetch(`https://my-json-server.typicode.com/allezvvell/react-hnm/products/${item.id}`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify( { fav: true } ) 
      });
      const data = await res.json();
      console.log(data);
    }else{
      const favList = JSON.parse(localStorage.getItem('favId'));
      if(!favList.includes(item.id)){
        favList.push(item.id);
        localStorage.setItem('favId',JSON.stringify(favList));
        event.target.parentElement.classList.add('active');
        const res = await fetch(`https://my-json-server.typicode.com/allezvvell/react-hnm/products/${item.id}`,{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
          body: JSON.stringify( { fav: true } ) 
        });
        const data = await res.json();
        console.log(data);
      }else{
        const newFavList = favList.filter((num) => num !== item.id);
        localStorage.setItem('favId',JSON.stringify(newFavList));
        event.target.parentElement.classList.remove('active');
        const res = await fetch(`https://my-json-server.typicode.com/allezvvell/react-hnm/products/${item.id}`,{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PATCH',
          body: JSON.stringify( { fav: false } ) 
        });
        const data = await res.json();
        console.log(data);
      }
    }
  }

const query = searchParams.get('q') || '';
const itemTitle = item?.title;
const titleLineStart = itemTitle.indexOf(query);
const lineLength = query?.length;


  return (
    <div className='card' onClick={goToDetail}>
      <div className='img-box'>
        {item?.fav === true ? <button>취향</button>:''}
        <img src={item?.img} alt={item?.title}/>
        <button className={`btn${item.id} fav-btn ${localStorage.getItem('favId') !== null && JSON.parse(localStorage.getItem('favId')).includes(item.id) ? 'active' : ''}`} onClick={(e) => {addToFav(e)}}><FontAwesomeIcon icon={faHeart} /></button>
      </div>
      <span className='choice'>{item?.choice === true ? 'Conscious Choice' : ''}</span>
      {<h3>{itemTitle.slice(0,titleLineStart)}<span className='yellow'>{itemTitle.slice(titleLineStart,titleLineStart+lineLength)}</span>{itemTitle.slice(titleLineStart+lineLength,itemTitle.length)}</h3>}
      <strong>₩{item?.price}</strong>
      <em>{item?.new === true ? '신제품' : ''}</em>  
    </div>
  )
}

export default ProductCard
