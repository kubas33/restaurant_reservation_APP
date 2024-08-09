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
  createRestaurant,
  getRestaurant,
  updateRestaurant,
} from "../../services/restaurant.service";
import { t } from "i18next";
import { toast } from "react-toastify";
import error = toast.error;
import { showToast } from "../../utils";

const tooltipStyle = {
  display: "inline-block",
  verticalAlign: "middle",
};

export const RestaurantForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const token = currentUser?.token;
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigate("/admin/restaurants");
  };

  const getRestaurantData = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setIsEditing(true);

    try {
      const response = await getRestaurant(token, +id!!);
      console.log({response})
      const { name, address, phone, cuisine, description } =
        response.data;
      setName(name);
      setAddress(address);
      setPhone(phone);
      setCuisine(cuisine);
      setDescription(description);
    } catch (error) {
      console.error("Failed to fetch restaurant data:", error);
      showToast({
        type: "error",
        message: "Nie udało się pobrać danych restauracji",
      });
    } finally {
      setLoading(false);
    }
  }, [id, token, navigate]);

  useEffect(() => {
    if (id) {
      getRestaurantData();
    }
  }, [id, getRestaurantData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const restaurantData = { name, address, phone, cuisine, description };

    try {
      if (!isEditing) {
        try {
          setIsSaving(true);
          await createRestaurant(token, restaurantData);
        } catch {
          showToast({
            type: "error",
            message: t('global.messages.generalError') as string,
          })
          console.error(error);
        } finally {
          setIsSaving(false);
          navigate("/admin/restaurants");
        }
      } else {
        try {
          await updateRestaurant(token, +id!!, restaurantData);
          showToast({
            type: "success",
            message: t('restaurantForm.messages.updateSuccess') as string,
          })
        } catch {
          console.error(error);
        } finally {
          setIsSaving(false);
        }
      }
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
              ? "restaurantForm.createRestaurant"
              : "restaurantForm.updateRestaurant"
          )}
        </h4>
      </CCardHeader>
      <CCardBody>
        <div style={{ padding: "20px" }}>
          <CForm onSubmit={handleSubmit}>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <CTooltip
                  content={t("restaurantForm.restaurantName")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="name" className="mb-1">
                    {t("restaurantForm.restaurantName")}
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
                  content={t("restaurantForm.cuisine")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="cuisine" className="mb-1">
                    {t("restaurantForm.cuisine")}
                  </CFormLabel>
                </CTooltip>
                <CFormInput
                  type="text"
                  id="cuisine"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  required
                />
              </li>
              <li>
                <CTooltip
                  content={t("restaurantForm.description")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="description" className="mb-1">
                    {t("restaurantForm.description")}
                  </CFormLabel>
                </CTooltip>
                <CFormTextarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </li>
              <li>
                <CTooltip
                  content={t("restaurantForm.address")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="address" className="mb-1">
                    {t("restaurantForm.address")}
                  </CFormLabel>
                </CTooltip>
                <CFormTextarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </li>

              <li>
                <CTooltip
                  content={t("restaurantForm.phone")}
                  placement="top"
                  style={tooltipStyle}
                >
                  <CFormLabel htmlFor="phone" className="mb-1">
                    {t("restaurantForm.phone")}
                  </CFormLabel>
                </CTooltip>
                <CFormInput
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </li>
            </ul>
            <div className="centered-header2 d-flex justify-content-between">
              <CTooltip
                content={
                  isEditing
                    ? t("restaurantForm.updateRestaurant")
                    : t("restaurantForm.createRestaurant")
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
