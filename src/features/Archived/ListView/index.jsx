import { useState } from "react";
import { ListAltOutlined, TextSnippetOutlined, Photo } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyIcon from "@mui/icons-material/Key";
import EditForm from "../EditForm";

import noteApi from "../../../api/noteApi";
import { enqueueSnackbar } from "notistack";

function ListView({ construct = "Grid", data, setArchivedData, handleDelNote, toolsNote }) {
  const [selected, setSelected] = useState(0);
  const [dialog, setDialog] = useState(true);
  const [password, setPassword] = useState("");
  const [lockData, setLockData] = useState(new Array(data.length));
  const clear = () => setSelected(null);

  const unlockNote = async () => {
    try {
      const lockNote = await noteApi.openNote(data[selected].idNote, { pass_lock: password });

      setLockData((prev) => {
        const newData = [...prev];
        newData[selected] = lockNote;
        return newData;
      });
      enqueueSnackbar("Unlock note succesfully", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        minWidth: "250px",
        width: "calc(40% - 250px)",
        height: "80vh",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "0 20px",
        }}
      >
        {data.map((item, index) => (
         
          <div key={index}>
            {

              console.log(item)
            }
            <Button
              sx={{
                backgroundColor: `rgba(${item.color.r},${item.color.g},${item.color.b},${item.color.a})`,
                color: "#000",
                padding: "10px 16px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "50px 1fr",
                textAlign: "left",
              }}
              onClick={() => {
                setSelected(item.idNote);
                setDialog(true);
              }}
            >
              {item.type === "text" && (
                <ListItemIcon>
                  <TextSnippetOutlined fontSize='small' />
                </ListItemIcon>
              )}
              {item.type === "checklist" && (
                <ListItemIcon>
                  <ListAltOutlined fontSize='small' />
                </ListItemIcon>
              )}
              {item.type === "image" && (
                <ListItemIcon>
                  <Photo fontSize='small' />
                </ListItemIcon>
              )}
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                  alignItems: "center",
                }}
                title={item.title}
              >
                {item.lock && <KeyIcon style={{ color: "#33f" }} />}
                {item.title}
              </span>
              {item.type === "image" && (
                <img
                  src={item.metaData}
                  alt={item.title}
                  style={{ width: "100%", objectFit: "contain", gridColumn: "span 2" }}
                />
              )}
            </Button>
          </div>
        ))}
      </Box>

      {data[selected] &&
        (!data[selected].lock ? (
          <EditForm
            key={selected}
            dataItem={data[selected]}
            handleDelNote={handleDelNote}
            setArchivedData={setArchivedData}
            construct={construct}
            clear={clear}
          />
        ) : (
          lockData[selected] && (
            <EditForm
              key={selected}
              dataItem={lockData[selected].note}
              handleDelNote={handleDelNote}
              setArchivedData={setArchivedData}
              construct={construct}
              clear={clear}
            />
          )
        ))}

      {data[selected] && data[selected].lock && !lockData[selected] && (
        <div>
          <Dialog open={dialog} onClose={() => setDialog(false)}>
            <DialogTitle>Unlock Note</DialogTitle>
            <DialogContent>
              <DialogContentText>What is your password?</DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Password'
                type='passowrd'
                fullWidth
                variant='standard'
                onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialog(false)}>Cancel</Button>
              <Button
                onClick={(e) => {
                  setDialog(false);
                  unlockNote();
                }}
              >
                Unlock
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Box>
  );
}

export default ListView;
