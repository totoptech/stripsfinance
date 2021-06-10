import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';
import Modal from 'components/Modal';
import Button from 'components/Button';
import useModal from 'hooks/useModal';
import MarketName from 'components/MarketName';

const Menu = ({ markets, changeMarket }) => {
  const modal = useModal();

  const handleChangeMarket = (market) => {
    changeMarket(market);
    modal.pop();
  }
  return (
    <Modal title="Select a Market" size="small">
      <Modal.Body className={style.body}>
        <div className={style.menu}>
          {markets.map((market) => (
            <div className={style.item} onClick={() => handleChangeMarket(market)}>
              <MarketName market={market.name as any} />
              <FontAwesomeIcon icon={faAngleRight} />
              { market.assetSymbol }
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Menu;
