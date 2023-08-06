import { useParams } from "react-router-dom";
import { Box, createTheme, Typography, Button } from "@mui/material";
import rectangleImage from "./img/Rectangle 1.png";
import avatar from "./img/Ellipse 33.png";
import add from "./img/material-symbols_group-add.svg";
import mess from "./img/Vector.svg";
import createGroup from "./img/ri_group-fill.svg";
import messImg from "./img/messImg.svg";
import React, { useEffect, useState } from "react";
import classes from "../Groups/styles.module.css";
import "./index.scss";
import classNames from "classnames";
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import ListView from "../Archived/ListView/index";
function Profile({ data, handleDelNote, setArchivedData, toolsNote }) {
  const theme = createTheme({
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h2",
            h2: "h2",
            h3: "h2",
            h4: "h2",
            h5: "h2",
            h6: "h2",
            subtitle1: "h2",
            subtitle2: "h2",
            body1: "span",
            body2: "span",
          },
        },
      },
    },
  });

  useEffect(() => {
    document.querySelectorAll(" .content ").forEach((item) => {
      item.addEventListener("click", function (e) {
        if (item.classList.contains("content")) {
          item.classList.remove("content");
          item.classList.remove("title");
          item.classList.add("expanded");
          item.classList.add("title-expand");
        } else {
          item.classList.remove("expanded");
          item.classList.remove("title-expand");
          item.classList.add("title");

          item.classList.add("content");
        }
      });
    });
    document.querySelectorAll(".title  ").forEach((item) => {
      item.addEventListener("click", function (e) {
        if (item.classList.contains("title")) {
          item.classList.remove("title");
          item.classList.add("title-expand");
        } else {
          item.classList.remove("title-expand");
          item.classList.add("title");
        }
      });
    });
  }, []);

  const handle_message = () => {
    set_togle_Message(!togle_Message);
  };
  const handleNote = () => {
    setToggleNote(!toggleNote);
  };
  const user =
    useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [limitedData, setLimitedData] = useState([]);
  const [maxRecordsToShow, setMaxRecordsToShow] = useState(7);
  const [togle_Message, set_togle_Message] = useState(false);
  const [userOnline, setUserOnline] = useState([]);
  const [toggleNote, setToggleNote] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await userApi.profile(user.id);

      setProfile(res.note);
      setProfileInfo(res.user);
      setLimitedData(res.note.slice(2, maxRecordsToShow));
    })();
    userApi.userOnline().then((res) => {
      const status = res.users.filter((user) => user.statesLogin === 1);
      setUserOnline(status);
    });
  }, []);
  const handleShowMore = () => {
    const newRecordsToShow = maxRecordsToShow + 4;

    if (newRecordsToShow <= 50) {
      setMaxRecordsToShow(newRecordsToShow);
      setLimitedData(profile.slice(2, newRecordsToShow));
    }
    console.log(maxRecordsToShow);
  };

  return (
    <div className={classes.root}>
      <div className={classNames()}>
        <div className='i' style={{ position: "relative" }}>
          <img style={{ width: "100%", marginLeft: "16px" }} src={rectangleImage} alt='note' />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "25%",
              position: "absolute",
              top: "10%",
              marginLeft: "20%",
            }}
          >
            <Box
              sx={{
                height: "65px",
                display: "flex",
                justifyContent: "space-around",
                padding: "20px 24px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",

                gap: "30px",
                color: "#fff",

                alignItems: "center",
                borderRadius: "32px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "600",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  SAMNOTES
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "90px",
                  width: "29rem",
                  fontSize: "1.2rem",
                  fontWeight: "400",
                  "& .MuiTypography-body1:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant='body1'>Help</Typography>
                <Typography variant='body1'>Home</Typography>
                <Typography variant='body1'>Contact Us</Typography>
                <Typography variant='body1'>Blog</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                position: "relative",
                // top: "10px",
                width: "48px",
                height: "48px",
                position: "relative",
                cursor: "pointer",
              }}
              className='Message'
            >
              <img onClick={handle_message} src={messImg}></img>
              <div className='numberMessIcon'>1</div>
              <Message listUserOnline={userOnline} togle={togle_Message} />
            </Box>
          </Box>
        </div>

        <Box
          sx={{
            backgroundColor: "#fff",
            marginLeft: "16px",
            position: "relative",
            top: "-67px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              alignItems: "center",
              position: "relative",
              left: "13%",
              top: "-21px",
            }}
          >
            <img
              style={{ borderRadius: "50%", height: "111px", width: "111px" }}
              src={profileInfo.Avarta}
            ></img>
            <Box>
              <Typography variant='h5' fontWeight={500}>
                {profileInfo.name}
              </Typography>
              <Typography variant='h6' fontWeight={400}>
                {profileInfo.createAccount}
              </Typography>
            </Box>
            {/* <Button variant="contained" disableElevation sx={{ display: "flex", gap: "10px", textTransform: 'capitalize', backgroundColor: "rgba(54, 68, 199, 1)", borderRadius: "12px" }}>
                            <img src={add} sx={{ marginRight: "10px" }}></img>
                            Add to Your group
                        </Button>
                        <Button variant="contained" disableElevation sx={{ display: "flex", gap: "10px", textTransform: 'capitalize', backgroundColor: "rgba(54, 68, 199, 1)", borderRadius: "12px" }}>
                            <img src={mess} sx={{ marginRight: "10px" }}></img>
                            Messenger
                        </Button>
                        <Button variant="contained" disableElevation sx={{ display: "flex", gap: "10px", textTransform: 'capitalize', backgroundColor: "rgba(54, 68, 199, 1)", borderRadius: "12px" }}>
                            <img src={createGroup} sx={{ marginRight: "10px" }}></img>
                            Create Group
                        </Button> */}
          </Box>
          {toggleNote === true ? (
            <ListView
              toggleNote={toggleNote}
              data={data}
              setArchivedData={setArchivedData}
              handleDelNote={handleDelNote}
              toolsNote={toolsNote}
            />
          ) : (
            <Box
              // className={toggleNote === true ? "box_note_hidden" : "box_note_diplay"}
              sx={{
                width: "72%",
                marginRight: "14%",
                minHeight: "630px",
                backgroundColor: "rgba(162, 221, 159, 1)",
                backgroundImage:
                  "linear-gradient(90deg, rgba(162, 221, 159, 1), rgba(238, 146, 196, 1))",
                borderRadius: "32px",
                marginLeft: "14%",
                padding: "57px 44px",
              }}
            >
              <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "600" }}>
                Latest PublicNote
              </Typography>

              <div
                className='wrap-record'
                style={{ height: maxRecordsToShow <= 50 ? "auto" : "477px" }}
              >
                {limitedData &&
                  limitedData.map((limitedData, index) => {
                    return (
                      <>
                        <div
                          style={{ cursor: "pointer" }}
                          className='record'
                          key={index}
                          onClick={handleNote}
                        >
                          <p style={{ width: "50px" }} className='number'>
                            {index + 1}
                          </p>
                          <p className='title'>{limitedData.title} </p>

                          {typeof limitedData.data === "string" ? (
                            <p className='content'>{limitedData.data}</p>
                          ) : (
                            <div>
                              {limitedData.data.map((dataItem, i) => (
                                <p
                                  style={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    width: "200px",
                                  }}
                                  key={i}
                                >
                                  {dataItem.content}
                                </p>
                              ))}
                            </div>
                          )}
                          <p className='date-post'>{limitedData.createAt}</p>
                        </div>
                      </>
                    );
                  })}
              </div>

              {profile.length > maxRecordsToShow && (
                <Button sx={{ marginLeft: "40%" }} variant='text' onClick={handleShowMore}>
                  View more
                </Button>
              )}
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Profile;
