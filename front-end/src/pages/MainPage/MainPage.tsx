import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import AppButton from '../../components/Button/Button';
import CompaniesList from '../../components/CompaniesList/CompaniesList';
import InventoryList from '../../components/InventoryList/InventoryList';
import { logOut } from '../../reducers/user/user.actions';
import {
  deleteCompany,
  fetchCompaniesData,
} from '../../reducers/companies/companies.actions';
import { useSelector } from 'react-redux';
import {
  selectCompanies,
  selectLoadingCompanies,
  selectSubmitMessage,
} from '../../reducers/companies/companies.selectors';
import { selectIsAdmin, selectToken } from '../../reducers/user/user.selectors';
import AppSpinner from '../../components/Spinner/Spinner';
import {
  selectInventory,
  selectLoadingInventory,
  selectInventorySubmitMessage,
} from '../../reducers/inventory/inventory.selectors';
import {
  deleteInventory,
  fetchInventoryData,
} from '../../reducers/inventory/inventory.actions';
import CreateCompanyModal from '../../components/CreateCompany/CreateCompanyModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import CreateInventoryModal from '../../components/CreateInventoryModal/CreateInventoryModal';

function MainPage() {
  const dispatch = useAppDispatch();

  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
  const submitMessage = useSelector(selectSubmitMessage);
  const inventorySubmitMessage = useSelector(selectInventorySubmitMessage);

  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyAction, setCompanyAction] = useState('CREATE');
  const [companyToUpdate, setCompanyToUpdate] = useState();

  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryAction, setInventoryAction] = useState('CREATE');
  const [inventoryToUpdate, setInventoryToUpdate] = useState();

  // Delete.
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>();
  const [itemToDeleteName, setItemToDeleteName] = useState('');
  const [deleteType, setDeleteType] = useState('COMPANY');

  useEffect(() => {
    if (token) {
      dispatch(fetchCompaniesData(token));
      dispatch(fetchInventoryData(token));
    }
  }, [token]);

  useEffect(() => {
    if (submitMessage) {
      dispatch(fetchCompaniesData(token));
      setShowDeleteModal(false);
    }
  }, [submitMessage]);

  useEffect(() => {
    if (inventorySubmitMessage) {
      dispatch(fetchInventoryData(token));
      setShowDeleteModal(false);
    }
  }, [inventorySubmitMessage]);

  useEffect(() => {
    if (itemToDelete) {
      setShowDeleteModal(true);
    }
  }, [itemToDelete]);

  const companies = useSelector(selectCompanies);
  const inventory = useSelector(selectInventory);
  const loadingCompanies = useSelector(selectLoadingCompanies);
  const loadingInventory = useSelector(selectLoadingInventory);

  const handleLogout = () => {
    localStorage.removeItem('companies-app-token');
    dispatch(logOut());
  };

  const handleShowCompanyModal = (action: string) => {
    setCompanyAction(action);
    setShowCompanyModal(true);
  };

  const handleCloseCompanyModal = () => {
    setShowCompanyModal(false);
  };

  const handleUpdateCompany = (company: any) => {
    setCompanyToUpdate(company);
    handleShowCompanyModal('UPDATE');
  };

  const handleDeleteCompany = (company: any) => {
    setItemToDelete(company);
    setItemToDeleteName(company?.name);
    setDeleteType('COMPANY');
  };

  const handleShowInventoryModal = (action: string) => {
    setInventoryAction(action);
    setShowInventoryModal(true);
  };

  const handleCloseInventoryModal = () => {
    setShowInventoryModal(false);
  };

  const handleUpdateInventory = (company: any) => {
    setInventoryToUpdate(company);
    handleShowInventoryModal('UPDATE');
  };

  const handleDeleteInventory = (inventory: any) => {
    setItemToDelete(inventory);
    setItemToDeleteName(inventory?.articleName);
    setDeleteType('INVENTORY');
  };

  const handleDelete = () => {
    if (deleteType === 'COMPANY') {
      dispatch(
        deleteCompany({
          nit: itemToDelete?.nit,
          token,
        })
      );
    } else if (deleteType === 'INVENTORY') {
      dispatch(
        deleteInventory({
          companyId: itemToDelete?.companyId,
          articleName: itemToDelete?.articleName,
          token,
        })
      );
    }
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
                <>
                  {isAdmin && (
                    <AppButton
                      style={{ marginBottom: '15px' }}
                      onClick={() => {
                        handleShowCompanyModal('CREATE');
                        setCompanyToUpdate(undefined);
                      }}
                    >
                      Create company
                    </AppButton>
                  )}
                  <CompaniesList
                    companies={companies}
                    handleUpdate={handleUpdateCompany}
                    handleDelete={handleDeleteCompany}
                  />
                </>
              )}
            </Tab>
            <Tab eventKey="inventory" title="Inventory">
              {loadingInventory ? (
                <AppSpinner marginTop="50px" />
              ) : (
                <>
                  {isAdmin && (
                    <AppButton
                      style={{ marginBottom: '15px' }}
                      onClick={() => {
                        handleShowInventoryModal('CREATE');
                        setInventoryToUpdate(undefined);
                      }}
                    >
                      Create article
                    </AppButton>
                  )}
                  <InventoryList
                    articles={inventory}
                    handleUpdate={handleUpdateInventory}
                    handleDelete={handleDeleteInventory}
                  />
                </>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {showCompanyModal && (
        <CreateCompanyModal
          show={showCompanyModal}
          action={companyAction}
          handleClose={handleCloseCompanyModal}
          company={companyToUpdate}
        />
      )}
      {showInventoryModal && (
        <CreateInventoryModal
          show={showInventoryModal}
          action={inventoryAction}
          handleClose={handleCloseInventoryModal}
          inventory={inventoryToUpdate}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          itemName={itemToDeleteName}
          handleClose={() => {
            setShowDeleteModal(false);
            setItemToDelete(undefined);
            setItemToDeleteName('');
          }}
          handleDelete={handleDelete}
        />
      )}
    </Container>
  );
}

export default MainPage;
