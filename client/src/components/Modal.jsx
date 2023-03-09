import React from "react";
import { motion } from "framer-motion";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
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

const Modal = ({ data, mode, setUpdateMode, handleClose }) => {
  const theme = useTheme();
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
          height: "40%",
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
          <Typography variant="h5" component="h3">
            Are You Sure?
          </Typography>
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
              {mode}
            </Typography>
            <List
              sx={{
                width: "100%",
                padding: "0",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                fontWeight: "bold",
              }}
            >
              <ListItem
                sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                disableGutters
                disablePadding
              >
                <Typography fontSize={"0.7rem"}>NAME</Typography> {data.name}
              </ListItem>
              <ListItem
                sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                disableGutters
                disablePadding
              >
                <Typography fontSize={"0.7rem"}>CONTACT</Typography>{" "}
                {data.contact}
              </ListItem>
              <ListItem
                sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                disableGutters
                disablePadding
              >
                <Typography fontSize={"0.7rem"}>EMAIL</Typography> {data.email}
              </ListItem>
              <ListItem
                sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                disableGutters
                disablePadding
              >
                <Typography fontSize={"0.7rem"}>ROLE</Typography> {data.role}
              </ListItem>
              <ListItem
                sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                disableGutters
                disablePadding
              >
                <Typography fontSize={"0.7rem"}>PAN</Typography> {data.pan}
              </ListItem>
              <ListItem
                sx={{ display: "grid", gridTemplateColumns: "0.3fr 0.7fr" }}
                disableGutters
                disablePadding
              >
                <Typography fontSize={"0.7rem"}>AADHAR</Typography>{" "}
                {data.aadhar}
              </ListItem>
            </List>
            <Button
              variant="success"
              onClick={() => setUpdateMode(true)}
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
