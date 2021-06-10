import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LiveSignum from 'components/LiveSignum';
import MarketName from 'components/MarketName';
import useModal from 'hooks/useModal';
import { useEffect, useState } from 'react';
import classes from 'utils/classes';
import Menu from './Menu';
import style from './style.module.scss';
import useMarkets from 'hooks/useMarkets';

interface Props {
  className?: string;
  showRates?: boolean;
}

interface Market {
  assetSymbol: string;
  name: string;
}

const MarketSelect = ({ className, showRates }: Props) => {
  const [marketRate, setMarketRate] = useState('6.54%');
  const [oracleRate, setOracleRate] = useState('14.32%');
  const modal = useModal();
  const { loading, data } = useMarkets();
  const [currentMarekt, setCurrentMarket] = useState<Market>({assetSymbol: 'USDC-OTHER pool', name: 'AAVE'});

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketRate(`${(6 + randomNumber()).toFixed(2)}%`);
      setOracleRate(`${(12 + randomNumber()).toFixed(2)}%`);
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
  }, [currentMarekt])

  function openMenu() {
    modal.present(<Menu markets={data.markets} changeMarket={setCurrentMarket}/>);
  }

  return (
    <div className={classes(style.handle, className)} onClick={openMenu}>
      <div className={style.main}>
        <div className={style.value}>
          <MarketName market={currentMarekt.name as any} />
          <FontAwesomeIcon icon={faAngleRight} />
          {showRates ? 'USDC Deposit Rate' : currentMarekt.assetSymbol}
        </div>
        {showRates && (
          <div className={style.rates}>
            <div className={style.rate}>
              <span className={style.rateLabel}>Oracle (Floating) Rate</span>
              <LiveSignum value={oracleRate} className={style.rateAmount} />
            </div>
            <div className={style.rate}>
              <span className={style.rateLabel}>Market (Fixed) Rate</span>
              <LiveSignum value={marketRate} className={style.rateAmount} />
            </div>
          </div>
        )}
      </div>
      <FontAwesomeIcon icon={faAngleDown} className={style.caret} />
    </div>
  );
};

function randomNumber() {
  return Math.floor(Math.random() * (1000 - 100) + 100) / 100;
}

export default MarketSelect;
