export default function DropDownItem(props) {
    return (
        <li className='d-flex'>
            <div className={`flex-shrink-1 DD-item-icon ${props.optionIconStyle}`}>
                {props.icon}
            </div>
            <div className={`flex-fill DD-item-text ${props.optionTextStyle}`}>
                <span>{props.text}</span>
            </div>
        </li >
    )
}