import { useEffect, useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { certificatesCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import useApi from "../../../../hooks/useApi";
import LoadingLayer from "../../../../UI/LoadingLayer";

const initialValue = {
  certificateName: "",
  certificateDetail: "",
  certificateOrganization: "",
  acquisitionDate: "2019-01-01",
};

const Certificate = ({ isEditable, certificate = {}, setCertificates }) => {
  // const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [data, onChange] = useInput(certificate || initialValue);
  const {
    certificateName,
    certificateDetail,
    certificateOrganization,
    acquisitionDate,
  } = data;
  const { result, loading, sendRequest, reqIdentifier, extra } = useApi();

  const userState = useSelector((state) => state.userLogin);

  //form 상세설정 어레이
  const certificateState = useMemo(
    () => [
      { value: certificateName, changeHandler: (e) => onChange(e) },
      {
        value: certificateDetail,
        changeHandler: (e) => onChange(e),
      },
      {
        value: certificateOrganization,
        changeHandler: (e) => onChange(e),
      },
      { value: acquisitionDate, changeHandler: (e) => onChange(e) },
    ],
    [
      certificateName,
      certificateDetail,
      certificateOrganization,
      acquisitionDate,
      onChange,
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

    //put 서버와 통신
    await sendRequest(
      `user/${userState.userInfo?.id}/award/${certificate._id}`,
      "put",
      {
        certificateName,
        certificateDetail,
        certificateOrganization,
        acquisitionDate,
      }
    );
  };

  // 삭제함수
  const onClickDel = async (certificateId) => {
    await sendRequest(
      `user/${userState.userInfo?.id}/certificate/${certificateId}`,
      "delete",
      "",
      "",
      certificateId
    );
  };

  useEffect(() => {
    if (reqIdentifier === "putData") {
      setCertificates((prev) => {
        const updatedCert = prev.map((prevCert) => {
          if (prevCert._id === certificate._id) {
            return {
              ...prevCert,
              certificateName,
              certificateDetail,
              certificateOrganization,
              acquisitionDate,
            };
          }
          return prevCert;
        });
        return updatedCert;
      });
      setEditMode(false);
    } else if (reqIdentifier === "deleteData") {
      setCertificates((prev) => {
        const updatedCertificates = prev.filter(
          (certificates) => certificates._id !== extra
        );
        return updatedCertificates;
      });
    }
  }, [result, extra]);

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && loading && <LoadingLayer message="Loading....." />}
      {!editMode && !loading && (
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
                  onClickHandler={() => onClickDel(certificate._id)}
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
