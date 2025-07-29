import React from "react";

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  large?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // If you're only using input elements
  // onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // If you want to support both <input> and <textarea>
};

export default function InputField({
  label,
  placeholder,
  value,
  type = "text",
  large = false,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          large ? "text-lg py-3" : "text-sm"
        }`}
      />
    </div>
  );
}
