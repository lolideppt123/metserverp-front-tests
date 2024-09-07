import { Tooltip } from "antd";

const renderTextWithTooltip = ({ text, maxLength }) => (
    text?.length > maxLength ? (
        <Tooltip className="pointer" title={text}>
            <span>
                {text.substr(0, maxLength)}
                {text.length > maxLength && "\u2026"}
            </span>
        </Tooltip>
    ) : (
        <span>{text}</span>
    )
);

export default renderTextWithTooltip