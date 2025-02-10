import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { MenuItem, Order } from "../../entities/entitites.ts";
import { off, onValue, ref } from "firebase/database";
import { addOrder, db, formatMenuItems, lessItems } from "../../services/firebase.ts";

interface MenuState {
  items: MenuItem[];
  error: SerializedError,
  loading: boolean
}

const initialState: MenuState = {
  items: [],
  error: null,
  loading: false
};

export const fetchItems = createAsyncThunk("menu/fetchItems", async (_, { rejectWithValue }) => {
  return new Promise<MenuItem[]>((resolve, reject) => {
    const itemsRef = ref(db, "menu");

    onValue(
      itemsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = formatMenuItems(data);
          resolve(formattedData);
        } else {
          reject(new Error("No hay datos disponibles"));
        }

        off(itemsRef);
      },
      (error) => {
        console.error("Error en Firebase:", error);
        rejectWithValue(error);
      }
    );
  }).catch((error) => rejectWithValue(error));
});

export const refreshMenu = createAsyncThunk("menu/refreshMenu", async (_, { rejectWithValue }) => {
  return new Promise<MenuItem[]>((resolve, reject) => {
    const itemsRef = ref(db, "menu");

    onValue(
      itemsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = formatMenuItems(data);
          resolve(formattedData);
        } else {
          reject(new Error("No hay datos disponibles"));
        }

        off(itemsRef);
      },
      (error) => {
        console.error("Error en Firebase:", error);
        rejectWithValue(error);
      }
    );
  }).catch((error) => rejectWithValue(error));
});

export const addAsyncOrder = createAsyncThunk(
  "menu/addOrder",
  async ({id, order}: {id: string, order: Order}) => {
  return new Promise<void>((resolve, reject) => {
    try {
      addOrder(order)
        .then(() => lessItems(id, order.quantity))
      resolve()
    } catch (error) {
      console.error(error.message)
      reject()
    }
  })
})

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action: PayloadAction<SerializedError>) => {
        state.loading = false
        state.error = action.payload;
      })
      .addCase(fetchItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(refreshMenu.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.items = action.payload
      })
  }
});

export default menuSlice.reducer;
