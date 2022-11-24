import React from 'react';
import Login from '@/views/Login/Login';
import Layout from '@/views/Layout/Layout';
import Main from '@/views/Main/Main';
import Cart from '@/views/Main/views/Cart/Cart';
import Mine from '@/views/Main/views/Mine/Mine';
import Shop from '@/views/Main/views/Shop/Shop';
import Square from '@/views/Main/views/Square/Square';
import User from '@/views/Main/views/User/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = (): React.ReactElement => {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main key={'/'} />}>
            <Route path="/square" element={<Square />}></Route>
            <Route path="/mine" element={<Mine />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Route>
          <Route path="/login" element={<Login key={'/login'} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;