import { FC, memo} from "react"
import { AlertMessage } from "../atoms/AlertMessage";
import { FavoriteTable } from "../organisms/FavoriteTable";
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";


export type favoritesType = {
    name: string;
    placeId: string;
    rate: string;
    userRatingsTotal: string;
    photoUrl: string;
    photoAttribution: string;
}[];

export type favoriteType = {
    name: string;
    placeId: string;
    rate: string;
    userRatingsTotal: string;
    photoUrl: string;
    photoAttribution: string;
};

const Favorite:FC  =  memo(() => {

    return(
        <HeaderAndFooterLayout>
        <FavoriteTable />
        <AlertMessage/>
        </HeaderAndFooterLayout>
    );
})

export default Favorite;