import { WertikApp } from '.'

export interface useCronJobsProps {
  expression: string
  name: string
  beforeRun?: (app: WertikApp) => {}
  afterRun?: (app: WertikApp) => {}
  handler: (app: WertikApp) => {}
}
