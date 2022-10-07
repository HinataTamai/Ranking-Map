import { FC, memo} from "react"
import { AlertMessage } from "../atoms/AlertMessage";
import { FavoriteTable } from "../organisms/FavoriteTable";
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";


const Favorite:FC  =  memo(() => {

    return(
        <HeaderAndFooterLayout>
        <FavoriteTable />
        <AlertMessage/>
        </HeaderAndFooterLayout>
    );
})

export default Favorite;