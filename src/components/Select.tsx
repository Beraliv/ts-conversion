import { toCamelCase } from "../utils/toCamelCase";

import style from "./Select.module.css";

interface SelectProps<T extends string> {
  value: T | undefined;
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  chooseOptionText?: string;
  options: readonly T[];
  isOptionDisabled?: (option: T) => boolean;
  getLabel?: (option: T) => string;
}

export const Select = <T extends string>({
  value,
  label,
  handleChange,
  chooseOptionText = "Choose option",
  options,
  isOptionDisabled = () => false,
  getLabel = (option) => toCamelCase(option),
}: SelectProps<T>) => (
  <div className={style.SelectContainer}>
    <label className={style.SelectLabel} htmlFor={label}>
      {label}
    </label>
    <select
      id={label}
      className={style.Select}
      onChange={handleChange}
      value={value ?? chooseOptionText}
    >
      <option disabled hidden value={chooseOptionText}>
        {chooseOptionText}
      </option>
      {options.map((option) => (
        <option key={option} value={option} disabled={isOptionDisabled(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  </div>
);
