# Variante 38. Ascensor de 3 plantas

> Tareas a realizar: [00-tareas-generales.md](00-tareas-generales.md)
>
> Nota: esta variante no tiene figura asociada.

## Descripción del proceso

Se trata de un ascensor que puede desplazarse en cuatro alturas: PB (planta baja), P1 (planta primera), P2 (planta segunda) y P3 (planta tercera). Dispone de una puerta de apertura y cierre automáticos con dispositivo de seguridad mediante célula detectora de obstáculo.

Para el manejo del ascensor por parte de los usuarios, la instalación dispone de los siguientes dispositivos.

Botonera interior con los siguientes elementos:

- A: (Alarma) pulsador con lámpara.
- <>: (Abrir) pulsador sin lámpara.
- B: (Ir a piso B) pulsador con lámpara.
- 1: (Ir a piso 1) pulsador con lámpara.
- 2: (Ir a piso 2) pulsador con lámpara.
- 3: (Ir a piso 3) pulsador con lámpara.

Dispone además de cuatro botoneras exteriores en cada planta con los siguientes elementos en cada una de ellas:

- LL: (LLB, LL1, LL2) pulsadores con lámpara.

Para el control del ascensor, la instalación dispone de los siguientes equipos y dispositivos:

- Para detectar la posición del ascensor se han ubicado cuatro finales de carrera (uno en cada planta) denominados: FCB, FC1, FC2, FC3.
- La puerta automática va montada sobre la propia caja del ascensor y dispone de dos finales de carrera para detectar si se encuentra totalmente abierta (FCPA) o totalmente cerrada (FCPC).
- El movimiento del ascensor se realiza gracias a un grupo motriz con capacidad de dos sentidos de giro.
- El movimiento de la puerta se realiza mediante otro motor con dos sentidos de giro.

El ascensor se encuentra en reposo cuando está detenido en una planta con las puertas cerradas. Todas las situaciones de movimiento que se programen han de terminar con el ascensor en posición de reposo (ESTADO DE SEGURIDAD).

## Especificaciones adicionales

- Para acceder al ascensor el usuario presiona el pulsador de llamada desde el exterior en la planta en la que se encuentre.
- Si el ascensor está en la planta desde la que se le llama, se abrirá la puerta para permitir que entren las personas que lo quieran usar.
- Si el ascensor está en otra planta, sin abrir las puertas, procederá a desplazarse a la planta desde la que se le llama, para una vez en ella, proceder a abrir las puertas y de este modo permitir la entrada de las personas que lo quieran utilizar.
- Los usuarios una vez dentro de la cabina podrán seleccionar la planta a la que desean ir, siendo posible una única selección.
- Cuando se cierren las puertas, el ascensor procederá a desplazarse hasta la planta seleccionada, abrirá las puertas para dejar salir a las personas que lo deseen, volverá a cerrar sus puertas y quedará listo para un nuevo uso.
- Si quedara alguna persona dentro, ésta podrá seleccionar una nueva planta una vez que el ascensor ha comenzado a abrir sus puertas, para una vez cerradas de nuevo desplazarse hasta el nuevo destino.

### Alarma

- La actuación sobre el pulsador interior (A) indicará que las personas que van dentro de la cabina han detectado una situación anómala o de peligro y por tanto el ascensor se detendrá de inmediato, esté donde esté.
- Mientras el ascensor se encuentra en alarma, ninguna orden exterior podrá ser obedecida.
- Únicamente se sale de la situación de Alarma de Cabina actuando de nuevo sobre el pulsador "A" o sobre cualquier pulsador de planta o de apertura de puerta. La respuesta del ascensor en este punto será llevar a la cabina a la planta inmediatamente inferior al punto donde se encuentra y abrir las puertas.
- Finalmente, cuando el técnico de reparaciones considere que el ascensor es de nuevo seguro para su uso, éste podrá activar un botón de rearme de manera que el ascensor cierre sus puertas y se sitúe en la planta baja.

### Movimiento automático

Cuando hayan pasado más de 5 minutos sin que exista movimiento alguno, el ascensor moverá la cabina a la planta baja de modo totalmente automático.
