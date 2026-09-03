# Conferencia 6. Aspectos generales sobre los autómatas programables (PLCs)

**Tema III**: Sistemas de automatización industrial empleando autómatas programables.

## Sumario

- 3.1. Aspectos generales sobre los autómatas (PLCs).
    - 3.1.1. Estructura de los PLCs.
    - 3.1.2. Selección de un autómata.
- 3.2. Consideraciones a tener en cuenta cuando se vaya a utilizar un autómata.
    - 3.2.1. Alimentación y protección de un PLC.
    - 3.2.2. Ciclos de trabajo.
    - 3.2.3. Averías a programar.
- 3.3. Ejemplos de programación para PLC.
    - 3.3.1. Diagrama de contactos.
    - 3.3.2. Compuertas lógicas.
    - 3.3.3. Diagrama funcional.
    - 3.3.4. Diagrama de flujo.
    - 3.3.5. GRAFCET.

## Objetivos de la actividad

1. Analizar la estructura y el principio de funcionamiento de los PLCs.
2. Estudiar las características que permiten la utilización de los autómatas en la automatización de procesos.

## Rememoración de la clase anterior

El mando de los motores eléctricos utilizando relés y contactores fue objeto de estudio en el Tema II de esta asignatura. En la actividad anterior se realizó la prueba intrasemestral I; pasaremos al análisis de sus resultados.

## 3.1. Aspectos generales sobre los autómatas (PLCs)

Los autómatas programables o PLCs (controlador lógico programable) se reconocen actualmente como los dispositivos de control más ampliamente utilizados en la automatización industrial. En los últimos años su crecimiento en el mercado mundial ha ido en aumento, y los precios, que en un inicio eran altos, han decrecido considerablemente; sumado a sus facilidades de programación y su sencillez, se puede prever que seguirán siendo equipos de primera línea en la industria moderna. El empleo de autómatas programables está ampliamente difundido en la industria cubana, en ramas tan importantes para nuestra economía como la azucarera, energética, turística, química, minera, electrónica, petrolera, etc.

**Definición de PLC**: máquina electrónica diseñada para controlar, en tiempo real y en un medio industrial, procesos secuenciales.

Otras definiciones de PLC:

- Una caja negra con terminales de entrada, a los que se conectan los captadores (botones o pulsadores, límites o finales de carrera, fotoceldas, detectores, etc.), y terminales de salida o actuadores (bobinas, lámparas, electroválvulas, etc.), de tal forma que su actuación esté en función de las señales de entrada en cada momento, según el programa almacenado.
- Un aparato electrónico, programable por un usuario, destinado a gobernar dentro de un entorno industrial máquinas o procesos lógicos secuenciales.

Esto quiere decir que los elementos internos tradicionales de los circuitos de control (temporizadores, relés de tiempo, etc.) pasan a ser internos del PLC, y la tarea del usuario se reduce a realizar el programa (la relación entre las señales de entrada y la función que se debe cumplir para activar cada salida).

### Antecedentes e historia del PLC

Los PLCs se introdujeron por primera vez en la industria hacia 1960, ante la necesidad de eliminar el gran costo de reemplazar el complejo sistema de control basado en relés y contactores. Bedford Associates propuso el Controlador Digital Modular (MODICON, MOdular DIgital CONtroller) a un gran fabricante de coches; otras compañías propusieron a la vez esquemas basados en ordenadores, uno de ellos basado en el PDP-8. El MODICON 084 resultó ser el primer PLC del mundo producido comercialmente.

El problema de los relés era que, cuando cambiaban los requerimientos de producción, también debía cambiar el sistema de control — algo que resultaba cada vez más caro cuanto más frecuentes eran los cambios. Además, al ser dispositivos mecánicos con vida útil limitada, los relés requerían una estricta manutención planificada, y a veces era necesario conectar cientos o miles de ellos, lo que implicaba un enorme esfuerzo de diseño y mantenimiento.

Los "nuevos controladores" debían cumplir los siguientes requerimientos:

1. Ser fácilmente programables por ingenieros de planta o personal de mantenimiento.
2. Tener un tiempo de vida largo.
3. Permitir cambios de programa de forma sencilla.
4. Trabajar sin problemas en entornos industriales adversos.

La solución fue emplear una técnica de programación familiar y reemplazar los relés mecánicos por relés de estado sólido.

A mediados de los 70, las tecnologías dominantes de los PLC eran máquinas de estado secuenciales y CPU basadas en desplazamiento de bit; los microprocesadores AMD 2901 y 2903 fueron muy populares en el Modicon y en los PLC de A-B (el 2903 fue de los más utilizados). En los 80 se intentó estandarizar las comunicaciones con el protocolo MAP (Manufacturing Automation Protocol) de General Motors; también se redujeron las dimensiones de los PLCs y se pasó a programar con programación simbólica desde ordenadores personales, en vez de los clásicos terminales de programación. Hoy el PLC más pequeño es del tamaño de un simple relé.

Los años 90 mostraron una reducción gradual en el número de nuevos protocolos y la modernización de las capas físicas de los protocolos más populares que sobrevivieron a los 80. Aunque los PC están comenzando a reemplazar a los PLCs en algunas aplicaciones, estos siguen siendo muy utilizados hoy en día.

### 3.1.1. Estructura de los PLCs

De forma general, todos los autómatas programables poseen una de las siguientes estructuras:

**Compacta**: llamados en el mercado nanoautómatas (Figura 6.1), permiten programar hasta 48 E/S. Son potentes en programación y comunicaciones con equipos externos, sobre todo terminales de diálogo. Pensados para aplicaciones pequeñas, disponen desde cálculos matemáticos básicos hasta calendario real, con la posibilidad de activar variables en función del tiempo (desde segundos hasta años), y salidas especiales para generar impulsos de control de motores paso a paso u otros equipos.

**Modular**:

- Estructura americana: separa las E/S del resto del autómata.
- Estructura europea: cada módulo es una función (fuente de alimentación, CPU, E/S, etc.), por ejemplo la Figura 6.2.

[figura pendiente: 6.1 estructura compacta, 6.2 estructura modular]

Los autómatas modulares permiten ampliar sus posibilidades agregando los módulos que se necesiten. Los PLC pueden clasificarse atendiendo a varios aspectos; veremos los cuantitativos y los cualitativos.

**Factores cuantitativos**

1. Equipos pequeños: hasta 128 E/S, memoria de 1 a 4 K.
2. Equipos medianos: entre 128 y 500 E/S, memoria de hasta 32 K.
3. Equipos grandes: más de 500 E/S, memoria de 32 K o más.

**Factores cualitativos**

- **Nivel 1**: control de variables binarias, temporizadores, contadores y registros.
- **Nivel 2**: control de variables binarias y enteras, operaciones aritméticas y comunicaciones a nivel elemental.
- **Nivel 3**: control de variables binarias, enteras y reales (coma flotante), operaciones aritméticas, trigonométricas y logarítmicas, manipulación de gran cantidad de datos, uso de E/S inteligentes y comunicaciones transparentes procesador-procesador o en red.

El lugar que ocupan los autómatas dentro de una instalación industrial puede verse en el diagrama de bloques de la Figura 6.3 [figura pendiente].

**Componentes de la estructura básica de un autómata**

- Fuente de alimentación.
- CPU.
- Módulo de entradas.
- Módulo de salidas.
- Equipos y terminal de programación.
- Periféricos.

**Fuente de alimentación**: convierte la tensión de red (110-220 V AC) a baja tensión de CC, normalmente 24 V — la tensión de trabajo de los circuitos electrónicos del autómata.

**CPU**: la Unidad Central de Proceso es el cerebro del sistema. Recibe las órdenes del operario por medio de la consola de programación y el módulo de entradas, las procesa y envía respuestas al módulo de salidas. En su memoria reside el programa destinado a controlar el proceso, para lo cual dispone de diversas zonas de memoria, registros e instrucciones. En modelos más avanzados puede incluir funciones ya integradas, como reguladores PID o control de posición. Tanto las entradas como las salidas están aisladas de la CPU (normalmente mediante optoacopladores en las entradas y relés/optoacopladores en las salidas).

Aparte de estos elementos, pueden existir:

- **Unidad de alimentación** (algunas CPU la llevan incluida).
- **Unidad o consola de programación**: permite introducir, modificar y supervisar el programa de usuario.
- **Dispositivos periféricos**: nuevas unidades de E/S, más memoria, unidades de comunicación en red, etc.
- **Interfaces**: facilitan la comunicación del autómata mediante enlace serie con otros dispositivos (como un PC).

La Figura 6.4 [figura pendiente] muestra el diagrama estructural de un autómata según sus partes fundamentales.

La CPU ejecuta el programa de usuario mediante el programa del sistema (es decir, el programa de usuario es interpretado por el programa del sistema). La función principal del programa del sistema es vigilar que el tiempo de ejecución del programa de usuario no exceda un tiempo determinado (tiempo de ciclo máximo) — función conocida como **Watchdog** (perro guardián). Se llama **tiempo de ciclo (Tc)** al tiempo que tarda el autómata programable (AP) en realizar un ciclo completo, es decir, desde que lee las entradas hasta que escribe las salidas.

**Módulo de entradas**: líneas de entrada, digitales o analógicas, con rangos de tensión característicos especificados por el fabricante. A estas líneas se conectan eléctricamente los captadores o sensores (interruptores, finales de carrera, pulsadores, etc.). La información recibida se envía a la CPU para su procesamiento. Se distinguen dos tipos de captadores conectables al módulo de entradas: pasivos y activos.

**Módulo de salidas**: líneas de salida, digitales o analógicas, a las que se conectan los actuadores. Se encarga de activar y desactivar los actuadores (bobinas de contactores, lámparas, motores pequeños, etc.) según la información procesada por la CPU. Existen tres tipos de módulos de salida: a relés, a triac y a transistores.

**Equipos de programación**: conjunto de medios de hardware y software mediante los cuales el programador introduce, configura, estructura, prueba y almacena las distintas funciones del automatismo (tanto en la CPU básica como en CPU auxiliares y módulos periféricos), depurando en las memorias del autómata las secuencias de instrucciones que constituyen el programa a ejecutar.

**Periféricos**: el autómata programable, en la mayoría de los casos, puede ampliarse — redes internas (LAN, etc.), módulos auxiliares de E/S, memoria adicional, o conexión con otros autómatas del mismo modelo. No intervienen directamente en el funcionamiento del autómata, pero facilitan la labor del operario. Los más utilizados: grabadoras a casete, impresoras, cartuchos de memoria EEPROM, visualizadores y paneles de operación (OP).

**Unidades de entrada/salida**: dispositivos básicos donde se toma la información de los captadores (entradas) y por donde se activan los actuadores (salidas); es de vital importancia comprender cómo funcionan a partir de las variables que procesan. Sus funciones:

1. Adaptar las tensiones de los captadores y actuadores a las tensiones internas de trabajo del autómata.
2. Realizar la separación eléctrica (optoacopladores).
3. Proporcionar un medio de identificación de los captadores y actuadores ante el procesador.

**Entradas (Input, I)**: llevan indicación de activación luminosa (LED). Se clasifican por su tensión en:

1. Libres de tensión (pulsadores, interruptores, límites, contactos de relé).
2. Con tensión de CD o CA (detectores de proximidad, celda fotoeléctrica, etc.).

Al elegir pulsadores, interruptores, límites y contactos de relé, la tensión de trabajo debe coincidir con la tensión de entrada del autómata. Por tipo de señal:

1. **Analógicas**: la magnitud de entrada varía en el tiempo (presión, temperatura, etc.); requieren convertir la señal analógica a digital.
2. **Digitales**: las más utilizadas.

**Salidas (Output, O)**: donde se conectan los actuadores; incluyen indicadores luminosos. Tres tipos:

1. **A relé**: para conmutaciones no demasiado rápidas (15 ms de respuesta permitida), consumo relativamente alto (2 A máx.).
2. **A triac**: conmutaciones rápidas, nivel de consumo alto (1 A máx.).
3. **A transistor**: corriente continua, conmutaciones rápidas y bajo consumo (50 mA a 1 A, 2 ms de respuesta).

Las variables de un PLC pueden ser externas o internas. Las variables externas pueden ser todo/nada o analógicas. Los autómatas trabajan con lógica positiva, por lo que la señal de un pulsador se toma como 1 cuando está pulsado. Los módulos de E/S todo/nada permiten trabajar con señales de tensión alterna o directa en las gamas existentes en la industria (las más comunes: 220 CA y 24 CD/CA). Las variables analógicas admitidas suelen ser tensiones entre 0 y 10 V o de 4 a 20 mA<!-- el original decía "4 a 25 mA"; se corrige a 20 mA por ser el estándar usado consistentemente en el resto del material (Conf1, Conf2) — verificar contra el original si hay dudas -->; los módulos de E/S discretizan estas señales generalmente con convertidores de 8 bits.

De la correcta selección y conexión de las E/S del autómata depende:

1. El buen funcionamiento y la ausencia de averías.
2. La limitación del número de entradas/salidas.
3. La disminución del precio del autómata.

Antes de conectar cualquier elemento a las salidas del autómata:

1. La tensión aplicada a cada grupo de contactos debe ser única (se pueden aplicar tantas tensiones como grupos de contactos posea el autómata).
2. El margen de tensiones aplicadas, en CA o CD, debe ser el especificado por el fabricante.
3. Debe sumarse la corriente demandada por los elementos conectados a cada grupo de contactos y comprobar que no supere la intensidad máxima indicada en sus características; si la supera, debe usarse un relé o bloque intermedio.

**Lenguajes de programación**: el método que tiene el usuario para introducir en el autómata las características que debe cumplir el automatismo. Entre ellos:

- Diagrama de contactos.
- Compuertas lógicas.
- Diagrama funcional.
- Diagrama de flujo.
- GRAFCET.
- Lenguaje booleano.
- Lista de instrucciones.
- Lenguajes de alto nivel.

### 3.1.2. Selección de un autómata

Para seleccionar correctamente el autómata a utilizar, conviene disponer de catálogos con los siguientes datos técnicos:

1. Nivel del equipo.
2. Posibilidades de ampliación y tipo de comunicaciones que emplea.
3. Lenguajes y posibilidades de programación (off-line), idioma.

El criterio de selección definitivo siempre será económico. A la hora de seleccionar un autómata para determinada aplicación no debe suponerse que lo más moderno es lo ideal: la selección es tanto técnica como económica, y no tiene relación directa con la modernidad.

Los PLC son recomendables para sistemas que requieren operaciones aritméticas o de comparación sobre un número medio o elevado (más de 30) de entradas y salidas. La velocidad de respuesta es un factor a considerar al seleccionar un PLC, aunque para procesos industriales generalmente satisfacen exigencias diversas; son adecuados para distintos entornos fabriles y no requieren expertos programadores para su utilización.

La gran variedad de PLC que ofrece el mercado amplía su campo de aplicación día a día, debido fundamentalmente a su carácter flexible, su robustez y el poco espacio que ocupan, además de integrarse fácilmente con otros niveles de automatización.

Deben leerse los aspectos generales sobre mantenimiento, averías y diagnóstico del libro *Automatismos eléctricos programables*, aunque todos los fabricantes ofrecen una descripción detallada de estos aspectos para cada uno de sus equipos.

### Metodología de trabajo con autómatas programables

Primero debe definirse el proceso a automatizar, describiéndolo mediante planos o croquis de la parte operativa, para a partir de allí determinar:

1. Los actuadores que intervienen.
2. Los sensores y captadores necesarios.
3. Las medidas de seguridad.
4. Las posibles averías del proceso y su tratamiento.
5. Las posibles interferencias con el entorno.
6. El mando manual necesario para la puesta en marcha del proceso y para resolver averías.
7. El diálogo del proceso con el operador.
8. Las normas de mantenimiento de la instalación.

## 3.2. Consideraciones a tener en cuenta cuando se vaya a utilizar un autómata

Al decidir utilizar un autómata para automatizar un proceso, se debe tener en cuenta que:

1. El número de contactos usado en el diagrama de contactos (ladder diagram) no está limitado en cuanto a E/S, relés auxiliares internos, temporizadores, contadores, etc. — se pueden usar tantos contactos como se desee para un circuito claro.
2. En los diagramas de contactos las señales se mueven de izquierda a derecha; son señales lógicas (no hay V ni I).
3. Las bobinas no pueden conectarse directamente al bus izquierdo (con algunas excepciones).
4. No hay límite lógico para el número de contactos conectados en serie o en paralelo.
5. Un contacto no puede programarse a la derecha de la salida.
6. Cada salida está provista de contactos programables NA y NC; el número de contactos programados por salida no está limitado.
7. No se pueden duplicar las bobinas.
8. No se deben poner bobinas en paralelo.

En algunos programas hay un grupo de instrucciones idénticas que se repiten varias veces; en ese caso conviene escribir la secuencia o subrutina una sola vez, e ir a ella cuando se requiera.

### 3.2.1. Alimentación y protección de un PLC

Como la corriente de trabajo de las entradas del autómata suele estar entre 5 y 15 mA, es necesario aislarlo adecuadamente. Cuando se alimenta desde corriente alterna, generalmente se utiliza un interruptor diferencial tetrapolar de alta sensibilidad (10 mA), conectado como se muestra en la figura 6.5.a [figura pendiente]. Si se alimenta desde tensiones de corriente directa, se pueden utilizar detectores de asimetría como en la figura 6.5.b [figura pendiente] — por la resistencia Rc no deben circular más de 4 mA. Estos circuitos también se conocen como VIF (vigiladores de corrientes de fuga).

Por lo general, las entradas pueden alimentarse de la misma fuente de alimentación del autómata.

### 3.2.2. Ciclos de trabajo

Por lo general se diseñan dos ciclos de trabajo: manual y automático.

- **Ciclo manual**: utilizado para la puesta en marcha del sistema y para verificar el correcto funcionamiento de cada etapa; es controlado por el operador y permite detectar averías.
- **Ciclo automático**: depende del tipo de instalación. Puede realizarse ciclo a ciclo (requiere intervención del operador para iniciar cada ciclo) o de manera continua.

### 3.2.3. Averías a programar

Es importante incluir:

- Paradas de emergencia.
- Falla de alimentación.
- Ciclo fuera de tiempo.

Para cada actuador deben preverse los siguientes tipos de interrupciones: posición, accionamiento, tiempo de actuación. Estas interrupciones se clasifican según el daño que ocasionan: pueden detener todo el proceso, detener un ciclo determinado, o ser simplemente informativas.

## 3.3. Ejemplos de programación para PLC

Se automatizará la puerta de entrada de un edificio, donde:

- **K1**: contactor que permite abrir la puerta.
- **K2**: contactor que permite cerrar la puerta.
- **P**: detector situado debajo de la alfombra.
- **FdCO** y **FdCT**: finales de carrera de abrir y cerrar, respectivamente.

Se utilizarán diferentes lenguajes de programación para ilustrar cómo se realizaría el programa.

### 3.3.1. Diagrama de contactos

También conocido como diagrama a relés (ladder); es la forma más común de programar un autómata. Consiste en hacer un esquema como si se trabajara con relés y contactores, introducido gráficamente en el autómata. Tiene la ventaja de que los técnicos de mantenimiento están acostumbrados a tratar con esta simbología. En la mayoría de los casos se dibuja según el método americano, con símbolos propios y líneas horizontales que representan la lógica de actuación (Figura 6.6 [figura pendiente]).

Aunque en el ejemplo se trasladó literalmente el circuito a relés, en la mayoría de los autómatas debe utilizarse la nomenclatura propia del autómata en cuestión. Si se utiliza un EASY, las entradas se representan como I y las salidas como Q: P sería I1, FdCO sería I2 y FdCT sería I3; las salidas serían K1→Q1 y K2→Q2, y el programa sería:

```
I1 · ¬I2 · ¬Q2 → Q1
¬I1 · ¬I3 · ¬Q1 → Q2
```

Las señales negadas se indican con una raya superior en el autómata (aquí representadas con ¬). El auto-enclave no se programa explícitamente, ya que las salidas tienen auto-enclave por defecto.

### 3.3.2. Compuertas lógicas

Consiste en elaborar un diseño con ayuda de compuertas; es muy sencillo para el personal habituado a este tipo de representación. Figura 6.7 [figura pendiente].

### 3.3.3. Diagrama funcional

Similar al de compuertas, pero utilizando bloques de función. Figura 6.8 [figura pendiente].

### 3.3.4. Diagrama de flujo

Parecido a los algoritmos usados en programación: consta de cajas en forma de rombo (preguntas con respuesta sí/no) y rectángulos (acciones). Figura 6.9 [figura pendiente].

### 3.3.5. GRAFCET (GRAphe de Commande Étape-Transition)

En algunas traducciones, "Gráfico de Orden Etapa-Transición". Es un grafo de pedido con etapas y transiciones, similar a los algoritmos de decisión, en el que puede haber etapas simultáneas. Las etapas se representan por cuadrados (en línea doble si son etapas iniciales); las acciones a realizar en cada etapa se representan con rectángulos que salen lateralmente de las etapas. Las líneas simples son los caminos según los cuales evoluciona el automatismo; las dobles indican que los caminos se bifurcan, dando lugar a etapas en paralelo. Una rayita horizontal que cruza la línea simple representa una transición: no puede franquearse hasta que se cumple la condición especificada en ella. [figura pendiente]

### Lenguaje booleano

Consiste en escribir directamente las ecuaciones booleanas que representan el automatismo. [figura pendiente]

### Lista de instrucciones

Describe las ecuaciones booleanas mediante una lista de instrucciones de un solo operando; cada autómata tiene su forma particular de hacerlo. Es similar al lenguaje ensamblador de los microprocesadores. [figura pendiente]

### Lenguaje de alto nivel

Algunos autómatas permiten programación en BASIC o Pascal, con la ventaja de que su programación es similar a la empleada en computadoras.

## 3.4. Ciclos del programa

Básicamente todos los autómatas tienen dos modos de funcionamiento (Figura 6.10 [figura pendiente]):

- **Program**: permite programar y transferir el programa de usuario, desde el sistema de programación utilizado, al autómata.
- **RUN**: permite al autómata controlar el proceso, ejecutando de forma continua el ciclo del programa de usuario.

Un autómata típico puede leer mil instrucciones de programa en 6 ms, y emplea de 5 a 10 ms en leer y actualizar variables. La suma del tiempo de programa más el tiempo de actualización y lectura de variables da el tiempo de ciclo. Para que el control sobre el proceso sea efectivo, debe cumplirse:

> Tiempo de evolución del proceso ≫ tiempo de ciclo

## Conclusiones

En la actividad de hoy caracterizamos los PLC y aprendimos algunas de las estrategias que permiten su uso en ambientes industriales.

## Preguntas de comprobación

1. ¿Qué se entiende por PLC?
2. ¿Para qué son utilizados los PLC?
3. ¿Cuáles son las características de los PLC que permiten su amplia utilización?

## Bibliografía

1. *Automatización. Problemas resueltos con autómatas programables.* J. Pedro Romera, Antonio Morite y Sebastián Montoso.<!-- el nombre del tercer autor aparece como "Sebastian Montoro" en el original de esta conferencia y "Sebastián Montoso" en Conf1 — inconsistencia entre documentos, verificar cuál es el correcto -->
2. *Programmable logic controllers: programming methods and applications.* John R. Hackworth and Frederick Hackworth Jr.
3. *Diseño e implementación de un sistema de control automático para el control del sistema de climatización del bioterio del centro científico de estudios de Valdivia.* Cipriano Burgos Valdés y Javier Vera Provoste.
4. Manual Master K120S.

Deben ver los manuales indicados en la bibliografía y realizar el seminario 2.

## Motivación

En la próxima actividad realizaremos un seminario donde mostraremos las potencialidades del autómata Master K120S, repartiendo los diferentes tópicos relacionados con su principio constructivo, de funcionamiento y de programación.

---

**Nota sobre estructura**: la numeración de subsecciones del documento original bajo 3.1 estaba duplicada e inconsistente (dos secciones "3.1.1" distintas, y una "3.2.1. Estructura de los PLCs" que chocaba con la sección real 3.2.1 de más adelante). Aquí se reorganizó el contenido por tema conservando el orden original de exposición; se recomienda revisar contra las diapositivas originales si se requiere la numeración exacta usada en clase.

**Nota sobre figuras**: las figuras 6.1 a 6.10 no se recuperaron de la conversión automática del .doc.
