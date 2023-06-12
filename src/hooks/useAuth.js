//хук для того чтобы узнавать авторизован ли пользователь и если да то какие у него данные
import {useSelector} from "react-redux";

export const useAuth = () => {
  const {email, token, id, admin} = useSelector(state => state.user)
  return {
    isAuth: Boolean(email),
    isAdmin: admin,
    email,
    token,
    id
  }
}