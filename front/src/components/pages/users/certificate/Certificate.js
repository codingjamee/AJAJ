import { useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { certificatesCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";

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

    //post 서버와 통신
    try {
      const res = await api.put(
        `user/${userState.userInfo?.id}/certificate/${certificate.certificateId}`,
        {
          certificateName,
          certificateDetail,
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
      } else if (res.status !== 200) {
        // throw new Error("POST 요청을 실패하였습니다.");
      }
    } catch (err) {
      // throw new Error("서버와 통신이 실패하였습니다");
    }
  };

  //삭제함수
  const onClickDel = async (certificateId) => {
    try {
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
    } catch (err) {
      console.error(err);
      // throw new Error("서버와 통신에 실패하였습니다");
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
