import React, { useEffect, useState } from "react";
import "../css/SignUp.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { NavLink } from "react-router-dom";

const SignUpform = () => {
  const [user, Setuser] = useState({
    Name: "",
    Email: "",
    Phone_Number: "",
    Date_Of_Birth: "",
    Gender: "",
    CourseName: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    Setuser({ ...user, [name]: value });
  };

  const handleFormsubmit = async (e) => {
    e.preventDefault();

    
    if (!user.Name || !user.Email || !user.Phone_Number || !user.Date_Of_Birth || !user.Gender || !user.CourseName) {
      toast.error("All fields are required!");
      return; 
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(user.Email)) {
      toast.error("Invalid email address!");
      return;
    }
     const phoneRegex = /^\d{10}$/;  // Exactly 10 digits
    if (!phoneRegex.test(user.Phone_Number)) {
      toast.error("Phone number must be 10 digits!");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/demo", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration Successfully");
        Setuser({
          Name: "",
          Email: "",
          Phone_Number: "",
          Date_Of_Birth: "",
          Gender: "",
          CourseName: "",
        });
      } else {
     
        if (data && data.message) {
          toast.error(data.message); 
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };


  
  const handleClear = () => {
    Setuser({
      Name: "",
      Email: "",
      Phone_Number: "",
      Date_Of_Birth: "",
      Gender: "",
      CourseName: "",
    });
  };
  return (
    <>
      <form className="main-container" onSubmit={handleFormsubmit}>
        <h1>STUDENT REGISTRATION FORM</h1>
        <div className="form-container">
          <div className="name-box  box">
            <label htmlFor="Name">
              {" "}
              <p> Name</p>{" "}
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              placeholder="Enter Your Name"
              value={user.Name}
              onChange={handleInputs}
            />
          </div>
          <div className="email-box box">
            <label htmlFor="Email">
              {" "}
              <p> Email </p>{" "}
            </label>
            <input
              type="text"
              name="Email"
              id="Email"
              placeholder="Enter Your Email "
              value={user.Email}
              onChange={handleInputs}
            />
          </div>
          <div className="phoneNumber box">
            <label htmlFor="Phone_Number">
              {" "}
              <p> Phone Number </p>{" "}
            </label>
            <input
              type="text"
              name="Phone_Number"
              id="Phone_Number"
              placeholder="Enter Your Phone Number"
              value={user.Phone_Number}
              onChange={handleInputs}
            />
          </div>
          <div className="date-of-birth box">
            <label htmlFor="Date Of Birth">
              <p>Date Of Birth</p>
            </label>
            <input
              type="date"
              name="Date_Of_Birth"
              id="Death_Of_Birth"
              value={user.Date_Of_Birth}
              onChange={handleInputs}
            />
          </div>
          <div className="Gender-box box">
            <label htmlFor="Gender">
              <p>Gender</p>
            </label>
            <span>Male </span>
            <input
              type="radio"
              id="Male"
              name="Gender"
              value="Male"
              onChange={handleInputs}
              checked={user.Gender === "Male"}
            />
            <span>Female </span>
            <input
              type="radio"
              id="Female"
              name="Gender"
              value="Female"
              onChange={handleInputs}
              checked={user.Gender === "Female"}
            />
          </div>
          <div className="course-option box">
            <label htmlFor="CourseName">
              {" "}
              <p> Course Name</p>
            </label>
            <select
              id="CourseName"
              name="CourseName"
              value={user.CourseName}
              onChange={handleInputs}
            >
              <option value="" selected>
                Choose
              </option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
              <option value="BTec">BTec</option>
              <option value="BA">BA</option>
              <option value="BSC">BSC</option>
            </select>
          </div>
          <div className="Button">
            <button type="submit" className="Submit btn">
              Submit 
            </button>
            <button className="Clear btn" onClick={handleClear}>Clear</button>
            <button className="data btn">  <NavLink to="/user_Data">User Data</NavLink></button>
          </div>
        </div>
      </form>
      </>
  );
};

export default SignUpform;
