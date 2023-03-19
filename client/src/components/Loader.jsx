import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, useTheme } from "@mui/material";

const Loader = () => {
  const theme = useTheme();
  return (
    <Backdrop
      open
      sx={{
        backgroundColor: theme.palette.background.default,
        zIndex: "1000",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress sx={{ color: theme.palette.secondary[400] }} />
    </Backdrop>
  );
};

export default Loader;
