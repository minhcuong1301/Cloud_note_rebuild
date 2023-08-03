import { Routes, Route, Navigate, Router } from "react-router-dom";

import {
  Archived,
  CalendarTable,
  Deleted,
  Setting,
  Explore,
  Screenshot,
  Groups,
} from "../../features";
import Profile from "../../features/Profile";
import Profile_orther from "../../features/Profile_orther/Profile_orther";

export default function HomeRouting(props) {
  const {
    data,
    df_nav,
    setDf_nav,
    dataTrash,
    setColorNote,
    setUser,
    options,
    handleEdit,
    handleChangeNote,
    handleDelNote,
    handleEditTrash,
    handleInTrash,
    handleOptionsNote,
  } = props;

  return (
    <Routes>
      <Route path='/' element={<Navigate to={`/home/${df_nav.toLowerCase()}`} />} />
      <Route path='/profile' element={<Profile data={data} />} />
      <Route path='/profile/:id' element={<Profile_orther data={data} />} />
      <Route path='/calendar' element={<CalendarTable data={data} />} />
      <Route
        path='/archived'
        element={
          <Archived
            data={data}
            setArchivedData={handleEdit}
            handleDelNote={handleDelNote}
            toolsNote={{
              options: options,
              handleChangeNote: handleChangeNote,
              handleOptionsNote: handleOptionsNote,
            }}
          />
        }
      />
      <Route
        path='/screenshot'
        element={
          <Screenshot data={data} setArchivedData={handleEdit} handleDelNote={handleDelNote} />
        }
      />
      <Route
        path='/deleted'
        element={
          <Deleted data={dataTrash} handleInTrash={handleInTrash} setTrashData={handleEditTrash} />
        }
      />
      <Route
        path='/settings'
        element={<Setting setDf_nav={setDf_nav} setColorNote={setColorNote} setUser={setUser} />}
      />
      <Route path='/groups' element={<Groups />} />
    </Routes>
  );
}
