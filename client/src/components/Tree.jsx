import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import { Avatar, ListItem, Typography, useTheme } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const Tree = ({ data }) => {
  console.log(data);
  const theme = useTheme();
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id}>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "0.4rem",
          padding: "0",
          margin: "0",
          borderRadius: "1rem",
          backgroundColor: theme.palette.primary[400],
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
          {nodes?.name}
        </Typography>
      </ListItem>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultExpanded={["open"]}
      defaultExpandIcon={<ArrowDropDown />}
      defaultCollapseIcon={<ExpandMoreIcon />}
      sx={{
        height: "90svh",
        flexGrow: 1,
        overflowY: "auto",
        display: "grid",
        placeItems: "center",
        "& .MuiTreeItem-root": {
          width: "6rem",
          height: "auto",
          position: "relative",
        },
        "& .MuiTreeItem-content": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: 0,
          p: 0,
          flexDirection: "column",
        },
        "& .MuiListItem-root": {
          display: "flex",
          flexDirection: "column",
        },
        "& .MuiCollapse-vertical": {
          display: "flex",
          flexDirection: "column",
        },
        "& .MuiCollapse-root": {
          display: "flex",
          padding: 0,
          margin: 0,
          "& .MuiCollapse-wrapperInner": {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          },
        },
      }}
    >
      {data && renderTree(data)}
    </TreeView>
  );
};

export default Tree;
