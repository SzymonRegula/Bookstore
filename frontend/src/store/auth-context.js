import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [authorized, setAuthorized] = useState(
    localStorage.getItem("token") === null ? false : true
  );

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}
