export default function NoServerResponse({ error }) {
    return (
        error?.response ?
            (
                <div className="py-4">
                    <h6 className="text-center px-3 mt-4 mb-1"><i>No Results Found</i></h6>
                </div>
            ) : (
                error?.request ? (
                    <div className="py-4">
                        <h6 className="text-center px-3 mt-4 mb-1"><i>No Server Response. Try refreshing the page.</i></h6>
                    </div>
                ) : (
                    <div className="py-4">
                        <h6 className="text-center px-3 mt-4 mb-1"><i>Cannot Connect to the Server. Try refreshing the page.</i></h6>
                    </div>
                )
            )

    )
}
