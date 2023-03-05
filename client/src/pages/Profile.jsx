import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { profile, role } = useSelector((state) => state.global);
  return (
    <Container component={"main"}>
      <Box
        width={"100%"}
        display="grid"
        gridTemplateColumns={"0.2fr 0.8fr"}
        padding="2rem 0"
        gap={"2rem"}
      >
        <Avatar
          src="/profile.png"
          alt="profile-img"
          sx={{
            width: "10rem",
            objectFit: "contain",
            height: "10rem",
          }}
        ></Avatar>
        <Box
          padding={"0 1rem"}
          display="flex"
          flexDirection={"column"}
          gap="1rem"
          justifyContent="center"
        >
          <Typography variant="h3" component={"h2"} textTransform="uppercase">
            {profile.name}
            <Typography paragraph color={"gold"}>
              {role}
            </Typography>
          </Typography>
          <Typography variant="h5" component={"h2"} textTransform="lowercase">
            {profile.email}
          </Typography>
          <Typography variant="h5" component={"h2"}>
            {profile.contact}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
