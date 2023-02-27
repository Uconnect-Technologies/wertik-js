import dayjs from "../utils/dayjs"
import chalk from "chalk"

export const wLog = console.log
export const wLogWithDateWithInfo = (info, ...params) => {
  console.log(dayjs().format("L-LT"), chalk.blueBright(info), ...params)
}

export const wLogWithInfo = (info, ...params) => {
  console.log(chalk.blueBright(info), ...params)
}

export const wLogWithSuccess = (info, ...params) => {
  console.log(chalk.greenBright(info), ...params)
}
