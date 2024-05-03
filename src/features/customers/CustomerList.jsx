import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers, getCustomerLoading, getCustomerError, fetchCustomers, getCustomerState } from './customerSlice'



export default function CustomerList() {
    const dispatch = useDispatch();

    // const customers = useSelector(getAllCustomers);
    // const customerLoad = useSelector(getCustomerLoading);
    // const customerError = useSelector(getCustomerError);
    const { loading, customers, error } = useSelector(getCustomerState);

    useEffect(() => {
        console.log("dispatched")
        dispatch(fetchCustomers());
    }, [dispatch])

    console.log(customers);

    return (
        <div>
            {customers.map((item) => (
                <>{item.name}</>
            ))}
        </div>
    )
}

