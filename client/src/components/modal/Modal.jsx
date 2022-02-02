import React from "react";
import Modal from "@mui/material/Modal";
import Loader from "../loader/Loader";
import { Box } from "@mui/system";

export default function BasicModal({ state }) {
  return (
    <div>
      <Modal
        open={state}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Loader />
        </Box>
      </Modal>
    </div>
  );
}
