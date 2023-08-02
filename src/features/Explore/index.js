import { useState, useEffect } from "react";
import noteApi from "../../api/noteApi";
import Archived from "../Archived";

export default function Explore({ handleDelNote, setArchivedData, toolsNote }) {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    noteApi.getLastestNotes().then((lastestNotes) => setNotes(lastestNotes.notes));

    noteApi.getNotes(0).then((res) => console.log(res));
  }, []);

  return (
    notes && (
      <Archived
        data={notes}
        setArchivedData={setArchivedData}
        handleDelNote={handleDelNote}
        toolsNote={{ options: { type: "View" } }}
      />
    )
  );
}
