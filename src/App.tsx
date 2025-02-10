import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { fetchItems } from "./features/menu/menuSlice";
import { togglePages } from "./features/pages/pagesSlice";
import { AppDispatch, StoreState } from "./store/store";
import { MenuItem } from "./entities/entitites";


const Foods = React.lazy(() => import("./components/Foods"));

const Menu = ({items}: {items: MenuItem[]}) => {
  return <>
  <h4 className="subTitle">Menús</h4>
  <ul className="ulApp">
    {items.map((item) => {
      return (
        <article key={item.id} className="liApp">
          <p>{item.name}</p>
          <p>#{item.quantity}</p>
        </article>
      );
    })}
  </ul>
</>
}

function App() {
  const { isChooseFoodPage } = useSelector((state: StoreState) => state.pages);
  const { items, loading, error} = useSelector((state: StoreState) => state.menu);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  if (loading) return <h1>Cargando menú</h1>
  if (error) return <h1>No se ha podido cargar el menú</h1>
  return (
      <div className="App">
        <button
          className="toggleButton"
          onClick={() => dispatch(togglePages())}
        >
          {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
        </button>
        <h3 className="title">Comida Rápida Online</h3>
        {!isChooseFoodPage && <Menu items={items}/>}
        {isChooseFoodPage && (
          <Suspense fallback={<div>Cargando comida</div>}>
            <Foods />
          </Suspense>
        )}
      </div>
  );
}

export default App;
