import React from "react";
import {useTranslation} from "react-i18next";
import {ValidatedTextField} from "@starwit/react-starwit";
import UpdateFieldStyles from "./UpdateFieldStyles";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {isNumber} from './DefaultModifier';

function UpdateField(props) {
    const {entity, field, prefix, handleChange, type, ...newProps} = props;
    const {t} = useTranslation();
    const updateFieldStyles = UpdateFieldStyles();

    if (field.type === "boolean") {
        return (
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={entity[field.name] !== null ? entity[field.name] : ""}
                            value={entity[field.name] !== null ? entity[field.name] : ""}
                            name={field.name} onChange={handleChange} key={field.name}
                            id={"checkbox-" + field.name}
                            label={t(prefix + "." + field.name)}
                        />
                    }
                    label={t(prefix + "." + field.name)}
                />
            </FormGroup>
        );
    }

    let type = field.type;
    if (isNumber(field.type)){
        type = 'number';
    }

    return (

        <ValidatedTextField
            inputProps={field.inputProps}
            key={field.name}
            id={"input-" + field.name}
            label={t(prefix + "." + field.name)}
            helperText={t(prefix + "." + field.name + ".hint")}
            name={field.name}
            type={type}
            value={entity[field.name] !== null ? entity[field.name] : ""}
            className={updateFieldStyles.textField}
            onChange={handleChange}
            margin="slim"
            isCreate={!entity?.id}
            regex={field.regex}
            notNull={field.notNull}
            min={field.min}
            max={field.max}
            {...newProps}
        />
    );
}

export default UpdateField;
