import React, { useState } from "react";
import axios from "axios";
import Menu from "./menu";
import LoginMenu from "./loginmenu";

const Classform = () => {
  const [formdata, setFormData] = useState({
    name: "",
    cid: "",
    Teachers: [],
    Students: [],
    avail:true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    try {
      await axios.post("http://localhost:6969/addCdata", { formdata });
      alert("Data Added to DB");
    } catch (error) {
      alert("Error");
    }
    window.location.reload();
  };

  return (
    <div>
      <Menu />
      <div style={{ textAlign: "center" }}>
        <br />
        <h1>Class Form</h1>
        <center>
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "20px",
              width: "500px", // Adjust the width according to your preference
              margin: "auto", // Center the form horizontally
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td>Class Name:</td>
                  <td>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Class Name"
                      style={{ width: "100%", height: "40px", fontSize: "17px" }}
                      onChange={(e) =>
                        setFormData({ ...formdata, name: e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "10px" }}>Class ID:</td>
                  <td>
                    <input
                      required
                      type="number"
                      name="cid"
                      placeholder="Class ID"
                      style={{ width: "100%", height: "40px", fontSize: "17px" }}
                      onChange={(e) =>
                        setFormData({ ...formdata, cid: e.target.value })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input
              type="submit"
              value="Add Data"
              style={{
                width: "100px",
                height: "40px",
                fontSize: "17px",
                background: "skyblue",
                color: "white",
                cursor: "pointer",
              }}
            />
          </form>
        </center>
      </div>
    </div>
  );
};

export default Classform;