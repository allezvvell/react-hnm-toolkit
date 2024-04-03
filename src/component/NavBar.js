import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSearch, faShoppingBag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../redux/reducers/productSlice';
import { authActions } from '../redux/reducers/authSlice';




const NavBar = () => {
    const navigate = useNavigate();
    const [sum,setSum] = useState(0);
    const authenticate = useSelector(state=>state.auth.authenticate);
    const productList = useSelector(state=>state.product.productList);
    const cartList = useSelector(state => state.product.cartList);
    const dispatch = useDispatch();
    const menuList = [
        '여성',
        'Divied',
        '남성',
        '신생아/유아',
        '아동',
        'H&M HOME',
        'Sale',
        '지속가능성'
    ];
    const handleSearch = (e) => {
      if(e.key === 'Enter'){
        const inputValue = e.target.value;
        navigate(`/?q=${inputValue}`);
      }
    }
    const handleLoginbtn = () => {
      if(authenticate === true){
        dispatch(authActions.logoutSucess());
      }
      navigate('/login');
    }
    const goToFav = () => {
      navigate('/favorite')
    }
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOn = () => {
      mobileMenu.classList.add('active');
    }
    const mobileMenuOff = () => {
      mobileMenu.classList.remove('active');
    }
    const getSum = () => {
      const cartItems = productList?.filter(item => cartList.includes(item.id));
      const totalPrice = cartItems?.reduce((sum,value)=>{return sum + value.price},0);
      setSum(totalPrice);
    }
    const deleteItem = (e) => {
      const parentId = e.target.closest('li').id;
      const itemId = parentId.substr(parentId.indexOf('-')+1);
      const newCartList = cartList.filter(item => item !== parseInt(itemId));
      //dispatch({type : 'DELETE_CART',payload : {newCartList}});
      dispatch(productActions.deleteCart({newCartList}));
    }

    useEffect(()=>{
      getSum()
      //eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartList])

  return (
    <header>
      <div className='login-wrap'>
        <button className='hamburger' onClick={mobileMenuOn}><FontAwesomeIcon icon={faBars} /></button>
        <button onClick={handleLoginbtn} className={authenticate.toString()} id='login-btn'><FontAwesomeIcon icon={faUser} /></button>
        <button className='go-fav-btn' onClick={goToFav}><FontAwesomeIcon icon={faHeart} /><span>즐겨찾기</span></button>
        <div className='shop-preview'>
        <button className='cart-btn'><FontAwesomeIcon icon={faShoppingBag} /><span>쇼핑백</span></button>
          <div className='preview-wrap'>
            {cartList.length !== 0 ? (
              <ul>
                {productList?.filter(item => cartList.includes(item.id)).map((product,index) => {return <li key={index} id={`li-${product.id}`}>
                  <span className='img-box'><img src={product.img} alt={product.img}/></span>
                  <div className='txt-box'><div>{product.title}</div><span className='item-price'>₩{product.price}</span></div>
                  <button className='delete-btn' onClick={(e)=>{deleteItem(e)}}><FontAwesomeIcon icon={faXmark} /></button>
                </li>})}
              </ul>
            ):(<p className='empty'>쇼핑백이 비어 있습니다.</p>)}
            <div className='sum-wrap'>
              <span>합계</span>
              <span className='sum'>₩{sum}</span>
            </div>
            {cartList.length === 0 || <button className='pay-btn'>결제</button>}
          </div>
        </div>
      </div>
      <div className='logo-wrap'>
        <Link to='/'><img src='./assets/hnm-logo.png' alt='H&M로고' width='60px' /></Link>
      </div>
      <div className='menu-wrap'>
        <nav className='menu'>
            <ul>
                {
                    menuList.map((item,index) => {
                        return <li key={index}><a href='https://hnm-allezvvell.netlify.app'>{item}</a></li>
                    })
                }
            </ul>
        </nav>
        <div className='form-box'>
            <FontAwesomeIcon icon={faSearch}/>
            <input type='text' placeholder='제품검색' id='search-input' onKeyDown={(e)=>{handleSearch(e)}}/>
        </div>
      </div>
      <div className='mobile-menu'>
        <button className='close-btn' onClick={mobileMenuOff}><FontAwesomeIcon icon={faXmark} /></button>
        <ul>
          {menuList.map((item,index) => {
            return <li key={index}><a href='https://hnm-allezvvell.netlify.app'>{item}</a></li>
          })}
        </ul>
      </div>
    </header>
  )
}

export default NavBar
