export const valid = (data: any) => {
  if (data !== undefined && data !== null) {
    return true;
  }

  return false;
};

export const validWithEmptyText = (data: any) => {
  if (data !== undefined && data !== null && data !== "") {
    return true;
  }
  return false;
};

export const invalid = (data: any) => {
  if (data === undefined) {
    return true;
  }

  if (data === null) {
    return true;
  }

  return false;
};

export const invalidWithEmptyText = (data: any) => {
  if (data === "") {
    return true;
  }

  return invalid(data);
};
