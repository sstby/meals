import React from 'react';
import App from './App';
import NotFound from './NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
}

export default Router;