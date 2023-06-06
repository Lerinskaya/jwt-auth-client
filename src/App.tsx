import { useContext, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import Table from './components/Table';

function App() {
  const {store} = useContext(Context);

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if(store.isLoading) {
    return (
      <div className='container w-100 vh-100 d-flex justify-content-center'>
        <div className="spinner-border text-primary align-self-center spinner" role="status"></div>
      </div>
    )
  }

  if(!store.isAuth) {
    return (
      <div className='container w-100 vh-100 d-flex justify-content-center'>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div className="App">
      <Table/>
    </div>
  );
}

export default observer(App);
