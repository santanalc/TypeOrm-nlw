import Orphanage from "../models/Orphanage";
import imagesView from "./images_view";

export default {
  render(orphanage: Orphanage) {
    return {
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      opening_weekends: orphanage.opening_weekends,
      images: imagesView.renderMany(orphanage.images),
    };
  },
  renderMany(orphanage: Orphanage[]) {
    return orphanage.map((orphanage) => this.render(orphanage));
  },
};
