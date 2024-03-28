import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';



const NavBar = ({authenticate,setAuthenticate}) => {
    const navigate = useNavigate();
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
        setAuthenticate(false)
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
  return (
    <header>
      <div className='login-wrap'>
        <button onClick={handleLoginbtn} className={authenticate.toString()} id='login-btn'><FontAwesomeIcon icon={faUser} /></button>
        <button className='go-fav-btn' onClick={goToFav}><FontAwesomeIcon icon={faHeart} />즐겨찾기</button>
        <button className='hamburger' onClick={mobileMenuOn}><FontAwesomeIcon icon={faBars} /></button>
      </div>
      <div className='logo-wrap'>
        <Link to='/'><img src='./assets/hnm-logo.png' alt='H&M로고' width='100px' /></Link>
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
