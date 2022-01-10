import wertik from "../index"
import { useQueue } from "../queue"

const devIlyas = async () => {
  wertik({
    port: 1200,
    queue: {
      options: {
        useBullBoard: true,
        uiPath: "/admin/jobs",
      },
      jobs: {
        fetchGames: useQueue({
          name: "fetchGames",
        }),
      },
    },
  })
}

export default devIlyas
