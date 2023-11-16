import React from "react";
import {Fab} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Add} from "@mui/icons-material";
import AddFabButtonStyles from "./AddFabButtonStyles";
import PropTypes from "prop-types";

function AddFabButton(props) {
    const {onClick} = props;

    const FabWrapper = styled('div')(({theme}) => AddFabButtonStyles.fabWrapper(theme));

    return (
        <FabWrapper>
            <Fab aria-label="add" onClick={onClick}>
                <Add/>
            </Fab>
        </FabWrapper>
    );
}

AddFabButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AddFabButton;
