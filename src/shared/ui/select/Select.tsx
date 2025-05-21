import classes from './Select.module.css';

export function Select({ className, value, options, onChange }) {
  return (
    <div>
      <select
        className={`${className} ${classes.select}`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
