import { NavLink } from "react-router-dom"

export default function AccordionItem(props) {
  return (
    <NavLink to={props.url} className="nav-link">
      <span>{props.text}</span>
    </NavLink>
  )
}
