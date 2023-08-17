import { FormatListBulleted, GridViewOutlined } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoteImage from "../../components/NoteImage";
import NoteItem from "../../components/NoteItem";
import NoteItemLock from "../../components/NoteItemLock";
import SearchInput from "../../components/SearchInput";
import ListView from "./ListView";
import classes from "./styles.module.css";
import EditForm from "./EditForm";
import { profileUser, updateProfile } from "../Auth/userSlice";
import { useDispatch } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
// import { TabContext } from "@mui/material";
import { Tab } from "@mui/material";

import { TabContext,TabList,TabPanel } from "@mui/lab";
import noteApi from "../../api/noteApi";


import "./style.scss";
Archived.propTypes = {
  data: PropTypes.array.isRequired,
  handleDelNote: PropTypes.func.isRequired,
  setArchivedData: PropTypes.func.isRequired,
};
Archived.defaultProps = {};

function Archived({ data, handleDelNote, setArchivedData, toolsNote, clear }) {
  const [value, setValue] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [construct, setConstruct] = useState("List");
  const { view } = useSelector((state) => state.settings);
  const [selectedNote, setSelectedNote] = useState(null);
  const [drawerEdit, setDrawerEdit] = useState(false);
  // const [selectedNote, setSelectedNote] = useState(null);

  const handleSearchItemClick = async (noteId) => {
    let getNote = data.filter(e => e.idNote === noteId)[0];
    setSelectedNote(getNote);
    // setDrawerEdit((prevState) => true);
  };

  const user =
    useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));

  const [infoUser, setInfoUser] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(profileUser(user.id));
      if (res.payload && res.payload.Avarta) {
        const updatedInfoUser = res.payload;
        setInfoUser(updatedInfoUser);
      }
    })();
  }, []);

  useEffect(() => {
    if (value.trim() === "") {
      setDataFilter(data);
    } else {
      const newData = data.filter((item) => {
        if (item.type === "checklist") {
          for (const x of item.data) {
            return item.title.includes(value) || x.content.includes(value);
          }
        }
        return item.title.includes(value) || item.data.includes(value);
      });
      setDataFilter(newData || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setDataFilter(data);
  }, [data]);
  const [isTabsOpen, setIsTabsOpen] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  const handleChange = (event, newValue) => {
    console.log(1);
    setTabValue(newValue);
  };

  const toggleTabs = () => {
    setIsTabsOpen(!isTabsOpen);
  };
  return (
    <div className={classes.root}>
      <div className={classes.headerFeature}>
        {selectedNote && (
          <EditForm
            dataItem={selectedNote}
            handleDelNote={handleDelNote}
            setArchivedData={setArchivedData}
            construct='List'
            clear={() => {
              setSelectedNote(null);
            }}
            selectedNote={selectedNote}
          />
        )}

        <Box className='feature'>
          <Button
            className={classes.List}
            variant='outlined'
            sx={{
              color: "black",
              textTransform: "capitalize",
              borderRadius: "10px",
              borderColor: "black",
              width: view && construct === "List" ? "100px" : "auto",
              "&:hover": { borderColor: "black" },
            }}
            startIcon={construct === "Grid" ? <GridViewOutlined /> : <FormatListBulleted />}
            onClick={() => {
              construct === "Grid" ? setConstruct("List") : setConstruct("Grid");
            }}
          >
            {construct}
          </Button>
          <Button
            className={classes.List}
            variant='outlined'
            sx={{
              color: "black",
              textTransform: "capitalize",
              borderRadius: "10px",
              borderColor: "black",
              marginLeft: "15px",
              width: view && construct === "Sort By" ? "100px" : "auto",
              "&:hover": { borderColor: "black" },
            }}
            startIcon={construct === "Sort By" ? <FilterListIcon /> : <FilterListIcon />}
            onClick={toggleTabs}
          ></Button>
          {isTabsOpen && (
            <div className='overlay'>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    className='tabbb'
                    onChange={handleChange}
                    aria-label='lab API tabs example'
                    centered
                  >
                    <Tab label='Color' value='1' />
                    <Tab label='SORT' value='2' />
                    <Tab label='View' value='3' />
                  </TabList>
                </Box>
                <TabPanel value='1'>Item One</TabPanel>
                <TabPanel value='2'>Item Two</TabPanel>
                <TabPanel value='3'>Item Three</TabPanel>
              </TabContext>
            </div>
          )}
        </Box>
        <SearchInput setValue={setValue} onSearchItemClick={handleSearchItemClick} />
      </div>
      {view === "Side" && construct === "List" ? (
        <ListView
          data={data.slice(-50).sort((a, b) => new Date(b.createAt) - new Date(a.createAt))}
          setArchivedData={setArchivedData}
          handleDelNote={handleDelNote}
          toolsNote={toolsNote}
          clear={clear}
        />
      ) : (
        <div
          className={classNames({
            [classes.feature]: true,
            "box-container": true,
          })}
        >
          <Grid
            className={classes.grid}
            container
            sx={{
              "&>.MuiGrid-item": {
                width: "100%",
              },
            }}
            spacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
          >
            {dataFilter
              .slice(0, 50)
              .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
              .map((item) => (
                <>
                  {item.type !== "screenshot" && (
                    <Grid
                      key={item.idNote}
                      item
                      xs={24}
                      sm={12}
                      md={4}
                      lg={construct === "Grid" ? 3 : 4}
                    >
                      {item.lock ? (
                        <>
                          {item?.flag === true ? (
                            <>
                              {item.type === "image" ? (
                                <NoteImage
                                  construct={construct}
                                  dataItem={item}
                                  setArchivedData={setArchivedData}
                                  handleDelNote={handleDelNote}
                                />
                              ) : (
                                <NoteItem
                                  construct={construct}
                                  dataItem={item}
                                  setArchivedData={setArchivedData}
                                  handleDelNote={handleDelNote}
                                />
                              )}
                            </>
                          ) : (
                            <NoteItemLock
                              construct={construct}
                              handle={setArchivedData}
                              dataItem={item}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {item.type === "image" ? (
                            <NoteImage
                              construct={construct}
                              dataItem={item}
                              setArchivedData={setArchivedData}
                              handleDelNote={handleDelNote}
                            />
                          ) : (
                            <NoteItem
                              construct={construct}
                              dataItem={item}
                              setArchivedData={setArchivedData}
                              handleDelNote={handleDelNote}
                            />
                          )}
                        </>
                      )}
                    </Grid>
                  )}
                </>
              ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Archived;
