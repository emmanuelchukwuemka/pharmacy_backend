import { Op } from "sequelize";
import { LabUser, LabUserAttributes } from "../lab_models/LabUser";

export const getLabUser = async (
  identifier: string
): Promise<LabUserAttributes | null> => {
  return await LabUser.findOne({
    where: {
      [Op.or]: [
        { email: identifier },
        { phone: identifier },
        { id: identifier },
      ],
    },
  });
};
