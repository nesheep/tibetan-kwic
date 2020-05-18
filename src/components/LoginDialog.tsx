import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';

import { LoginDialogProps } from '../interfaces';

const LoginDialog = (props: LoginDialogProps) => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const open = () => {
    if (props.login === 1) {
      return false;
    }
    return true;
  }

  const handleChangeName = (value: string) => {
    setName(value);
  }

  const handleChangePassword = (value: string) => {
    setPassword(value);
  }

  const handleClickLogin = () => {
    props.onClickLogin(name, password);
  }

  const handleEnter = (keyCode: number) => {
    if (keyCode === 13) {
      handleClickLogin();
    }
  }

  return (
    <Dialog open={open()}>
      <DialogTitle>ログイン</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="ユーザー名"
          onChange={(e) => handleChangeName(e.target.value)}
          onKeyUp={(e) => handleEnter(e.keyCode)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="パスワード"
          onChange={(e) => handleChangePassword(e.target.value)}
          onKeyUp={(e) => handleEnter(e.keyCode)}
          fullWidth
          type="password"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickLogin} color="primary">
          ログイン
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog;
