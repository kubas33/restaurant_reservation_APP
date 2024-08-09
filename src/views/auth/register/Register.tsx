import React, {useState} from "react";
import {
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {showToast} from "../../../utils";
import AuthService from "../../../services/auth.service.ts";
import {t} from "i18next";

const schema = yup.object().shape({
  name: yup.string().required("validation.required"),
  email: yup.string().required("validation.required").email("validation.email"),
  password: yup.string().required("validation.required"),
});


const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsRegistering(true);
    AuthService.register({
      ...data,
    }).then(
      (res) => {
        setIsRegistering(false);
        showToast({type: "success",
        message:"Rejestracja przebiegła pomyślnie"});
        navigate("/login");
      },
      (error) => {
        showToast({type:"error",
        message:error.response.data.message});
        setIsRegistering(false);
      }
    );
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">

            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit(onSubmit)}>
                  <h1>Rejestracja</h1>
                  <p className="text-body-secondary">Załóż konto</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                        placeholder="Nazwa użytkownika"
                        autoComplete="name"
                        {...register("name")}
                        invalid={!!errors.name}
                        feedbackInvalid={t(errors.name?.message)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        {...register("email")}
                        invalid={errors.email != null}
                        feedbackInvalid={t(errors.email?.message)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Hasło"
                      autoComplete="new-password"
                      {...register("password")}
                      invalid={errors.password != null}
                      feedbackInvalid={t(errors.password?.message)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success"
                             type="submit">
                      Załóż konto
                    </CButton>
                  </div>
                </CForm>
                <CRow className={"py-3"}>
                  <p className="text-center">
                    Masz juz konto? <a href="/login">Zaloguj się</a>
                  </p>
                </CRow>
              </CCardBody>
            </CCard>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
