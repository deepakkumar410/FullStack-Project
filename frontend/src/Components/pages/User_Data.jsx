import React, { useEffect, useState } from 'react';
import "../css/User_Data.css";

const User_Data = () => {
    const [users, setUsers] = useState([]); // Renamed state variable to 'users' for clarity

    const getUsers = async () => {
        try {
            const res = await fetch("http://localhost:8080/demo", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            setUsers(data);  // Set the retrieved user data
        } catch (error) {
            console.error("Error fetching users:", error);
            // Handle the error as needed
        }
    };

    const deleteUser  = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/demo/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Remove the deleted user from the state
            setUsers(users.filter(user => user._id !== id)); // Assuming _id is the unique identifier
            console.log(`User  with id ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting user:", error);
            // Handle the error as needed
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <section>
                <h1>Users Data</h1>
                <ul className='container'>
                    {
                        users.map((currUser ) => {
                            const { _id, Name, Email, Phone_Number, Date_Of_Birth, Gender, CourseName } = currUser ;
                            return (
                                <li key={_id} className='student-box'>
                                    <p>Name: <span>{Name}</span></p>
                                    <p>Email: <span>{Email}</span></p>
                                    <p>Phone Number: <span>{Phone_Number}</span></p>
                                    <p>Date Of Birth: <span>{Date_Of_Birth}</span></p>
                                    <p>Gender: <span>{Gender}</span></p>
                                    <p>Course Name: <span>{CourseName}</span></p>
                                    <button className='delete' onClick={() => deleteUser (_id)}>Delete</button>    
                                </li>
                            );
                        })
                    }
                </ul>
            </section>
        </>
    );
}

export default User_Data;