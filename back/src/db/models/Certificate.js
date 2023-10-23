import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async checkCertificateId({ certificateId }) {
    const user = await CertificateModel.findOne({ certificateId });
    return user;
  }

  static async findByCertificateId({ certificateId }) {
    const certificate = await CertificateModel.findOne({ certificateId });
    return certificate;
  }

  static async findAll({ userId }) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(filter, update, option);
    return updatedCertificate;
  }
}

export { Certificate };
