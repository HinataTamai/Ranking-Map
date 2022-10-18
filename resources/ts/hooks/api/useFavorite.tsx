import { useAlert } from "../useAlert";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


export const useFavorite = () => {

    const { changeAlertStatus } = useAlert();
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);


    //お気に入り情報登録処理
    const storeFavorite = (name:string, placeId:string, rate:string, userRatingsTotal:string, photoData:string, photoAttribution:string) => {

        if(!userInfo.isLogin) {
            return;
        }

        const userId = userInfo.id;

        const data = {
            userId,
            name, 
            placeId, 
            rate, 
            userRatingsTotal,
            photoData,
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


    //お気に入り情報消去処理
    const deleteFavorite = (placeId:string) =>{

        const userId = userInfo.id;

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

    //お気に入り情報一覧取得
    const indexFavorite = async () =>{

        const userId = userInfo.id;
        console.log(userId)

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
            photo_data: string;
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
            photo_data: '',
            photo_attribution: ''
        }]

        await axios.post('/api/favorite/index', data).then( res => {
            console.log(res.data)
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
                photoData: favorite.photo_data,
                photoAttribution: favorite.photo_attribution
            }
        })

    }

    return { storeFavorite, deleteFavorite, indexFavorite }

}