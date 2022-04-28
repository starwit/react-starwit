import React from "react";
import {useTranslation} from "react-i18next";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import PropTypes from "prop-types";

function OverviewTable(props) {
    const {entities, fields, prefix, selected, onSelect} = props;
    const {t} = useTranslation();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {fields?.map(field => <TableCell key={t(prefix + "." + field.name)}>{field.name}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {entities?.map(entity =>
                    <TableRow key={entity.id}
                              onClick={() => onSelect(entity)}
                              selected={selected && entity.id === selected.id}
                    >
                        {fields?.map(field =>
                            <TableCell key={entity.id + "." + field.name}>{entity[field.name]}</TableCell>)}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

OverviewTable.propTypes = {
    entities: PropTypes.array,
    fields: PropTypes.array,
    prefix: PropTypes.string,
    selected: PropTypes.object,
    onSelect: PropTypes.func
}

export default OverviewTable;
