import { AppBar, Box, Stack, TextField, Typography, Toolbar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "antd";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import "./index.css";
import userApi from "../../api/userApi";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const Anonymous = () => {
  const [getMessage, setGetMessageuser] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [listUserOnline, setlistUserOnline] = useState([]);
  const [UserOnlineId, setUserOnlineId] = useState(10);
  const [UserIdSend, setUserIdSend] = useState([]);
  const [statusMess, setstatusMess] = useState();
  const My_button = styled(Button)({ backgroundColor: "#5BE260", color: "#fff" });
  const My_text = styled(Typography)({
    color: "#fff",
  });
  const users =
    useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));
  // console.log(users);
  const handle_delete = () => {
    const deleteUser = document.querySelectorAll(".deleteUser");
    deleteUser.forEach((el) => {
      el.addEventListener("click", () => {
        const parent = el.parentElement.parentElement;
        parent.classList.add("none");
      });
    });
  };

  const HandleMessage = () => {
    const messageAnoymous = document.querySelectorAll(".messageAnoymous");
    messageAnoymous.forEach((el, index) => {
      el.addEventListener("click", (e) => {
        const dataId = e.target.getAttribute("data-id");
        const [checkUser] = listUserOnline.filter((user) => user.id == dataId);
        setUserOnlineId(checkUser);
      });
    });
    userApi.getMessage(UserOnlineId && UserOnlineId.id).then((data) => {
      setGetMessageuser(data.data);
    });
  };

  useEffect(() => {
    userApi.userOnline().then((res) => {
      const status = res.users.filter((user) => user.statesLogin === 1);
      setlistUserOnline(status);
    });
  }, [messageContent]);

  const sendMessage = () => {
    const data = axios({
      method: "POST",
      url: `http://14.225.7.221:18011/message/chat-unknown/${UserOnlineId.id}`,
      data: {
        content: messageContent,
        id: "",
        idReceive: UserOnlineId.id,
        idSend: users.id,
        sendAt: new Date().toISOString(),
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    data.then((datas) => {
      setstatusMess(datas.data.message);
    });
    setMessageContent("");
  };

  //////////////////////////////
  useEffect(() => {
    userApi.getMessage(users.id).then((data) => {
      setUserIdSend(data.data);
    });
  }, [messageContent]);
  useEffect(() => {
    document.querySelector(".inputMessageAnoymous").addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        console.log(1);
        // sendMessage();
      }
    });
  });
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        className='SideBarAy'
        sx={{
          maxWidth: 470 + "px",
          backgroundColor: "#000000",
          paddingLeft: 70 + "px",
          paddingRight: 35 + "px",
          paddingTop: 24 + "px",
          paddingBottom: 24 + "px",
        }}
      >
        <Link to={"/home/profile/"}>
          <Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-around'>
              <img
                style={{
                  width: 60 + "px",
                  height: 60 + "px",
                }}
                src={`${process.env.PUBLIC_URL + "/assets/andanh.png"}`}
              ></img>
              <My_text className='marginAnoy' mr={20} variant='h5'>
                Anonymous
              </My_text>
              <SettingsIcon
                style={{
                  color: "#fff",
                  fontSize: 35 + "px",
                }}
              />
            </Stack>
          </Stack>
        </Link>
        <Stack>
          <TextField
            sx={{
              borderRadius: 30 + "px",
              backgroundColor: "#DADADA",
              "&:focus": {
                outline: "none",
              },
            }}
            placeholder='Search User'
          ></TextField>
        </Stack>
        <Box
          className='box_anoymous'
          sx={{
            width: 100 + "%",
            height: 220 + "px",
            display: "flex",
            flexDirection: "column",
            borderRadius: 12 + "px",
            marginTop: 20 + "px",
            marginBottom: 20 + "px",
          }}
        >
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <img
              style={{
                width: 45 + "px",
                height: 45 + "px",
              }}
              src={`${process.env.PUBLIC_URL + "/assets/andanh.png"}`}
            ></img>
            <My_text variant='h5'>Anonymous</My_text>
          </Stack>
          <My_text textAlign='center' variant='subtitle1'>
            You now in anonymous mode. You can chat with others anonymously
          </My_text>
          <Link to={"/home/profile"}>
            <My_button
              style={{
                marginBottom: 10 + "px",
                marginTop: 10 + "px",
                fontSize: 18 + "px",
                height: 50 + "px",
                width: 100 + "%",
              }}
              color={My_button}
            >
              Quit
            </My_button>
          </Link>
        </Box>
        <Stack
          className='boxUserOnline'
          sx={{
            backgroundColor: "#636363",
            padding: 15 + "px",
            paddingLeft: 30 + "px",
            paddingRight: 30 + "px",
            borderRadius: 28 + "px",
            marginBottom: 15 + "px",
          }}
        >
          <Stack direction='row' justifyContent='space-between'>
            <My_text
              style={{
                fontSize: 20 + "px",
              }}
            >
              Online User
            </My_text>
            <MoreHorizIcon
              style={{
                color: "#fff",
              }}
            />
          </Stack>
          <Box>
            {listUserOnline.map((user, index) => {
              return (
                users.id != user.id && (
                  <Stack
                    className='User_mess'
                    key={index}
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Link to={`/profile/${user.id}`}>
                      <Stack
                        direction='row'
                        alignItems='center'
                        mt={2}
                        mb={1}
                        style={{ cursor: "pointer", position: "relative" }}
                        className='anonymos_img'
                      >
                        <img
                          style={{ width: 60 + "px", height: 60 + "px", borderRadius: 50 + "px" }}
                          src={user.img}
                          alt=''
                        />
                        <My_text ml={1}>{user.name}</My_text>
                      </Stack>
                    </Link>
                    <Stack direction='row' alignItems='center'>
                      <DeleteIcon
                        className='deleteUser hiddle'
                        data={index}
                        onClick={handle_delete}
                        style={{
                          fontSize: 30 + "px",
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      />
                      <MessageIcon
                        className='messageAnoymous hiddle'
                        data-id={user.id}
                        onClick={HandleMessage}
                        style={{
                          color: "#fff",
                          padding: 4 + "px",
                          fontSize: 35 + "px",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  </Stack>
                )
              );
            })}
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          width: 100 + "%",
        }}
      >
        <img
          style={{
            width: 100 + "%",
            height: 100 + "%",
          }}
          src={"https://haycafe.vn/wp-content/uploads/2021/12/hinh-nen-pc-hacker-cuc-chat.jpg"}
          alt=''
        />
        <Box>
          <header
            className='box_anoymous'
            style={{
              position: "absolute",
              width: 65 + "%",
              display: "flex",
              height: 80 + "px",
              alignItems: "center",
              justifyContent: "space-between",
              top: 0,
            }}
          >
            <Stack direction='row' alignItems='center'>
              <img
                style={{
                  width: 60 + "px",
                  height: 60 + "px",
                  borderRadius: 50 + "px",
                  marginRight: 10 + "px",
                }}
                src={
                  (UserOnlineId && UserOnlineId.img) ||
                  `${process.env.PUBLIC_URL + "/assets/user.png"}`
                }
                alt=''
              />
              <My_text>{(UserOnlineId && UserOnlineId.name) || "User Name"}</My_text>
            </Stack>
            <MoreHorizIcon
              style={{
                color: "#fff",
              }}
            />
          </header>
        </Box>
        <Box
          className='Box_message box_anoymous'
          sx={{
            position: "absolute",
            maxWidth: 800 + "px",
            borderRadius: 32 + "px",
            marginBottom: 30 + "px",
            right: 0,
            top: 100,
          }}
        >
          {UserOnlineId &&
            getMessage.map((message) => {
              return UserOnlineId.id == message.idSend ? (
                <Stack key={message.id} mt={4} direction='column' alignItems='center'>
                  <Stack
                    style={{
                      marginRight: 100 + "px",
                      padding: 10 + "px",
                      borderRadius: 50 + "px",
                    }}
                    className='received'
                    direction={"row"}
                    mt={2}
                  >
                    <>
                      <img
                        style={{ width: 60 + "px", height: 60 + "px" }}
                        src={`${process.env.PUBLIC_URL + "/assets/user.png"}`}
                        alt=''
                      ></img>
                      <Box
                        // className={`${message.idSend == `${users.id}` ? "sent" : "received"}`}
                        classList={"received"}
                        ml={2}
                        sx={{
                          width: 450 + "px",
                          padding: 10 + "px",
                          minHeight: 50 + "px",
                          borderRadius: 24 + "px",
                        }}
                      >
                        <div>
                          <p style={{ fontWeight: 600 }}> {message.content}</p>
                          <p>Đã gửi:{message.sendAt} </p>
                        </div>
                      </Box>
                    </>
                  </Stack>
                </Stack>
              ) : (
                ""
              );
            })}
          {UserOnlineId &&
            UserIdSend.map((message) => {
              return UserOnlineId.id == message.idReceive ? (
                <Stack mt={4} direction='column' alignItems='center'>
                  <Stack
                    style={{
                      marginLeft: 100 + "px",
                      backgroundColor: "#5BE260",
                      padding: 10 + "px",
                      borderRadius: 50 + "px",
                    }}
                    direction={"row"}
                    mt={2}
                  >
                    <>
                      <img
                        style={{ width: 60 + "px", height: 60 + "px" }}
                        src={`${process.env.PUBLIC_URL + "/assets/anoymous.png"}`}
                        alt=''
                      ></img>
                      <Box
                        classList={"sent"}
                        ml={2}
                        sx={{
                          width: 450 + "px",
                          padding: 10 + "px",
                          minHeight: 50 + "px",
                          borderRadius: 24 + "px",
                        }}
                      >
                        <div>
                          <p style={{ fontWeight: 600 }}>{message.content}</p>
                          <p>Đã gửi:{message.sendAt} </p>
                        </div>
                      </Box>
                    </>
                  </Stack>
                </Stack>
              ) : (
                ""
              );
            })}
          ;
        </Box>
      </Box>

      <Box
        className='input_mea'
        mt={5}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 45 + "%",
        }}
      >
        <Stack direction='row' alignItems='center'>
          <img
            style={{ width: 60 + "px", height: 60 + "px" }}
            src={`${process.env.PUBLIC_URL + "/assets/anoymous.png"}`}
            alt=''
          />
          <TextField
            className={"inputMessageAnoymous"}
            style={{
              backgroundColor: "#D3D3D3",
              width: 550 + "px",
              borderRadius: 32 + "px",
            }}
            placeholder='Give a comment'
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></TextField>
          <img
            onClick={sendMessage}
            style={{ width: 60 + "px", height: 60 + "px", cursor: "pointer" }}
            src={`${process.env.PUBLIC_URL + "/assets/send.png"}`}
            alt=''
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Anonymous;
