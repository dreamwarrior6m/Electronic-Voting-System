"use client";
import Rechart from "@/Component/Dashboard/Rechart/Rechart";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCopy, FaUsers } from "react-icons/fa";
import { GiVote } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Protected from "@/Component/Protected/Protected";

const HomePage = () => {
  const { user } = useAuth();
  const [users, setusers] = useState([]);

  const [allUser, setAlluser] = useState([]);
  const userData = `https://evs-delta.vercel.app/users`;
  useEffect(() => {
    fetch(userData)
      .then((res) => res.json())
      .then((data) => setAlluser(data));
  }, [userData]);
  console.log(allUser);

  const User = allUser?.filter((users) => users?.email == user?.email);
  console.log(User?.[0]?.idNumber);

  // user in the mongodb not firebase

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `https://evs-delta.vercel.app/users/${user?.email}`
          );
          setusers(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <Protected>
      <div className="text-white pt-6">
        <div className="grid grid-cols-4 gap-5 w-full justify-items-center">
          <div className="col-span-3 w-full">
            <div className="stats shadow w-full bg-blue-200/5 rounded-none">
              <div className="stat">
                <div className="stat-figure text-indigo-500 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-indigo-500 ">25.6K</div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Page Views</div>
                <div className="stat-value text-secondary">2.6M</div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Page Views</div>
                <div className="stat-value text-secondary">2.6M</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
            </div>
            {/* table  */}

            <div className="stats shadow w-full bg-blue-200/5 rounded-none mt-6">
              <div className="stat">
                <div className="stat-figure text-indigo-500 ">
                  <FaUsers className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-indigo-500 ">2.6K</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
              <div className="stats bg-primary text-primary-content">
                <div className="stat">
                  <div className="stat-title">Account balance</div>
                  <div className="stat-value">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm btn-success">
                      Add funds
                    </button>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Current balance</div>
                  <div className="stat-value">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm">Withdrawal</button>
                    <button className="btn btn-sm">deposit</button>
                  </div>
                </div>
              </div>
              <div className="stats bg-primary text-primary-content">
                <div className="stat">
                  <div className="stat-title">Account balance</div>
                  <div className="stat-value">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm btn-success">
                      Add funds
                    </button>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Current balance</div>
                  <div className="stat-value">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm">Withdrawal</button>
                    <button className="btn btn-sm">deposit</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="/tailwind-css-component-profile-2@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="/tailwind-css-component-profile-3@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Brice Swyre</div>
                          <div className="text-sm opacity-50">China</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Carroll Group
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Tax Accountant
                      </span>
                    </td>
                    <td>Red</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="/tailwind-css-component-profile-4@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Marjy Ferencz</div>
                          <div className="text-sm opacity-50">Russia</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Rowe-Schoen
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Office Assistant I
                      </span>
                    </td>
                    <td>Crimson</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  {/* row 4 */}
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="/tailwind-css-component-profile-5@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Yancy Tear</div>
                          <div className="text-sm opacity-50">Brazil</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Wyman-Ledner
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Community Outreach Specialist
                      </span>
                    </td>
                    <td>Indigo</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* chart  */}
            <div className="">
              <Rechart />
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default HomePage;
