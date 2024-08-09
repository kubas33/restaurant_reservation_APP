import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteTable, getTables } from "../../services/table.service.ts";
import {
  CButton,
  CButtonGroup,
  CCol,
  CForm,
  CFormInput,
  CRow, CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import {
  cilCalendar,
  cilPencil,
  cilTrash,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  RestaurantTableData, TablesResponse,
} from "../../interfaces/Restaurant.interface.ts";

const tooltipStyle = {
  display: "inline-block",
  verticalAlign: "middle",
};

export const RestaurantTablesTable: React.FC = () => {
  const [tables, setTables] = useState<RestaurantTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const token = currentUser?.token;
  const navigate = useNavigate();
  let { restaurantId } = useParams();
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      if (!token) {
        setError("No authentication token available");
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const id = typeof restaurantId === "string" ? parseInt(restaurantId) : 0;
        const response = (await getTables(id)) as TablesResponse;
        if (response.success && Array.isArray(response.data.tables)) {
          console.log(response.data)
          setTables(response.data.tables);
          setRestaurantName(response.data.restaurant.name);
        } else {
          console.error("Unexpected response format:", response);
          setError("Received unexpected data format from server");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [page, keyword, token]);


  const handleCreateClick = () => {
    navigate(`create`, {
      state: {
        restaurantName
      }
    });
  };

  const handleEditClick = (id: number) => {
    navigate(`${id}/edit`,
        {
          state: {
            restaurantName
          }});
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      await deleteTable(token, id);
      setTables((tables) => tables.filter((table) => table.id !== id));
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };


  const handleManageReservationsClick = (id: number) => {
    navigate(`/restaurants/${id}/reservations`);
  };

  if (loading) {
    return (
        <div className="d-flex align-items-center">
          <strong role="status">{t("global.loading")}</strong>
          <CSpinner className="ms-auto"/>
        </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(tables)) {
    console.error("tables is not an array:", tables);
    return <div>Error: Invalid data format</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("restaurantTablesTable.title")} {restaurantName}</h2>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>{t("restaurantTablesTable.id")}</CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTablesTable.name")}</CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTablesTable.seats")}</CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTablesTable.createdAt")}
            </CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTablesTable.updatedAt")}
            </CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTablesTable.actions")}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tables.map((table) => (
            <CTableRow key={table.id}>
              <CTableDataCell>{table.id}</CTableDataCell>
              <CTableDataCell>{table.name}</CTableDataCell>
              <CTableDataCell>{table.seats}</CTableDataCell>
              <CTableDataCell>
                {new Date(table.createdAt).toLocaleString()}
              </CTableDataCell>
              <CTableDataCell>
                {new Date(table.updatedAt).toLocaleString()}
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex">
                  <CTooltip
                    content={t("restaurantTablesTable.editTable")}
                    placement="top"
                  >
                    <div style={tooltipStyle}>
                      <CButton
                        color="warning"
                        onClick={() => handleEditClick(table.id)}
                        className="me-2"
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </div>
                  </CTooltip>
                  <CTooltip
                    content={t("restaurantTablesTable.deleteTable")}
                    placement="top"
                  >
                    <div style={tooltipStyle}>
                      <CButton
                        color="danger"
                        onClick={() => handleDeleteClick(table.id)}
                        className="me-2"
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
                  </CTooltip>
                  <CTooltip
                    content={t("restaurantTablesTable.manageReservations")}
                    placement="top"
                  >
                    <div style={tooltipStyle}>
                      <CButton
                        color="primary"
                        onClick={() => handleManageReservationsClick(table.id)}
                        className="me-2"
                      >
                        <CIcon icon={cilCalendar} />
                      </CButton>
                    </div>
                  </CTooltip>
                  {/*<CTooltip content={t('restaurantTablesTable.viewUsers')} placement="top">*/}
                  {/*    <div style={tooltipStyle}>*/}
                  {/*        <CButton color="primary" onClick={() => handleViewUsersClick(restaurant.id)}>*/}
                  {/*            <CIcon icon={cilSearch} style={{ color: 'black' }} />*/}
                  {/*        </CButton>*/}
                  {/*    </div>*/}
                  {/*</CTooltip>*/}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CTooltip content={t("restaurantTablesTable.createTable")} placement="top">
        <div style={tooltipStyle}>
          <CButton color="success" onClick={handleCreateClick}>
            {t("restaurantTablesTable.createTable")}
          </CButton>
        </div>
      </CTooltip>
    </div>
  );
};
