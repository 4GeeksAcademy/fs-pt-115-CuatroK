import { Link } from "react-router-dom";

export const Publicidad4 = () => {
    return (
        <div className="d-flex justify-content-center p-5 pb-2">
            <Link to="https://login.aplazame.com/customers?_gl=1*1quay6s*_up*MQ..*_gs*MQ..&gclid=CjwKCAjwuePGBhBZEiwAIGCVSyZRvj8BxhNjNcTlWgL723kfPOY-PDVRl5kOFQHxAHhYnnnQebHiaBoChmQQAvD_BwE&gbraid=0AAAAAChSY7A7dq3qpOrn8XWetlWecoeux" className="d-block" aria-label="pago aplazame">
                <img
                    src="https://www.joyeriasanchez.com/img/cms/banner-aplazame.png"
                    alt="Calcula el valor diario del oro y la plata"
                    className="img-fluid w-100 d-block"
                    style={{ height: "100%", objectFit: "cover" }}
                />
            </Link>
        </div>
    );
}; 2