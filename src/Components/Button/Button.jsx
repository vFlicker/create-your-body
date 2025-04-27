import './Button.css';

import { useState } from 'react';

export default function Button({
  onClick,
  bg,
  bgFocus = '#A799FF',
  icon,
  text,
  reverse,
  disabled,
  color,
  width,
  style,
}) {
  const [isPressed, setIsPressed] = useState(false); // Состояние нажатия

  const handleClick = (e) => {
    if (onClick) onClick(e); // Вызываем переданный обработчик
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        ...style,
        background: isPressed ? bgFocus : bg, // Меняем фон при нажатии
        flexDirection: reverse ? 'row-reverse' : 'row',
        width: width ? width : '',
      }}
      disabled={disabled}
      className="mainBtn"
    >
      {icon && <img src={icon} alt="Иконочка" />}
      <p style={{ color: color ? color : '' }}>{text}</p>
    </button>
  );
}
