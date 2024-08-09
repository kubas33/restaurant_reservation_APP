import React, { useCallback, useEffect, useState } from "react";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CTooltip,
  CCard,
  CCardBody,
  CCardHeader, CCol,
} from "@coreui/react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createTable,
  getById,
  updateTable,
} from "../../services/table.service";
import { t } from "i18next";
import { toast } from "react-toastify";
import error = toast.error;
import { showToast } from "../../utils";

const tooltipStyle = {
  display: "inline-block",
  verticalAlign: "middle",
};

export const RestaurantTableForm = () => {
  const { tableId: idString, restaurantId: restaurantIdString } = useParams();
  const tableId = Number(idString);
  const restaurantId = Number(restaurantIdString);
  const location = useLocation();
  const restaurantName = location.state?.restaurantName;

  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const token = currentUser?.token;
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const tablesPage = `/admin/restaurants/${restaurantId}/tables`;

  const handleCancel = () => {
    navigate(tablesPage);
  };

  const getTableData = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setIsEditing(true);

    try {
      if (tableId && restaurantId) {
        const response = await getById(restaurantId, tableId);
        console.log({response})
        const { name, seats } = response.data
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
  }, [tableId, token, navigate]);

  useEffect(() => {
    if (tableId) {
      getTableData();
    }
  }, [tableId, getTableData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tableData = { name, seats };

    try {
      if (!isEditing) {
        try {
          setIsSaving(true);
          await createTable(restaurantId, tableData);
        } catch {
          showToast({
            type: "error",
            message: t('global.messages.generalError') as string,
          });
          console.error(error);
        } finally {
          setIsSaving(false);
          navigate(tablesPage);
        }
      } else {
        try {
          await updateTable(restaurantId, tableId, tableData);
          showToast({
            type: "success",
            message: t('restaurantTableForm.messages.updateSuccess') as string,
          })
        } catch {
          console.error(error);
          showToast({
            type: "error",
            message: t('global.messages.generalError') as string,
          });
        } finally {
          setIsSaving(false);
        }
      }
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  return (
      <CCol xs={12} lg={9} xl={6} className={"mx-auto"}>
        <CCard className=" mb-4">
      <CCardHeader className="default-cursor">
        <h4 className="centered-header">
          {t(
            !isEditing
              ? "restaurantTableForm.createTable"
              : "restaurantTableForm.updateTable"
          )}{restaurantName ? ` - ${restaurantName}` : ""}
        </h4>
      </CCardHeader>
      <CCardBody>
        <div style={{ padding: "20px" }}>
          <CForm onSubmit={handleSubmit}>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <CTooltip
                  content={t("restaurantTableForm.tableName")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="name" className="mb-1">
                    {t("restaurantTableForm.tableName")}
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
                  min={1}
                  max={10}
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
                  disabled={isSaving}
                >
                  {isSaving ? (
                          <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                          ></span>
                      ) :
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
      </CCol>
  );
};
