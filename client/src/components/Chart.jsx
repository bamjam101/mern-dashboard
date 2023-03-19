import { useTheme } from "@mui/material";
import React, { Fragment } from "react";
const Card = ({ data }) => {
  const theme = useTheme();
  return (
    <ul>
      {data?.map((item, index) => (
        <Fragment key={item?.name}>
          <li
            style={{
              borderRadius: "1rem",
              backgroundColor: theme.palette.primary[400],
            }}
          >
            <div className="card">
              <div className="image">
                <img
                  src="/profile.png"
                  alt="Profile"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="card-body">
                <h5 style={{ padding: "0", margin: "0" }}>{item?.name}</h5>
              </div>
            </div>
            {item?.children?.length ? <Card data={item.children} /> : null}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

const Chart = ({ data }) => {
  return (
    <div
      className="org-tree"
      style={{ width: "100%", display: "grid", placeItems: "center" }}
    >
      {data && <Card data={data} />}
    </div>
  );
};

export default Chart;
