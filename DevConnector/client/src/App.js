import React ,{Fragment} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
