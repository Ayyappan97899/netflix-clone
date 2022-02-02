import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Loader from "../loader/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  borderRadius: "5px",
};

export default function BasicModal({ state }) {
  return (
    <div>
      <Modal
        open={state}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Loader />
        </Box>
      </Modal>
    </div>
  );
}
