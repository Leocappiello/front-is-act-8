import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticuloVentaContext } from "./ArticuloVentaContext";

const ArticuloVenta = ({title}) => {
  const {
    articulo,
    setArticulo,
    listaLineas,
    selectedLinea,
    setSelectedLinea,
    cargarModel,
    onInputChange,
    onSubmit
  } = useContext(ArticuloVentaContext);

  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    if (id) {
      cargarModel(id); // Load the article if we have an ID
    }
  }, [id, cargarModel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(articulo);
    if (success) {
      navegacion("/articuloList");
    }
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de articulo / {title} </h1>
        <hr />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="denominacion" className="form-label">
            Denominacion
          </label>
          <input
            type="text"
            className="form-control"
            id="denominacion"
            name="denominacion"
            required={true}
            value={articulo.denominacion}
            onChange={onInputChange}
          />

          <label htmlFor="listaLineas">Selecciona una linea:</label>
          <select
            id="listaLineas"
            value={selectedLinea}
            required={true}
            onChange={(e) => setSelectedLinea(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {listaLineas.map((linea) => (
              <option key={linea.id} value={linea.id}>
                {linea.denominacion}
              </option>
            ))}
          </select>
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/articuloList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ArticuloVenta;