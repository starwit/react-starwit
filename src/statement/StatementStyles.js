const StatementStyles = {
    root: props => ({
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: (props.height && props.height ? props.height : "100%"),
        width: "100%"
    }),
    content: theme => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }),
    message: theme => ({
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(2)
    })
};
export default StatementStyles;
