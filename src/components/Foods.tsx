import { useState } from "react";
import { MenuItem } from "../entities/entitites";
import FoodOrder from "./FoodOrder";
import { useSelector } from "react-redux";
import { StoreState } from "../store/store";

function Foods() {
  const [selectedFood, setSelectedFood] = useState<MenuItem|null>()
  const {items: foodItems} = useSelector((state: StoreState) => state.menu);
  return (
    <>
      <h4 className="foodTitle">Choose from our Menu</h4>
      <ul className="ulFoods">
        {foodItems.map((item) => {
          return (
            <article key={item.id} className="liFoods" onClick={() => setSelectedFood(item)}>
              <header>
                <img
                  className="foodImg"
                  src={`/tienda-comida-firebase-redux/images/${item.image}`}
                  alt={item.name}
                  style={{height: '100px'}}
                />
              </header>
              <div className="foodItem">
                <p className="foodDesc">{item.desc}</p>
                <p className="foodPrice">{item.price}$</p>
              </div>
              <footer>
                {selectedFood?.id === item.id  && <FoodOrder food={selectedFood}/>}
              </footer>
            </article>
          );
        })}
      </ul>
    </>
  );
}
export default Foods;
