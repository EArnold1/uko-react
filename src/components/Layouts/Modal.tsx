import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  toggleModal: () => void;
  title: string;
  open: boolean;
}

const ModalComp: FC<Props> = ({ toggleModal, children, title, open }) => {
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        overflow: 'auto',
      }}
    >
      <div>
        {upSm && (
          <Box px={20} py={10}>
            <Card
              style={{
                padding: '5px 10px',
              }}
            >
              <h2 className="text-2xl text-center my-2">{title}</h2>
              {/* body */}
              {children}
              <Grid item xs={12}>
                <Button
                  onClick={toggleModal}
                  variant="contained"
                  color="error"
                  size="medium"
                >
                  close
                </Button>
              </Grid>
            </Card>
          </Box>
        )}
        {downSm && (
          <Box>
            <Card
              style={{
                padding: '5px 10px',
              }}
            >
              <h2 className="text-2xl text-center my-2">{title}</h2>
              {/* body */}
              {children}
              <Grid item xs={12}>
                <Button
                  onClick={toggleModal}
                  variant="contained"
                  color="error"
                  size="medium"
                >
                  close
                </Button>
              </Grid>
            </Card>
          </Box>
        )}
      </div>
    </Modal>
  );
};

export default ModalComp;
