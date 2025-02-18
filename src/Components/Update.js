import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStore from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name cannot exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }).max(100, { message: "Email cannot exceed 100 characters" }),
  city: z.string().min(1, { message: "City is required" }).max(50, { message: "City cannot exceed 50 characters" }),
  country: z.string().min(1, { message: "Country is required" }).max(50, { message: "Country cannot exceed 50 characters" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number cannot exceed 15 digits" }).regex(/^\d+$/, { message: "Phone number must contain only digits" }),
});

const Update = () => {
  const navigate = useNavigate();
  const { editingEntry, setFormData } = useStore();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue("name", editingEntry.name);
    setValue("email", editingEntry.email);
    setValue("city", editingEntry.city);
    setValue("country", editingEntry.country);
    setValue("phone", editingEntry.phone);
  }, [editingEntry, setValue]);

  // const onSubmit = (data) => {
  //   axios
  //     .put(`https://678b8a801a6b89b27a2aabe0.mockapi.io/crud-basicProject/${editingEntry.id}`, data)
  //     .then(() => {
  //       setFormData(data);
  //       navigate("/read");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating data:", error);
  //     });
  // };

  const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (updatedData) => axios.put(`https://678b8a801a6b89b27a2aabe0.mockapi.io/crud-basicProject/${editingEntry.id}`, updatedData),
  onSuccess: () => {
    queryClient.invalidateQueries(["entries"]);
  },
});

const onSubmit = (data) => {
  mutation.mutate(data, {
    onSuccess: () => {
      setFormData(data);
      navigate("/read");
    },
  });
};

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2>Update</h2>
        <Link to="/read">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            {...register("city")}
          />
          {errors.city && (
            <div className="invalid-feedback">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
            {...register("country")}
          />
          {errors.country && (
            <div className="invalid-feedback">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            {...register("phone")}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default Update;
