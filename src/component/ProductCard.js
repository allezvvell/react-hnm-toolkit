import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';




const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const goToDetail = () => {
    navigate(`/products/${item.id}`);
  }
  const addToFav = async (event) => {
    event.stopPropagation();
    if(localStorage.getItem('favId') === null){
      localStorage.setItem('favId',JSON.stringify([item.id]));
      dispatch({type:'SET_FAV_LIST',payload:{favlist:[item.id]}});
      event.target.parentElement.classList.add('active');
    }else{
      const favList = JSON.parse(localStorage.getItem('favId'));
      if(!favList.includes(item.id)){
        favList.push(item.id);
        localStorage.setItem('favId',JSON.stringify(favList));
        dispatch({type:'SET_FAV_LIST',payload:{favlist:favList}});
        event.target.parentElement.classList.add('active');
      }else{
        const newFavList = favList.filter((num) => num !== item.id);
        localStorage.setItem('favId',JSON.stringify(newFavList));
        dispatch({type:'SET_FAV_LIST',payload:{favlist:newFavList}});
        event.target.parentElement.classList.remove('active');
      }
    }
  }

const query = searchParams.get('q') || '';
const itemTitle = item?.title;
const titleLineStart = itemTitle.indexOf(query);
const lineLength = query.length;


  return (
    <div className='card' onClick={goToDetail}>
      <div className='img-box'>
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
