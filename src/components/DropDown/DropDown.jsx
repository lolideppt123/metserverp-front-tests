import { Dropdown } from "antd";
import { NavLink } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import DeleteModal from "../Modal/DeleteModal";
import CardModal from "../Modal/CardModal";

import { memo, useEffect, useState } from "react";

const DropDown = ({ showConfig, link2, editConfig, ShowCard, deleteConfig }) => {
    const [Destroy, setDestroy] = useState(false);

    const {showLink, disabled: showDisabled, cardHeader, cardWidth, cardBody } = showConfig || {};

    const {editLink, disabled: editDisabled} = editConfig || {};

    useEffect(() => {
        // console.log(Destroy)
        setDestroy(false)
    }, [Destroy])

    const items = [
        {
            key: '1',
            label: (
                <CardModal
                    // notAllowed={!link1 ? true : false}
                    classList={`DD-link DD-item-text`}
                    // classList={`${`DD-link ${!link1 && "not-allowed text-muted"}`} DD-item-text`}
                    buttonText={'Show'}
                    titleProp={cardHeader}
                    modalWidth={cardWidth || 600}
                    setDestroy={setDestroy}
                >
                    {/* {ShowCard} */}
                    {cardBody}
                </CardModal>
            ),
            icon: <FiEye className={`DD-icon`} />,
            disabled: showDisabled
        },
        {
            key: '2',
            label: (
                // <NavLink className={`DD-link ${!link2 && "not-allowed"}`} to={link2 ? link2 : ""}>
                <NavLink className={`DD-link`} to={editLink}>
                    {/* <div className={`DD-item-text ${!link2 && "text-muted"}`}>Edit</div> */}
                    <div className={`DD-item-text`}>Edit</div>
                </NavLink>
            ),
            icon: <FiEdit className={`DD-icon ${!link2 && "text-muted"}`} />,
            disabled: editDisabled
        },
        {
            key: '3',
            label: (
                <DeleteModal
                    deleteConfig={
                        {
                            ...deleteConfig,
                            linkExt: deleteConfig?.linkExt ? deleteConfig.linkExt : '',
                            buttonText: deleteConfig?.buttonText ? deleteConfig.buttonText : 'Delete',
                            setDestroy
                        }
                    }
                />
            ),
            icon: <FiTrash2 className={`DD-icon ${deleteConfig?.notAllowed && "text-muted not-allowed"}`} />,
            danger: true,
            disabled: deleteConfig.disabled
        },
    ]
    return (
        <Dropdown
            menu={{ items }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
            destroyPopupOnHide={Destroy}
        >
            <FiMoreHorizontal
                style={{ height: '20px', width: '20px', cursor: 'pointer', color: 'var(--bs-link-color)' }}
                onClick={(e) => e.preventDefault()}
            />
        </Dropdown>
    )
}

export default memo(DropDown)