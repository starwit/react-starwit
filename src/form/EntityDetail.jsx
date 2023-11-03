import {
    Button,
    Checkbox,
    Chip,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import EntityDetailStyles from "./EntityDetailStyles";
import {
    handleChange,
    handleDateTime,
    handleMultiSelect,
    handleSelect,
    isDate,
    isDateTime,
    isEnum,
    isInput,
    isMultiSelect,
    isSelect,
    isTime,
    isValid,
    prepareForSave
} from "./DefaultModifier";
import UpdateField from "./UpdateField.jsx";
import {Box} from "@mui/system";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

function EntityDetail(props) {
    const {entity, setEntity, fields, setFields, prefix, entityRest, id} = props;
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [titleKey, setTitleKey] = useState(null);
    const [hasFormError, setHasFormError] = React.useState(false);

    useEffect(() => {
        onIdChange();
    }, [id]);

    useEffect(() => {
        onEntityChange();
    }, [entity]);

    function onEntityChange() {
        setHasFormError(!isValid(fields, entity));
    }

    function onIdChange() {
        if (!id) {
            setTitleKey(prefix + ".create.title");
        } else {
            setTitleKey(prefix + ".update.title");
        }
    }

    function handleSubmit(event) {
        // turn off page reload
        event.preventDefault();
        const tmpOrg = prepareForSave(entity, fields);
        if (!id) {
            entityRest.create(tmpOrg).then(goBack);
        } else {
            entityRest.update(tmpOrg).then(goBack);
        }
    }

    const goBack = () => {
        navigate("/" + prefix);
    };

    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Typography variant="h1" color="primary" gutterBottom>{t(titleKey)}</Typography>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <FormControl>
                        <Button type="submit" variant="contained" color="secondary" disabled={hasFormError}>
                            {t("button.submit")}
                        </Button>
                    </FormControl>
                    <Stack marginTop={2}>
                        {fields?.map(field => {
                            if (isInput(field.type)) {
                                return (
                                    <div key={field.name}>
                                        <FormControl key={field.name} fullWidth>
                                            <UpdateField
                                                entity={entity}
                                                field={field}
                                                prefix={prefix}
                                                handleChange={e => handleChange(e, setEntity)}
                                                fullWidth
                                            />
                                        </FormControl>
                                    </div>
                                );
                            } else if (isEnum(field.type)) {
                                return (
                                    <div key={field.name}>
                                        <FormControl key={"enum-" + field.name} fullWidth>
                                            <InputLabel id={"select-label-" + field.name}>
                                                {t(prefix + "." + field.name)}
                                            </InputLabel>
                                            <Select
                                                labelId={"select-label-" + field.name}
                                                id={"select-id-" + field.name}
                                                name={field.name}
                                                value={entity[field.name]}
                                                label={t(prefix + "." + field.name)}
                                                onChange={e => handleChange(e, setEntity)}
                                            >
                                                {field.selectList?.map(item => (
                                                    <MenuItem value={item} key={item}>
                                                        {t(field.enumName + "." + item)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                );
                            } else if (isDate(field.type)) {
                                return (
                                    <div key={field.name}>
                                        <FormControl key={"enum-" + field.name} fullWidth>
                                            <DesktopDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                renderInput={(params) => <TextField {...params} />}
                                                id={"select-id-" + field.name}
                                                name={field.name}
                                                value={entity[field.name]}
                                                label={t(prefix + "." + field.name)}
                                                onChange={e => {
                                                    e = e.toISOString();
                                                    handleDateTime(e, field.name, setEntity)
                                                }}

                                            />
                                        </FormControl>
                                    </div>
                                );
                            } else if (isTime(field.type)) {
                                return (
                                    <div key={field.name}>
                                        <FormControl key={"enum-" + field.name} fullWidth>
                                            <TimePicker
                                                renderInput={(params) => <TextField {...params} />}
                                                id={"select-id-" + field.name}
                                                name={field.name}
                                                value={entity[field.name]}
                                                label={t(prefix + "." + field.name)}
                                                onChange={e => {
                                                    e = e.toISOString();
                                                    handleDateTime(e, field.name, setEntity)
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                );
                            } else if (isDateTime(field.type)) {
                                return (
                                    <div key={field.name}>
                                        <FormControl key={"enum-" + field.name} fullWidth>
                                            <DateTimePicker
                                                renderInput={(params) => <TextField {...params} />}
                                                id={"select-id-" + field.name}
                                                name={field.name}
                                                value={entity[field.name]}
                                                label={t(prefix + "." + field.name)}
                                                onChange={e => {
                                                    e = e.toISOString();
                                                    handleDateTime(e, field.name, setEntity)
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                );
                            } else if (isSelect(field.type)) {
                                return (
                                    <div key={field.name}>
                                        <FormControl key={"select-" + field.name} fullWidth>
                                            <InputLabel id={"select-label-" + field.name}>
                                                {t(prefix + "." + field.name)}
                                            </InputLabel>
                                            <Select
                                                labelId={"select-label-" + field.name}
                                                id={"select-id-" + field.name}
                                                name={field.name}
                                                value={entity[field.name] ? entity[field.name].id : -1}
                                                label={t(prefix + "." + field.name)}
                                                onChange={e => handleSelect(e, setEntity)}
                                            >
                                                <MenuItem value={-1} key={-1}>{t("select.none")}</MenuItem>
                                                {field.selectList?.map(item => (
                                                    <MenuItem value={item.id} key={item.id}>
                                                        {field.display?.map(attr => item[attr] + " ")}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                );
                            } else if (isMultiSelect(field.type)) {
                                return (
                                    <div key={field.name}>
                                        <FormControl fullWidth>
                                            <InputLabel id={"multiple-label-" + [field.name]}>
                                                {t(prefix + "." + field.name)}
                                            </InputLabel>
                                            <Select
                                                labelId={"multi-label-" + field.name}
                                                id={"multi-id-" + field.name}
                                                multiple
                                                value={field.selectedIds}
                                                label={t(prefix + "." + field.name)}
                                                onChange={e => handleMultiSelect(e, fields, setFields)}
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={selected => (
                                                    <Box sx={EntityDetailStyles.selectBox}>
                                                        {selected.map(selectedId => {
                                                            const item = field.selectList?.find(e => e.id === selectedId);
                                                            if (field.selectList?.length > 0) {
                                                                return (
                                                                    <Chip key={selectedId}
                                                                        label={field.display?.map(attr => item[attr] + " ")}
                                                                    />
                                                                );
                                                            }
                                                        })}
                                                    </Box>
                                                )}
                                            >
                                                {field.selectList?.map(item => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        <Checkbox checked={field.selectedIds?.includes(item.id)} />
                                                        <ListItemText
                                                            primary={field.display?.map(attr => item[attr] + " ")}
                                                        />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                );
                            } else {
                                console.warn("Unknown FieldType given. Skipping input field.")
                            }
                        })}
                    </Stack>
                </form>
            </LocalizationProvider>
        </Container>
    );
}

export default EntityDetail;
