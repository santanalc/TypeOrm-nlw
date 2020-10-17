import Image from "../models/Image";

export default {
  render(image: Image) {
    return {
      name: image.id,
      url: `http://localhost:3334/uploads/${image.path}`,
    };
  },
  renderMany(image: Image[]) {
    return image.map((image) => this.render(image));
  },
};
