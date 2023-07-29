export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label {...props} className={`text-gray-500 font-medium ` + className}>
            {value ? value : children}
        </label>
    );
}
