import React from "react";
import StatementStyles from "./StatementStyles";
import {Button, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import iconEmpty from "./icon-empty.png";

function Statement(props) {
    const {icon, message, actionMessage, onActionClick, enableSpacing, spacingHeight} = props;

    const RootDiv = styled('div')(({theme}) => StatementStyles.root({height: spacingHeight, enableSpacing: enableSpacing}));
    const ContentDiv = styled('div')(({theme}) => StatementStyles.content(theme));

    function renderActionButton() {
        if (actionMessage && onActionClick) {
            return <Button onClick={onActionClick}>{actionMessage}</Button>;
        }
    }

    function renderIcon() {
        if (icon) {
            return React.cloneElement(icon, {fontSize: "large"});
        }
    }

    return (
        <RootDiv>
            <ContentDiv>
                {renderIcon()}
                <Typography component={"span"} sx={StatementStyles.message}
                    gutterBottom>{message}</Typography>
                {renderActionButton()}
            </ContentDiv>
        </RootDiv>
    );
}

Statement.propTypes = {
    message: PropTypes.string,
    icon: PropTypes.element,
    actionMessage: PropTypes.string,
    onActionClick: PropTypes.func,
    enableSpacing: PropTypes.bool,
    spacingHeight: PropTypes.any
};

Statement.defaultProps = {
    message: "Keine Nachricht festgelegt",
    icon: <img src={iconEmpty} alt="empty"/>,
    spacingHeight: "15rem"
};

export default Statement;
