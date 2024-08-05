import React, {useCallback, useEffect, useState} from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CTooltip, CCard, CCardBody, CCardHeader } from '@coreui/react';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {createRestaurant, getRestaurant, updateRestaurant} from '../../services/restaurant.service';
import { useTranslation } from 'react-i18next';
import CIcon from '@coreui/icons-react';
import {cilPlus, cilSave, cilX} from '@coreui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify";
import error = toast.error;
import {SingleRestaurantResponse} from "../../interfaces/Restaurant.interface.ts";
import {showToast} from "../../utils";




const tooltipStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
};

export const RestaurantForm = () => {
    const {id} = useParams();
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const action = localStorage.getItem('restaurantAction');
    const currentUser = useSelector((state) => state.auth.currentUser);
    const token = currentUser?.token;
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        navigate('/restaurants');
    };

    const getRestaurantData = useCallback(async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        setLoading(true);

        try {
            const response = await getRestaurant(token, +id) as SingleRestaurantResponse;
            const { name, address, phone, cuisine, description } = response.data.response;
            setName(name);
            setAddress(address);
            setPhone(phone);
            setCuisine(cuisine);
            setDescription(description);
        } catch (error) {
            console.error('Failed to fetch restaurant data:', error);
            showToast({
                type: 'error',
                message: 'Nie udało się pobrać danych restauracji',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const restaurantData = { name, address, phone, cuisine, description };
        const headers = { Authorization: `Bearer ${token}` };

        try {
            if (action === 'create') {
                setIsCreating(true);
                try {
                    await createRestaurant(token, restaurantData);
                } catch {
                    console.error(error);
                } finally {
                    setIsCreating(false);
                }

            } else if (action === 'edit') {
                setIsEditing(true);
                const editRestaurant = JSON.parse(localStorage.getItem('editRestaurant'));
                try {
                    await updateRestaurant(token, editRestaurant.id, restaurantData);
                } catch {
                    console.error(error);
                } finally {
                    setIsEditing(false);
                }

            }
            navigate('/restaurants');
        } catch (error) {
            console.error('Error saving restaurant:', error);
        }
    };

    return (
        <CCard className=' mb-4'>
            <CCardHeader className='default-cursor'>
                <h4 className='centered-header'>{t(action === 'create' ? 'restaurantForm.createRestaurant' : 'restaurantForm.updateRestaurant')}
                    <CTooltip content={t('restaurantUsersTable.cancel')} placement="top" style={tooltipStyle}>
                        <CButton onClick={handleCancel}  color="danger"  className=' mt-2 centered-header btn-sm' >
                            <CIcon icon={cilX} />
                        </CButton>
                    </CTooltip>
                </h4>
            </CCardHeader>
            <CCardBody>
                <div style={{ padding: '20px' }}>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3" style={{marginBottom: "20px"}}>
                            <CTooltip content={t('restaurantForm.restaurantName')} placement="top" style={tooltipStyle}>
                                <CFormLabel htmlFor="name" className="mb-1">{t('restaurantForm.restaurantName')}</CFormLabel>
                            </CTooltip>
                            <CFormInput
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3" style={{marginBottom: "20px"}}>
                            <CTooltip content={t('restaurantForm.address')} placement="top" style={tooltipStyle}>
                                <CFormLabel htmlFor="address" className="mb-1">{t('restaurantForm.address')}</CFormLabel>
                            </CTooltip>
                            <CFormInput
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className='centered-header2'>

                            <CTooltip content={t(action === 'create' ? 'restaurantForm.createRestaurant' : 'restaurantForm.updateRestaurant')} placement="top" style={tooltipStyle}>
                                <CButton className='btn-sm' type="submit" color="success"  disabled={ isCreating || isEditing}>
                                    {isCreating || isEditing ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ): (
                                        <FontAwesomeIcon icon={faPlus} />
                                    )}

                                </CButton>
                            </CTooltip>
                        </div>
                    </CForm>
                </div>
            </CCardBody>
        </CCard>
    );
};

