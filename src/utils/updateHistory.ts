export const updateHistory = (params: URLSearchParams) => {
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
};
