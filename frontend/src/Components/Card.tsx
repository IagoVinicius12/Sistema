import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { JSX } from "react";
import type React from "react";
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons'


interface CardProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name:string,
    price:number,
}
export default function Card({name,price }: CardProps): JSX.Element {
    return (
            <div className="w-[33%] h-[30%] flex flex-col mb-2 bg-white shadow-sm rounded-lg">
                <section className="w-[100%] h-[75%] bg-amber-800 rounded-t-lg"></section>
                <p>{price}</p>
                <p>{name}</p>
            </div>
    )
}