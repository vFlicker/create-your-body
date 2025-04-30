import './Container.css';

import { useNavigate } from 'react-router-dom';

import lock from '~/shared/assets/svg/lock.svg';

export default function Containers({ data }) {
  const navigate = useNavigate();

  return (
    <div
      className={`container ${data.closed !== null || data.buy ? 'disabled' : ''}`}
      style={{
        background: data.instruction ? '#D3CCFF' : '',
        borderColor: data.instruction ? '#D3CCFF' : '',
      }}
      onClick={() => navigate(`/${data.to}`)}
    >
      <div
        className="nameContainer"
        style={{ filter: data.buy ? 'blur(1px)' : '' }}
      >
        <img src={data.icon} alt={data.name} />
        <h2>{data.name}</h2>
      </div>
      {data.closed && (
        <div className="containerClosed">
          <p>Откроется {data.closed}</p>
        </div>
      )}
      {data.buy && (
        <button className="containerBuy">
          <img src={lock} alt="Купить" />
          <p>Доступно в PRO</p>
        </button>
      )}
    </div>
  );
}
