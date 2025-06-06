import React, { useState, useRef, useEffect } from 'react';
import './CrearNoticia.css';

const CrearNoticia = ({ onSubmissionSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    descripcion: '',
    imagenes: [], // Lista final de imágenes aceptadas
    enlace: '', // Add enlace field
  });

  const [stagedImages, setStagedImages] = useState([]); // Imágenes seleccionadas temporalmente para previsualización
  const [selectedFileNames, setSelectedFileNames] = useState([]); // Nombres de archivo para el custom input
  const fileInputRef = useRef(null);

  // Efecto para limpiar las URLs de objetos al desmontar y al cambiar las imágenes
  useEffect(() => {
    // Cleanup function
    return () => {
      // Limpiar URLs de formData.imagenes y stagedImages
      formData.imagenes.forEach(img => URL.revokeObjectURL(img.previewUrl));
      stagedImages.forEach(img => URL.revokeObjectURL(img.previewUrl));
    };
  }, [formData.imagenes, stagedImages]); // Depende de ambos arrays

  const handleChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'imagenes' && files) {
      const currentImagesCount = formData.imagenes.length + stagedImages.length;
      const filesToProcess = Array.from(files).slice(0, 4 - currentImagesCount); // Limitar a 4 en total

      const newStagedImages = filesToProcess.map(file => ({
        file: file,
        previewUrl: URL.createObjectURL(file),
      }));

      // Agregar a las imágenes temporales
      setStagedImages(prevStaged => [...prevStaged, ...newStagedImages]);

      // Actualizar la lista de nombres de archivo seleccionados para el display (esto podría no ser necesario ahora)
      // setSelectedFileNames(prevNames => [
      //   ...prevNames,
      //   ...filesToProcess.map(file => file.name)
      // ]);

    } else {
      // Manejar otros campos si es necesario
       const { value } = e.target;
       setFormData(prevState => ({
         ...prevState,
         [name]: value
       }));
    }

    // Limpiar el valor del input file nativo después de la selección
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAcceptStagedImages = () => {
    setFormData(prevState => ({
      ...prevState,
      imagenes: [...prevState.imagenes, ...stagedImages]
    }));
    setStagedImages([]); // Limpiar imágenes temporales
    // No limpiar previewUrls aquí, se hará en el useEffect cleanup si es necesario
    // setSelectedFileNames(formData.imagenes.map(img => img.file.name)); // Actualizar nombres mostrados
  };

  const handleCancelStagedImages = () => {
    // Liberar URLs de objetos temporales
    stagedImages.forEach(img => URL.revokeObjectURL(img.previewUrl));
    setStagedImages([]); // Limpiar imágenes temporales
    // setSelectedFileNames(formData.imagenes.map(img => img.file.name)); // Asegurarse que muestra nombres de aceptadas
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prevState => {
      const imageToRemove = prevState.imagenes[indexToRemove];
      // Liberar la URL del objeto
      URL.revokeObjectURL(imageToRemove.previewUrl);

      const newImages = prevState.imagenes.filter((_, index) => index !== indexToRemove);
      
      // No necesitamos selectedFileNames con este enfoque de múltiples vistas previas
      // setSelectedFileNames(newImages.map(img => img.file.name));

      return {
        ...prevState,
        imagenes: newImages
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure staged images are handled before sending
    if(stagedImages.length > 0) {
        alert("Por favor, acepta o cancela las imágenes en vista previa primero.");
        console.log("Por favor, acepta o cancela las imágenes en vista previa primero.");
        return; // Detener el envío hasta que se acepten/cancelen
    }
    
    // Ensure there's at least one image if images are mandatory
    // Assuming images are mandatory based on asterisk, adjust if needed
    if(formData.imagenes.length === 0) {
        alert("Por favor, carga al menos una imagen.");
        console.log("No hay imágenes cargadas.");
        return; // Stop submission if no images are uploaded
    }

    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('fecha', formData.fecha);
    formDataToSend.append('descripcion', formData.descripcion);
    
    // Add enlace to FormData if it exists
    if (formData.enlace) {
        formDataToSend.append('enlace', formData.enlace);
    }
    
    // Adjuntar cada File object de la lista FINAL al FormData
    formData.imagenes.forEach((img, index) => {
      formDataToSend.append(`imagen_${index}`, img.file); // Usar el File object
    });

    console.log('Datos de la noticia a crear:', formData);
    
    try {
      // Replace simulation with actual API call
      const response = await fetch('http://localhost:5000/api/noticias', { // Use your backend URL and endpoint
        method: 'POST',
        body: formDataToSend,
        // Note: fetch with FormData usually does NOT need Content-Type header
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Noticia creada exitosamente:', result);
      alert('Noticia creada exitosamente: ' + formData.titulo);
      
      // Call the success handler passed from the parent
      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }

      // Limpiar el formulario y las vistas previas después de un envío simulado exitoso
      console.log('Clearing form');
      // Clean up URLs for accepted images
      formData.imagenes.forEach(img => URL.revokeObjectURL(img.previewUrl));
      
      setFormData({
        titulo: '',
        fecha: '',
        descripcion: '',
        imagenes: [], // Clear the accepted images list
        enlace: '',
      });
      setSelectedFileNames([]); // Clear if still relevant for display
      setStagedImages([]); // Ensure no temporary images remain
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error al crear noticia:', error);
      alert('Error al crear noticia: ' + error.message);
    }
  };

  return (
    <div className="crear-noticia-container">
      <h2>Crear Nueva Noticia</h2>
      <form onSubmit={handleSubmit} className="crear-noticia-form">
        <div className="form-group">
          <label htmlFor="titulo">Título:*</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            value={formData.titulo} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha de la noticia:*</label>
          <input 
            type="date" 
            id="fecha" 
            name="fecha" 
            value={formData.fecha} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción (Opcional):</label>
          <textarea 
            id="descripcion" 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange} 
          />
        </div>
        
        {/* Add Link field */}
        <div className="form-group">
          <label htmlFor="enlace">Enlace (opcional):</label>
          <input 
            type="url" 
            id="enlace" 
            name="enlace" 
            value={formData.enlace} 
            onChange={handleChange} 
          />
        </div>

        {/* Custom File Input for Images */}
        <div className="form-group">
          <label htmlFor="imagenes">Imágenes (hasta 4):*</label>
          {/* Hidden native input */}
          <input 
            ref={fileInputRef}
            type="file" 
            id="imagenes" 
            name="imagenes" 
            onChange={handleChange} 
            accept="image/*"
            multiple 
            disabled={formData.imagenes.length + stagedImages.length >= 4} // Deshabilitar si ya hay 4 en total
          />
          
          {/* Custom styled input area - Visible only if no staged images */}
          {stagedImages.length === 0 && ( // Mostrar solo si no hay imágenes temporales
            <div 
              className={`custom-file-input ${formData.imagenes.length + stagedImages.length >= 4 ? 'disabled' : ''}`}
              onClick={() => formData.imagenes.length + stagedImages.length < 4 && fileInputRef.current.click()}
            >
              <span className="file-button-text">
                {formData.imagenes.length > 0 ? `Archivo(s) Seleccionado(s) (${formData.imagenes.length})` : "Seleccionar archivo(s)"}
              </span>
               {/* Removed file name display here, will display previews below */}
            </div>
          )}

          {/* Staged Image Previews with Accept/Cancel */}
          {stagedImages.length > 0 && ( // Mostrar si hay imágenes temporales
            <div className="staged-preview-section">
               <h4>Imágenes para agregar:</h4>
               {/* Container for previews */}
              <div className="imagenes-preview-container staged-preview-container">
                {stagedImages.map((image, index) => (
                  <div key={index} className="imagen-preview-item">
                    <img src={image.previewUrl} alt={`Vista previa ${index + 1}`} />
                  </div>
                ))}
              </div>
               {/* Container for buttons - positioned next to preview container */}
              <div className="preview-buttons staged-buttons">
                <button type="button" onClick={handleAcceptStagedImages} className="accept-button">
                  Aceptar Selección
                </button>
                <button type="button" onClick={handleCancelStagedImages} className="cancel-button">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Accepted Image Previews with Remove Button */}
          {formData.imagenes.length > 0 && ( // Mostrar si hay imágenes aceptadas
             <> {/* Fragmento para agrupar sin añadir un div extra */}
             {stagedImages.length === 0 && <h4>Imágenes cargadas:</h4>} {/* Mostrar título si no hay temporales */} 
              <div className="imagenes-preview-container accepted-preview-container">
                {formData.imagenes.map((image, index) => (
                  <div key={index} className="imagen-preview-item">
                    <img src={image.previewUrl} alt={`Imagen cargada ${index + 1}`} />
                    <button 
                      type="button" 
                      className="remove-image-button" 
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
             </>
          )}
        </div>

        <button type="submit" className="submit-button">Crear Noticia</button>
      </form>
    </div>
  );
};

export default CrearNoticia;
