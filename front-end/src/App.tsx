import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppContainer } from './App.styled';
import { useAppDispatch } from './app/hooks';
import AppToast from './components/AppToast/AppToast';
import AppSpinner from './components/Spinner/Spinner';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import { setSuccessMessage } from './reducers/companies/companies.actions';
import { selectSubmitMessage } from './reducers/companies/companies.selectors';
import { setInventorySuccessMessage } from './reducers/inventory/inventory.actions';
import { selectInventorySubmitMessage } from './reducers/inventory/inventory.selectors';
import {
  setError,
  setLoading,
  verifyToken,
} from './reducers/user/user.actions';
import { selectUser } from './reducers/user/user.selectors';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const submitMessage = useSelector(selectSubmitMessage);
  const inventorySubmitMessage = useSelector(selectInventorySubmitMessage);

  useEffect(() => {
    if (user.token && user.authenticated) {
      localStorage.setItem('companies-app-token', JSON.stringify(user.token));
    }
  }, [user.token, user.authenticated]);

  useEffect(() => {
    const token = localStorage.getItem('companies-app-token');

    if (token) {
      dispatch(
        verifyToken({
          token: JSON.parse(token),
        })
      );
    } else {
      dispatch(setLoading(false));
    }
  }, []);

  if (user.loading) {
    return (
      <AppContainer>
        <AppSpinner marginTop="45vh" />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      {user.authenticated ? <MainPage /> : <Login />}
      {user.error && (
        <AppToast
          show={!!user.error}
          message={user.error}
          title="Error"
          variant="danger"
          onDismiss={() => {
            dispatch(setError(''));
          }}
        />
      )}
      {submitMessage && (
        <AppToast
          show={!!submitMessage}
          message={submitMessage}
          variant="success"
          onDismiss={() => {
            dispatch(setSuccessMessage(''));
          }}
        />
      )}
      {inventorySubmitMessage && (
        <AppToast
          show={!!inventorySubmitMessage}
          message={inventorySubmitMessage}
          variant="success"
          onDismiss={() => {
            dispatch(setInventorySuccessMessage(''));
          }}
        />
      )}
    </AppContainer>
  );
};

export default App;
