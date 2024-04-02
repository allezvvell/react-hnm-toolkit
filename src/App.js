import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './page/ProductPage';
import LogInPage from './page/LogInPage';
import NavBar from './component/NavBar';
import PrivateRoute from './route/PrivateRoute';
import FavoritePage from './page/FavoritePage';
import Footer from './component/Footer';


// 1. 전체상품, 로그인, 상세상품 페이지
// 1-1 네비게이션바 만들기
// 2. 전체상품 페이지에서는 전체 상품을 볼 수 있다.
// 3. 로그인 버튼을 누르면 로그인 페이지가 나온다.
// 4. 상품디테일 눌렀으나 로그인이 안돼있으면 로그인 페이지가 나온다.
// 5. 로그인이 돼있을 경우엔 상품 디테일 페이지를 볼 수 있다
// 6. 로그아웃 버튼을 클릭하면 로그아웃 된다
// 7. 로그아웃되면 상품 디테일 볼 수 없다. 다시 로그인 해줘야한다.
// 8. 로그인 하면 로그아웃이, 로그아웃을 하면 로그인이 보인다.
// 9. 상품을 검색 할 수 있다

function App() {
  return (
    <div>
      <NavBar 
      />
      <Routes>
        <Route 
          path='/' 
          element={<ProductPage />} 
        />
        <Route 
          path='/login' 
          element={<LogInPage />} 
        />
        <Route path='favorite' element={<FavoritePage />}/>
        <Route 
          path='/products/:id' 
          element={<PrivateRoute />} 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
