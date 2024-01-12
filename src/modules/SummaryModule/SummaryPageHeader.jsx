import AntdDatePicker from "../../components/DatePicker/AntdDatePicker"

export default function SummaryPageHeader({Labels, defaultDate, setDate}) {
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

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-4 mb-4 border-bottom">
                <AntdDatePicker defaultDate={defaultDate} setDate={setDate} />
            </div>
        </>
    )
}
