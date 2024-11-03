import { Table } from "antd";
import MoneyFormatter from "../../settings/MoneyFormatter";

const SalesTableSummary = ({ sales_totals, sales_cummulative }) => {
    return (
        <Table.Summary fixed>
            <Table.Summary.Row>
                <Table.Summary.Cell
                    index={0}
                    colSpan={2}
                    className="text-start fw-bold bg-light h6"
                >
                    Total
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_totals?.sales_cost || 0}
                        // amount={totalCost}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_totals?.sales_price || 0}
                        // amount={grossPrice}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_totals?.sales_total_margin || 0}
                        // amount={margin}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_totals?.sales_vat || 0}
                        // amount={vat}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
                <Table.Summary.Cell
                    index={0}
                    colSpan={2}
                    className="text-start fw-bold bg-light h6"
                >
                    Cumulative
                </Table.Summary.Cell>
                {/* <Table.Summary.Cell></Table.Summary.Cell> */}
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_cummulative?.cumm_sales_cost || 0}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_cummulative?.cumm_sales_price || 0}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_cummulative?.cumm_sales_margin || 0}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                    {
                        <MoneyFormatter
                            amount={sales_cummulative?.cumm_sales_vat || 0}
                        />
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
            </Table.Summary.Row>
        </Table.Summary>
    )
}

export default SalesTableSummary