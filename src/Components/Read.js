// Read.js
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import useStore from "../store";

const fetchEntries = async () => {
  const res = await axios.get("https://678b8a801a6b89b27a2aabe0.mockapi.io/crud-basicProject");
  return res.data;
};

const Read = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["entries"],
    queryFn: fetchEntries,
    staleTime: Infinity, 
    cacheTime: Infinity,
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
  });
  
  
  const { setEntries, setEditingEntry } = useStore();
  const [tabledark, setTableDark] = useState("");

  useEffect(() => {
    if (data) setEntries(data);
  }, [data, setEntries]);

  const deleteEntry = useMutation({
    mutationFn: (id) => axios.delete(`https://678b8a801a6b89b27a2aabe0.mockapi.io/crud-basicProject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries("entries");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => setTableDark(tabledark === "" ? "table-dark" : "")}
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
          {data.map((entry) => (
            <tr key={entry.id}>
              <th scope="row">{entry.id}</th>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.city}</td>
              <td>{entry.country}</td>
              <td>{entry.phone}</td>
              <td>
                <Link to="/update">
                  <button
                    className="btn btn-success"
                    onClick={() => setEditingEntry(entry)}
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteEntry.mutate(entry.id)}>
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
