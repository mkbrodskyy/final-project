import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weatherType: "",
  });

  function resetForm() {
    setValues({
      name: "",
      imageUrl: "",
      weatherType: "",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit(
      {
        name: values.name,
        imageUrl: values.imageUrl,
        weatherType: values.weatherType,
      },
      resetForm
    );
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input modal__input-text"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
          name="name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input modal__input-text"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
          name="imageUrl"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-group">
          <input
            name="weatherType"
            value="hot"
            id="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
          </label>
        </div>
        <div className="modal__radio-group">
          <input
            name="weatherType"
            value="warm"
            id="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>
        <div className="modal__radio-group">
          <input
            name="weatherType"
            value="cold"
            id="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
