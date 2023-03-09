import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

const dropInAnimate = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ data, setData, mode, setUpdateMode, handleClose }) => {
  const theme = useTheme();
  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    referredBy: "",
    role: "",
    pan: "",
    aadhar: "",
  });
  const [isFormActive, setIsFormActive] = useState(false);
  useEffect(() => {
    if (mode === "FORM") {
      setIsFormActive(true);
    } else {
      setIsFormActive(false);
    }
  }, []);
  return (
    <motion.section
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100svh",
        width: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
        zIndex: "1000",
      }}
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="bg-tedx-blue/60 w-[90%] relative h-[70%] sm:h-[80%] p-2 md:p-4 md:w-[80%] md:h-[70%] grid place-items-center rounded-lg"
        style={{
          position: "relative",
          height: isFormActive ? "70%" : "40%",
          width: "50%",
          display: "grid",
          placeItems: "center",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "2rem",
        }}
        onClick={(e) => e.stopPropagation()}
        variants={dropInAnimate}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Box
          component={"article"}
          width="90%"
          display={"flex"}
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          {isFormActive ? null : (
            <Typography variant="h5" component="h3">
              Are You Sure?
            </Typography>
          )}
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            flexDirection="column"
            width="100%"
          >
            <Typography
              paragraph
              color={theme.palette.secondary[600]}
              fontWeight="bold"
              mt={"8px"}
            >
              {isFormActive ? "ADD USER" : mode}
            </Typography>
            <List
              sx={{
                width: "100%",
                padding: "0",
                display: "flex",
                flexDirection: "column",
                gap: isFormActive ? "0.5rem" : "0.2rem",
                fontWeight: "bold",
              }}
            >
              {isFormActive ? (
                <TextField
                  name="name"
                  id="name"
                  type="text"
                  label="Name"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  fullWidth
                  required
                ></TextField>
              ) : (
                <ListItem
                  sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                  disableGutters
                  disablePadding
                >
                  <Typography fontSize={"0.7rem"}>NAME</Typography> {data?.name}
                </ListItem>
              )}
              {isFormActive ? (
                <TextField
                  name="contact"
                  id="contact"
                  type="text"
                  value={formValues.contact}
                  label="Contact"
                  onChange={(e) =>
                    setFormValues({ ...formValues, contact: e.target.value })
                  }
                  fullWidth
                  required
                ></TextField>
              ) : (
                <ListItem
                  sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                  disableGutters
                  disablePadding
                >
                  <Typography fontSize={"0.7rem"}>CONTACT</Typography>{" "}
                  {data?.contact}
                </ListItem>
              )}
              {isFormActive ? (
                <TextField
                  name="email"
                  id="email"
                  type="text"
                  value={formValues.email}
                  label="Email"
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                  fullWidth
                  required
                ></TextField>
              ) : (
                <ListItem
                  sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                  disableGutters
                  disablePadding
                >
                  <Typography fontSize={"0.7rem"}>EMAIL</Typography>{" "}
                  {data?.email}
                </ListItem>
              )}
              {isFormActive ? (
                <TextField
                  name="role"
                  id="role"
                  type="text"
                  value={formValues.role}
                  label="Role"
                  onChange={(e) =>
                    setFormValues({ ...formValues, role: e.target.value })
                  }
                  fullWidth
                  required
                ></TextField>
              ) : (
                <ListItem
                  sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                  disableGutters
                  disablePadding
                >
                  <Typography fontSize={"0.7rem"}>ROLE</Typography> {data?.role}
                </ListItem>
              )}
              {isFormActive ? (
                <TextField
                  name="pan"
                  id="pan"
                  type="text"
                  value={formValues.pan}
                  label="PAN"
                  onChange={(e) =>
                    setFormValues({ ...formValues, pan: e.target.value })
                  }
                  fullWidth
                  required
                ></TextField>
              ) : (
                <ListItem
                  sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                  disableGutters
                  disablePadding
                >
                  <Typography fontSize={"0.7rem"}>PAN</Typography> {data?.pan}
                </ListItem>
              )}
              {isFormActive ? (
                <TextField
                  name="aadhar"
                  id="aadhar"
                  type="text"
                  label="Aadhar"
                  value={formValues.aadhar}
                  onChange={(e) =>
                    setFormValues({ ...formValues, aadhar: e.target.value })
                  }
                  fullWidth
                  required
                ></TextField>
              ) : (
                <ListItem
                  sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                  disableGutters
                  disablePadding
                >
                  <Typography fontSize={"0.7rem"}>AADHAR</Typography>{" "}
                  {data?.aadhar}
                </ListItem>
              )}
              {isFormActive ? (
                <TextField
                  name="referredBy"
                  id="referredBy"
                  type="text"
                  value={formValues.referredBy}
                  label="Referred By"
                  onChange={(e) =>
                    setFormValues({ ...formValues, referredBy: e.target.value })
                  }
                  fullWidth
                ></TextField>
              ) : null}
            </List>
            <Button
              variant="success"
              onClick={() => {
                if (isFormActive) {
                  setData(formValues);
                }
                setUpdateMode(true);
                handleClose();
              }}
              sx={{
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.default,
                margin: "1rem 0",
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "5%",
            right: "5%",
            borderRadius: "45%",
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            fontSize: "1.5rem",
            color: theme.palette.secondary[600],
          }}
        >
          <CloseOutlined />
        </motion.button>
      </motion.article>
    </motion.section>
  );
};

export default Modal;
