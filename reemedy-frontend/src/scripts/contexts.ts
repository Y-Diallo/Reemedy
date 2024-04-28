import { User } from "firebase/auth";
import { createContext } from "react";
import {Remedy} from "./types"
export const userContext = createContext<{user: User | null, setUser: (user: User | null) => void, remedy: Remedy | null, setRemedy: (remedy: Remedy | null)=>void}>({user: null, remedy:null, setUser: () => {}, setRemedy: () => {}});
