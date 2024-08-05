import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteRestaurant,
  getRestaurants,
} from "../../services/restaurant.service.ts";
import {
  CButton,
  CButtonGroup,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import {
    cibTableau, cilCalendar,
    cilChevronLeft,
    cilChevronRight, cilDinner,
    cilFilter,
    cilPencil,
    cilPlus,
    cilReload,
    cilSearch,
    cilTrash,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {RestaurantData, RestaurantsResponse} from "../../interfaces/Restaurant.interface.ts";

interface ApiResponse {
  data: {
    response: RestaurantData[];
    pagination: {
      currentPage: number;
      totalPages: number;
      previousPage: number | null;
      nextPage: number | null;
      totalItems: number;
    };
  };
  success: boolean;
}



const tooltipStyle = {
  display: "inline-block",
  verticalAlign: "middle",
};

export const RestaurantsTable: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!token) {
        setError("No authentication token available");
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const response = (await getRestaurants({
          token,
          page,
          limit: 10,
          keyword,
        })) as RestaurantsResponse;
        if (response.success && Array.isArray(response.data.response)) {
          setRestaurants(response.data.response);
        } else {
          console.error("Unexpected response format:", response);
          setError("Received unexpected data format from server");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to fetch restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, keyword, token]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleAddKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const handleCreateClick = () => {
    navigate("/restaurants/create");
  };

  const handleEditClick = (id: number) => {
    navigate(`/restaurants/${id}/edit`);
  };

  const handleFilterApply = () => {
    setPage(1);
  };

  const handleFilterReset = () => {
    setKeyword("");
    setPage(1);
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      await deleteRestaurant(token, id);
      setRestaurants((restaurants) =>
        restaurants.filter((restaurant) => restaurant.id !== id)
      );
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleManageTablesClick = (id: number) => {
    navigate(`/restaurants/${id}/tables`);
  };

  const handleManageReservationsClick = (id: number) => {
    navigate(`/restaurants/${id}/reservations`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(restaurants)) {
    console.error("restaurants is not an array:", restaurants);
    return <div>Error: Invalid data format</div>;
  }

  if (restaurants.length === 0) {
    return <div>No restaurants found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <CForm className="filter-container mb-3">
        <CRow className="align-items-end">
          <CCol md="3">
            <CFormInput
              type="text"
              name="keyword"
              value={keyword}
              placeholder={"Filtruj po nazwie"}
              // onChange={handleFilterChange}
              className="mb-2"
            />
          </CCol>
          <CCol md="3" className="text-md-end">
            <CTooltip
              content={t("restaurantTable.applyFilters")}
              placement="top"
            >
              <CButton
                onClick={handleFilterApply}
                color="primary"
                className="me-2 mb-2"
              >
                <CIcon icon={cilFilter} />
              </CButton>
            </CTooltip>
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
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>{t("restaurantTable.id")}</CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTable.name")}</CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTable.cuisine")}</CTableHeaderCell>
            <CTableHeaderCell>
              {t("restaurantTable.createdAt")}
            </CTableHeaderCell>
            <CTableHeaderCell>
              {t("restaurantTable.updatedAt")}
            </CTableHeaderCell>
            <CTableHeaderCell>{t("restaurantTable.actions")}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {restaurants.map((restaurant) => (
            <CTableRow key={restaurant.id}>
              <CTableDataCell>{restaurant.id}</CTableDataCell>
              <CTableDataCell>{restaurant.name}</CTableDataCell>
              <CTableDataCell>{restaurant.cuisine}</CTableDataCell>
              <CTableDataCell>
                {new Date(restaurant.createdAt).toLocaleString()}
              </CTableDataCell>
              <CTableDataCell>
                {new Date(restaurant.updatedAt).toLocaleString()}
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex">
                  <CTooltip
                    content={t("restaurantTable.editRestaurant")}
                    placement="top"
                  >
                    <div style={tooltipStyle}>
                      <CButton
                        color="warning"
                        onClick={() => handleEditClick(restaurant.id)}
                        className="me-2"
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </div>
                  </CTooltip>
                  <CTooltip
                    content={t("restaurantTable.deleteRestaurant")}
                    placement="top"
                  >
                    <div style={tooltipStyle}>
                      <CButton
                        color="danger"
                        onClick={() => handleDeleteClick(restaurant.id)}
                        className="me-2"
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
                  </CTooltip>
                  <CTooltip
                    content={t("restaurantTable.manageTables")}
                    placement="top"
                  >
                    <div style={tooltipStyle}>
                      <CButton
                        color="primary"
                        onClick={() => handleManageTablesClick(restaurant.id)}
                        className="me-2"
                      >
                        <CIcon icon={cilDinner} />
                      </CButton>
                    </div>
                  </CTooltip>
                  <CTooltip
                    content={t("restaurantTable.manageReservations")}
                    placement="top"
                  >
                    <div style={tooltipStyle}>
                      <CButton
                        color="primary"
                        onClick={() =>
                          handleManageReservationsClick(restaurant.id)
                        }
                        className="me-2"
                      >
                        <CIcon icon={cilCalendar} />
                      </CButton>
                    </div>
                  </CTooltip>
                  {/*<CTooltip content={t('restaurantTable.viewUsers')} placement="top">*/}
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
      <CButtonGroup className="me-3">
        <CTooltip content={t("restaurantTable.previousPage")} placement="top">
          <div style={tooltipStyle}>
            <CButton
              color="primary"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <CIcon icon={cilChevronLeft} />
            </CButton>
          </div>
        </CTooltip>
        <CButton color="secondary" disabled>
          {page} {t("users.of")} {totalPages}
        </CButton>
        <CTooltip content={t("restaurantTable.nextPage")} placement="top">
          <div style={tooltipStyle}>
            <CButton
              color="primary"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <CIcon icon={cilChevronRight} />
            </CButton>
          </div>
        </CTooltip>
      </CButtonGroup>
      <CTooltip content={t("restaurantTable.createRestaurant")} placement="top">
        <div style={tooltipStyle}>
          <CButton color="success" onClick={handleCreateClick}>
            <CIcon icon={cilPlus} />
          </CButton>
        </div>
      </CTooltip>
    </div>
  );
};
