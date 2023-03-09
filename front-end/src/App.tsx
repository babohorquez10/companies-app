import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppContainer } from './App.styled';
import { useAppDispatch } from './app/hooks';
import ErrorToast from './components/ErrorToast/ErrorToast';
import AppSpinner from './components/Spinner/Spinner';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import { setLoading, verifyToken } from './reducers/user/user.actions';
import { selectUser } from './reducers/user/user.selectors';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

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
      {user.error && <ErrorToast show={!!user.error} error={user.error} />}
    </AppContainer>
  );
};

export default App;
