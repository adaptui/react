export const enterOrSpace = (e: any, fn: Function) => {
  if (e.key === "Enter" || e.key === " ") {
    fn && fn(e);
  }
};
