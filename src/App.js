import { useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import PuppiesSell from './pages/add-products/PuppiesSell';
import { login, logout } from './features/userSlice';
import { auth } from './components/Firebase';
import ProductSell from './pages/add-products/ProductSell';
import StudServices from './pages/add-products/StudServicesAdd';


function App() {


const dispatch = useDispatch()

useEffect(() => {
  const unSubscribe = auth.onAuthStateChanged((userAuth) => {
    if (userAuth) {
      dispatch(login({
        uid: userAuth.uid,
        email: userAuth.email
      }))
    } else {
      dispatch(logout());
    }
  })
  return unSubscribe
}, [dispatch])

  return (
    <div className="App">
      {/* <NavBar/> */}

<Router>
  <Route path='/' exact>
    <Home/>
  </Route>
  <Route exact path='/add-puppies'>
    <PuppiesSell/>
  </Route>
  <Route exact path='/am-admin/login'>
    <Login/>
  </Route>
  <Route exact path='/add-products'>
    <ProductSell/>
  </Route>
  <Route exact path='/add-stud-dog'>
    <StudServices/>
  </Route>
</Router>
    </div>
  );
}

export default App;
