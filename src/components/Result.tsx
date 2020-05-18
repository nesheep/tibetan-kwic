import React from 'react';

import {
  Collapse,
  Link,
  List,
  ListItem,
  ListItemText,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";

import {
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@material-ui/icons";

import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

import { Element, scroller } from "react-scroll";

import tibetanSubstring from "../functions/tibetanSubstring";
import { ResultProps } from "../interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      }
    },
    tibetanCell: {
      paddingTop: 0,
      paddingBottom: 9
    },
    nested: {
      paddingTop: 0,
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    }
  })
)

const Result = (props: ResultProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const length = 50;

  const handleClick = () => {
    if (!open) {
      const scrollOptions = {
        containerId: 'result-table',
        smooth: true,
        offset: 106,
        duration: 500
      }
      scroller.scrollTo(`scroll${props.index}`, scrollOptions);
    }
    setOpen(!open);
  }

  return (
    <>
      <Element name={`scroll${props.index}`} />
      <TableRow
        className={classes.root}
        hover
        onClick={handleClick}
      >
        <TableCell align="left">
          {props.index + 1}
        </TableCell>
        <TableCell align="right" className={classes.tibetanCell}>
          <Typography variant="h5">
            {tibetanSubstring(props.result.text.left, props.result.text.left.length - length)}
          </Typography>
        </TableCell>
        <TableCell align="center" className={classes.tibetanCell}>
          <Typography variant="h5">
            {props.result.text.match}
          </Typography>
        </TableCell>
        <TableCell align="left" className={classes.tibetanCell}>
          <Typography variant="h5">
            {tibetanSubstring(props.result.text.right, 0, length)}
          </Typography>
        </TableCell>
        <TableCell align="right" size="small">
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemText
                  primary={
                    <Typography color="inherit" variant="h6">
                      {props.result.text.left}
                      <span style={{ color: 'red' }}>{props.result.text.match}</span>
                      {props.result.text.right}
                    </Typography>
                  }
                  secondary={
                    <Typography align="right" color="textSecondary" variant="body2">
                      <Link
                        href={props.result.article.url}
                        color="inherit"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {props.result.article.url}
                      </Link>
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default Result;
