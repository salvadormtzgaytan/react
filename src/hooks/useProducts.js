/**
 * @file useProducts.js
 *
 * ¿Por qué este archivo es .js y no .jsx?
 * ----------------------------------------
 * La extensión .jsx indica que el archivo contiene JSX (la sintaxis tipo HTML
 * que se escribe dentro de los componentes de React). Los hooks son funciones
 * de JavaScript puro que manejan lógica y estado, pero NO devuelven JSX —
 * devuelven datos y funciones. Por eso usan .js.
 *
 * Regla práctica:
 *   .jsx → el archivo devuelve elementos visuales (<div>, <button>, etc.)
 *   .js  → el archivo exporta lógica, utilidades o datos (sin JSX)
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductsByCategory,
} from "../services/productsService";

/**
 * Estado inicial del hook. Se define fuera del componente para dos razones:
 * 1. No se recrea en cada render (es una constante fija).
 * 2. Si en el futuro necesitas resetear el estado, puedes reusar este objeto.
 */
const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedCategory: "all",
};

/**
 * Custom hook que centraliza toda la lógica del CRUD de productos.
 *
 * ¿Qué es un custom hook?
 * Un custom hook es una función de JavaScript que empieza con "use" y puede
 * llamar a otros hooks de React (useState, useEffect, etc.). No devuelve JSX,
 * devuelve datos y funciones que los componentes pueden usar.
 *
 * Es la forma de extraer lógica reutilizable fuera de los componentes.
 * Sin este hook, toda esta lógica viviría en ProductsPage y ese componente
 * sería enorme y difícil de testear.
 *
 * En jQuery, el equivalente sería un módulo o plugin que encapsula
 * el estado y las llamadas AJAX, pero sin reactividad automática.
 *
 * @returns {Object} El estado actual y las funciones para modificarlo:
 * @returns {Array}    .products          - Lista de productos actual.
 * @returns {Array}    .categories        - Categorías disponibles.
 * @returns {boolean}  .loading           - true mientras hay una operación en curso.
 * @returns {string|null} .error          - Mensaje de error, o null si todo va bien.
 * @returns {string}   .selectedCategory  - Categoría activa ("all" o nombre de categoría).
 * @returns {function} .addProduct        - Crea un producto nuevo en la API.
 * @returns {function} .editProduct       - Edita un producto existente.
 * @returns {function} .removeProduct     - Elimina un producto.
 * @returns {function} .filterByCategory  - Filtra la lista por categoría.
 * @returns {function} .refetch           - Vuelve a cargar con la categoría actual.
 */
export function useProducts() {
  /**
   * Un solo objeto de estado para todo el hook.
   * Alternativa válida: un useState por campo (products, loading, etc.).
   * La ventaja de un objeto es que todas las actualizaciones relacionadas
   * quedan juntas y son fáciles de razonar.
   */
  const [state, setState] = useState(initialState);

  /**
   * useRef: una "caja" que guarda un valor entre renders sin provocar re-renders.
   *
   * Si guardáramos selectedCategory solo en el estado y lo leyéramos dentro
   * del useEffect, tendríamos que añadirlo al array de dependencias — lo que
   * haría que el efecto se re-ejecute cada vez que cambia y podría producir
   * fetches duplicados o loops.
   *
   * Con useRef guardamos el valor "por fuera" del sistema reactivo de React:
   * persiste entre renders, pero cambiar .current no dispara un nuevo render.
   */
  const categoryRef = useRef("all");

  // ── Carga inicial ──────────────────────────────────────────────────────

  /**
   * useEffect con array vacío []: el código dentro corre una sola vez,
   * justo después de que el componente aparece en pantalla.
   *
   * Equivale al clásico $(document).ready() de jQuery, o a componentDidMount
   * en los componentes de clase de React.
   *
   * ¿Por qué la función async está DENTRO del efecto y no es el efecto mismo?
   * useEffect no puede recibir una función async directamente porque retornaría
   * una Promise, y React espera que retorne una función de cleanup o nada.
   * La solución es definir la función async adentro y llamarla inmediatamente.
   */
  useEffect(() => {
    /**
     * `cancelled` es una bandera local para evitar un bug clásico:
     * si el componente se desmonta antes de que el fetch termine
     * (por ejemplo, el usuario navega a otra página), el setState
     * intentaría actualizar un componente que ya no existe.
     * Con esta bandera lo evitamos.
     */
    let cancelled = false;

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const category = categoryRef.current;

        /**
         * Promise.all lanza las dos peticiones al mismo tiempo y espera
         * a que ambas terminen. Es más rápido que hacerlas una tras otra
         * con dos await seguidos.
         */
        const [products, categories] = await Promise.all([
          category === "all"
            ? getAllProducts()
            : getProductsByCategory(category),
          getCategories(),
        ]);

        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            products,
            categories,
            loading: false,
            selectedCategory: category,
          }));
        }
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err.message || "Error al cargar productos",
          }));
        }
      }
    }

    load();

    /**
     * Función de cleanup: React la ejecuta cuando el componente se desmonta.
     * Aquí marcamos cancelled=true para que el setState del fetch no se ejecute
     * si la respuesta llega después de que el componente desapareció.
     */
    return () => {
      cancelled = true;
    };
  }, []); // [] = solo al montar, nunca más

  // ── Filtrado por categoría ─────────────────────────────────────────────

  /**
   * useCallback memoriza la función para que no se recree en cada render.
   *
   * Sin useCallback, cada vez que el componente se re-renderiza se crearía
   * una nueva función filterByCategory. Si esa función se pasa como prop
   * a un componente hijo, el hijo también se re-renderizaría innecesariamente.
   *
   * El array vacío [] significa que esta función se crea una sola vez
   * y nunca se recrea. Puede hacerse así porque no lee el estado directamente
   * — usa setState(prev => ...) para siempre tener el valor más reciente.
   */
  const filterByCategory = useCallback(async (category) => {
    categoryRef.current = category;
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      selectedCategory: category,
    }));

    try {
      const products = await (category === "all"
        ? getAllProducts()
        : getProductsByCategory(category));
      setState((prev) => ({ ...prev, products, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
    }
  }, []);

  // ── Operaciones CRUD ───────────────────────────────────────────────────

  /**
   * ¿Por qué todas usan setState(prev => ...) en lugar de setState({ ...state })?
   *
   * Las funciones creadas con useCallback([]) capturan el estado en el momento
   * en que se crean. Si leyéramos `state.products` directamente dentro de
   * addProduct, estaríamos usando el estado de cuando se montó el componente,
   * no el estado actual — lo que causaría que la lista se "olvide" de los
   * productos que se agregaron después.
   *
   * Con setState(prev => ...) React nos pasa el valor más reciente del estado
   * justo en el momento de la actualización, sin importar cuándo se creó
   * la función.
   */

  /**
   * Crea un nuevo producto en la API y lo agrega al inicio de la lista local.
   *
   * Nota sobre "optimistic update": no esperamos a que la API confirme el id
   * para mostrar el producto. Lo agregamos de inmediato con el id que devuelve
   * la respuesta. Esto hace la UI sentirse más rápida.
   *
   * @param {Object} productData - Datos del producto a crear.
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  const addProduct = useCallback(async (productData) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const newProduct = await createProduct(productData);
      setState((prev) => ({
        ...prev,
        // El nuevo producto va al inicio del arreglo para que sea visible de inmediato
        products: [{ ...productData, id: newProduct.id }, ...prev.products],
        loading: false,
      }));
      return { success: true, data: newProduct };
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Actualiza un producto en la API y refleja el cambio en la lista local.
   *
   * Usa .map() para reemplazar solo el producto que cambió, dejando el
   * resto intacto. Es el equivalente a buscar un elemento por id y
   * actualizarlo, pero de forma inmutable (sin mutar el arreglo original).
   *
   * @param {number} id - Id del producto a editar.
   * @param {Object} productData - Nuevos datos del producto.
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  const editProduct = useCallback(async (id, productData) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const updated = await updateProduct(id, productData);
      setState((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          // Si el producto es el que editamos, lo reemplazamos; si no, lo dejamos igual
          p.id === id ? { ...p, ...productData } : p,
        ),
        loading: false,
      }));
      return { success: true, data: updated };
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Elimina un producto de la API y lo quita de la lista local.
   *
   * Usa .filter() para devolver un nuevo arreglo sin el producto eliminado,
   * sin mutar el arreglo original.
   *
   * @param {number} id - Id del producto a eliminar.
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const removeProduct = useCallback(async (id) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await deleteProduct(id);
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err.message }));
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Exponemos el estado y las funciones que los componentes pueden necesitar.
   *
   * `...state` expande el objeto: products, categories, loading, error y
   * selectedCategory quedan disponibles como props individuales en quien
   * use este hook.
   *
   * `refetch` es un atajo para recargar con la categoría actual, útil si
   * quisieras agregar un botón de "actualizar".
   */
  return {
    ...state,
    addProduct,
    editProduct,
    removeProduct,
    filterByCategory,
    refetch: () => filterByCategory(categoryRef.current),
  };
}
