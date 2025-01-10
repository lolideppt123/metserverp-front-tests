import { useDispatch, useSelector } from 'react-redux';
import { salesFormReset, saveForm, selectSalesFormState } from '../features/sales/salesSlice';
import { useSnackbar } from 'notistack';
import _ from 'lodash';


export default function useAutoSaveForm() {
    const dispatch = useDispatch();
    const formState = useSelector(selectSalesFormState);
    const { enqueueSnackbar } = useSnackbar();

    const saveFormAsDraft = (data, isDirty, isValid) => {
        if (isDirty) {
            if (isValid) {
                if (!_.isEqual(formState, data)) {
                    dispatch(saveForm(data));
                    enqueueSnackbar("Saved to Sales Draft", { variant: 'success', autoHideDuration: 5000 });
                }
            }
            else {
                enqueueSnackbar("Saving failed. Form needs to be valid before saving.", { variant: 'error', autoHideDuration: 8000 });
            }
        }
    }

    const resetDraftForm = () => dispatch(salesFormReset());

    return { saveFormAsDraft, resetDraftForm }
}
