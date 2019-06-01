export default async function (model,args,name) {
  try {
    let create = await model.create(args);
    create.successMessageType = "Created";
    create.successMessage = `${name} created successfully`;
    return create;
  } catch (e) {
    return {
      errorMessageType: "Error while creating",
      errorMessage: "Something went wrong while creating"
    }
  }
}