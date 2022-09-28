import { useAlert } from "../useAlert";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import axios from "axios";


export const useFavorite = () => {

    const { changeAlertStatus } = useAlert();
    const navigate = useNavigate();
    const { confirmIsLogin } = useAuth();

    const storeFavorite = (name:string, placeId:string, rate:string, userRatingsTotal:string, photoUrl:string, photoAttribution:string) => {
        const isLogin = confirmIsLogin();

        if(!isLogin) {
            return;
        }

        const userId = localStorage.getItem('user_id');

        const data = {
            userId,
            name, 
            placeId, 
            rate, 
            userRatingsTotal,
            photoUrl,
            photoAttribution,
        }
        console.log(data);

        axios.post('/api/favorite/store', data).then(res => {
            console.log(res.data);
        }).catch(e => {
            console.log(e);
            changeAlertStatus(
                true,
                'お気に入りの登録に失敗しました。',
                'error',
                'bottom',
                'center'
            );
        });
    }


    const deleteFavorite = (placeId:string) =>{

        const userId = localStorage.getItem('user_id');

        const data = {
            userId,
            placeId, 
        }

        axios.post('/api/favorite/delete', data).then( res => {
            console.log(res.data);
        }).catch(e => {
            console.log(e);
            changeAlertStatus(
                true,
                'お気に入り解除に失敗しました。',
                'error',
                'bottom',
                'center'
            );
        });
    }

    const indexFavorite = async () =>{

        const userId = localStorage.getItem('user_id');

        const data = {
            userId: userId
        }

        let favorites: {
            created_at: string;
            id: number;
            name: string;
            pivot: {
                user_id: number; 
                favorite_id: number
            };
            place_id: string;
            rate: string;
            updated_at: string;
            user_ratings_total: string,
            photo_url:string;
            photo_attribution: string;
        }[] = [{
            created_at: '',
            id: 0,
            name: '',
            pivot: {
                user_id: 0, 
                favorite_id: 0
            },
            place_id: '',
            rate: '',
            updated_at: '',
            user_ratings_total: '',
            photo_url: '',
            photo_attribution: ''
        }]

        await axios.post('/api/favorite/index', data).then( res => {
            favorites = res.data[0].favorites;
        }).catch(e => {
            console.log(e);
            changeAlertStatus(
                true,
                'お気に入り情報の取得に失敗しました。',
                'error',
                'bottom',
                'center'
            );
        });

        return favorites.map(favorite => {
            return {
                name: favorite.name,
                placeId: favorite.place_id,
                rate: favorite.rate,
                userRatingsTotal: favorite.user_ratings_total,
                photoUrl: favorite.photo_url,
                photoAttribution: favorite.photo_attribution
            }
        })

    }

    return { storeFavorite, deleteFavorite, indexFavorite }

}