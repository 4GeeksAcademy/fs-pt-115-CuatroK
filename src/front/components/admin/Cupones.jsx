import { useEffect, useState } from "react"
import { getDiscount } from "../../services/serviceApi"
import { useAuth } from "../../hooks/useAuth"
import { CuponCard } from "./cuponesComponents/CuponCard"

export const Cupones = () => {
    const { token } = useAuth()
    const [couponInfo, setCouponInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const getCouponData = async () => {
        const data = await getDiscount(token, setLoading)
        setCouponInfo(data)
    }
    useEffect(() => {
        getCouponData()
    }, [])


    return (

        <div>
            {
                loading ? (
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        <div
                            className="spinner-border text-warning"
                            role="status"
                            style={{ width: "2rem", height: "2rem" }}
                        >
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : !couponInfo ? (
                    <h3 className="profile-form text-center py-5 my-3">
                        ¡Sin cupones!
                    </h3>
                ) :
                    couponInfo.map((item) => (
                        <CuponCard discount_code={item.discount_code}
                            total={item.total}
                            start_date={item.start_date}
                            expiration_date={item.expiration_date}
                        />
                    ))

            }

        </div>
    )
}
