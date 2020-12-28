export const dumpDatabase = () => {
  const host = `--host localhost`;
  const user = `--user root`;
  const password = `--password pass`
  const dbName = `wapgee`
  const resultFile = `--result-file=dump.sql`
  let template = `mysqldump ${host} ${user} ${dbName} ${password}  ${resultFile}`;
}