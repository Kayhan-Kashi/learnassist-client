import React, { useState, useEffect } from "react";
import {
  GetGeneralPromptEngineering,
  createPromptEngineering,
  updatePromptEngineering,
  deletePromptEngineering,
} from "../../../../services/promptEngineeringService.js"; // Adjust the path if needed

// Modal Component
const Modal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-4 rounded shadow-lg">
      <p>{message}</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          بله
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          خیر
        </button>
      </div>
    </div>
  </div>
);

// Main Component
const PromptEngineeringGeneral = () => {
  const [textList, setTextList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetGeneralPromptEngineering();
        if (response?.data) {
          setTextList(
            response.data.map((item, index) => ({
              Id: item.promptEngineeringId,
              Prompt: item.prompt,
              OrderNo: item.orderNo + 1,
              editText: item.prompt,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Add new prompt
  const handleAddText = () => {
    const newOrderNo = textList.length + 1;
    setTextList([
      ...textList,
      { Id: null, Prompt: "", OrderNo: newOrderNo, editText: "" },
    ]);
  };

  // Edit prompt text
  const handleEditChange = (index, value) => {
    const updatedList = textList.map((item, i) =>
      i === index ? { ...item, editText: value } : item
    );
    setTextList(updatedList);
  };

  // Update or delete prompt confirmation
  const handleUpdateText = (index) => {
    setModalAction("update");
    setModalIndex(index);
    setShowModal(true);
  };

  const handleDeleteText = (index) => {
    setModalAction("delete");
    setModalIndex(index);
    setShowModal(true);
  };

  const confirmAction = async () => {
    const currentItem = textList[modalIndex];
    try {
      if (modalAction === "update") {
        await updatePromptEngineering({
          id: currentItem.Id,
          prompt: currentItem.editText,
          orderNo: currentItem.OrderNo,
        });
        const updatedList = textList.map((item, i) =>
          i === modalIndex ? { ...item, Prompt: item.editText } : item
        );
        setTextList(updatedList);
      } else if (modalAction === "delete") {
        alert(currentItem.Id);
        await deletePromptEngineering({
          id: currentItem.Id,
          prompt: "",
          orderNo: 0,
        });
        const updatedList = textList.filter((_, i) => i !== modalIndex);
        setTextList(updatedList);
      }
    } catch (error) {
      console.error(`Error during ${modalAction}:`, error);
    }
    setShowModal(false);
  };

  const cancelAction = () => {
    setShowModal(false);
  };

  const handleSendEntity = async (index) => {
    const currentItem = textList[index];
    try {
      const response = await createPromptEngineering({
        prompt: currentItem.editText,
        orderNo: currentItem.OrderNo,
      });
      if (response?.data) {
        const updatedList = textList.map((item, i) =>
          i === index
            ? {
                ...item,
                Id: response.data.PromptEngineeringId,
                Prompt: response.data.Prompt,
              }
            : item
        );
        setTextList(updatedList);
      }
    } catch (error) {
      console.error("Error creating entity:", error);
    }
  };

  return (
    <div dir="rtl" className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">مهندسی پرسش</h1>

      {textList.map((item, index) => (
        <div key={item.Id || index} className="space-y-2">
          <div className="border p-2 rounded bg-gray-100 text-right w-36">
            {"متن شماره  " + item.OrderNo}
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <textarea
              value={item.editText}
              onChange={(e) => handleEditChange(index, e.target.value)}
              className="w-full p-2 border rounded text-right"
              rows="3"
              placeholder={`ویرایش متن ${item.OrderNo}`}
            />
            {item.Id ? (
              <>
                <button
                  onClick={() => handleUpdateText(index)}
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  به‌روزرسانی
                </button>
                <button
                  onClick={() => handleDeleteText(index)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  حذف
                </button>
              </>
            ) : (
              <button
                onClick={() => handleSendEntity(index)}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                ارسال
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={handleAddText}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        اضافه کردن متن جدید
      </button>

      {showModal && (
        <Modal
          message={
            modalAction === "update"
              ? "آیا از به‌روزرسانی این متن مطمئن هستید؟"
              : "آیا از حذف این متن مطمئن هستید؟"
          }
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />
      )}
    </div>
  );
};

export default PromptEngineeringGeneral;
