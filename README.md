# sprint-ecommerce-shoes
Sprint final Modulo de Fundamentos

## Configuraciones iniciales
### Preprocesador SASS
- Añadir la extensión en Visual Studio Live Sass Compiler
- Verificar en los Settings de visual estudio de la siguiente manera
    1. Ubicar los settings en la parte inferior izquierda (es una tuerca)
    2. Se abre un menú desplegable y ahí verificar la opción settings o configuración
    3. En el buscador escribir "sass format", dar clic en la opción Lice Sass Compiler
    4. Se encontrará la opción Live Sass Compiler > Settings: Format
    5. Dar clic el enlace "Edit in settings.json"
    6. Una vez dentro del archivo verficar que las siguientes opciones "extensionName" y "savePath" se encuentren de la siguiente manera sino modificarlo para que quede de esa manera
        ```
            {
                "format": "expanded",
                "extensionName": ".css",   <----
                "savePath": "/css",        <----
                "savePathReplacementPairs": null
            }
        ```
        #### nota: las flechas son solo para ilustrar
    7. Después esto ya tendremos listo para usar nuestro preprocesador SASS
