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
  useMediaQuery,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

//image that needs to be removed
import headerImg from "../assets/rd-theme.png";
import imgDetail from "../assets/profit.svg";
import imgDetail2 from "../assets/descriptive.svg";
import imgDetail3 from "../assets/knowledge.svg";
import FlexBetween from "../components/FlexBetween";
import { getItemInLocalStorage } from "../utlis";
import GlowBox from "../components/GlowBox";

const floating = keyframes`
    0% { transform: translate(0,  0px) scale(1); }
    50%  { transform: translate(0, 15px) scale(1.1); }
    100%   { transform: translate(0, -0px) scale(1); }  
`;

const textVariant = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isFixed, setIsFixed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = getItemInLocalStorage("TOKEN");
  const isNonMediumDevice = useMediaQuery("(max-width: 900px)");

  const AnimatedBox = styled(Box)(({ theme }) => ({
    paddingTop: "30px",
    animation: `${floating} 3s ease-in-out infinite alternate`,
    [theme.breakpoints.down("md")]: {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      flex: "2",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  }));
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    gridTemplateColumns: "repeat(2, 1fr)",
    // tamanhos
    gap: theme.spacing(2),
    padding: isNonMediumDevice ? theme.spacing(2) : theme.spacing(18),
    paddingTop: theme.spacing(20),
    // cor de fundo
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr 0.1fr",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateRows: "0.5fr 0.5fr",
      gridTemplateColumns: "1fr",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: "1",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  const CustomTypography = styled(Typography)({
    display: "flex",
    fontSize: "1.1rem",
    textAlign: "justify",
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
      setIsLoggedIn(true);
    }
    window.addEventListener("scroll", onWindowScroll);
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, []);
  return (
    <>
      <div id="home"></div>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          background: isFixed ? theme.palette.primary[800] : "transparent",
          zIndex: "1000",
          transition: "background-color 0.45s",
          px: isNonMediumDevice ? theme.spacing(2) : theme.spacing(18),
          display: "flex",
          justifyContent: "center",
          height: "8vh",
          overflow: "hidden",
        }}
      >
        <FlexBetween>
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            to="/"
          >
            <Box width="100%">
              <img
                src="/rd-logo.png"
                style={{ objectFit: "contain", width: "3.5rem" }}
                alt="richdollar-logo"
              />
            </Box>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <a
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              href="#home"
            >
              Home
            </a>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="#about"
            >
              About
            </a>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="#benefits"
            >
              Benefits
            </a>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="#contact"
            >
              Contact
            </a>
            {!isLoggedIn && (
              <Button
                component={Link}
                to={"/login"}
                variant="contained"
                sx={{
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  borderRadius: 0,
                  ml: "1rem",
                  "&&:hover": {
                    color: theme.palette.primary[800],
                    background: theme.palette.primary[300],
                  },
                  "&&:focus": {
                    color: "#343a55",
                    borderColor: "#343a55",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </FlexBetween>
      </AppBar>
      <CustomBox component="header">
        <GlowBox top={"0"} left={"0"} opacity={"0.11"} />
        <BoxText component={motion.section}>
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
          {!isLoggedIn && (
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
                  px: 6,
                  py: 1,
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  borderRadius: 0,
                  borderColor: theme.palette.primary[800],
                  backgroundColor: theme.palette.primary[800],
                  "&&:hover": {
                    backgroundColor: theme.palette.secondary[600],
                    color: theme.palette.primary[800],
                  },
                  "&&:focus": {
                    backgroundColor: theme.palette.primary[800],
                  },
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </BoxText>

        <AnimatedBox>
          <img
            loading="lazy"
            src={headerImg}
            alt="headerImg"
            style={{
              objectFit: "contain",
              width: "100%",
            }}
          />
        </AnimatedBox>
        <div id="benefits"></div>
        <GlowBox bottom={"40%"} right={"0"} opacity={"0.11"} />
      </CustomBox>
      <Box
        px={isNonMediumDevice ? theme.spacing(2) : theme.spacing(18)}
        display="flex"
        flexDirection={"column"}
        mt="3rem"
        gap="2rem"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: isNonMediumDevice ? "0" : "3rem",
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr 0.5fr",
            },
          }}
        >
          {!isNonMediumDevice && (
            <Box component="article">
              <Typography
                variant="h2"
                component="h3"
                sx={{
                  fontWeight: "700",
                  textAlign: "start",
                }}
              >
                {"24/7 Service Available"}
              </Typography>
              <CustomTypography
                component={motion.p}
                variants={textVariant}
                initial="hidden"
                animate="visible"
              >
                Our servers are connected and active day &amp; night. Feel free
                to browse, track and complete transactions that will make you
                prosperous. Connect your friends and family and get endless
                profit.
              </CustomTypography>
            </Box>
          )}
          <Box width={"100%"}>
            <img
              loading="lazy"
              src={imgDetail}
              alt="profit"
              style={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          {isNonMediumDevice && (
            <Box component="article">
              <Typography
                variant="h2"
                component="h3"
                sx={{
                  fontWeight: "700",
                  textAlign: "start",
                }}
              >
                {"24/7 Service Available"}
              </Typography>
              <CustomTypography
                component={motion.p}
                variants={textVariant}
                initial="hidden"
                animate="visible"
              >
                Our servers are connected and active day &amp; night. Feel free
                to browse, track and complete transactions that will make you
                prosperous. Connect your friends and family and get endless
                profit.
              </CustomTypography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: isNonMediumDevice ? "0" : "3rem",
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr 0.5fr",
            },
          }}
          mt="3rem"
        >
          <Box width={"100%"} display="flex" alignItems={"baseline"}>
            <img
              loading="lazy"
              src={imgDetail3}
              alt="knowledge"
              style={{
                objectFit: "contain",
                width: "100%",
              }}
            />
          </Box>
          <Box component="article">
            <Typography
              variant="h2"
              component="h3"
              sx={{
                fontWeight: "700",
                textAlign: "start",
              }}
            >
              {"Have full control on your wealth"}
            </Typography>
            <CustomTypography
              component={motion.p}
              variants={textVariant}
              initial="hidden"
              animate="visible"
            >
              We have exclusive dashboard where you can track your account
              activities. As well as information about your growing wealth. We
              have put together an experience which will nor limit nor
              disappoint you as our customer. Break the surface of ordinary and
              come join us on the glorious side!
            </CustomTypography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: isNonMediumDevice ? "0" : "3rem",
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr 0.5fr",
            },
          }}
          mt="3rem"
        >
          {isNonMediumDevice && (
            <Box width={"100%"} display="flex" alignItems={"baseline"}>
              <img
                loading="lazy"
                src={imgDetail2}
                alt="descritive"
                style={{
                  objectFit: "contain",
                  width: "100%",
                }}
              />
            </Box>
          )}
          <Box>
            <Box component="article">
              <Typography
                variant="h2"
                component="h3"
                sx={{
                  fontWeight: "700",
                  textAlign: "start",
                }}
              >
                {"Match with the best agent"}
              </Typography>
              <CustomTypography
                component={motion.p}
                variants={textVariant}
                initial="hidden"
                animate="visible"
              >
                We have a number of happy customers. Don't believe me? Confirm
                with our officials right now.
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
              <GlowBox bottom={"-20%"} left={"0"} opacity={"0.11"} />
            </Box>
          </Box>
          {!isNonMediumDevice && (
            <img
              loading="lazy"
              src={imgDetail2}
              alt="descritive"
              style={{
                objectFit: "contain",
                width: "100%",
              }}
            />
          )}
        </Box>
      </Box>

      <Stack
        id="contact"
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
          component={motion.p}
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          {
            "It is our commitment to ensure a profitable and enjoyable \
                earning experience for you. \
                Multiply your money at exponential rate \
                and good ahead and live your dream life while we take care of your earnings."
          }
        </Typography>
        <GlowBox right="0" top="200%" opacity={".11"} />
      </Stack>
    </>
  );
};

export default Home;
