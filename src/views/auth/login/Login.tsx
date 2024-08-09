import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterOptions, useForm } from "react-hook-form";
import AuthService from "../../../services/auth.service";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/redux/auth";
import { showToast } from "../../../utils";

const schema = yup.object().shape({
  email: yup.string().required("validation.required").email("validation.email"),
  password: yup.string().required("validation.required"),
});

const Login = () => {
  const [isLogging, setIsLogging] = useState(false);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(
    localStorage.getItem("deal-it-service-desk-theme") || "light"
  );
  const [logo, setLogo] = useState("/Deal_IT_logo_black.png");
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (theme === "light") {
      setLogo("/Deal_IT_logo_black.png");
    } else {
      setLogo("/Deal_IT_logo_white.png");
    }
  }, [theme]);

  const onSubmit = async (data) => {
    setIsLogging(true);
    console.log(data);
    AuthService.login({
      ...data,
    }).then(
      (res) => {
        setIsLogging(false);
        console.log(res)
        const data = res.data.data;
        const currentUser = {
          id: data.user?.id,
          email: data.user?.email,
          name: data.user?.name,
          token: data.token,
        };
        console.log(data);
        console.log(currentUser);

        showToast({ type: "success", message: "Pomyślnie zalogowano" });
        dispatch(authActions.login(currentUser));
        navigate("/");
      },
      () => {
        showToast({ type: "error", message: "Nieprawidłowe dane logowania" });
        setIsLogging(false);
      }
    );
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center login-background">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center h1">Logowanie</h1>
                    <p className="text-body-secondary text-center">
                      Zaloguj się na swoje konto
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        name={register("email").name}
                        onChange={register("email").onChange}
                        onBlur={register("email").onBlur}
                        ref={register("email").ref}
                        invalid={errors.email != null}
                        feedbackInvalid={errors.email?.message}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Hasło"
                        autoComplete="current-password"
                        name={register("password").name}
                        onChange={register("password").onChange}
                        onBlur={register("password").onBlur}
                        ref={register("password").ref}
                        invalid={errors.password != null}
                        feedbackInvalid={errors.password?.message}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol
                        style={{ display: "flex", justifyContent: "center" }}
                        xs={12}
                      >
                        <CButton
                          style={{ width: "100%" }}
                          color="primary"
                          className="px-4"
                          type="submit"
                          disabled={isLogging}
                        >
                          Zaloguj się
                        </CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Zarejestruj się</h2>
                    <p>
                      Nie masz jeszcze konta? Zarejestruj się teraz, aby uzyskać
                      dostęp do wszystkich funkcji!
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Zarejestruj się teraz
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
