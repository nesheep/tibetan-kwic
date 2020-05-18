import React from 'react';

import {
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@material-ui/core";

import { GetApp } from "@material-ui/icons";

import { animateScroll } from "react-scroll";

import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';

import { getResults } from '../apis/result';
import resultsToCsv from "../functions/resultsToCsv";
import { ResultListProps } from "../interfaces";

import Result from "./Result";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100% - 75px)',
      margin: '10px'
    },
    header: {
      height: '10px',
      backgroundColor: '#000000',
      color: '#ffffff'
    },
    total: {
      paddingTop: '5px'
    },
    container: {
      height: 'calc(100% - 42px)'
    },
    table: {
      height: 'calc(100% - 52px)',
      overflow: 'auto'
    }
  })
)

const ResultList = (props: ResultListProps) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const displayTotal = (total: number) => {
    if (total < -2) {
      return <Typography></Typography>;
    }
    if (total === -2) {
      return <Typography>検索結果</Typography>;
    }
    if (total === -1) {
      return <CircularProgress size={20} />;
    }
    return <Typography>検索結果 {total}件</Typography>;
  }

  const handleDownloadCsv = async () => {
    if (!props.results.keyword) {
      return
    }
    const results = await getResults(
      props.results.keyword,
      50,
      props.results.total,
      'false'
    )
    if (!results) {
      return
    }
    const csvData = resultsToCsv(results.data);
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvData], { "type": "text/csv" })
    const csvLink = document.createElement('a');
    csvLink.href = window.URL.createObjectURL(blob);
    csvLink.setAttribute('download', 'results.csv');
    document.body.appendChild(csvLink);
    csvLink.click();
    document.body.removeChild(csvLink);
  }

  const handleChangePage = (newPage: number) => {
    props.onChangePage(newPage);
  }

  const handleChangeRowsPerPage = (value: string) => {
    setRowsPerPage(parseInt(value, 10));
    props.onChangePage(0);
  }

  React.useEffect(() => {
    const scrollOptions = {
      containerId: 'result-table',
      smooth: true,
      duration: 700
    }
    animateScroll.scrollToTop(scrollOptions);
  })

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={<div className={classes.total}>{displayTotal(props.results.total)}</div>}
        action={
          <IconButton color="inherit" size="small" onClick={handleDownloadCsv}>
            <GetApp />
          </IconButton>
        }
      />
      <TableContainer className={classes.container}>
        <div className={classes.table} id="result-table">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">前文脈</TableCell>
                <TableCell align="center">検索文字列</TableCell>
                <TableCell align="center">後文脈</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {props.results.data
                .slice(props.page * rowsPerPage, props.page * rowsPerPage + rowsPerPage)
                .map((result, index) => {
                  return (
                    <Result
                      result={result}
                      index={index + props.page * rowsPerPage}
                      key={`${props.results.keyword}${index + props.page * rowsPerPage}`}
                    />
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[8, 25, 50, 100]}
          component="div"
          count={props.results.data.length}
          rowsPerPage={rowsPerPage}
          page={props.page}
          onChangePage={(e, page) => handleChangePage(page)}
          onChangeRowsPerPage={(e) => handleChangeRowsPerPage(e.target.value)}
        />
      </TableContainer>
    </Card>
  )
}

export default ResultList;
