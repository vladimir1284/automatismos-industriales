# Variante 27. Control programable de lavadoras

> Páginas 30–31 del PDF original (variante 28 en el documento original). Tareas a realizar: [00-tareas-generales.md](00-tareas-generales.md)
>
> Esta variante no tiene figura asociada en el documento original.

## Descripción del proceso

Se quiere diseñar un circuito secuencial que sirva como controlador de una central de lavado que consta de tres lavadoras industriales; en cada una se ejecutarán tres ciclos de funcionamiento (lavado, aclarado y centrifugado) de la misma duración temporal.

- Un pulso a '0' iniciará el funcionamiento en cascada de la central de lavado.
- Se requiere calentar el agua.
- Se debe controlar tambor de lavado vacío de agua y tambor de lavado lleno de agua.
- El calefactor de agua, las bombas, el despachador de detergente y suavizador se activan automáticamente en dependencia del ciclo de trabajo escogido.
- El motor de lavado trabaja a velocidades diferentes cuando lava y cuando centrifuga.
- Los ciclos de lavado son normal, rápido y ropa blanca.

## Aclaraciones generales

Las máquinas se llenarán de agua y se calentarán hasta alcanzar el nivel y la temperatura adecuados. Se puede partir de un tambor no vacío de agua, pero si está vacío no debe actuar el calefactor (se quemaría).

Cuando el despachador de detergente se cierre y el tambor esté lleno se iniciará la operación de lavado que seguirá hasta que el temporizador alcance el cero manteniendo la temperatura establecida (estado *Washing*). Después se vaciará el agua sucia y se rellenará, de nuevo, con agua fría y suavizador. Se aclarará en frío siguiendo el mismo accionamiento del motor que en el lavado, hasta que el temporizador alcance, otra vez, el cero (estado *Clearing*). Por último, tras vaciar de nuevo el tambor (*Empty2*), se iniciará el centrifugado (*Spinning*), a la segunda velocidad, que finalizará al alcanzar cero el temporizador devolviendo al controlador al estado inicial.

El funcionamiento del sistema será cíclico; cada lavadora realiza un trabajo diferente.
