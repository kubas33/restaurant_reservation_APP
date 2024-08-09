import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {deleteUser, getUsers} from "../../services/user.service.ts";
import { t } from "i18next";
import {
    CButton, CButtonGroup, CCol, CForm,
    CFormInput, CRow, CSpinner,
    CTable, CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTooltip
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilChevronLeft, cilChevronRight, cilPencil, cilReload, cilTrash} from "@coreui/icons";
import {toast} from "react-toastify";

const tooltipStyle = {
    display: "inline-block",
    verticalAlign: "middle",
};

export const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [lastPage, setLastPage] = useState(1000);
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const token = currentUser?.token;
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        if (!token) {
            navigate("/login");
            return;
        }
        setLoading(true);
        try {
            const response = await getUsers(token, page, limit, keyword);
            setUsers(response.data);
            setLastPage(response.pagination.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    }, [token, page, limit, keyword, navigate]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    if (loading) {
        return (
            <div className="d-flex align-items-center">
                <strong role="status">{t("global.loading")}</strong>
                <CSpinner className="ms-auto"/>
            </div>
        )
    }

    const handleAddKeyword = (newKeyword: string) => {
        setKeyword(newKeyword);
    };

    const handleDeleteClick = async (userId) => {
        if (!window.confirm(t('users.messages.confirmDelete'))) {
            return;
        }
        try {
            await deleteUser(token, userId, currentUser);
            fetchUsers(); // Fetch users again after deletion
        } catch (error) {
            toast.error(t('users.messages.errors.delete'), error);
        }
    };

    const handleEditClick = (userToEdit) => {
        navigate(`/admin/users/edit/${userToEdit.id}`);
    };


    const handleCreateClick = () => {
        navigate('/admin/users/create');
    };

    const handleFilterReset = () => {
        setKeyword("");
        setPage(1);
    };


    return (
        <div style={{ padding: '20px' }}>
            <h1>{t('nav.users')}</h1>
            <CForm className="filter-container mb-3">
                <CRow className="align-items-end">
                    <CCol sm="9" md="6" xl="3">
                        <CFormInput
                            type="text"
                            name="keyword"
                            value={keyword}
                            placeholder={t('users.filterByName')}
                            onChange={(e) => handleAddKeyword(e.target.value)}
                            className="mb-2"
                        />
                    </CCol>
                    <CCol sm="3" md="3">
                        <CTooltip
                            content={t("restaurantTable.resetFilters")}
                            placement="top"
                        >
                            <CButton
                                onClick={handleFilterReset}
                                color="secondary"
                                className="mb-2"
                            >
                                <CIcon icon={cilReload} />
                            </CButton>
                        </CTooltip>
                    </CCol>
                </CRow>
            </CForm>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>{t('users.id')}</CTableHeaderCell>
                        <CTableHeaderCell>{t('users.name')}</CTableHeaderCell>
                        <CTableHeaderCell>{t('users.email')}</CTableHeaderCell>
                        <CTableHeaderCell>{t('users.actions')}</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {users.map((user) => (
                        <CTableRow key={user.id}>
                            <CTableDataCell>{user.id}</CTableDataCell>
                            <CTableDataCell>{user.name}</CTableDataCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>
                                <CTooltip content={t('users.editUser')} placement="top">
                                    <div style={tooltipStyle}>
                                        <CButton className="me-2" color="warning" onClick={() => handleEditClick(user)}>
                                            <CIcon icon={cilPencil} />
                                        </CButton>
                                    </div>
                                </CTooltip>
                                <CTooltip content={t('users.deleteUser')} placement="top">
                                    <div style={tooltipStyle}>
                                        <CButton className="me-2" color="danger" onClick={() => handleDeleteClick(user.id)}>
                                            <CIcon icon={cilTrash} />
                                        </CButton>
                                    </div>
                                </CTooltip>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <CButtonGroup className='me-3'>
                <CTooltip content={t('users.previousPage')} placement="top">
                    <div style={tooltipStyle}>
                        <CButton className="me-2" color="primary" onClick={() => setPage(page - 1)} disabled={page === 1}><CIcon icon={cilChevronLeft} /></CButton>
                    </div>
                </CTooltip>
                <CButton className="me-2" color="secondary" disabled>{page} {t('users.of')} {lastPage}</CButton>
                <CTooltip content={t('users.nextPage')} placement="top">
                    <div style={tooltipStyle}>
                        <CButton className="me-2" color="primary" onClick={() => setPage(page + 1)} disabled={page === lastPage}><CIcon icon={cilChevronRight} /></CButton>
                    </div>
                </CTooltip>
            </CButtonGroup>
                <CTooltip content={t('users.addUser')} placement="top">
                    <div style={tooltipStyle}>
                        <CButton className="me-2" color="success" onClick={handleCreateClick}>
                            {t('users.addUser')}
                        </CButton>
                    </div>
                </CTooltip>
        </div>
    );

}
