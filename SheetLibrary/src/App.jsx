import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Upload from './pages/Upload';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Piece from './pages/Piece';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/sheet/:id" element={<Piece />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;