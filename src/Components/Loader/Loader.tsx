import './Loader.css';

export default function Loader({
  height = '100%',
  width = '50px',
  borderWidth = '4px',
  widthContainer = '100%',
}) {
  return (
    <div
      className="loadingSpinner"
      style={{ height: height ? height : '', width: widthContainer }}
    >
      <div
        className="spinner"
        style={{
          width: width ? width : '',
          height: width ? width : '',
          border: `${borderWidth}px solid rgba(0, 0, 0, 0.1)`,
          borderTop: `${borderWidth}px solid #A799FF`,
        }}
      ></div>
    </div>
  );
}
