import { useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { certificatesCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const Certificate = ({ isEditable, certificate = {}, setCertificates }) => {
  // const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [certificateName, setCertificateName] = useState(
    certificate.certificateName || ""
  );
  const [certificateDetail, setCertificateDetail] = useState(
    certificate.certificateName || ""
  );
  const [certificateOrganization, setCertificateOrganization] = useState(
    certificate.certificateOrganization || ""
  );
  const [acquisitionDate, setAcquisitionDate] = useState(
    certificate.acquisitionDate || "2023-01-01"
  );

  const userState = useSelector((state) => state.userLogin);

  //form 상세설정 어레이
  const certificateState = useMemo(
    () => [
      { value: certificateName, changeHandler: (v) => setCertificateName(v) },
      {
        value: certificateDetail,
        changeHandler: (v) => setCertificateDetail(v),
      },
      {
        value: certificateOrganization,
        changeHandler: (v) => setCertificateOrganization(v),
      },
      { value: acquisitionDate, changeHandler: (v) => setAcquisitionDate(v) },
    ],
    [
      certificateName,
      setCertificateName,
      certificateDetail,
      setCertificateDetail,
      certificateOrganization,
      setCertificateOrganization,
      acquisitionDate,
      setAcquisitionDate,
    ]
  );

  const certificateFormList = useMemo(
    () =>
      certificatesCommonFormProps.map((certificateCommon, index) => {
        return { ...certificateCommon, ...certificateState[index] };
      }),

    [certificateState]
  );

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //post 서버와 통신
    try {
      const res = await api.put(
        `user/${userState.userInfo?.id}/certificate/${certificate.certificateId}`,
        {
          certificateName,
          // certificateDetail,
          certificateOrganization,
          acquisitionDate,
        }
      );
      if (res.status === 200) {
        setCertificates((prev) => {
          const updatedCert = prev.map((prevCert) => {
            if (prevCert.certificateId === certificate.certificateId) {
              return {
                ...prevCert,
                certificateName,
                // certificateDetail,
                certificateOrganization,
                acquisitionDate,
              };
            }
            return prevCert;
          });
          return updatedCert;
        });
        setEditMode(false);
      } else if (res.status !== 200) {
        // throw new Error("POST 요청을 실패하였습니다.");
      }
    } catch (err) {
      // throw new Error("서버와 통신이 실패하였습니다");
    }
  };

  //삭제함수
  const onClickDel = async (certificateId) => {
    const res = await api.delete(
      `user/${userState.userInfo?.id}/certificate/${certificateId}`
    );
    if (res.status === 200) {
      setCertificates((prev) =>
        prev.filter(
          (certificates) => certificates.certificateId !== certificateId
        )
      );
    } else if (res.status !== 200) {
      // throw new Error("삭제를 실패하였습니다");
    }
  };

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && (
        <>
          <Card.Title>{certificate.certificateName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {certificate.certificateDetail}
            {certificate.certificateOrganization}
          </Card.Subtitle>
          <Card.Text>{certificate.acquisitionDate}</Card.Text>
          {isEditable && (
            <Form.Group className="mb-5 text-center">
              <Col>
                <ButtonCommon
                  variant="outline-primary"
                  type="submit"
                  className="me-3"
                  text="Edit"
                  onClickHandler={() => setEditMode((prev) => !prev)}
                />

                <ButtonCommon
                  variant="outline-secondary"
                  text="Delete"
                  onClickHandler={() => onClickDel(certificate.certificateId)}
                />
              </Col>
            </Form.Group>
          )}
        </>
      )}
      {editMode && (
        <FormWrapper
          onSubmitHandler={onSubmitHandler}
          isEditable={isEditable}
          formList={certificateFormList}
          setAddForm={setEditMode}
        />
      )}
    </Card>
  );
};

export default Certificate;
