import CurrencyInput from 'components/form/CurrencyInput';
import MarketSelect from 'components/form/MarketSelect';
import { useFormikContext } from 'formik';
import useWeb3 from 'hooks/useWeb3';
import { useEffect, useRef } from 'react';
import { FormValues } from '..';
import style from '../style.module.scss';
import { toCurrency, toPercent } from 'utils/formatters';

const POOL_SIZE = 10000000;

const LiquidityFields = () => {
  const form = useFormikContext<FormValues>();
  const { account, library } = useWeb3();

  useEffect(() => {
    if (!library) {
      return;
    }

    // console.log(account, library.getBalance);

    // console.log();
    library.eth.getBalance(account).then(res => {
      console.log(res);
    })
  }, [library]);

  return (
    <>
      <MarketSelect className="mbm"/>
      <CurrencyInput
        name="liquidity"
        label="Input"
        balance={12300.22}
        className="mbm"
      />
      <div className={style.row}>
        <div className={style.col4}>
          <DetailLabel label="Pool Size (BUSD)" value={toCurrency(POOL_SIZE)} />
        </div>
        <div className={style.col4}>
          <DetailLabel label="Share of Pool" value={toPercent((form.values.liquidity / POOL_SIZE) * 100)} />
        </div>
        <div className={style.col4}>
          <DetailLabel label="SLP to Receive" value={toCurrency(form.values.liquidity)} />
        </div>
      </div>
    </>
  );
};

interface DetailLabelProps {
  label: string;
  value: string;
}

const DetailLabel = ({ label, value }: DetailLabelProps) => {
  return (
    <div className={style.detail}>
      <span className={style.label}>{label}</span>
      <span className={style.value}>{value}</span>
    </div>
  );
};

export default LiquidityFields;
