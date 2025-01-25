import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [cost, setCost] = useState<number | ''>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/product/get-products/${id}`);
      setName(data.name);
      setCost(data.cost);
    };
    fetchProduct();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (picture) formData.append('picture', picture);
    formData.append('cost', cost.toString());

    await api.put(`/product/update-product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    navigate('/products');
  };

  return (
    <div className="container mt-5">
      <h1>Edit Product</h1>
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
          <label htmlFor="picture" className="form-label">
            Picture
          </label>
          <input
            type="file"
            id="picture"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Cost
          </label>
          <input
            type="number"
            id="cost"
            className="form-control"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
