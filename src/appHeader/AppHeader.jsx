import React from "react";
// Material UI Components
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import HeaderStyles from "./HeaderStyles";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Logout} from "@mui/icons-material";
import StarwitLogo from "../assets/img/logo-white.png";

function AppHeader(props) {
    const {menuItems, title, logo} = props;
    const defaultStyles = HeaderStyles();

    let styles = props.styles;
    if (!styles){
        styles = defaultStyles;
    }


    const history = useHistory();
    const {t} = useTranslation();

    return (
        <>
            <AppBar position="fixed" className={styles.appBar}>
                <Toolbar className={styles.toolbar}>
                    <img className={styles.menuLogoImg} src={logo} alt={"Logo of " + title}/>
                    <Typography className={styles.menuTitle} variant="h2" noWrap>
                        {title}
                    </Typography>
                    <div className={styles.spacer}/>
                    {menuItems.map(item => (
                        <Button key={item.title} color="secondary" disableRipple className={styles.linkButton}
                                onClick={() => history.push(item.link)}>{t(item.title)}</Button>
                    ))}
                    <IconButton color="secondary" disableRipple className={styles.linkButton}
                                onClick={() => history.push("/logout")}><Logout/></IconButton>
                </Toolbar>
            </AppBar>
            <div className={styles.contentSpacer}/>
        </>
    );
}

AppHeader.defaultProps = {
    //styles: HeaderStyles(),
    title: "A LireJarp App",
    logo: StarwitLogo,
    menuItems: []
}

export default AppHeader;
