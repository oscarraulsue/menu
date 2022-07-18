import type { NextPage } from "next";
import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from "@firebase/firestore";
import { Button, Card, Checkbox, Grid, Input, Modal, Row,Text } from "@nextui-org/react";
import React, { useState } from "react";
import { fileUpload } from "../src/helpers/FileUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useForm } from "react-hook-form";
import ImageCarga from "../src/components/ImageCarga";
const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const name = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  name();
  const [cont, setCont] = React.useState<any>([1]);
  const [contOptions, setContOptions] = React.useState<any>([1]);

  const [imagen, setImagen] = React.useState<any>([]);
  const [imagenOptions, setImagenOptions] = React.useState<any>([]);
  const [imagenIngredients, setImagenIngredients] = React.useState<any>([]);
  const [visible, setVisible] = React.useState(false);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const onSubmit = (data: any) => {
    console.log(data);
    let ingredientes: any[] = [];
    let options: any[] = [];

    cont.map((i: number) => {
      ingredientes.push({name: getValues(`ingredient${i}`), img:imagenIngredients.find((item:any) => item.itemKey === `ingredient${i}`)});
    });
    contOptions.map((i: number) => {
      options.push({name: getValues(`options${i}`) , img:imagenOptions.find((item:any) => item.itemKey === `options${i}`)});
    });
    console.log(ingredientes,options,imagen,imagenOptions,imagenIngredients);

    const newProducto = {
      Nombre:data.Nombre,
      Descripcion:data.Descripcion,
      Precio: data.Precio,
      DescuentoMax: data.descuentoMax,
      Ingredientes: ingredientes,
      Opciones: options
    }
    addDoc(collection(db,"productos"),newProducto)
    .then(resp => {
      resetAll()
      setVisible(true)
    })
    .catch(error => {
        console.log(error);
    })

  };

  const resetAll = () => {
    reset()
    setImagenIngredients('')
    setImagenOptions('')
    setImagen('')
    setContOptions([1])
    setCont([1])

  }
  return (
    <div style={{ textAlignLast: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid.Container sm={12}>
          <Grid style={{ marginTop: "30px" }}>
            <Input
              width="300px"
              shadow={false}
              labelPlaceholder="Nombre"
              status="primary"
              {...register("Nombre")}
            />
          </Grid>
          <Grid style={{ marginTop: "30px" }}>
            <Input
              width="300px"
              shadow={false}
              labelPlaceholder="Descripcion"
              status="primary"
              {...register("Descripcion")}
            />
          </Grid>
          <Grid style={{ marginTop: "30px" }}>
            <Input
              width="300px"
              shadow={false}
              labelPlaceholder="Precio"
              status="primary"
              {...register("Precio")}
            />
          </Grid>
          <Grid style={{ marginTop: "30px" }}>
            <Input
              width="300px"
              shadow={false}
              labelPlaceholder="descuentoMax"
              status="primary"
              {...register("descuentoMax")}
            />
          </Grid>
          {contOptions.map((i: any) => (
            <Card  key={i} css={{ mw: "500px", margin: "30px auto" }}>
              <Grid
                style={{
                  margin: "30px 0",
                  display: "flex",
                  textAlignLast: "center",
                  justifyContent: "center",
                }}
              >
                <Input
                  width="300px"
                  shadow={false}
                  labelPlaceholder={`options${i}`}
                  status="primary"
                  {...register(`options${i}`)}
                />
                <Button
                  style={{ all: "unset", cursor: "pointer" }}
                  onClick={() => {
                    setContOptions((state: any) =>
                      state.filter((item: any) => item !== i)
                    );
                    setValue(`options${i}`, "");
                  }}
                  auto
                  color="error"
                  icon={<HighlightOffIcon color="error" />}
                />
              </Grid>
              <Grid
                style={{
                  margin: "30px 0",
                  display: "flex",
                  textAlignLast: "center",
                  justifyContent: "center",
                }}
              >
                <ImageCarga
                 itemKey={`options${i}`}
                  imagen={imagenOptions}
                  setImagen={setImagenOptions}
                />
              </Grid>
            </Card>
          ))}
          <Button
            style={{ margin: "20px auto" }}
            onClick={() =>
              setContOptions((state: any) => [
                ...state,
                state[state.length - 1] ? state[state.length - 1] + 1 : 1,
              ])
            }
          >
            add
          </Button>
          {cont.map((i: any) => (
            <Card  key={i} css={{ mw: "500px", margin: "30px auto" }}>
              <Grid
                style={{
                  margin: "30px 0",
                  display: "flex",
                  textAlignLast: "center",
                  justifyContent: "center",
                }}
              >
                <Input
                  width="300px"
                  shadow={false}
                  labelPlaceholder={`ingredient${i}`}
                  status="primary"
                  {...register(`ingredient${i}`)}
                />
                <Button
                  style={{ all: "unset", cursor: "pointer" }}
                  onClick={() => {
                    setCont((state: any) =>
                      state.filter((item: any) => item !== i)
                    );
                    setValue(`ingredient${i}`, "");
                  }}
                  auto
                  color="error"
                  icon={<HighlightOffIcon color="error" />}
                />
              </Grid>
              <Grid
                style={{
                  margin: "30px 0",
                  display: "flex",
                  textAlignLast: "center",
                  justifyContent: "center",
                }}
              >
                <ImageCarga
                  itemKey={`ingredient${i}`}
                  imagen={imagenIngredients}
                  setImagen={setImagenIngredients}
                />
              </Grid>
            </Card>
          ))}
          <Button
            style={{ margin: "20px auto" }}
            onClick={() =>
              setCont((state: any) => [
                ...state,
                state[state.length - 1] ? state[state.length - 1] + 1 : 1,
              ])
            }
          >
            add
          </Button>
          <ImageCarga
             itemKey={`fotos`}
            imagen={imagen}
            setImagen={setImagen}
          />
        </Grid.Container>
        <Button type="submit" color="success" style={{ margin: "30px auto" }}>
          Enviar
        </Button>
      </form>
      <Modal
        closeButton
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
         <Modal.Body>
   
  

              <Text size={14}>Se guardo con exito</Text>

        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
