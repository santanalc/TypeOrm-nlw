import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphange from "../models/Orphanage";
import "../database/connection";
import orphanageView from "../views/orphanages_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphange);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphange);

    const orphanages = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(orphanageView.render(orphanages));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      opening_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphange);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      opening_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required(),
      instructions: Yup.string().required().max(300),
      opening_hours: Yup.string().required(),
      opening_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });
    const orphanages = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanages);

    return response.status(201).json({ orphanages });
  },
};
