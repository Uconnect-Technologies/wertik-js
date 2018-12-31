import Express from "express";
import GraphQLHttp from 'express-graphql';

const app = Express();

const {
	PORT,
	MODE
} = process.env;

app.listen(PORT, () => {
	console.log("GraphQL and Rest API services are up and running");
	console.log(`App is running on Port:${PORT}. Database: ${MODE}`);
	console.log(`GraphQL Running on localhost:${PORT}/graphql`);
});