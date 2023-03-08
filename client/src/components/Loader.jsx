import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: "1000" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
