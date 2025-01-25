import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';

const AppRoutes: React.FC = () => {
  const UserList = lazy(() => import('../pages/user/UserList'));
  const CreateUser = lazy(() => import('../pages/user/CreateUser'));
  const EditUser = lazy(() => import('../pages/user/EditUser'));
  const ProductList = lazy(() => import('../pages/product/ProductList'));
  const CreateProduct = lazy(() => import('../pages/product/CreateProduct'));
  const EditProduct = lazy(() => import('../pages/product/EditProduct'));

  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* User Routes */}
          <Route index={true} element={<Navigate replace to={"/users"}/>}/>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />

          {/* Product Routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
         

          {/* Default Route */}
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
