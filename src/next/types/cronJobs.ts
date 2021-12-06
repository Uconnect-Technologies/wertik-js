import { WertikApp } from ".";

export interface useCronJobsProps {
  expression: string;
  name: string;
  beforeRun?: (app: WertikApp) => void | any;
  afterRun?: (app: WertikApp) => void | any;
  handler: (app: WertikApp) => void | any;
}
