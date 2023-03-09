import React from "react";
import { Avatar, List, ListItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Tree = () => {
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

            <List width={"100%"} sx={{ display: "flex" }}>
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

                    <List width={"100%"} sx={{ display: "flex" }}>
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
                            <List width={"100%"} sx={{ display: "flex" }}>
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
                                      sx={{ display: "flex" }}
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
                                              sx={{ display: "flex" }}
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
