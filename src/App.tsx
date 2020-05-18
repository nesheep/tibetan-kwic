import React from 'react';

import './assets/styles/App.css';
import { AppState } from './interfaces';
import { getResults } from './apis/result';

import ResultList from './components/ResultList';
import SearchWindow from './components/SearchWindow';
import LoginDialog from './components/LoginDialog';
import login from './apis/auth';

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      login: 0,
      page: 0,
      results: {
        data: [],
        total: -2,
        keyword: ''
      }
    }
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickSearchButton = this.handleClickSearchButton.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  private handleClickLogin = async (
    name: string,
    password: string
  ) => {
    if (!name || !password) {
      return
    }
    const autholized = await login(name, password);
    if (!autholized) {
      return;
    }
    this.setState({ login: 1 });
  }

  private handleClickSearchButton = async (input: string) => {
    if (!input) {
      this.setState({ results: { ...this.state.results, total: -3 } })
      return
    }
    if (input.startsWith(' ')) {
      this.setState({ results: { ...this.state.results, total: -4 } })
      return
    }
    this.setState({ results: { ...this.state.results, total: -1 } });
    const results = await getResults(input, 500, 1000, 'true');
    if (!results) {
      this.setState({ results: { ...this.state.results, total: -5 } })
      return
    }
    this.setState({
      results,
      page: 0
    })
  }

  private handleChangePage = (page: number) => {
    this.setState({ page })
  }

  render() {
    return (
      <div className="App">
        <LoginDialog
          login={this.state.login}
          onClickLogin={this.handleClickLogin}
        />
        <SearchWindow
          onClick={this.handleClickSearchButton}
        />
        <ResultList
          results={this.state.results}
          page={this.state.page}
          onChangePage={this.handleChangePage}
        />
      </div>
    )
  }
}

export default App;
