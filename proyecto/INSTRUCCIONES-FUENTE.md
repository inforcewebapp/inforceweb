# Instrucciones para la Fuente Trasandina

## Implementación de la fuente en el sitio

Se ha configurado el sitio para utilizar la fuente Trasandina en todos los títulos. Para que esto funcione correctamente, necesitarás:

1. Obtener los archivos de la fuente Trasandina en los siguientes formatos:
   - `trasandina-regular.woff` y `trasandina-regular.woff2` (peso 400)
   - `trasandina-medium.woff` y `trasandina-medium.woff2` (peso 500)
   - `trasandina-bold.woff` y `trasandina-bold.woff2` (peso 700)

2. Colocar estos archivos en la carpeta:
   ```
   /proyecto/public/fonts/
   ```

3. Los archivos están referenciados en el `index.html` del proyecto y se aplicarán automáticamente a todos los títulos.

## Nota importante

La fuente Trasandina es una fuente comercial. Asegúrate de tener la licencia adecuada antes de utilizarla en tu sitio web.

Si no puedes obtener la fuente Trasandina, el sitio seguirá funcionando con la fuente de respaldo (sans-serif). En este caso, puedes:

1. Eliminar las referencias a la fuente en `index.html`
2. O reemplazar Trasandina por otra fuente que prefieras en el mismo lugar.

## Cambios realizados

- Se agregó la configuración de la fuente en `index.html`
- Se actualizó `index.css` para aplicar la fuente a todos los elementos de título
- Se agregó la clase `heading` a todos los títulos del sitio para garantizar consistencia
