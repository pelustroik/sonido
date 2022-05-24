# Sesión 7

JSON - Javascript Object Notation
Formato flexible y compatible para almacenar datos

## JSON

1. Crear data.json

2. La sintaxis de un archivo JSON tiene Objetos{} y Arreglos []

3. Ejemplo

4. Acceder a archivo JSON desde sketch.js

`let data`

Y dentro de preload

`data = loadJSON(ejemplo.json)`

en setup

`console.log(data)`

y es posible acceder a los objetos con

`console.log(data.audios)`

5. Importante: No pueden estar loadJSON y sonidos en preload. Hay que mover sonidos a setup

## Efectos

Agregar algún tipo de interacción al círculo  

Por ejemplo:

`var filter = new Tone.Filter(200, "highpass").toDestination()`

Y luego modificar con:

`filter.frequency.value = miVariable`

El principal parámetro de un filtro es la frecuencia de corte. El ejemplo anterior tiene 200 pero puede relacionarse con una variable

O por ejemplo:

`var freeverb = new Tone.Reverb().toDestination();`

Y luego modificar con:

`freeverb.wet.value = miVariable`

Las modificaciones deberán suceder en mouseDragged (de filtro o de reverb o de cualquier otro ) 
