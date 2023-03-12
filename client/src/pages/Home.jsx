import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  styled,
  Grid,
  Stack,
  useTheme,
  AppBar,
  ListItemText,
  ListItemButton,
  Toolbar,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";

//image that needs to be removed
import headerImg from "../assets/pexels-binyamin-mellish-186078.png";
import imgDetail from "../assets/pexels-alex-staudinger-1732414.jpg";
import imgDetail2 from "../assets/pexels-pixabay-271816.jpg";
import FlexBetween from "../components/FlexBetween";
import { getItemInLocalStorage } from "../utlis";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isFixed, setIsFixed] = useState(false);
  const token = getItemInLocalStorage("TOKEN");
  const isNonMediumDevice = useMediaQuery("(max-width: 800px)");
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    // tamanhos
    gap: theme.spacing(2),
    padding: isNonMediumDevice ? theme.spacing(4) : theme.spacing(10),
    paddingTop: theme.spacing(10),
    // cor de fundo
    backgroundColor: theme.palette.secondary[700],
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: "1",
    [theme.breakpoints.down("md")]: {
      flex: "2",
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  const CustomGridItem = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  });

  const CustomTypography = styled(Typography)({
    fontSize: "1.1rem",
    textAlign: "start",
    lineHeight: "1.5",
    color: theme.palette.primary[400],
    marginTop: "1.5rem",
  });

  function onWindowScroll() {
    if (window.scrollY > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    window.addEventListener("scroll", onWindowScroll);
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, []);
  return (
    <>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: isFixed
            ? theme.palette.background.alt
            : "transparent",
          zIndex: "1000",
          transition: "all 0.45s",
          px: isNonMediumDevice ? theme.spacing(4) : theme.spacing(10),
          display: "flex",
          justifyContent: "center",
          height: "8vh",
        }}
        elevation={0}
      >
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
          <Typography
            variant="h4"
            fontWeight={"bold"}
            sx={{
              "&:hover ": {
                transform: "scale(1.02)",
              },
              color: theme.palette.secondary.main,
            }}
          >
            Richdollar
          </Typography>
        </Link>
      </AppBar>
      <CustomBox component="header">
        <BoxText component="section">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
            }}
          >
            Get amazing returns on your investment and make money as you connect
            more people to your profile.
          </Typography>

          <Typography
            variant="p"
            component="p"
            sx={{
              py: 3,
              lineHeight: 1.6,
            }}
          >
            Easy transactions and 24/7 customer support, We feel responsible for
            your happiness
          </Typography>

          <FlexBetween
            gap={"1rem"}
            sx={{ flexDirection: isNonMediumDevice ? "column" : "row" }}
          >
            <Box>
              <Typography
                variant="p"
                component="p"
                sx={{
                  py: 3,
                  lineHeight: 1.6,
                }}
              >
                Register now to take benefit and excel in life
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  px: 4,
                  py: 1,
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  borderRadius: 0,
                  borderColor: "#14192d",
                  backgroundColor: "#14192d",
                  "&&:hover": {
                    backgroundColor: "#343a55",
                  },
                  "&&:focus": {
                    backgroundColor: "#343a55",
                  },
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Box>
            <Box>
              <Typography
                variant="p"
                component="p"
                sx={{
                  py: 3,
                  lineHeight: 1.6,
                }}
              >
                Already a member of our beautiful network?
              </Typography>
              <Button
                component={Link}
                to={"/login"}
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1,
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  borderRadius: 0,
                  backgroundColor: "transparent",
                  borderColor: "#fff",
                  color: "#fff",
                  "&&:hover": {
                    color: "#343a55",
                    borderColor: "#343a55",
                  },
                  "&&:focus": {
                    color: "#343a55",
                    borderColor: "#343a55",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </FlexBetween>
        </BoxText>

        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              flex: "1",
              paddingTop: "30px",
              alignSelf: "center",
            },
            [theme.breakpoints.up("md")]: {
              flex: "2",
              alignSelf: "flex-end",
            },
          })}
        >
          <img
            loading="lazy"
            src={headerImg}
            alt="headerImg"
            style={{
              width: "100%",
              marginBottom: -15,
            }}
          />
        </Box>
      </CustomBox>
      <Grid
        container
        spacing={{ xs: 4, sm: 4, md: 0 }}
        sx={{
          px: isNonMediumDevice ? theme.spacing(4) : theme.spacing(10),
          pt: theme.spacing(5),
        }}
      >
        <CustomGridItem item xs={12} sm={8} md={6} component="section">
          <Box component="article">
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: "700",
                textAlign: "start",
              }}
            >
              {"We make it easy for tenants and landlords"}
            </Typography>

            <CustomTypography>
              Our servers are connected and active
              <br />
              day &amp; night. Feel free to browse, track and
              <br />
              make transactions that will make you prosperous.
            </CustomTypography>
          </Box>
        </CustomGridItem>

        <Grid item xs={12} sm={4} md={6}>
          <img
            loading="lazy"
            src={imgDetail}
            alt=""
            style={{
              width: "100%",
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          sx={{
            order: { xs: 4, sm: 4, md: 3 },
          }}
        >
          <img
            loading="lazy"
            src={imgDetail2}
            alt=""
            style={{
              width: "100%",
            }}
          />
        </Grid>

        <CustomGridItem
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            order: { xs: 3, sm: 3, md: 4 },
          }}
        >
          <Box
            component="article"
            sx={{ ml: isNonMediumDevice ? "0" : theme.spacing(3) }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: "700",
                textAlign: "start",
              }}
            >
              {"Match with the best agent"}
            </Typography>

            <CustomTypography>
              We have a number of happy customers.
              <br />
              Don't believe me? Confirm with our officials right now.
            </CustomTypography>
            <Button
              component={Link}
              to={"/contact"}
              variant="contained"
              type="submit"
              size="medium"
              sx={{
                fontSize: "0.9rem",
                textTransform: "capitalize",
                py: 2,
                px: 4,
                mt: 3,
                mb: 2,
                borderRadius: 0,
                backgroundColor: "#14192d",
                "&:hover": {
                  backgroundColor: "#1e2a5a",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </CustomGridItem>
      </Grid>
      <Stack
        component="section"
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          py: 10,
          mx: 6,
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {"Find us and peace at once."}
        </Typography>

        <Typography
          sx={{
            maxWidth: "sm",
            mx: 0,
            textAlign: "center",
            py: 3,
            color: "#7b7b7b",
          }}
        >
          {
            "It is our commitment to ensure a profitable and enjoyable \
                earning experience for you. \
                Multiply your money at exponential rate \
                and good ahead and live your dream life while we take care of your earnings."
          }
        </Typography>
      </Stack>
    </>
  );
};

export default Home;
