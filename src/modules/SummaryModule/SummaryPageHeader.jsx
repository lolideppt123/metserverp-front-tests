import AntdDatePicker from "../../components/DatePicker/AntdDatePicker";

export default function SummaryPageHeader({ Labels, defaultDate, setDate }) {
    return (
        <>
            <div className="col-md-9 mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 my-2">
                        <li className="breadcrumb-item"><a href="">{Labels.BASE_ENTITY}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{Labels.TABLE_TITLE}</li>
                    </ol>
                </nav>
            </div>

            <div className="row">
                <div className="col col-lg-3">
                    {/* <select className='form-select form-select-sm' onChange={(e) => setOptions(e.target.value)}>
                        <option defaultValue={"ALL"} value="ALL">All</option>
                        <option value="PRODUCTS">Product Sales</option>
                        <option value="CUSTOMERS">Customer Sales</option>
                    </select> */}
                </div>
                <div className="col col-lg-5"></div>
                <div className="col col-lg-4">
                    <AntdDatePicker defaultDate={defaultDate} setDate={setDate} />
                </div>
            </div>
        </>
    )
}
