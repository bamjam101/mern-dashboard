import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import { getItemInLocalStorage } from "../utlis";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import Modal from "../components/Modal";

const Customers = () => {
  const [data, setData] = useState([]);
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

  async function handleEditSubmit() {
    if (updatingRow) {
      const { _id, name, pan, aadhar, isApproved, role } = updatingRow;
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/registrant/${_id}`,
        {
          _id,
          name,
          role,
          pan,
          aadhar,
          isApproved,
        }
      );
    }
  }

  async function handleUserDelete() {
    if (updatingRow) {
      const { _id } = updatingRow;
      await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/user/${_id}`, {
        headers: {
          Authorization: `Bearer ${getItemInLocalStorage("TOKEN")}`,
        },
      });
    }
  }

  const fetchCustomers = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/user/all`,
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
    if (isEditMode) {
      handleEditSubmit();
    }
    if (isDeleteMode) {
      handleUserDelete();
    }
    fetchCustomers();
    setIsUpdated(false);
    setIsDeleteMode(false);
    setIsEditMode(false);
  }, [isUpdated]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.8 },
    {
      field: "contact",
      headerName: "Contact",
      flex: 0.8,
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "pan", headerName: "PAN", flex: 0.6, editable: true },
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
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List Of Customers..." />
      <Table columns={columns} data={data} isEditable={true} />

      <footer>
        <AnimatePresence initial={false} mode="wait">
          {modalOpen && (
            <Modal
              data={updatingRow}
              setUpdateMode={setIsUpdated}
              handleClose={close}
              mode={isDeleteMode ? "DELETE" : isEditMode ? "Edit" : null}
            />
          )}
        </AnimatePresence>
      </footer>
    </Box>
  );
};

export default Customers;