import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import AppButton from '../../components/Button/Button';
import CompaniesList from '../../components/CompaniesList/CompaniesList';
import InventoryList from '../../components/InventoryList/InventoryList';
import { logOut } from '../../reducers/user/user.actions';
import { fetchCompaniesData } from '../../reducers/companies/companies.actions';
import { useSelector } from 'react-redux';
import {
  selectCompanies,
  selectLoadingCompanies,
} from '../../reducers/companies/companies.selectors';
import { selectUser } from '../../reducers/user/user.selectors';
import AppSpinner from '../../components/Spinner/Spinner';
import {
  selectInventory,
  selectLoadingInventory,
} from '../../reducers/inventory/inventory.selectors';
import { fetchInventoryData } from '../../reducers/inventory/inventory.actions';

function MainPage() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.token) {
      dispatch(fetchCompaniesData(user.token));
      dispatch(fetchInventoryData(user.token));
    }
  }, [user.token]);

  const companies = useSelector(selectCompanies);
  const inventory = useSelector(selectInventory);
  const loadingCompanies = useSelector(selectLoadingCompanies);
  const loadingInventory = useSelector(selectLoadingInventory);

  const handleLogout = () => {
    localStorage.removeItem('companies-app-token');
    dispatch(logOut());
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <AppButton
            variant="danger"
            onClick={handleLogout}
            style={{ float: 'right' }}
          >
            Log out
          </AppButton>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Tabs defaultActiveKey="companies" className="mb-3">
            <Tab eventKey="companies" title="Companies">
              {loadingCompanies ? (
                <AppSpinner marginTop="50px" />
              ) : (
                <CompaniesList companies={companies} />
              )}
            </Tab>
            <Tab eventKey="inventory" title="Inventory">
              {loadingInventory ? (
                <AppSpinner marginTop="50px" />
              ) : (
                <InventoryList articles={inventory} />
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default MainPage;
