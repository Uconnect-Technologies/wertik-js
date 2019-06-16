export default async function (model: any,args: any,name: any) {
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