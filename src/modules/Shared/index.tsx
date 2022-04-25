import UserService from "@/services/UserService"
import Button from "@/ui/Shared/Button/Button";
import { useNavigate} from "react-router-dom"

export const SignOutButton = (props) => {
  const navigate = useNavigate();
  return <Button variant="dark" {...props} onClick={() => {
    UserService.signOut();
    // navigate('/')
  }}>Sign out</Button>
}