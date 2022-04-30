const wertik = require("./../lib/next/index").default

test("Expect no configuration can start the server", async () => {
  await expect((app = wertik())).resolves.not.toThrowError()
})

test("Expect empty configuration object an start the server", async () => {
  await expect(wertik()).resolves.not.toThrowError()
})

test("Expect null configuration does not causes error", async () => {
  await expect(wertik(null)).resolves.not.toThrowError()
})
