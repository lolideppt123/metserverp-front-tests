import { showSnackbar } from '../../features/utils/snackbarSlice'; // Import your snackbar action

export const apiMiddleware = store => next => action => {
    // Check if the action is fulfilled (successful)
    console.log("middleware action", action)
    if (action.type.endsWith('fulfilled')) {
        const { dispatch } = store;
        const { data } = action.payload;
        console.log("middleware", data);
        dispatch(showSnackbar({
            message: data?.message || "Operation successful",
            variant: 'success',
        }));
    }

    // Check if the action is rejected (failed)
    if (action.type.endsWith('rejected')) {
        const { dispatch } = store;
        const { error } = action.payload;

        dispatch(showSnackbar({
            message: error?.message || "An error occurred",
            variant: 'error',
        }));
    }

    return next(action);
};
