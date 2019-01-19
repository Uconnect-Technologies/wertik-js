export default function (e) {
  return {
    errors: [`${e.message}`],
    statusCode: 'INTERNAL_SERVER_ERROR'
  }
}