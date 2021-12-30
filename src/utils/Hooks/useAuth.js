import { useQuery } from "@apollo/client";
import Auth from "../auth";
import { Auth_User } from "../../utils/graphQL/query";

export default function useAuth() {
  const { client, data } = useQuery(Auth_User);
  const logout = () => {
    Auth.logout().then(() => client.resetStore());
  };
  const authUser = data;
  return [client, logout, authUser];
}
