import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "../Utils/axiosInstance";
import { toast } from "react-toastify";
import { useAppContext } from "./AuthContext";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allNotes, setAllNotes] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useAppContext();

  const getAllNotesOfUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/notes");

      if (res?.status === 200) {
        setAllNotes(res?.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);

      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      if (userInfo) {
        toast.error(errMsg);
      }
    } finally {
      setIsLoading(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo || allNotes !== null) return;
    getAllNotesOfUser();
  }, [userInfo]);

  return (
    <NoteContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        allNotes,
        setAllNotes,
        isSearch,
        setIsSearch,
        isLoading,
        setIsLoading,
        getAllNotesOfUser,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;

export const useNoteContext = () => {
  return useContext(NoteContext);
};
