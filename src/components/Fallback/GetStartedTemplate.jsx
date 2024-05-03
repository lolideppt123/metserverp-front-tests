import SwirlArrow from './swirlArrowTop.svg';
import { NavLink } from 'react-router-dom';

export default function GetStartedTemplate(props) {
    return (
        <div className="get-started-template-container">
            <div className="template-wrapper">
                <div className='swirly-arrow-container'>
                    <img src={SwirlArrow} alt="" />
                </div>
                <div className='text-content-container' style={{ zIndex: '3' }}>
                    {
                        props.customizedHeader ? (
                            props.customizedHeader
                        ) : (
                            <h2 className='fw-bold'>Get started by adding all your {props.entity}!</h2>
                        )
                    }
                    {
                        props.customizedStatement ? (
                            props.customizedStatement
                        ) : (
                            props.optionalStatement ? (
                                <p>Adding them now will speed up your process of creating Sales & Inventory</p>
                            ) : (
                                <p>After you added them, it’s time to add stock to it by going to <NavLink to={props.nextStepURL} className='link-item position-relative'>{props.nextStep}</NavLink>.</p>
                            )
                        )
                    }

                    {props.nextStepOption && <p>or create your <NavLink to={props.nextStepOptionURL} className='link-item'>{props.nextStepOption}</NavLink></p>}
                </div>
            </div>
        </div>
    )
}
