import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import { ProductType } from "../../types/CommonTypes";
import Pagination from "../../components/Pagination";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userSearch, setUserSearch] = useState<{
    userName: string;
    productName: string;
    fromDate: string | number | readonly string[] | undefined;
    toDate: string | number | readonly string[] | undefined;
  }>({ userName: "", productName: "", fromDate: "", toDate: "" });
  const [pagination, setPagination] = useState<{
    totalCount: number;
    currentPage: number;
    totalPage: number;
  }>({
    totalCount: 0,
    currentPage: 0,
    totalPage: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (page: number = 1, isClearSearch: boolean = false) => {
    setLoading(true);
    try {
      let searchData = isClearSearch? { userName: "", productName: "", fromDate: "", toDate: "" } : userSearch;
      const { data } = await api.post(
        `/product/get-products?page=${page}`,
        searchData
      );
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
  };

  const deleteProduct = async (id: string) => {
    await api.delete(`/product/delete-product/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };
  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  const handleSearchSubmit = async () => {
    fetchProducts();
  };
  const clearSearch = () => {

    setUserSearch({ userName: "", productName: "", fromDate: "", toDate: "" });
    fetchProducts(1, true);
   
  }

  const columns = [
    {
      name: "Name",
      selector: (row: ProductType) => row.name,
      sortable: true,
    },
    {
      name: "Cost",
      selector: (row: ProductType) => `$${row.cost}`,
      sortable: true,
    },
    {
      name: "Picture",
      cell: (row: ProductType) => (
        <img
          src={`http://localhost:8200/${row.picture}`}
          alt={row.name}
          width="50"
          height="50"
        />
      ),
    },
    {
      name: "Name",
      selector: (row: ProductType) => (row.userName ? row.userName : "No User"),
      sortable: true,
    },
    {
      name: "Purchase Date",
      selector: (row: ProductType) =>
        `${
          row.purchaseDate
            ? new Date(row.purchaseDate).toLocaleDateString()
            : "never purchased"
        }`,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: ProductType) => (
        <div>
          <Link
            className="btn btn-primary btn-sm mx-1"
            to={`/products/edit/${row._id}`}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm mx-1"
            onClick={() => deleteProduct(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1>Products</h1>
  
      <div className="container my-4 p-4 border rounded shadow-sm bg-light">
      <h3 className="mb-4 text-center">Search Product</h3>
      <div className="row gy-3">
        {/* Product Name Field */}
        <div className="col-md-3">
          <label htmlFor="searchProduct" className="form-label fw-bold">
            Product Name
          </label>
          <input
            type="text"
            id="searchProduct"
            className="form-control"
            name="productName"
            value={userSearch.productName}
            placeholder="Enter Product Name"
            onChange={(e) => handleSearch(e)}
          />
        </div>
    
        {/* User Name Field */}
        <div className="col-md-3">
          <label htmlFor="searchUser" className="form-label fw-bold">
            User Name
          </label>
          <input
            type="text"
            id="searchUser"
            className="form-control"
            name="userName"
            placeholder="Enter User Name"
            value={userSearch.userName}
            onChange={(e) => handleSearch(e)}
          />
        </div>
    
        {/* From Date Field */}
        <div className="col-md-3">
          <label htmlFor="fromDate" className="form-label fw-bold">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            className="form-control"
            name="fromDate"
            value={userSearch.fromDate}
            onChange={(e) => handleSearch(e)}
          />
        </div>
    
        {/* To Date Field */}
        <div className="col-md-3">
          <label htmlFor="toDate" className="form-label fw-bold">
            To Date
          </label>
          <input
            type="date"
            id="toDate"
            className="form-control"
            value={userSearch.toDate}
            name="toDate"
            onChange={(e) => handleSearch(e)}
          />
        </div>
    
        {/* Buttons */}
        <div className="col-md-6 d-flex justify-content-between mt-4">
          <button
            className="btn btn-primary flex-grow-1 me-2"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
          <button
            className="btn btn-danger flex-grow-1 ms-2"
            onClick={clearSearch}
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>

      <Link to="/products/create" className="btn btn-success mb-3">
        Create Product
      </Link>
      <DataTable
        title="ProductType List"
        columns={columns}
        data={products}
        progressPending={loading}
        pagination={false}
        highlightOnHover
        defaultSortFieldId={1}
      />
      {products.length > 0 && (
         <Pagination
         totalPages={pagination.totalPage}
         currentPage={pagination.currentPage}
         onPageChange={handlePageChange}
       />
      )}
     
    </div>
  );
};

export default ProductList;
