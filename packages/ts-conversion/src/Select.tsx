import { toCamelCase } from "./toCamelCase";

interface SelectProps<T extends string> {
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  chooseOptionText?: string;
  options: readonly T[];
  isOptionDisabled?: (option: T) => boolean;
}

export const Select = <T extends string>({
  label,
  handleChange,
  chooseOptionText = "Choose option",
  options,
  isOptionDisabled = () => false,
}: SelectProps<T>) => (
  <div className="SelectContainer">
    <label className="SelectLabel">{label}</label>
    <select className="Select" onChange={handleChange}>
      <option disabled hidden selected>
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
