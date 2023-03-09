import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContainer, SpinnerContainer } from './App.styled';
import { useAppDispatch } from './app/hooks';
import Login from './pages/Login/Login';
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
        <SpinnerContainer>
          <Spinner variant="primary" animation="border" />
        </SpinnerContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      {user.authenticated ? <div>Login!!!</div> : <Login />}
    </AppContainer>
  );
};

export default App;
