/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import "./card.css";

const CardForm = () => {
  const [cards, setCards] = useState([]);

  const [card, setCard] = useState({
    cardNumber: "",
    expiryDate: "",
    holderName: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // // Obtener tarjetas de la API en el montaje del componente usando axios
    axios
      .get("http://localhost:3000/cards")
      .then((response) => setCards(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    switch (name) {
      case "cardNumber":
        error =
          value.length !== 16 || /\D/.test(value)
            ? "Número de tarjeta no válido"
            : "";
        break;
      case "expiryDate":
        error = !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
          ? "Fecha de vencimiento no válida"
          : "";
        break;
      case "holderName":
        error =
          !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(value) || value.length > 20
            ? "Nombre del titular no válido"
            : "";
        break;
      case "cvv":
        error =
          value.length !== 3 || !/^\d+$/.test(value)
            ? "CVV debe contener exactamente 3 dígitos."
            : "";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
    setCard({ ...card, [name]: value });
  };

  const handleAddCard = () => {
    if (
      Object.values(errors).some((error) => error) ||
      Object.values(card).some((value) => value === "")
    )
      return;

    const maskedCardNumber = card.cardNumber.replace(
      /^(\d{2})(\d{10})(\d{4})$/,
      (_, p1, p2, p3) => p1 + "*".repeat(10) + p3
    );

    const newCard = {
      ...card,
      cardNumber: maskedCardNumber,
      id: new Date().getTime(),
    };

    // Hacer POST para agregar la tarjeta usando axios
    axios
      .post("http://localhost:3000/cards", newCard)
      .then((response) => {
        setCards([...cards, response.data]);
        setCard({ cardNumber: "", expiryDate: "", holderName: "", cvv: "" });
        setErrors({});
      })
      .catch((error) => console.error(error));
  };

  const handleCancel = () => {
    setCard({ cardNumber: "", expiryDate: "", holderName: "", cvv: "" });
    setErrors({});
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleAddCard(); }} className="card-form">
        <div className="card-column">
          <div>
            <label>Número de tarjeta</label>
            <input
              type="text"
              name="cardNumber"
              value={card.cardNumber}
              onChange={handleInputChange}
              className="card-input"
              required
            />
            {errors.cardNumber && (
              <span style={{ color: "red" }}>{errors.cardNumber}</span>
            )}
          </div>
          <div>
            <label>Nombre titular</label>
            <input
              type="text"
              name="holderName"
              value={card.holderName}
              onChange={handleInputChange}
              className="card-input"
              required
            />
            {errors.holderName && (
              <span style={{ color: "red" }}>{errors.holderName}</span>
            )}
          </div>
        </div>
        <div className="card-column">
          <div>
            <label>Fecha de vencimiento</label>
            <input
              type="text"
              name="expiryDate"
              value={card.expiryDate}
              onChange={handleInputChange}
              className="card-input"
              required
            />
            {errors.expiryDate && (
              <span style={{ color: "red" }}>{errors.expiryDate}</span>
            )}
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={card.cvv}
              onChange={handleInputChange}
              className="card-input-cvv"
              required
              maxLength="3"
            />
            {errors.cvv && <span style={{ color: "red" }}>{errors.cvv}</span>}
          </div>
        </div>
        <div className="card-button-container">
          <button
            type="button"
            onClick={handleAddCard}
            className="card-button add"
          >
            Agregar Tarjeta
          </button>
          <button
            type="submit"
            className="card-button cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
      <div className="card-list">
        {cards.map((card, index) => (
          <div key={card.id} className="card-item">
            <p>Número de tarjeta: {card.cardNumber}</p>
            <p>Nombre titular: {card.holderName}</p>
            <p>Fecha de vencimiento: {card.expiryDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardForm;
