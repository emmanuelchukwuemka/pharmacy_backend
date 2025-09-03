import { Application } from "express";
import expressLoader from "../loaders/express";
import dbLoader, { syncedDB } from "../loaders/database";
import { setupAssociations } from "../modules/healthcare/healthcare.models.associations";
// import eventsLoader from "./events";

export default async (app: Application): Promise<void> => {
  await dbLoader();
  // await syncedDB();

  // set up sequelize model associations here
  setupAssociations();

  expressLoader(app);

  // eventsLoader();
};
