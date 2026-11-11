interface ButtonProps {
    label: string;
    onClick?: (...args: any) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

function Button({ label, onClick, disabled, type = "button" }: ButtonProps) {
    return (
        <button
            className="button"
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {label}
        </button>
    );
}

export default Button;