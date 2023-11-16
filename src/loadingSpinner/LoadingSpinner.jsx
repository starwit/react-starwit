import React, {useEffect, useState} from "react";
import {CircularProgress, Fade, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import LoadingSpinnerStyles from "./LoadingSpinnerStyles";

function LoadingSpinner(props) {
    const {message} = props;
    const [showMessage, setShowMessage] = useState(false);

    const RootDiv = styled('div')(({theme}) => LoadingSpinnerStyles.root(theme));
    const ContentWrapperDiv = styled('div')(({theme}) => LoadingSpinnerStyles.contentWrapper(theme));

    useEffect(() => {
        const messageTimer = setTimeout(function() {
            setShowMessage(true);
        }, 1000);

        return () => {
            clearTimeout(messageTimer);
        };
    });

    return (
        <RootDiv>
            <ContentWrapperDiv>
                <CircularProgress color={"secondary"} sx={LoadingSpinnerStyles.loadingSpinner}/>
                <Fade in={showMessage}>
                    <Typography variant={"body1"} sx={LoadingSpinnerStyles.message}>{message}</Typography>
                </Fade>
            </ContentWrapperDiv>
        </RootDiv>
    );
}

LoadingSpinner.defaultProps = {
    message: "Loading..."
};

LoadingSpinner.propTypes = {
    message: PropTypes.string
};
export default LoadingSpinner;
