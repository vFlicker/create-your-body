import './TrainContainer.css';

export default function TrainContainer({ title, onClick, icon, iconAlt }) {
  return (
    <div className="container" onClick={onClick}>
      <div className="nameContainer">
        <img src={icon} alt={iconAlt} />
        <h2>{title}</h2>
      </div>
    </div>
  );
}
