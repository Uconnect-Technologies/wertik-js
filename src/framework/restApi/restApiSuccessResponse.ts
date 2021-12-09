export default function (obj: any) {
  let { res, err, message, data } = obj
  res.status(200)
  res.send({
    result: {
      status: 200,
      success: true,
      message: message || "Ok",
      data: data,
    },
  })
}
