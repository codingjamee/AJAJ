import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async checkUserId({ certificateId }) {
    const user = await CertificateModel.findOne({ certificateId });
    return user;
  }

  static async findById({ certificateId }) {
    const certificate = await CertificateModel.findOne({ certificateId });
    return certificate;
  }

  static async findAll() {
    const certificates = await CertificateModel.find({});
    return certificates;
  }

  static async update({ Certificate_id, fieldToUpdate, newValue }) {
    const filter = { id: Certificate_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }
}

export { Certificate };
