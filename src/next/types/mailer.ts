export interface emailSendProps {
  template: string;
  variables: {
    [key: string]: any;
  };
  from: string;
  to: string;
  subject: string;
  [key: string]: any;
}

export interface userMailerProps {}
