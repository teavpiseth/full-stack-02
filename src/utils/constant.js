export function getImageView(image) {
  return `https://piseth.site/api/get-image/${image}`;
}

export function getImageViewServer(image) {
  return `http://localhost:8081/api/get-image/${image}`;
}

export const Gender = {
  1: "Male",
  0: "Female",
};

export const Status = {
  1: "Active",
  0: "Inactive",
};
