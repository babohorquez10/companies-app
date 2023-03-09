import { useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import AppButton from '../../components/Button/Button';
import { selectUser } from '../../reducers/user/user.selectors';
import { LoginContainer, LoginForm } from './Login.styled';
import { useSelector } from 'react-redux';
import { login } from '../../reducers/user/user.actions';
import { useAppDispatch } from '../../app/hooks';

function Login() {
  const dispatch = useAppDispatch();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(selectUser);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      dispatch(
        login({
          email,
          password,
        })
      );
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <LoginContainer>
            <LoginForm>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    required
                  />
                </Form.Group>
                <AppButton loading={user.loadingLogin} type="submit">
                  Submit
                </AppButton>
              </Form>
            </LoginForm>
          </LoginContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
