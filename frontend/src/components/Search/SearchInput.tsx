interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

function SearchInput({ value, onChange, onSubmit} : SearchInputProps) {
    return (
        <input
            type="text"
            placeholder="Search..."
            className="w-80 px-4 py-2 text-white bg-gray-800 placeholder-gray-400 outline-none shadow-lg transition-all duration-300"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
    )
}
export default SearchInput;