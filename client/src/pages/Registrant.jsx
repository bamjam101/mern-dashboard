import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import {
  aadharValidation,
  getItemInLocalStorage,
  pancardValidation,
} from "../utlis";
import { SaveOutlined } from "@mui/icons-material";
import ErrorText from "../components/ErrorText";
import { Link } from "react-router-dom";

const Registrant = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [error, setError] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatingRow, setUpdatingRow] = useState(null);

  async function handleEditSubmit() {
    try {
      if (updatingRow) {
        const { _id, name, pan, aadhar, isApproved, role } = updatingRow;
        const validPan = pancardValidation(pan);
        const validAadhar = aadharValidation(aadhar);
        if (validPan && validAadhar) {
          await axios.patch(
            `${import.meta.env.VITE_APP_BASE_URL}/registrant/${_id}`,
            {
              _id,
              name,
              role,
              pan,
              aadhar,
              isApproved,
            },
            {
              headers: {
                Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
              },
            }
          );
        } else {
          setError(
            "PAN & Aadhar validation conflict. Kindly recheck your input."
          );
        }
      }
    } catch (error) {
      setError(error.response.data);
    }
  }

  useEffect(() => {
    handleEditSubmit();
    setTimeout(() => {
      fetchRegistrants();
    });
    setIsUpdated(false);
  }, [isUpdated]);

  useEffect(() => {
    fetchRegistrants();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Link
            style={{
              color: theme.palette.secondary[400],
              textDecoration: "none",
            }}
            to={`/user/${row._id}`}
          >
            {row.name}
          </Link>
        );
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 0.5,
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "pan", headerName: "PAN", flex: 0.6, editable: true },
    { field: "aadhar", headerName: "Aadhar", flex: 1, editable: true },
    { field: "role", headerName: "Role", flex: 0.5, editable: true },
    {
      field: "isApproved",
      headerName: "Verified",
      flex: 0.5,
      editable: true,
      renderCell: (params) => {
        const { row } = params;
        return (
          <IconButton
            type="button"
            style={{
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.primary[100],
              fontWeight: "bold",
              zIndex: "1000",
              cursor: "pointer",
              "&:hover ": {
                transform: "scale(1.02)",
              },
            }}
            onClick={() => {
              const { isApproved, ...others } = row;
              setUpdatingRow({ ...others, isApproved: true });
              setIsUpdated(true);
            }}
          >
            <SaveOutlined />
          </IconButton>
        );
      },
    },
  ];

  const fetchRegistrants = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/registrant`,
      {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      }
    );
    const result = response.data;
    if (typeof result === "string") {
      setData([]);
    } else {
      setData(result);
    }
  };
  useEffect(() => {
    fetchRegistrants();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="REGISTRANTS" subtitle="List Of Registrants..." />
      <Table columns={columns} data={data} isEditable={true} height={"75vh"} />
      {error && <ErrorText error={error} />}
    </Box>
  );
};

export default Registrant;
