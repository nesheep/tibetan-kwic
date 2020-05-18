export interface Result {
  code: string;
  article: {
    url: string;
    date: number;
  }
  text: {
    left: string;
    match: string;
    right: string;
  }
}

export interface Results {
  data: Result[];
  total: number;
  keyword: string;
}

export interface LoginReq {
  name: string,
  password: string
}

export interface LoginRes {
  access_token: string
}

export interface AppState {
  login: number;
  page: number;
  results: Results;
}

export interface ResultListProps {
  results: Results;
  page: number;
  onChangePage: (newPage: number) => void;
}

export interface ResultProps {
  result: Result;
  index: number;
}

export interface SearchWindowProps {
  onClick: (input: string) => Promise<void>;
}

export interface LoginDialogProps {
  login: number;
  onClickLogin: (name: string, password: string) => Promise<void>
}
