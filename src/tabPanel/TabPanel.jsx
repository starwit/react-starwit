import {Box} from "@mui/material";
import React from "react";
import TabPanelStyles from "./TabPanelStyles";
import PropTypes from "prop-types";
function TabPanel(props) {
    const {children, value, index, ...other} = props;
    const tabPanel = TabPanelStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className={tabPanel.box}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    value: PropTypes.any,
    index: PropTypes.any,
}
export default TabPanel;
