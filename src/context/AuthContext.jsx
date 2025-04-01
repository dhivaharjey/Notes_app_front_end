import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance, getUser } from "../Utils/axiosInstance";

import { toast } from "react-toastify";

import PageLoader from "../components/Theme/Page Loading/PageLoader";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getUser();
      if (res?.data?.user) {
        // Initially we updating the setUserInfo in login page because after login searchbar and navbar only will appear if userInfo is available after  that every refresh the page it will check-auth update the userInfo on every m
        if (!userInfo || userInfo._id !== res.data.user._id) {
          setUserInfo(res.data.user);
        }
        return;
      }
    } catch (error) {
      // console.log("User not logged in");
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        // console.log("Clearing cookies and logging out");
        setUserInfo(null);
        await axiosInstance.post("/auth/logout");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("useEffect is running on mount");
    // if (!userInfo) return;
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-dvh w-[100vw] flex items-center justify-center dark:bg-slate-700 ">
        <PageLoader />
      </div>
    );
  }
  const logout = async () => {
    if (!userInfo) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        setUserInfo(null);
        toast.success(res?.data?.message || "Logged Out!!!");

        // localStorage.removeItem("userInfo");
        // navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.messsage ||
          "Oops somethinf went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  // console.log(userInfo);

  return (
    <AppContext.Provider
      value={{
        loading,
        userInfo,
        logout,
        setUserInfo,
        fetchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
