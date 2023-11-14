import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./menu";
import LoginMenu from "./loginmenu";

const Form = () => {
  const [formdata, setFormData] = useState({
    name: "",
    rollno: "",
    branch: "",
    isPresent: false,
    classs: "",
  });

  const [classData, setClassData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6969/getCdata").then((response) => {
      setClassData(response.data.map((ele) => ele.name));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);

    try {
      const response = await axios.post("http://localhost:6969/adddata", {
        formdata,
      });

      if (response.data === "done") {
        try {
          await axios.post("http://localhost:6969/addStoC", { formdata });
          alert("Added to array");
        } catch (error) {
          alert("Error adding to array");
        }
        alert("Data Added to DB");
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Error");
    }

    window.location.reload();
  };

  return (
    <div>
      <Menu />
      <br />
      <h1>Student Form</h1>
      <br />
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <td>
                <label>Student Name:</label>
              </td>
              <td>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  style={{ width: "250px", height: "40px", fontSize: "17px" }}
                  onChange={(e) =>
                    setFormData({ ...formdata, name: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Roll No:</label>
              </td>
              <td>
                <input
                  required
                  type="text"
                  name="roll"
                  placeholder="Student Roll No"
                  style={{ width: "250px", height: "40px", fontSize: "17px" }}
                  onChange={(e) =>
                    setFormData({ ...formdata, rollno: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Branch:</label>
              </td>
              <td>
                <input
                  required
                  type="text"
                  name="branch"
                  placeholder="Student Branch"
                  style={{ width: "250px", height: "40px", fontSize: "17px" }}
                  onChange={(e) =>
                    setFormData({ ...formdata, branch: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Select Class:</label>
              </td>
              <td>
                <select
                  style={{
                    width: "260px",
                    height: "40px",
                    fontSize: "17px",
                    marginTop: "5px",
                  }}
                  onChange={(e) =>
                    setFormData({ ...formdata, classs: e.target.value })
                  }
                >
                  <option value="Select">Select</option>
                  {classData.map((ele, index) => (
                    <option key={index} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input
          type="submit"
          value="Add Data"
          style={{
            width: "150px",
            height: "40px",
            fontSize: "17px",
            background: "skyblue",
            color: "white",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
};

export default Form;