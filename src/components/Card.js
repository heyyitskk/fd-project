import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let data = useCart();
    let navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const priceRef = useRef();
    // const [btnEnable, setBtnEnable] = useState(false);
    // let totval = 0
    // let price = Object.values(options).map((value) => {
    //   return parseInt(value, 10);
    // });
    let options = props.options;
    let priceOptions = Object.keys(options);
    let foodItem = props.item;
    const dispatch = useDispatchCart();
    const handleClick = () => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login")
        }
    }
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food !== null) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })


    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div><div>
            <div className="card" style={{ width: "18rem", maxHeight: "360px", margin: "30px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100" style={{ padding: "0" }}>
                        <select className="m-2 h-100 bg-success rounded" onClick={handleClick} onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onClick={handleClick} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}

                        </select>
                        <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div></div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div></div>
    )
}
