import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userId = useSelector((state) => state.global.userId);
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  });
  return <div>Dashboard</div>;
};

export default Dashboard;
