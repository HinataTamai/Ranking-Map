import { useAlert } from "../useAlert";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import axios from "axios";
import { string } from "prop-types";
import { Criteria } from "../../components/pages/Search";


export const useSearchCriteria = () => {

    const { changeAlertStatus } = useAlert();
    const navigate = useNavigate();
    const { confirmIsLogin } = useAuth();

    const indexSearchCriteria = async () => {
        const userId = localStorage.getItem('user_id');
        const data = {
            userId
        }
        let criteria:Criteria = {
            status: 400,
            location : '',
            keyword : '',
            radius : '',
            rateCriteria : '',
            ratingsTotalCriteria : '',
            distanceCriteria : '',
            onlyIsOpen : '0',
        }
        await axios.post('/api/criteria/index', data).then(res => {
            const data = res.data;

            criteria.status = data.status == undefined ? 400 : data.status;
            criteria.location = data.location == undefined ? '' : data.location;
            criteria.keyword = data.keyword == undefined ? '' : data.keyword;
            criteria.radius = data.radius == undefined ? '' : data.radius;
            criteria.rateCriteria = data.rateCriteria == undefined ? '' : data.rateCriteria;
            criteria.ratingsTotalCriteria =
                data.ratingsTotalCriteria == undefined ? '' : data.ratingsTotalCriteria;
            criteria.distanceCriteria = 
            data.distanceCriteria == undefined ? '' : data.distanceCriteria;
            criteria.onlyIsOpen = data.onlyIsOpen == undefined ? '' : data.onlyIsOpen;
        }); 

        return criteria;
    }

    const storeSearchCriteria = async (
        location: string,
        keyword: string,
        radius: string,
        rateCriteria: string,
        ratingsTotalCriteria: string,
        distanceCriteria: string,
        onlyIsOpen: boolean
    ) => {
        const userId = localStorage.getItem('user_id');
        
        const data = {
            userId,
            location,
            keyword,
            radius,
            rateCriteria,
            ratingsTotalCriteria,
            distanceCriteria,
            onlyIsOpen
        }

        await axios.post('/api/criteria/store', data).then(res => {
            switch (res.data.status) {
                case 200:
                    changeAlertStatus(
                        true,
                        '検索条件を変更しました。',
                        'success',
                        'bottom',
                        'center'
                    );
                break;
                default :
                    changeAlertStatus(
                        true,
                        '検索条件の変更に失敗しました。',
                        'error',
                        'bottom',
                        'center'
                    );
                break;
            }
        }); 
    }


    const deleteSearchCriteria = async () => {
        const userId = localStorage.getItem('user_id');
        const data = { userId }
        await axios.post('api/criteria/delete', data).then(res => {
            switch (res.data.status) {
                case 200:
                    navigate('/')
                    changeAlertStatus(
                        true,
                        '検索条件を初期化しました。',
                        'success',
                        'bottom',
                        'center'
                    );
                break;
                default :
                    changeAlertStatus(
                        true,
                        '検索条件の初期化に失敗しました。',
                        'error',
                        'bottom',
                        'center'
                    );
                break;
            }
        });
    }

    return { indexSearchCriteria, storeSearchCriteria, deleteSearchCriteria }

}