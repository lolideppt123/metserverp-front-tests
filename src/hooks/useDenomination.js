import { useDispatch, useSelector } from 'react-redux';
import { selectDenomination, populateState } from '../features/utils/denominationSlice';
import _ from 'lodash';



export default function useDenomination() {
    const dispatch = useDispatch();
    const denominationState = useSelector(selectDenomination);

    const saveGlobalDenomination = (data) => {
        if (!_.isEqual(denominationState, data)) {
            dispatch(populateState(data));
        }
    }

    return { saveGlobalDenomination }

}
