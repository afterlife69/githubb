import { useState } from "react";
import axios from "axios";

const RegForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    const nameReg = /^[A-Za-z]+$/;
    const usernameReg = /^[0-9A-Za-z_]+$/;
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (
      !nameReg.test(formData.name) ||
      !usernameReg.test(formData.username) ||
      !passwordReg.test(formData.password) ||
      formData.password !== formData.confirmPassword
    ) {
      alert("Enter valid details");
      return;
    }

    try {
      await axios.post("http://localhost:6969/addlog", { formData });
      alert("Data Added to DB");
    } catch (error) {
      alert(error.response.data.err);
    }

  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "2px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          width: "500px", // Increase the width here
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "16px", display: "inline" }}>Registration Form</h1>

        <div style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: "16px", alignItems: "center" }}>
          <label style={{ marginBottom: "8px", flex: "1", fontSize: "16px" }}>Name:</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Student Name"
            style={{ flex: "2", padding: "8px", fontSize: "16px" }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: "16px", alignItems: "center" }}>
          <label style={{ marginBottom: "8px", flex: "1", fontSize: "16px" }}>Username:</label>
          <input
            required
            type="text"
            name="username"
            placeholder="Student Username"
            style={{ flex: "2", padding: "8px", fontSize: "16px" }}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: "16px", alignItems: "center" }}>
          <label style={{ marginBottom: "8px", flex: "1", fontSize: "16px" }}>Password:</label>
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            style={{ flex: "2", padding: "8px", fontSize: "16px" }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: "16px", alignItems: "center" }}>
          <label style={{ marginBottom: "8px", flex: "1", fontSize: "16px" }}>Confirm Password:</label>
          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            style={{ flex: "2", padding: "8px", fontSize: "16px" }}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{ backgroundColor: "#4caf50", color: "#fff", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          >
            Add Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegForm;