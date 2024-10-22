import React, { useEffect, useRef, useState } from "react";
import useColors from "../ui/Colors";
import CheckIcon from "../assets/svg/CheckIcon";

const form = {
  formId: "1",
  formKey: "add-user",
  formName: "Kullanıcı Ekle",
  inputs: [
    {
      name: "email",
      label: "E-Posta Adresi",
      required: true,
      input: { type: "text" },
    },
    {
      name: "username",
      label: "Kullanıcı Adı",
      required: true,
      input: { type: "text" },
    },
    {
      name: "authorization",
      label: "Yetki",
      required: true,
      select: {
        options: [
          { value: "admin", label: "Yönetici", disabled: false },
          { value: "user", label: "Kullanıcı", disabled: true },
          { value: "member", label: "Üye", disabled: false },
          { value: "customer", label: "Müşteri", disabled: false },
        ],
      },
    },
    {
      name: "branch",
      label: "Şube",
      required: true,
      select: {
        checkbox: [
          {
            value: "test",
            label: "Test",
          },
          {
            value: "test-1",
            label: "Test 1",
          },
          {
            value: "kayseri-depo",
            label: "Kayseri Depo",
            items: [
              { value: "branch-1", label: "Şube 1" },
              { value: "branch-2", label: "Şube 2" },
            ],
          },
          {
            value: "malatya-uzak-depo",
            label: "Malatya Depo",
            items: [
              { value: "branch-test", label: "Deneme Şube" },
              { value: "branch-test-1", label: "Deneme Şube 1" },
            ],
          },
        ],
      },
    },
  ],
};

function Form() {
  const modalRef = useRef(null);
  const { PRIMARY } = useColors();
  const [inputs, setInputs] = useState({});
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        event?.target &&
        !modalRef.current.contains(event.target)
      ) {
        setShowCheckboxes(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleClickOutside = (event) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target)) {
  //     setShowCheckboxes(null);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  const renderCheckbox = (checkbox) => {
    return (
      <div className="click-checkbox flex absolute w-full h-full items-center justify-center bg-gray-300/15">
        <div
          ref={modalRef}
          className="overflow-y-auto bg-white rounded-md max-w-2/4 min-w-2/4 max-h-3/4"
        >
          <label className="flex w-full gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              value={"test"}
              // checked={selectedOptions.includes(option?.value)}
              onChange={() => {}}
              className="form-checkbox hidden peer relative justify-center items-center"
            />
            <div
              className={`w-6 h-6 peer-checked:hidden bg-gray-300 rounded-md flex items-center justify-center`}
            />
            <CheckIcon
              className={`rounded-md peer-checked:block hidden peer-checked:bg-${PRIMARY}-500`}
            />

            <span className="select-none flex-1 truncate whitespace-normal break-words">
              {"deneme"}
              {/* {
                "deneme deneme deneme denemedenemedenemedenemedenemedenemedenemedeneme"
              } */}
            </span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative border-l shadow-xl rounded-2xl overflow-hidden border-gray-900/10 pb-2 bg-${PRIMARY}-100`}
    >
      {showCheckboxes && renderCheckbox()}

      <div className="p-4 border-b border-gray-300">{form.formName}</div>
      {/* Map İşlemleri */}
      <div className="p-4">
        {form?.inputs?.map((item, index) => {
          const renderInput = () => {
            return (
              (item?.select?.options && (
                <div className="mt-2">
                  <select
                    id={item?.value}
                    name={item?.value}
                    required={item?.required}
                    defaultValue=""
                    onChange={handleChange}
                    className={`block cursor-pointer w-full h-12 rounded-[4px] px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-${PRIMARY}-700 outline-none`}
                  >
                    <option value="" disabled>
                      Seçiniz
                    </option>

                    {item?.select?.options?.map((option, index) => {
                      return (
                        <option
                          key={`option-${option?.label}-${index}`}
                          value={option?.value}
                          disabled={option?.disabled}
                        >
                          {option?.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )) ||
              (item?.select?.checkbox && (
                <div className="mt-2">
                  <input
                    id={item?.name}
                    name={item?.name}
                    required={item?.required}
                    defaultValue=""
                    type="text" // Tipi text olarak değiştirin
                    readOnly
                    placeholder="Seçiniz"
                    onClick={() => setShowCheckboxes(item.select.checkbox)}
                    className={`block cursor-pointer w-full h-12 bg-white rounded-[4px] px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-${PRIMARY}-700 outline-none`}
                  ></input>
                </div>
              )) ||
              (item?.input && (
                <div className="mt-2">
                  <input
                    id={item?.name}
                    name={item?.name}
                    type="text"
                    required={item?.required}
                    value={inputs[item?.name] || ""}
                    onChange={handleChange}
                    className={`block w-full h-12 rounded-[4px] border-0 px-3 text-black-700 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-${PRIMARY}-700 outline-none`}
                  />
                </div>
              ))
            );
          };

          return (
            <div key={`input-${item.name}-${index}`} className="mb-2">
              <label
                htmlFor={item?.name}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {item?.label}
              </label>
              {renderInput()}
            </div>
          );
        })}
      </div>

      <div className="px-4 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm leading-6 text-gray-900">
          İptal
        </button>
        <button
          type="submit"
          className={`rounded-md bg-${PRIMARY}-700 px-3 py-2 text-sm text-white shadow-sm hover:bg-${PRIMARY}-500`}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}

export default Form;
