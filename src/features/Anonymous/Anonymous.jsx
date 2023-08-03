import { AppBar, Box, Stack, TextField, Typography, Toolbar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "antd";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import "./index.css";
const Anonymous = () => {
  const My_button = styled(Button)({ backgroundColor: "#5BE260", color: "#fff" });
  const My_text = styled(Typography)({
    color: "#fff",
  });
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          maxWidth: 470 + "px",
          backgroundColor: "#000000",
          paddingLeft: 70 + "px",
          paddingRight: 35 + "px",
          paddingTop: 24 + "px",
          paddingBottom: 24 + "px",
        }}
      >
        <Link to={"/"}>
          <Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-around'>
              <img
                style={{
                  width: 60 + "px",
                  height: 60 + "px",
                }}
                src={`${process.env.PUBLIC_URL + "/assets/andanh.png"}`}
              ></img>
              <My_text mr={20} variant='h5'>
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
          <My_button
            style={{
              marginBottom: 10 + "px",
              marginTop: 10 + "px",
              fontSize: 18 + "px",
              height: 50 + "px",
            }}
            color={My_button}
          >
            Quit
          </My_button>
        </Box>
        <Stack
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
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Stack
                direction='row'
                alignItems='center'
                mt={2}
                mb={1}
                style={{ cursor: "pointer", position: "relative" }}
                className='anonymos_img'
              >
                <img
                  style={{ width: 60 + "px", height: 60 + "px" }}
                  src={`${process.env.PUBLIC_URL + "/assets/user.png"}`}
                  alt=''
                />
                <My_text ml={1}>User Name</My_text>
              </Stack>
              <Stack direction='row' alignItems='center'>
                <DeleteIcon
                  style={{
                    fontSize: 30 + "px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                />
                <MessageIcon
                  style={{
                    color: "#fff",
                    fontSize: 28 + "px",
                    cursor: "pointer",
                  }}
                />
              </Stack>
            </Stack>
            {/* user2 */}
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Stack
                direction='row'
                alignItems='center'
                mt={2}
                mb={1}
                style={{ cursor: "pointer", position: "relative" }}
                className='anonymos_img'
              >
                <img
                  style={{ width: 60 + "px", height: 60 + "px" }}
                  src={`${process.env.PUBLIC_URL + "/assets/user.png"}`}
                  alt=''
                />
                <My_text ml={1}>User Name</My_text>
              </Stack>
              <Stack direction='row' alignItems='center'>
                <DeleteIcon
                  style={{
                    fontSize: 30 + "px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                />
                <MessageIcon
                  style={{
                    color: "#fff",
                    fontSize: 28 + "px",
                    cursor: "pointer",
                  }}
                />
              </Stack>
            </Stack>
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
          src='https://haycafe.vn/wp-content/uploads/2021/12/hinh-nen-pc-hacker-cuc-chat.jpg'
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
                style={{ width: 60 + "px", height: 60 + "px" }}
                src={`${process.env.PUBLIC_URL + "/assets/user.png"}`}
                alt=''
              />
              <My_text>User Name</My_text>
            </Stack>
            <MoreHorizIcon
              style={{
                color: "#fff",
              }}
            />
          </header>
        </Box>
        <Box
          className='box_anoymous'
          sx={{
            position: "absolute",
            maxWidth: 800 + "px",
            borderRadius: 32 + "px",
            right: 0,
            top: 100,
          }}
        >
          <Stack mt={4} direction='row' alignItems='center'>
            <img
              style={{ width: 60 + "px", height: 60 + "px" }}
              src={`${process.env.PUBLIC_URL + "/assets/anoymous.png"}`}
              alt=''
            />
            <Box
              ml={5}
              sx={{
                width: 450 + "px",
                height: 130 + "px",
                borderRadius: 24 + "px",
                backgroundColor: "#FFF",
              }}
            ></Box>
          </Stack>
          <Stack ml={30} mt={7} direction='row' alignItems='center'>
            <Box
              mr={5}
              sx={{
                width: 550 + "px",
                height: 150 + "px",
                borderRadius: 24 + "px",
                backgroundColor: "#FFF",
              }}
            ></Box>
            <img
              style={{ width: 60 + "px", height: 60 + "px" }}
              src={`${process.env.PUBLIC_URL + "/assets/user.png"}`}
              alt=''
            />
          </Stack>
        </Box>
      </Box>
      <Box
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
            style={{
              backgroundColor: "#D3D3D3",
              width: 550 + "px",
              borderRadius: 32 + "px",
            }}
            placeholder='Give a comment'
          ></TextField>
          <img
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
