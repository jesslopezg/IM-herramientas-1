# Lector de Google Forms para Revisión Prepiloto

Este pequeño Web App de Google Apps Script permite que `revision.html` lea la estructura de un **Google Form publicado** usando únicamente su enlace de encuestado.

## Qué recibe
Solo el enlace público del formulario.

## Qué devuelve
Título, descripción, preguntas, tipo de pregunta, obligatoriedad y opciones de respuesta disponibles en la vista del encuestado.

## Qué NO hace
- No modifica el formulario.
- No envía respuestas.
- No lee respuestas existentes.
- No recibe el brief: el análisis del brief se hace localmente en el navegador del estudiante.

## Publicación (una sola vez)

1. Ve a https://script.google.com y crea un proyecto nuevo.
2. Reemplaza el contenido de `Code.gs` por el archivo de este directorio.
3. Haz clic en **Deploy > New deployment**.
4. Tipo: **Web app**.
5. **Execute as:** Me.
6. **Who has access:** Anyone.
7. Autoriza el script y copia la URL que termina en `/exec`.
8. Abre `revision.html` en el sitio de IM. La primera vez aparecerá "Conecta el lector de Google Forms".
9. Pega la URL `/exec` y pulsa **Guardar conexión**.

Si se quiere dejar configurado para toda la clase, escribe esa URL en `revision-config.js`:

```js
window.PREPILOT_CONFIG = {
  backendUrl: "https://script.google.com/macros/s/XXXXXXXX/exec"
};
```

## Nota técnica

El lector usa la estructura `FB_PUBLIC_LOAD_DATA_` incluida en la vista publicada de Google Forms. Es una estructura interna de Google y puede cambiar; por eso el lector debe considerarse un componente mantenible, no una API oficial.
