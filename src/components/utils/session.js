export const session = history => {
  if (sessionStorage.getItem("auth")) {
    history.push("/");
  }
};
