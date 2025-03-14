import React, { useEffect, useState } from "react";
import NotesCard from "../../components/Cards/NotesCard";
import { MdAdd, MdMenuBook } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { axiosInstance, getUser } from "../../Utils/axiosInstance";
import { toast } from "react-toastify";
import EmptyCard from "../../components/Cards/EmptyCard";
import addNote from "../../assets/Images/note3.png";
import notFound from "../../assets/Images/no-notes.jpg";
import { useNoteContext } from "../../context/NoteProvider";
// import Loader from "../../components/Theme/Loader/Loader";
import PageLoader from "../../components/Theme/Page Loading/PageLoader";
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const { allNotes, isLoading, getAllNotesOfUser, setIsLoading, isSearch } =
    useNoteContext();

  const [error, setError] = useState("");

  // console.log(userInfo);
  // console.log(allNotes);

  const handleDleteNote = async (noteId) => {
    try {
      // setError(null);
      setIsLoading(true);
      const res = await axiosInstance.delete(`/notes/${noteId}`);
      if (res?.data) {
        await getAllNotesOfUser();
        toast.success(res?.data?.message || "Note Deleted");
      }
    } catch (error) {
      console.log(error);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePinNote = async (note) => {
    // console.log(note);
    setIsLoading(true);
    try {
      const res = await axiosInstance.put(`/notes/${note?._id}/pin`, {
        isPinned: !note?.isPinned,
      });
      if (res?.data) {
        await getAllNotesOfUser();

        toast.success(res?.data?.message || "Note Pinned");
      }
    } catch (error) {
      console.log(error);

      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);
    }
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  // In dependency openAddEditModal?.isShown whether we add or edit note the modal will open and close after edit or update we render the home comp for updated getAllnotesOfUser()
  return (
    <div className=" h-dvh dark:bg-slate-700">
      <div className="container mx-auto px-4 dark:bg-slate-700 ">
        {isLoading ? (
          <div className="h-dvh w-[100vw] flex items-center justify-center dark:bg-slate-700 ">
            <PageLoader />
          </div>
        ) : allNotes?.length > 0 ? (
          <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
            {allNotes?.map((note) => (
              <NotesCard
                key={note._id}
                title={note?.title}
                date={note?.updatedAt}
                content={note?.content}
                tags={note?.tags}
                isPinned={note?.isPinned}
                handleDelete={() => {
                  handleDleteNote(note?._id);
                }}
                // Here w are sending respective note data in openAddEditodal in noteData prop down in model in that modal we can process the data the model will open with irespective note data is filled within the inputs so we can update
                handleEdit={() =>
                  setOpenAddEditModal((prev) => ({
                    ...prev,
                    isShown: true,
                    type: "edit",
                    data: note,
                  }))
                }
                handlePinNote={() => handlePinNote(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            image={isSearch ? notFound : addNote}
            message={
              isSearch
                ? "Oops....!!! The note your trying to find is NOT here....!!!"
                : "Strat Creating your first note! click the 'ADD' button in bottom to write down your thoughts,ideas and remainder,etc.. Let's get started "
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 fixed right-7 bottom-3  "
        //  in here we going to add new note that's why we are not sending any data the input fields are empty type= "add" will  execute respective function
        onClick={() => {
          setOpenAddEditModal({
            type: "add",
            isShown: true,
            data: null,
          });
        }}
      >
        <MdAdd size="" className="text-[38px] text-white " />
      </button>

      <Modal
        isOpen={openAddEditModal?.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
        contentLabel=""
        className="sm:w-[70%] md:w-[50%] max-h-[80%]
        sm:max-h-[100%]  bg-white dark:bg-blue-900  dark:text-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal?.type}
          noteData={openAddEditModal?.data}
          handleModalClose={() => {
            setOpenAddEditModal((prev) => ({
              ...prev,
              isShown: false,
            }));
          }}
        />
      </Modal>
    </div>
  );
};

export default Home;
