import React, { useCallback, useEffect, useState } from "react";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CTooltip,
  CCard,
  CCardBody,
  CCardHeader,
  CFormTextarea,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createTable,
  getById,
  updateTable,
} from "../../services/table.service";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import error = toast.error;
import { showToast } from "../../utils";

const tooltipStyle = {
  display: "inline-block",
  verticalAlign: "middle",
};

export const RestaurantTableForm = () => {
  const { id: idString, restaurantId: restaurantIdString } = useParams();
  const id = Number(idString);
  const restaurantId = Number(restaurantIdString);

  const [name, setName] = useState("");
  const [seats, setSeats] = useState(0);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const token = currentUser?.token;
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigate("/restaurants");
  };

  const getTableData = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setIsEditing(true);

    try {
      if (id && restaurantId) {
        const response = await getById(restaurantId, id);
        const { name, seats } = response.data.response;
        setName(name);
        setSeats(seats);
      }
    } catch (error) {
      console.error("Failed to fetch table data:", error);
      showToast({
        type: "error",
        message: "Nie udało się pobrać danych stolika",
      });
    } finally {
      setLoading(false);
    }
  }, [id, token, navigate]);

  useEffect(() => {
    if (id) {
      getTableData();
    }
  }, [id, getTableData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tableData = { name, seats };

    try {
      if (!isEditing) {
        try {
          await createTable(token, tableData);
        } catch {
          console.error(error);
        }
      } else {
        try {
          await updateTable(token, +id!!, tableData);
        } catch {
          console.error(error);
        } finally {
          setIsEditing(false);
        }
      }
      navigate("/restaurants");
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  return (
    <CCard className=" mb-4">
      <CCardHeader className="default-cursor">
        <h4 className="centered-header">
          {t(
            !isEditing
              ? "restaurantTableForm.createTable"
              : "restaurantTableForm.updateTable"
          )}
        </h4>
      </CCardHeader>
      <CCardBody>
        <div style={{ padding: "20px" }}>
          <CForm onSubmit={handleSubmit}>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <CTooltip
                  content={t("restaurantTableForm.restaurantName")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="name" className="mb-1">
                    {t("restaurantTableForm.restaurantName")}
                  </CFormLabel>
                </CTooltip>
                <CFormInput
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </li>
              <li>
                <CTooltip
                  content={t("restaurantTableForm.seats")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="seats" className="mb-1">
                    {t("restaurantTableForm.seats")}
                  </CFormLabel>
                </CTooltip>
                <CFormInput
                  type="number"
                  id="seats"
                  value={+seats}
                  onChange={(e) => setSeats(+e.target.value)}
                  required
                />
              </li>
            </ul>
            <div className="centered-header2 d-flex justify-content-between">
              <CTooltip
                content={
                  isEditing
                    ? t("restaurantTableForm.updateTable")
                    : t("restaurantTableForm.createTable")
                }
                placement="top"
                style={tooltipStyle}
              >
                <CButton
                  className="btn-sm"
                  type="submit"
                  color="success"
                  disabled={isCreating || isEditing}
                >
                  {isCreating || isEditing ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : // <FontAwesomeIcon icon={faPlus} />
                  isEditing ? (
                    t("global.buttons.update")
                  ) : (
                    t("global.buttons.create")
                  )}
                </CButton>
              </CTooltip>
              <CTooltip
                content={t("global.buttons.cancel")}
                placement="top"
                style={tooltipStyle}
              >
                <CButton
                  onClick={handleCancel}
                  color="danger"
                  className=" btn-sm"
                >
                  {t("global.buttons.cancel")}
                </CButton>
              </CTooltip>
            </div>
          </CForm>
        </div>
      </CCardBody>
    </CCard>
  );
};
