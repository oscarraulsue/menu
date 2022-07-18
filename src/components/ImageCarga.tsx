import { Grid, Button } from "@nextui-org/react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { fileUpload } from "../helpers/FileUpload";

interface Props {
  imagen: any;
  setImagen: Dispatch<any>;
  itemKey: string;
}
const ImageCarga: FC<Props> = ({ imagen, itemKey, setImagen }) => {
  const [imagenText, setImagenText] = useState("Agregar Imagen");
  let imagen2 = "";

  const handlePictureClick = () => {
    document.querySelector<any>(`#fileSelector${itemKey}`)!.click();
  };

  const handleFileChanged = (e: any) => {
    const file = e.target.files[0];
    fileUpload(file)
      .then((response) => {
        if (!imagen) {
          setImagen({ response });
        }
        setImagen([...imagen, { itemKey, response }]);
        imagen2 = response;
        document.getElementById(`image${itemKey}`)!.innerHTML += ` 
<img src=${imagen2} alt="" width="130px" />
`;
        setImagenText("Agregar Otra Imagen");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleReset = () => {
    setImagen([]);
    document.getElementById(`image${itemKey}`)!.innerHTML = "";
  };
  return (
    <div>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div id={`image${itemKey}`}></div>

        <input
          width="300px"
          id={`fileSelector${itemKey}`}
          type="file"
          name={`file${itemKey}`}
          style={{ display: "none" }}
          onChange={handleFileChanged}
        />
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handlePictureClick}
          style={{ margin: "20px" }}
          type="button"
        >
          {imagenText}
        </Button>

        <Button onClick={handleReset} color="error" id="reset" type="reset">
          eliminar imagenes
        </Button>
      </Grid>
    </div>
  );
};

export default ImageCarga;
