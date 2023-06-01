import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

export const useAuthRedirect = () => {
  const {user} = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const redirect = new URLSearchParams(location.search).get('redirect') || '/'

  useEffect(() => {
    if(user) navigate(redirect)
  }, [user, redirect, navigate])
}