import React, { useEffect, useState } from "react";
import { getUsers, getUserProfile } from "./js/Api";
import "./css/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const history = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers(token);
      setUsers(data);
    };
    fetchUsers();
  }, [token]);

  const hadleDetails = async (userId) => {
    await getUserProfile(token, userId, "details");
  };

  const handleLogout = () => {
    localStorage.clear();
    history("/");
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <button onClick={() => setCurrentPage(number)} className="page-link">
          {number}
        </button>
      </li>
    );
  });

  return (
    <div className="users-list container">
      <div className="row justify-content-evenly homeNav mb-5">
        <div className="col-md-9">
          <img
            src="https://www.arcetec.com.co/wp-content/uploads/2022/05/Logo_Original.svg"
            className=""
            alt=""
            width={400}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleLogout()}
          >
            Cerrar sesión
          </button>
        </div>

        <div className="col-md-1">

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history('/register')}
          >
            Registrar
          </button>
        </div>
      </div>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr className={user.id === parseInt(userId) ? "table-success" : ""} key={user.id}>
              <td >{user.name}</td>
              <td >{user.email}</td>
              <td>
                <button className="btn" onClick={() => hadleDetails(user.id)}>
                  <i
                    className={`bi ${
                      showDetails && user.id === user.id
                        ? "bi-eye"
                        : "bi-eye-slash"
                    } details`}
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3">
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    </div>
  );
};

export default Home;
