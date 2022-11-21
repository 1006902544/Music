import React from 'react';
import Login from '@/views/Login/Login';
import Layout from '@/views/Layout/Layout';
import Main from '@/views/Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = (): React.ReactElement => {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;