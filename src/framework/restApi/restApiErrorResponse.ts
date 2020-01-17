export default function(obj: any) {
  let { res, err, data, code } = obj;
  if (!code) {
    code = 500;
  }
  res.status(code);
  res.send({
    result: {
      status: code,
      success: false,
      message: err.message,
      data: data
    }
  });
}
