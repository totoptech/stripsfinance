import style from './style.module.scss';
import Panel from 'components/Panel';
import { faArrowUp, faHistory } from '@fortawesome/free-solid-svg-icons';
import useModal from 'hooks/useModal';
import { Form, Formik } from 'formik';
import LiquidityFields from './LiquidityFields';
import Button from 'components/Button';
import useWeb3 from 'hooks/useWeb3';
import useAuth from 'hooks/useAuth';

export interface FormValues {
  collateral: string;
  leverage: number;
  position: string;
  liquidity: number;
}

const Liquidity = () => {
  const modal = useModal();
  const { account } = useWeb3();
  const { login } = useAuth();

  const initialValues: FormValues = {
    collateral: '',
    leverage: 5,
    position: '',
    liquidity: 0
  };

  function handleSubmit(values: FormValues) {
    if (!account)
      login();

    console.log('submit', values);
  }

  return (
    <Panel
      heading="Add Liquidity"
      className={style.panel}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <LiquidityFields />
          
          <Button variant="positive" size="large" block >
            {account ? 'Add Liquidity' : 'Unlock Wallet'}
          </Button>
        </Form>
      </Formik>
    </Panel>
  );
};

export default Liquidity;
