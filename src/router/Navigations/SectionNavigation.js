import React from 'react';
import {NavLink} from "react-router-dom";
import {iconTypes} from "../../constants/constantsIcons";
import {Icon} from "../../Components/Icon/Icon";
import {useDispatch} from "react-redux";
import {removeUser} from "../../redux/slices/userSlice";
import {useAuth} from "../../hooks/useAuth";
import styles from './SectionNavigation.scss'
import {getAuth, signOut} from "firebase/auth";
import Navigations from "./Navigations";


const SectionNavigation = () => {

    const dispatch = useDispatch()
    const {isAuth, isAdmin} = useAuth()

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {

            dispatch(removeUser());
        }).catch((error) => {

            console.error(error);
        });
    };

    return (
        <>
            <Navigations isAuth={isAuth} isAdmin={isAdmin}></Navigations>
            <p>general</p>
            {
                isAuth ?
                    <NavLink
                        to='/auth'
                        onClick={logout}
                        className={styles.activeLink}
                    ><Icon type={iconTypes.exit}/>Logout</NavLink>
                    :
                    <NavLink
                        to='/auth'
                        className={styles.activeLink}
                    ><Icon type={iconTypes.enter}/>Login</NavLink>
            }
            {isAuth && isAdmin ? <NavLink to={'/adminPanel'}>Admin Panel</NavLink> : null}

        </>
    );
};

export default SectionNavigation;