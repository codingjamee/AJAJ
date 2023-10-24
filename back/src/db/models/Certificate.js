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
    const filteredCertificates = certificates.map(({...rest}) => [rest._doc].map(({userId, _id, createdAt, updatedAt, __v, ...rest}) => rest)).flat();
    const result = filteredCertificates.sort(((a,b) => {
      if (new Date(a.acquisitionDate) > new Date(b.acquisitionDate)) return 1;
      if (new Date(a.acquisitionDate) < new Date(b.acquisitionDate)) return -1;

      if (new Date(a.certificateName) > new Date(b.certificateName)) return 1;
      if (new Date(a.certificateName) < new Date(b.certificateName)) return -1;
    }));
    return result;
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(filter, update, option);
    return updatedCertificate;
  }

  static async delete({ certificateId }) {
    const result = await CertificateModel.findOneAndDelete({ certificateId });
    return result;
  }
}

export { Certificate };
