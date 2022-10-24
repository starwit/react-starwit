import React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PropTypes from "prop-types";


function OverviewTable(props) {
    const {entities, fields, prefix, selected, onSelect} = props;
    const {t} = useTranslation();

    function renderTableCellContent(type) {
        if (typeof type === "boolean") {
            return <Checkbox disabled checked={type}/>
        }
        return type
    }

    return (
        <TableContainer>
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
                                <TableCell key={entity.id + "." + field.name}>
                                    {renderTableCellContent(entity[field.name])}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
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
