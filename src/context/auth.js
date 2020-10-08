import React, {createContext, useContext, useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';
// const authContext = createContext<InitialStateType | null>(null)
const authContext = createContext(null);

const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

function ProvideAuth({children}) {
  const [user, setUser] = useState(null);
  const context = useMemo(
    () => ({
      user,
      setUser,
      login: async (email, password) => {
        try {
          await auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
          console.log(e);
        }
      },
      register: async (email, password) => {
        try {
          await auth().createUserWithEmailAndPassword(email, password);
        } catch (e) {
          console.log(e);
        }
      },
      logout: async () => {
        try {
          await auth().signOut();
        } catch (e) {
          console.log(e);
        }
      },
    }),
    [],
  );

  return (
    <authContext.Provider value={{...context}}>{children}</authContext.Provider>
  );
}

export {ProvideAuth, useAuth};
