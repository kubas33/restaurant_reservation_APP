import {t} from "i18next";
import {RestaurantsTable} from "./RestaurantsTable.tsx";

export const RestaurantsAdminPage = () => {
    return(
    <>
        <h1>{t('projectPage.title')}</h1>
        <RestaurantsTable/>
    </>
    )
}