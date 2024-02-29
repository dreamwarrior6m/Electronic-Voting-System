"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "@/app/hook/useAuth";

const YourPage = () => {
  const { user, logOut } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `https://evs-delta.vercel.app/users/admin-feedback`,
            {
              withCredentials: true,
            }
          );
          setUsers(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user?.email]);

  return (
    <>
      <h1>fjdfkdasf</h1>
    </>
  );
};

export default YourPage;

