import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { UserType } from '../../types/CommonTypes';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get('/user/get-users');
      setUsers(data);
    };
    fetchUsers();
    getUploadUrls()
  }, []);

  const getUploadUrls = async () => {
    const { data } = await api.get('/product/uploads');
    console.log(data);
   }


  const deleteUser = async (id: string) => {
    await api.delete(`/user/delete-user/${id}`);
    setUsers(users.filter((user) => user._id !== id));
  };

  const columns = [
    {
      name: 'Name',
      selector: (row: UserType) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: UserType) => row.email,
      sortable: true,
    },
    {
      name: 'DOB',
      selector: (row: UserType) => new Date(row.DOB).toLocaleDateString(),
    },
    {
      name: 'Actions',
      cell: (row: UserType) => (
        <div>
          <Link className="btn btn-primary btn-sm mx-1" to={`/users/edit/${row._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm mx-1"
            onClick={() => deleteUser(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <Link to="/users/create" className="btn btn-success mb-3">
        Create User
      </Link>
      <DataTable
        title="Users List"
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        defaultSortFieldId={1}
      />
    </div>
  );
};

export default UserList;
