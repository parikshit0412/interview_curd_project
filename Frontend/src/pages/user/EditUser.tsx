import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { formatDate } from '../../services/helper';
import { ProductType } from '../../types/CommonTypes';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [productId, setProductId] = useState<string>('');
  const [unsoldProducts, setUnsoldProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await api.get(`/user/get-users/${id}`);
      setName(data.name);
      setEmail(data.email);
      setDOB(data.DOB);
    };
    fetchUser();
    fetchUnsoldProducts();
  }, []);


      const fetchUnsoldProducts = async () => {
        const { data } = await api.get('/product/get-unsold-products');
        setUnsoldProducts(data);
      };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/user/update-user/${id}`, { name, email, DOB, productId});
    navigate('/users');
  };

  return (
    <div className="container mt-5">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            className="form-control"
            value={formatDate(DOB)}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">
            Select Product
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option selected>Open this select menu</option>
            {unsoldProducts.map((product) => (
              <option
                value={product._id}
              >{`${product.name} Price ${product.cost}`}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
