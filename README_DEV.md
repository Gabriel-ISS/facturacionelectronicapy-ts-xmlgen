# GUÍA:

## Códigos
- VER: si vas a tocar algo ahi, fíjate en VER
- OBS: observaciones
- DELETE: eliminar en el momento descrito
- TODO_TEST: ver en la fase de test
- TODO_NT: ver en las notas

# TAREAS:

## Rapidos
- ...

## Investigar
- RUC: cuando el numero de identificación es numérico y cuando no? según el repo origina, cuando en el emisor no es necesario que sea numérico. y el formato?

## Esquemas

### Por campo
- E824: hasta 3 ocurrencias, en el repo original no es array
- E940: hasta 99 ocurrencias, en el repo original no es array
- E960: hasta 4 ocurrencias, en el repo original no es array
- E791: desde NT023 hasta 9 ocurrencias, en el repo original no es array
- GENFE023, D214: debe incluir el prefijo de la ciudad si el país es paraguay
- E609: "Se requiere la misma moneda para todos los ítems del DE" a que se refiere? por que no lo pusieron en un solo campo y ya? necesito saber a que items se refiere exactamente.
- SIN CÓDIGO: salidaYEntregaSchema => pais, paisDescripcion

### General
- ASEGURARSE DE QUE LAS DESCRIPCIONES ESTÉN BIEN VALIDADAS, CONSIDERAR undefined Y "OTRO"
    - para todos los findByIdIfExist agregar ctx si ese necesario bajo alguna condición
- ofrecer una manera de sobrescribir los mensajes de error.
- en el manual y las notas hay validaciones especiales que no tuve en cuenta.
- validaciones de timbrado?

## General
- Ver todos los sitios donde se usa cada configuración y entenderlo para aplicarlo.
    - config.pygDecimals si la moneda es PYG en cálculos de totales, ver donde se usa ademas de E727, EA006, EA007 y EA008.

# TAREAS A FUTURO:
- Hacer que se vean mejor los links a las notas técnicas en la documentación.
- Probar todo el repo
