import React, { createContext, useContext, useEffect, useState } from "react";
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
  const getAllNotesOfUser = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/notes");
      // console.log(res);

      if (res?.data) {
        setIsLoading(false);
        // console.log(res?.data);

        setAllNotes(res?.data);
      }
    } catch (error) {
      console.log(error);

      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);
      // setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
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
