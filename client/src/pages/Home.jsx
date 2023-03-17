import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
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
import { useSelector } from "react-redux";

const floating = keyframes`
    0% { transform: translate(0,  0px) scale(1); }
    50%  { transform: translate(0, 15px) scale(1.1); }
    100%   { transform: translate(0, -0px) scale(1); }  
`;

const textVariant = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
      type: "spring",
      stiffness: 100,
    },
  },
};

const imgVariant = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
      type: "spring",
      stiffness: 100,
    },
  },
};

const CustomImage = ({ url }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.img
      ref={ref}
      loading="lazy"
      src={url}
      alt="profit"
      variants={imgVariant}
      initial="hidden"
      animate={controls}
      style={{
        width: "100%",
        objectFit: "contain",
      }}
    />
  );
};

const CustomTypography = ({ text }) => {
  const theme = useTheme();
  const CustomTypography = styled(Typography)({
    display: "flex",
    fontSize: "1.1rem",
    textAlign: "justify",
    lineHeight: "1.5",
    color: theme.palette.primary[200],
    marginTop: "1.5rem",
  });

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.p
      ref={ref}
      variants={textVariant}
      initial="hidden"
      animate={controls}
    >
      <CustomTypography>{text}</CustomTypography>
    </motion.p>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
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
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    gridTemplateColumns: "repeat(2, 1fr)",

    gap: isNonMediumDevice ? theme.spacing(0) : theme.spacing(2),
    padding: isNonMediumDevice ? theme.spacing(2) : theme.spacing(18),
    paddingTop: theme.spacing(20),

    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 0.5fr",
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
      flex: "2",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  function onWindowScroll() {
    if (window.scrollY > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const onHomeButtonClick = () => {
    if (!isHomePage) {
      navigate("/#home");
    }
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };
  const onAboutButtonClick = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };
  const onBenefitButtonClick = () => {
    if (!isHomePage) {
      navigate("/#contact");
    }
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };
  const onContactButtonClick = () => {
    if (!isHomePage) {
      navigate("/#contact");
    }
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true);
      setIsPreviousEventPage(false);
    } else {
      setIsHomePage(false);
    }
  }, [location]);

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
          {isNonMediumDevice ? (
            <IconButton onClick={handleMenuClick}>
              {isOpen ? <Close /> : <Menu />}
            </IconButton>
          ) : (
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
          )}
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
          {!isLoggedIn ? (
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
                  backgroundColor: theme.palette.secondary[500],
                  color: theme.palette.primary[800],
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    transform: "scale(1.02)",
                  },
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography
                variant="p"
                component="p"
                sx={{
                  py: isNonMediumDevice ? 0 : 3,
                  lineHeight: 1.6,
                  fontSize: isNonMediumDevice ? "" : "1.2rem",
                }}
              >
                Welcome Customer!
              </Typography>
              <Button
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
                  backgroundColor: theme.palette.secondary[500],
                  color: theme.palette.primary[800],
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Go to profile
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
        <GlowBox bottom={"40%"} right={"0"} opacity={"0.11"} />
      </CustomBox>
      <div id="benefits"></div>
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
          mt="3rem"
        >
          {isNonMediumDevice && <CustomImage url={imgDetail2} />}
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
              text={`Our servers are connected and active day &amp; night. Feel free
                to browse, track and complete transactions that will make you
                prosperous. Connect your friends and family and get endless
                profit.`}
            />
          </Box>
          {!isNonMediumDevice && <CustomImage url={imgDetail2} />}
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
              <CustomImage url={imgDetail} />
            </Box>
          )}
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
              text={`We have exclusive dashboard where you can track your account
              activities. As well as information about your growing wealth. We
              have put together an experience which will nor limit nor
              disappoint you as our customer. Break the surface of ordinary and
              come join us on the glorious side!`}
            />
          </Box>
          {!isNonMediumDevice && <CustomImage url={imgDetail} />}
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
              <CustomImage url={imgDetail2} />
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
                Match with the best agent
              </Typography>
              <CustomTypography
                text={` We have a number of happy customers. Don't believe me? Confirm
                with our officials right now.`}
              />
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
                  backgroundColor: theme.palette.secondary[500],
                  color: theme.palette.primary[800],
                  fontWeight: "bold",
                  "&:hover": {
                    transform: "scale(1.02)",
                    backgroundColor: "white",
                  },
                }}
              >
                Contact Us
              </Button>
              <GlowBox bottom={"-20%"} left={"0"} opacity={"0.11"} />
            </Box>
          </Box>
          <Box width={"100%"} display="flex" alignItems={"baseline"}>
            {!isNonMediumDevice && <CustomImage url={imgDetail3} />}
          </Box>
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

          px: isNonMediumDevice ? theme.spacing(4) : theme.spacing(18),
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

        <CustomTypography
          text={`It is our commitment to ensure a profitable and enjoyable earning
          experience for you. Multiply your money at exponential rate and good
          ahead and live your dream life while we take care of your earnings.`}
        />
        <GlowBox right="0" top="200%" opacity={".11"} />
      </Stack>
    </>
  );
};

export default Home;
