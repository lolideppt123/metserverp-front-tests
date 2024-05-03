
export default function InventoryFormAside({ data }) {

    return (
        <>
            {data?.map((item, index) => (
                <div key={`${item[0]?.product}.${index}`}>
                    <h6 className="fw-semibold text-center px-3 mt-4 mb-1">{item[0]?.product}</h6>
                    <table key={index} className="table table-sm mb-3">
                        <thead>
                            <tr>
                                <th scope='col col-sm'>Date</th>
                                <th scope='col col-sm'>Bought</th>
                                <th scope='col col-sm'>Remaining</th>
                                <th scope='col col-sm'>Deduct</th>
                                <th scope='col col-sm'>Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item?.map((elem, i) => (
                                <tr key={i}>
                                    <td>{elem.date}</td>
                                    <td>{elem.quantity_bought}</td>
                                    <td>{elem.quantity_remaining}</td>
                                    <td>({elem.quantity_deduct})</td>
                                    <td>{elem.quantity_left}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </>
    )
}
