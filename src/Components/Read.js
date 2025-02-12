import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  function getData() {
    axios.get("https://678b8a801a6b89b27a2aabe0.mockapi.io/crud-basicProject")
      .then((res) => {
        console.log(res.data);
        setData(res.data)
      });
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      axios.delete(`https://678b8a801a6b89b27a2aabe0.mockapi.io/crud-basicProject/${id}`)
        .then(() => {
          getData();
        })
    }
  }

  const setToLocalStorage = (id, name, email, city, country, phone) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("city", city);
    localStorage.setItem("country", country);
    localStorage.setItem("phone", phone);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read</h2>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>
      <table className={`table ${tabledark} table-bordered table-striped table-hover`}>
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eachData) => (
            <tr key={eachData.id}>
              <th scope="row">{eachData.id}</th>
              <td>{eachData.name}</td>
              <td>{eachData.email}</td>
              <td>{eachData.city}</td>
              <td>{eachData.country}</td>
              <td>{eachData.phone}</td>
              <td>
                <Link to="/update">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setToLocalStorage(
                        eachData.id,
                        eachData.name,
                        eachData.email,
                        eachData.city,
                        eachData.country,
                        eachData.phone
                      )
                    }
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(eachData.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Read;
