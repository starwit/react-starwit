const LoadingSpinnerStyles = {
    root: theme => ({
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    }),
    contentWrapper: theme => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }),
    loadingSpinner: theme => ({
        marginBottom: theme.spacing(2)
    }),
    message: theme => ({
        color: theme.palette.text.secondary
    })
};
export default LoadingSpinnerStyles;
