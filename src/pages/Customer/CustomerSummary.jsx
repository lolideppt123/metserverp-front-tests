import { useState } from "react";
import dayjs from "dayjs";
import SummaryPageHeader from "../../modules/SummaryModule/SummaryPageHeader";

const DATE_FORMAT = "YYYY-MM-DD";
const today = dayjs().format(DATE_FORMAT);
const last30Days = dayjs().subtract(1, "year").format(DATE_FORMAT);

export default function CustomerSummary() {
  const Labels = {
    BASE_ENTITY: "Customer Summary",
    TABLE_TITLE: "Customer Summary",
  };
  const [defaultDate, setDefaultDate] = useState([last30Days, today]);
  return (
    <>
      <SummaryPageHeader
        defaultDate={defaultDate}
        Labels={Labels}
        setDate={setDefaultDate}
        optionPicker={true}
      />
      <div>CustomerSummary</div>
    </>
  );
}
