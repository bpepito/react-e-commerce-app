import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfirmationModal = ({ isVisible, onClose, onDelete, product }) => {
  return (
    <div>
      <Modal
        open={isVisible}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <WarningIcon /> Confirmation Modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Would you like to remove ${product?.title} from the list?`}
          </Typography>
          <div className="d-flex flex-row justify-content-between align-content-between pt-4">
            <Button
              onClick={onClose}
              variant="outlined"
              style={{ borderColor: "gray", color: "gray" }}
            >
              Close
            </Button>
            <Button
              onClick={onDelete}
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
