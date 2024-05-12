import ImageHeader from '../../../assets/HeaderImage.svg';

export default function MobileNavHead() {
    return (
        <div className="mobile-nav-header">
            <img
                // src="https://img.logoipsum.com/243.svg"
                src={ImageHeader}
                className={`overflow-hidden transition-all`}
                alt=""
                style={{ maxWidth: '13rem' }}
            />
        </div>
    )
}
