import { useCallback, useState } from "react";

const useInput = (initialValue = null) => {
  const [data, setData] = useState(initialValue);

  const onChange = useCallback((e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log(value);
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onChangeSelect = useCallback((e) => {
    if (!e?.target?.id) return;
    console.log(e);
    const id = e.target?.id;
    const value = e.target?.value;
    setData((prev) => ({ ...prev, [id]: value }));
  }, []);

  // const onChangeFile = useCallback(
  //   (e) => {
  //     const { files, name } = e?.target;
  //     setData((prev)=>({ ...prev, [name]: files[0] }));
  //   },
  //   [data]
  // );

  const reset = useCallback(() => {
    setData(initialValue);
  }, [initialValue]);

  return [data, onChange, onChangeSelect, reset];
};

export default useInput;
