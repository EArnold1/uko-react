import { Box, Card, Modal } from '@mui/material';
import { FC, ReactNode } from 'react';
interface Props {
  children: ReactNode;
  toggleModal: () => void;
  title: string;
  open: boolean;
}

const ModalComp: FC<Props> = ({ toggleModal, children, title, open }) => {
  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box px={20} py={10}>
        <Card
          style={{
            padding: '0 10px',
          }}
        >
          {/*header*/}
          <h2 className="text-2xl text-center my-2">{title}</h2>
          {/* body */}
          {children}
        </Card>
      </Box>
    </Modal>
  );
};

export default ModalComp;
