export async function authorizer() {
  throw new Error("something went wrong");
}

export async function endpoint() {
  return {
    status: 200,
    body: "Hello, world",
  };
}
