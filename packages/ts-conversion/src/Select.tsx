import { toCamelCase } from "./toCamelCase";

interface SelectProps<T extends string> {
  value: T;
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  chooseOptionText?: string;
  options: readonly T[];
  isOptionDisabled?: (option: T) => boolean;
}

export const Select = <T extends string>({
  value,
  label,
  handleChange,
  chooseOptionText = "Choose option",
  options,
  isOptionDisabled = () => false,
}: SelectProps<T>) => (
  <div className="SelectContainer">
    <label className="SelectLabel">{label}</label>
    <select
      className="Select"
      onChange={handleChange}
      value={value ?? chooseOptionText}
    >
      <option disabled hidden value={chooseOptionText}>
        {chooseOptionText}
      </option>
      {options.map((option) => (
        <option key={option} value={option} disabled={isOptionDisabled(option)}>
          {toCamelCase(option)}
        </option>
      ))}
    </select>
  </div>
);
