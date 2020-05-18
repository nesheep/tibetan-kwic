import React from 'react';

import {
  Button,
  TextField
} from "@material-ui/core";

import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

import { SearchWindowProps } from "../interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '10px'
    },
    searchButton: {
      marginTop: '7px',
      marginLeft: '10px'
    }
  })
)

const SearchWindow = (props: SearchWindowProps) => {
  const classes = useStyles();
  const [input, setInput] = React.useState('');

  const handleChangeInput = (value: string) => {
    setInput(value);
  }

  const handleClickSearchButton = () => {
    props.onClick(input);
  }

  const handleEnter = (keyCode: number) => {
    if (keyCode === 13) {
      handleClickSearchButton();
    }
  }

  return (
    <div className={classes.root}>
      <TextField
        autoFocus
        size="small"
        label="キーワード"
        onChange={(e) => handleChangeInput(e.target.value)}
        onKeyUp={(e) => handleEnter(e.keyCode)}
      />
      <Button
        className={classes.searchButton}
        variant="contained"
        disableElevation
        onClick={handleClickSearchButton}
      >
        検索
      </Button>
    </div>
  )
}

export default SearchWindow;
