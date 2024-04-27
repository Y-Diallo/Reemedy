import { User } from "firebase/auth";
import { createContext } from "react";

export const userContext = createContext<{user: User | null, setUser: (user: User | null) => void}>({user: null, setUser: () => {}});
