import { combineReducers } from 'redux';
import user from './slices/userSlice';
import movies from './slices/movieSlice';
import { statisticsReducer } from '../Components/AdminPanel/NavComponents/AdminPanelStatistics/statisticsReducer';
import { searchReducer } from '../Components/Search/SearchReducer';
import { authReducer } from '../Components/Auth/AuthReducer';


export default combineReducers({
        user,
        isAuth: authReducer,
        statistics: statisticsReducer,
        movies,
        searchMovie: searchReducer,
    },
);
