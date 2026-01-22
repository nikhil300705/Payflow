export function InputBox({ label, placeholder, onChange, type = "text" }) {
  return (
    <div className="w-full mt-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          px-3
          py-2
          mt-1
          border
          rounded-md
          outline-none
          bg-blue-50
          border-gray-300
          focus:border-blue-500
          focus:bg-white
        "
      />
    </div>
  );
}
