import React from "react";
// Material UI Components
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import HeaderStyles from "./HeaderStyles";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Logout} from "@mui/icons-material";
import StarwitLogo from "../assets/img/logo-white.png";

function AppHeader(props) {
    const {menuItems, title, logo} = props;

    let styles = props.styles;
    if (!styles) {
        styles = HeaderStyles;
    }

    const navigate = useNavigate();
    const {t} = useTranslation();

    const LogoImg = styled('img')(({theme}) => styles.menuLogoImg(theme));
    const Spacer = styled('div')(({theme}) => styles.spacer(theme));
    const ContentSpacer = styled('div')(({theme}) => styles.contentSpacer(theme));

    return (
        <>
            <AppBar position="fixed" sx={styles.appBar}>
                <Toolbar sx={styles.toolbar}>
                    <LogoImg src={logo} alt={"Logo of " + title}/>
                    <Typography sx={styles.menuTitle} variant="h2" noWrap>
                        {title}
                    </Typography>
                    <Spacer/>
                    {menuItems.map(item => (
                        <Button key={item.title} color="inherit" disableRipple sx={styles.linkButton}
                                onClick={() => navigate(item.link)}>{t(item.title)}</Button>
                    ))}
                    <IconButton color="inherit" disableRipple sx={styles.linkButton}
                                onClick={() => navigate("/logout")}><Logout/></IconButton>
                </Toolbar>
            </AppBar>
            <ContentSpacer/>
        </>
    );
}

AppHeader.defaultProps = {
    title: "A LireJarp App",
    logo: StarwitLogo,
    menuItems: []
}

export default AppHeader;
