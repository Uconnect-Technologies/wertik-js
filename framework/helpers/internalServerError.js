export default function (e) {
	return {
		errorMessageType: "Something went wrong",
		errorMessage: "Something went wrong from our side. Message: " + e.message,
		statusCode: 'INTERNAL_SERVER_ERROR'
	}
}