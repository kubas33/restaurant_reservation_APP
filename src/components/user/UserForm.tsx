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
import { t } from "i18next";
import { toast } from "react-toastify";
import error = toast.error;
import { showToast } from "../../utils";
import {createUser, editUser, getUser} from "../../services/user.service.ts";

const tooltipStyle = {
  display: "inline-block",
  verticalAlign: "middle",
};

export const UserForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const token = currentUser?.token;
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    navigate("/admin/users");
  };

  const getUserData = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setIsEditing(true);

    try {
      const response = await getUser(token, +id!!);
      const { name, email } =
        response.data;
      setName(name);
      setEmail(email);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      showToast({
        type: "error",
        message: "Nie udało się pobrać danych użytkownika",
      });
    } finally {
      setLoading(false);
    }
  }, [id, token, navigate]);

  useEffect(() => {
    if (id) {
      getUserData();
    }
  }, [id, getUserData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, password, email };

    try {
      if (!isEditing) {
        try {
          setIsSaving(true);
          await createUser(token, userData, currentUser);
        } catch {
          showToast({
            type: "error",
            message: t('global.messages.generalError') as string,
          })
          console.error(error);
        } finally {
          setIsSaving(false);
          toast.success(t('users.messages.userCreated'));
          navigate("/admin/users");
        }
      } else {
        try {
          await editUser(token, +id!!, userData, currentUser);
          showToast({
            type: "success",
            message: t('users.messages.userUpdated') as string,
          })
        } catch {
          console.error(error);
        } finally {
          setIsSaving(false);
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <CCard className=" mb-4">
      <CCardHeader className="default-cursor">
        <h4 className="centered-header">
          {t(
            !isEditing
              ? "users.addUser"
              : "users.editUser"
          )}
        </h4>
      </CCardHeader>
      <CCardBody>
        <div style={{ padding: "20px" }}>
          <CForm onSubmit={handleSubmit}>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <CTooltip
                    content={t("usersForm.nameLabel")}
                    placement="top"
                    style={tooltipStyle}
                >
                  <CFormLabel htmlFor="name" className="mb-1">
                    {t("usersForm.nameLabel")}
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
                    content={t("usersForm.emailLabel")}
                    placement="top"
                    style={tooltipStyle}
                >
                  <CFormLabel htmlFor="email" className="mb-1">
                    {t("usersForm.emailLabel")}
                  </CFormLabel>
                </CTooltip>
                <CFormInput
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </li>
              {!isEditing && (
                  <li>
                    <CTooltip
                        content={t("usersForm.passwordLabel")}
                        placement="top"
                        style={tooltipStyle}
                    >
                      <CFormLabel htmlFor="password" className="mb-1">
                        {t("usersForm.passwordLabel")}
                      </CFormLabel>
                    </CTooltip>
                    <CFormInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  </li>
              )}

            </ul>
            <div className="centered-header2 d-flex justify-content-between">
              <CTooltip
                  content={
                    isEditing
                        ? t("usersForm.edit")
                        : t("usersForm.create")
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
