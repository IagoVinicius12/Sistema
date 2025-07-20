import type { JSX } from "react";
import type React from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder_input?: string
}
export default function Input({ placeholder_input, ...props }: InputProps): JSX.Element {
    return (
            <input {...props} placeholder={placeholder_input || props['placeholder']} className=' w-[20%] h-10 rounded-lg shadow-sm'></input>
    )
}