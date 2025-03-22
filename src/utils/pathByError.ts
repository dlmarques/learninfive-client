export const queryByError = (code: number) => {
  switch (code) {
    case 401:
      return "unauthorized";
    case 404:
      return "not-found";
    case 429:
      return "too-many-requests";
    case 500:
      return "unexpected";
    default:
      return "unexpected";
  }
};
