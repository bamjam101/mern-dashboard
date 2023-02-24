import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
    Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme
} from "@mui/material";
import { AdminPanelSettingsOutlined, CalendarMonthOutlined, ChevronLeft, Groups2Outlined, HomeOutlined, PieChartOutlined, PointOfSaleOutlined, PublicOutlined, ReceiptLongOutlined, ShoppingCartOutlined, TodayOutlined, TrendingUpOutlined } from "@mui/icons-material";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },{
        text: "Products",
        icon: <ShoppingCartOutlined />
    },{
        text: "Customers",
        icon: <Groups2Outlined />
    },{
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },{
        text: "Geography",
        icon: <PublicOutlined />
    },{
        text: "Sales",
        icon: null
    },{
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },{
        text: "Daily",
        icon: <TodayOutlined />
    },{
        text: "Monthly",
        icon: <PieChartOutlined />
    },{
        text: "Management",
        icon: null
    },{
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },{
        text: "Performance",
        icon: <TrendingUpOutlined />
    },
]

const Sidebar = ({
    drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile
}) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(()=> {
        setActive(pathname.substring(1));
    },[pathname]);
  return <Box component="nav">
    {isSidebarOpen ?
        <Drawer 
        open={isSidebarOpen} 
        onClose={()=> setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper" : {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSizing: "border-box",
                borderWidth: isNonMobile? 0: "2px",
                widht: drawerWidth
            }
        }}>
            <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary.main}>
                    <Box display="flex" alignItems="center" gap="0.5rem">
                        <Typography variant="h4" fontWeight={"bold"}>
                            NetworkMarket
                        </Typography>
                    </Box>
                    {!isNonMobile &7 (
                        <IconButton onClick={()=> setIsSidebarOpen(!isSidebaropen)}>
                            <ChevronLeft />
                        </IconButton>
                    )}
                </FlexBetween>
            </Box>
            <List>
                {navItems.map((text, icon) => {
                    if(!icon) {
                        return(
                            <Typography key={text} sx={{m:"2.25rem 0 2rem 3rem"}}>
                                {text}
                            </Typography>
                        )
                    }
                    const lcText = text.toLowerCase();
                    return(
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={()=> {
                                navigate(`/${lcText}`);
                                setActive(lcText);
                            }}>
                                
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>: (

    )}
  </Box>;
};

export default Sidebar;
