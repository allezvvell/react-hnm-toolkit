import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();
  const goToDetail = () => {
    navigate(`/products/${item.id}`);
  }
  const query = searchParams.get('q') || '';
  const itemTitle = item?.title;
  const titleLineStart = itemTitle.indexOf(query);
  const lineLength = query?.length;

  return (
    <div className='card' onClick={goToDetail}>
      <img src={item?.img} alt={item?.title}/>
      <span className='choice'>{item?.choice === true ? 'Conscious Choice' : ''}</span>
      {<h3>{itemTitle.slice(0,titleLineStart)}<span className='yellow'>{itemTitle.slice(titleLineStart,titleLineStart+lineLength)}</span>{itemTitle.slice(titleLineStart+lineLength,itemTitle.length)}</h3>}
      <strong>₩{item?.price}</strong>
      <em>{item?.new === true ? '신제품' : ''}</em>
    </div>
  )
}

export default ProductCard
