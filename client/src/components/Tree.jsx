import React from "react";
import { Avatar, List, ListItem, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Tree = () => {
  const theme = useTheme();
  const levels = useSelector((state) => state.global.levels);
  return (
    <List width={"100%"} sx={{ display: "flex" }}>
      {levels?.zero?.map((node) => {
        return (
          <ListItem
            key={node?.id}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "0.4rem",
              borderRadius: "1rem",
              backgroundColor: theme.palette.primary[700],
            }}
          >
            <Avatar
              src="/profile.png"
              alt="user-profile"
              sx={{ width: "3rem", height: "3rem" }}
            ></Avatar>
            <Typography
              paragraph
              fontSize={"0.6rem"}
              textAlign="center"
              fontWeight={"bold"}
            >
              {node?.name}
            </Typography>

            <List width={"100%"} sx={{ display: "flex", gap: "0.5rem" }}>
              {levels?.one?.map((node) => {
                return (
                  <ListItem
                    key={node.id}
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "0.4rem",
                      borderRadius: "1rem",
                      backgroundColor: theme.palette.primary[600],
                    }}
                  >
                    <Avatar
                      src="/profile.png"
                      alt="user-profile"
                      sx={{ width: "3rem", height: "3rem" }}
                    ></Avatar>
                    <Typography
                      paragraph
                      textAlign={"center"}
                      fontSize={"0.6rem"}
                      fontWeight={"bold"}
                    >
                      {node?.name}
                    </Typography>

                    <List
                      width={"100%"}
                      sx={{ display: "flex", gap: "0.5rem" }}
                    >
                      {levels?.two?.map((node) => {
                        return (
                          <ListItem
                            key={node.id}
                            sx={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              gap: "0.4rem",
                              borderRadius: "1rem",
                              backgroundColor: theme.palette.primary[500],
                            }}
                          >
                            <Avatar
                              src="/profile.png"
                              alt="user-profile"
                              sx={{ width: "3rem", height: "3rem" }}
                            ></Avatar>
                            <Typography
                              paragraph
                              textAlign={"center"}
                              fontSize={"0.6rem"}
                              fontWeight={"bold"}
                            >
                              {node?.name}
                            </Typography>
                            <List
                              width={"100%"}
                              sx={{ display: "flex", gap: "0.5rem" }}
                            >
                              {levels?.three?.map((node) => {
                                return (
                                  <ListItem
                                    key={node.id}
                                    sx={{
                                      display: "flex",
                                      width: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexDirection: "column",
                                      gap: "0.4rem",
                                      borderRadius: "1rem",
                                      backgroundColor:
                                        theme.palette.primary[400],
                                    }}
                                  >
                                    <Avatar
                                      src="/profile.png"
                                      alt="user-profile"
                                      sx={{ width: "3rem", height: "3rem" }}
                                    ></Avatar>
                                    <Typography
                                      paragraph
                                      textAlign={"center"}
                                      fontSize={"0.6rem"}
                                      fontWeight={"bold"}
                                    >
                                      {node?.name}
                                    </Typography>
                                    <List
                                      width={"100%"}
                                      sx={{ display: "flex", gap: "0.5rem" }}
                                    >
                                      {levels?.four?.map((node) => {
                                        return (
                                          <ListItem
                                            key={node.id}
                                            sx={{
                                              display: "flex",
                                              width: "100%",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              flexDirection: "column",
                                              gap: "0.4rem",
                                              borderRadius: "1rem",
                                              backgroundColor:
                                                theme.palette.primary[300],
                                            }}
                                          >
                                            <Avatar
                                              src="/profile.png"
                                              alt="user-profile"
                                              sx={{
                                                width: "3rem",
                                                height: "3rem",
                                              }}
                                            ></Avatar>
                                            <Typography
                                              paragraph
                                              textAlign={"center"}
                                              fontSize={"0.6rem"}
                                              fontWeight={"bold"}
                                            >
                                              {node?.name}
                                            </Typography>
                                            <List
                                              width={"100%"}
                                              sx={{
                                                display: "flex",
                                                gap: "0.5rem",
                                              }}
                                            >
                                              {levels?.five?.map((node) => {
                                                return (
                                                  <ListItem
                                                    key={node.id}
                                                    sx={{
                                                      display: "flex",
                                                      width: "100%",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      flexDirection: "column",
                                                      gap: "0.4rem",
                                                      borderRadius: "1rem",
                                                      backgroundColor:
                                                        theme.palette
                                                          .primary[200],
                                                    }}
                                                  >
                                                    <Avatar
                                                      src="/profile.png"
                                                      alt="user-profile"
                                                      sx={{
                                                        width: "3rem",
                                                        height: "3rem",
                                                      }}
                                                    ></Avatar>
                                                    <Typography
                                                      paragraph
                                                      textAlign={"center"}
                                                      fontSize={"0.6rem"}
                                                      fontWeight={"bold"}
                                                    >
                                                      {node?.name}
                                                    </Typography>
                                                  </ListItem>
                                                );
                                              })}
                                            </List>
                                          </ListItem>
                                        );
                                      })}
                                    </List>
                                  </ListItem>
                                );
                              })}
                            </List>
                          </ListItem>
                        );
                      })}
                    </List>
                  </ListItem>
                );
              })}
            </List>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Tree;
