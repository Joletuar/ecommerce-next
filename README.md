# Teslo Shop - Frontend

## Descripción

Este proyecto tuvo como objetivo crear una página ecommerce de venta de prendas de vestir para hombre, mujeres y niños. El diseño se basó en la tienda virtual de Tesla Shop, donde se sacaron la mayoria de las funcionalidades. El proyecto fue realizado con un stack de tecnologías de Javascript usando como base de datos NOSQL MongoDB. Tambien se utilizaron servicios como Cloudinary para alojar archivos media. Para el diseño y maquetación se utilizó código CSS y el franmework de MUI para React. Tambien cuenta con un panel de mantenimiento de productos, usuarios y ordenes los cuales solo usuarios administradores pueden realizar.

## Tecnologías

#### Frontend

-   React Js
-   Next Js
-   Typescript
-   MUI

## Despliegue Local

### Configuración de variables de entorno

En primer lugar, renombra el archivo **.env.template** a **.env** y rellena las variables de entorno con los datos necesarios para el funcionamiento de Next Auth y Paypal. Posterior a eso, visita el repositorio y realiza los pasos para realizar el despliegue del Backend y la base de datos.

**Repositorio:** [backend-ecommerce](https://github.com/Joletuar/teslo-shop-backend)

### Instalación de dependencias

En segundo lugar, luego de haber desplegado el backend realizar la instalación de todos los paquetes y dependencias del proyecto usando:

```
yarn
```

or

```
npm install
```

or

```
pnpm install
```

### Lanzar el servidor de desarrollo

En tercer lugar, cuando las todas dependencias se hayan instalado y el sistema backend junto a la base datos esten corriendo correctamente, ejecuta el comando:

```
yarn dev
```

or

```
npm run dev
```

or

```
pnpm run dev
```

Finalmente, el proyecto será desplegado en la siguiente URL:

```
http://localhost:3000
```

### **!!!IMPORTANTE!!!**

El sistema backend junto a la base de datos ya debe haber sido levantado y configurado de manera correcta para que el frontend pueda funcionar correctamente.

## Algunas imágenes del Proyecto

#### Pagina Inicio

![Página Inicio](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310188/assets-tesloshop/toy7sjwlyncsxr8ioyy5.png)

#### Categorías

![Página de Categorías](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310189/assets-tesloshop/wngmeoikeutsnevtzlal.png)

#### Busqueda de producto

![Página de Productos](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310190/assets-tesloshop/hi57cfuwpzcm0zmozmlx.png)

#### Selector de Tallas

![Página de selector de Tallas](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310188/assets-tesloshop/be08lnsxxvlrg5szdgcj.png)

#### Carrito de productos

![Página de carrito de Productos](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310188/assets-tesloshop/dyye2oxxj26nqd5yeifw.png)

#### Checkout

![Página de Checkout](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310188/assets-tesloshop/wlhwrhoodnfaegzre1or.png)

#### Pago de producto

![Página de pago de Producto](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310189/assets-tesloshop/vphedg6xplsrzza8g6kk.png)

#### Dashboard

![Página de Mantenimiento](https://res.cloudinary.com/dviezfcgy/image/upload/v1685310187/assets-tesloshop/tk4wvgdbmhj1dfvppile.png)
