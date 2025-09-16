"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabUser = void 0;
const sequelize_1 = require("sequelize");
const LabUser_1 = require("../lab_models/LabUser");
const getLabUser = async (identifier) => {
    return await LabUser_1.LabUser.findOne({
        where: {
            [sequelize_1.Op.or]: [
                { email: identifier },
                { phone: identifier },
                { id: identifier },
            ],
        },
    });
};
exports.getLabUser = getLabUser;
