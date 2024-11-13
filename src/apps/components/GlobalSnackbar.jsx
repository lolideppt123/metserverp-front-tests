import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { hideSnackbar, selectSnackbar } from "../../features/utils/snackbarSlice";

const GlobalSnackbar = () => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const {message, variant, open} = useSelector(selectSnackbar)

    useEffect(() => {
        if(open) {
            enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
            dispatch(hideSnackbar());
        }
    }, [open, message, variant, enqueueSnackbar, dispatch])

    return null;
}

export default GlobalSnackbar;