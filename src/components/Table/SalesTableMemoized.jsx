import React, { useMemo, memo } from 'react'
import { Table } from 'antd'
import MoneyFormatter from '../../settings/MoneyFormatter';


const SalesTable = memo(({
    dataSource,
    dataColumn,
    summaryDataSource,
    onChange,
    xAxis,
    yAxis = 500,
    pagination,
    index = null,
    cummulatives = null
}) => {

    const memoizedDataSource = useMemo(() => dataSource, [dataSource]);
    const memoizedColumns = useMemo(() => dataColumn, [dataColumn]);

    const summarySource = summaryDataSource ? summaryDataSource : memoizedDataSource;

    const summary = useMemo(() => {
        let totalCost = 0;
        let grossPrice = 0;
        let margin = 0;
        let vat = 0;
        let cum_totalCost = 0;
        let cum_grossPrice = 0;
        let cum_margin = 0;
        let cum_vat = 0;

        // console.log("memoize table render")
        // console.log(dataSource)

        // summarySource.forEach((
        //     { sales_total_cost, sales_gross_price, sales_margin, sales_VAT }
        // ) => {

        //     totalCost += Number(sales_total_cost);
        //     grossPrice += Number(sales_gross_price);
        //     margin += Number(sales_margin);
        //     vat += Number(sales_VAT);
        // })

        // if (index === 0) {
        //     cummulatives[index] = {
        //         cum_totalCost: totalCost,
        //         cum_grossPrice: grossPrice,
        //         cum_margin: margin,
        //         cum_vat: vat,
        //     };
        // }
        // else {
        //     cum_totalCost = totalCost + cummulatives[index - 1].cum_totalCost;
        //     cum_grossPrice = grossPrice + cummulatives[index - 1].cum_grossPrice;
        //     cum_margin = margin + cummulatives[index - 1].cum_margin;
        //     cum_vat = vat + cummulatives[index - 1].cum_vat;



        //     let item = {
        //         cum_totalCost: cum_totalCost,
        //         cum_grossPrice: cum_grossPrice,
        //         cum_margin: cum_margin,
        //         cum_vat: cum_vat,
        //     };

        //     cummulatives.splice(index, 0, item);
        // }

        // console.log("Memoized Table Rendered")
        // console.log(summarySource)

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
                                amount={summarySource[0]?.sales_cost || 0}
                            // amount={totalCost}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={summarySource[0]?.sales_price || 0}
                            // amount={grossPrice}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={summarySource[0]?.sales_total_margin || 0}
                            // amount={margin}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={summarySource[0]?.sales_vat || 0}
                            // amount={vat}
                            />
                        }
                    </Table.Summary.Cell>
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
                                amount={summarySource[1]?.cumm_sales_cost || 0}
                            // amount={cummulatives[index]?.cum_totalCost}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={summarySource[1]?.cumm_sales_price || 0}
                            // amount={cummulatives[index]?.cum_grossPrice}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={summarySource[1]?.cumm_sales_margin || 0}
                            // amount={cummulatives[index]?.cum_margin}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={summarySource[1]?.cumm_sales_vat || 0}
                            // amount={cummulatives[index]?.cum_vat}
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

    }, [summaryDataSource])

    console.log(summarySource);
    return (
        <Table
            virtual
            dataSource={memoizedDataSource}
            columns={memoizedColumns}
            onChange={onChange}
            rowKey={(data) => data.pk}
            scroll={{
                x: xAxis,
                y: yAxis,
            }}
            pagination={pagination}
            summary={(data) => summary}
        />
    )
});

export default SalesTable