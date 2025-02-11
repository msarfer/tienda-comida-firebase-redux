import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { MenuItem, Order } from "../entities/entitites";
import { refreshMenu } from "../features/menu/menuSlice";
import { togglePages } from "../features/pages/pagesSlice";
import { addOrder, lessItems } from "../services/firebase";
import { AppDispatch } from "../store/store";

interface FoodOrderProps {
  food: MenuItem;
}

function FoodOrder({ food }: FoodOrderProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  
  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = useMemo(() => quantity * food.price, [quantity]);

  const handleOrdered = async () => {
    if (!name || !phone || !quantity) return
    const order: Order = {
      name,
      phone,
      article: food.name,
      quantity,
      price: totalPrice,
    };
    if (food.quantity - quantity < 0) alert('No hay existencias del producto')
    else {
      setIsSending(true);
      addOrder(order)
        .then(() => {
          setIsSending(false);
        })
        .then(() => {
          const id = food.id;
          const newQuantity = food.quantity - quantity;
          lessItems(id, newQuantity);
          setIsSend(true);
        })
        .then(() => {
          setName("");
          setPhone("");
          setQuantity(1);
          dispatch(refreshMenu())
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  return (
    <article>
      <header>
        <h2>
          {food.name} - {food.desc}
        </h2>
        <h4>{totalPrice}</h4>
        <label htmlFor="quantity"> Cantidad</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(evt) => setQuantity(Number(evt.target.value))}
        />
      </header>
      <input
        type="text"
        value={name}
        placeholder="Tu nombre"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={phone}
        placeholder="Tu número de teléfono"
        onChange={(e) => setPhone(e.target.value)}
      />
      <section role="group">
        <button onClick={handleOrdered}>Enviar producto</button>
        <button onClick={() => dispatch(togglePages())}>
          Volver al menú
        </button>
      </section>
      {isSend && (
        <span style={{ color: "green" }}>
          Pedido enviado. Recibirá un SMS una vez esté listo para recoger
        </span>
      )}
      {isSending && <span style={{ color: "green" }}>Procesando pedido.</span>}
    </article>
  );
}

export default FoodOrder;
