import { Typography, Box, useTheme, IconButton, Button } from "@mui/material";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../utlis";
import {
  AddCircleOutline,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import Header from "../components/Header";
import Table from "../components/Table";
import Modal from "../components/Modal";
import ErrorText from "../components/ErrorText";
import ResponseText from "../components/ResponseText";

const Customers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const theme = useTheme();
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatingRow, setUpdatingRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => {
    setModalOpen(false);
  };
  const open = () => {
    setModalOpen(true);
  };

  async function createNewUser() {
    try {
      if (updatingRow) {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/user/new`,
          updatingRow,
          {
            headers: {
              Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
            },
          }
        );
      }
      fetchCustomers();
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function handleEditSubmit() {
    try {
      if (updatingRow) {
        const { _id, pan, aadhar, role } = updatingRow;
        const res = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/user/${_id}`,
          {
            role,
            pan,
            aadhar,
          },
          {
            headers: {
              Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
            },
          }
        );
        if (res) {
          setResponse("User profile was updated.");
        }
      }
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function handleUserDelete() {
    try {
      if (updatingRow) {
        const { _id } = updatingRow;
        await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/user/${_id}`, {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        });
      }
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function fetchCustomers() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/user/all`,
        {
          headers: {
            Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
          },
        }
      );
      setData(data);
    } catch (error) {
      setError(error.response.data);
    }
  }

  useEffect(() => {
    if (isEditMode) {
      handleEditSubmit();
    }
    if (isDeleteMode) {
      handleUserDelete();
    }
    if (isNewUser) {
      createNewUser();
    }
    setIsUpdated(false);
    setIsDeleteMode(false);
    setIsNewUser(false);
    setIsEditMode(false);
    setTimeout(() => {
      fetchCustomers();
    }, 1000);
  }, [isUpdated]);

  useEffect(() => {
    fetchCustomers();
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
      flex: 0.8,
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "pan",
      headerName: "PAN",
      flex: 0.6,
      editable: true,
    },
    { field: "aadhar", headerName: "Aadhar", flex: 0.8, editable: true },
    { field: "role", headerName: "Role", flex: 0.2, editable: true },
    {
      field: "isApproved",
      headerName: "Action",
      flex: 1,
      editable: true,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box
            display={"flex"}
            alignItems="center"
            width="100%"
            justifyContent={"center"}
            gap="0.5rem"
          >
            <IconButton
              type="button"
              style={{
                outline: "none",
                border: "none",
                backgroundColor: theme.palette.background.default,
                color: theme.palette.secondary[100],
                fontWeight: "bold",
                zIndex: "1000",
                cursor: "pointer",
              }}
              onClick={() => {
                const { isApproved, ...others } = row;
                setUpdatingRow({ ...others, isApproved: true });
                open();
                setIsEditMode(true);
              }}
            >
              <EditOutlined />
            </IconButton>
            <IconButton
              type="button"
              style={{
                outline: "none",
                border: "none",
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.primary[100],
                fontWeight: "bold",
                zIndex: "1000",
                cursor: "pointer",
              }}
              onClick={() => {
                setUpdatingRow(row);
                open();
                setIsDeleteMode(true);
              }}
            >
              <DeleteOutlineOutlined />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="1.5rem 2.5rem" position={"relative"}>
      <Header title="CUSTOMERS" subtitle="List Of Customers..." />
      <Box
        display={"flex"}
        justifyContent="end"
        alignItems={"center"}
        position="absolute"
        right={"0"}
        top={"0"}
      >
        <Button
          onClick={() => {
            open();
            setIsNewUser(true);
          }}
          sx={{
            color: theme.palette.secondary[200],
            background: theme.palette.background.alt,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <AddCircleOutline />{" "}
          <Typography fontSize={"0.8rem"} onClick={() => setIsNewUser(true)}>
            Add User
          </Typography>
        </Button>
      </Box>
      <Table columns={columns} data={data} isEditable={true} height={"75vh"} />
      {error && <ErrorText error={error} />}
      {response && <ResponseText response={response} />}
      <footer>
        <AnimatePresence initial={false} mode="wait">
          {modalOpen && (
            <Modal
              data={updatingRow}
              setData={setUpdatingRow}
              setMode={{
                setIsDeleteMode,
                setIsEditMode,
                setIsNewUser,
                setIsUpdated,
              }}
              handleClose={close}
              mode={isDeleteMode ? "DELETE" : isEditMode ? "EDIT" : "FORM"}
            />
          )}
        </AnimatePresence>
      </footer>
    </Box>
  );
};

export default Customers;
