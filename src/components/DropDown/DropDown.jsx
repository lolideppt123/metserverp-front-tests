import { Dropdown } from "antd";
import { NavLink } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import DeleteModal from "../Modal/DeleteModal";
import CardModal from "../Modal/CardModal";

import { memo, useEffect, useState } from "react";

const DropDown = ({ link1, link2, ShowCard, cardWidth, cardHeader, deleteConfig }) => {
    const [Destroy, setDestroy] = useState(false);
    useEffect(() => {
        // console.log(Destroy)
        setDestroy(false)
    }, [Destroy])

    const items = [
        {
            key: '1',
            label: (
                <CardModal
                    notAllowed={!link1 ? true : false}
                    classList={`${`DD-link ${!link1 && "not-allowed text-muted"}`} DD-item-text`}
                    buttonText={'Show'}
                    titleProp={cardHeader ? cardHeader : <></>}
                    modalWidth={cardWidth ? cardWidth : 600}
                    setDestroy={setDestroy}
                >
                    {ShowCard}
                </CardModal>
            ),
            icon: <FiEye className={`DD-icon ${!link1 && "text-muted not-allowed"}`} />
        },
        {
            key: '2',
            label: (
                <NavLink className={`DD-link ${!link2 && "not-allowed"}`} to={link2 ? link2 : ""}>
                    <div className={`DD-item-text ${!link2 && "text-muted"}`}>Edit</div>
                </NavLink>
            ),
            icon: <FiEdit className={`DD-icon ${!link2 && "text-muted"}`} />
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
            icon: <FiTrash2 className={`DD-icon ${deleteConfig?.notAllowed && "text-muted not-allowed"}`} />
        },
    ]
    return (
        <Dropdown
            menu={{ items }}
            placement="bottomLeft"
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