import type { JSX } from "react";
import type React from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder_input?: string
}
export default function Input({ placeholder_input, ...props }: InputProps): JSX.Element {
    return (
        <div>
            <input {...props} placeholder={placeholder_input || props['placeholder']}></input>
        </div>
    )
}