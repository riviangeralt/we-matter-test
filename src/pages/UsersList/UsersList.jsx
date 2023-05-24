import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersSliceSelector,
  getAllUsersThunk,
} from "../../reduxtoolkit/slices/users";
import { Loading, Error } from "../../components";
import classes from "./UsersList.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const UsersList = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(getAllUsersSliceSelector);
  const [chartData, setChartData] = useState({});

  const countCities=(data)=> {
    const cityCounts = {};
  
    for (let i = 0; i < data.length; i++) {
      const city = data[i].city;
      cityCounts[city] = {
        count: cityCounts[city] ? cityCounts[city].count + 1 : 1,
        color: "#" + Math.random().toString(16).slice(2, 8),
      };
      // cityCounts['color'] = "#" + Math.random().toString(16).slice(2, 8);
    }
  
    return cityCounts;
  }

  const fetchUsersList = async () => {
    try {
      const res = await dispatch(getAllUsersThunk()).unwrap();
      const cities = countCities(res.map(ele => ele.address));
      console.log(cities)
      setChartData(cities)
    } catch (error) {
      console.error("Error in fetchUsersList", error);
    }
  };


  useEffect(() => {
    fetchUsersList();
  }, []);

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <>
      <div className={classes.container}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr key={user?.id}>
                <td>
                  {user.name?.firstname} {user.name?.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {user.address?.number} {user.address?.street}{" "}
                  {user.address?.city} {user.address?.zipcode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes.chart}>
      <Pie
        data={{
          labels: Object.keys(chartData),
          datasets: [
            {
              label: "distribution of users based on their location",
              data: Object.values(chartData).map((ele) => ele.count),
              backgroundColor: Object.values(chartData).map((ele) => ele.color),
              hoverOffset: 4,
            },
          ],
        }}
      />
      </div>
    </>
  );
};

export default UsersList;
