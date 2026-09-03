# Conferencia 3. Redes de campo y redes industriales de comunicación en tiempo real

## Objetivos

1. Definir conceptos de redes de campo.
2. Explicar las características de cada tipo de red.
3. Enunciar las facilidades de empleo de cada una de ellas.

## Rememoración de la clase anterior

En la conferencia anterior vimos las características de los instrumentos de medición conocidos como sensores. Analizamos el principio de funcionamiento de los sensores de temperatura, presión, nivel, etc. Mandamos a estudiar otros tipos de sensores industriales, entre los que se encontraban los de flujo; vimos la función del sensor, el transductor y el <!-- texto incompleto en el documento original --> acondicionador. Vimos las características a tener en cuenta a la hora de seleccionar un sensor para determinada aplicación y, por último, describimos las partes que integran un sistema de medición.

**Preguntas de evaluación**

1. ¿Cuáles son los elementos de un sistema automatizado?
2. Mencione los niveles de automatización y explique cómo están relacionados.
3. ¿Cuáles son los elementos que se encuentran en el nivel de control directo?

## 1.4. Redes de campo y redes industriales de comunicación en tiempo real

### 1.4.0. Introducción

Actualmente, en la industria de procesos y en muchas instalaciones de servicios ya se tiene un alto grado de automatización básica:

- Salas de control con sistemas de control distribuido (DCS).
- PLCs para sistemas de seguridad o secuenciamiento, etc.

Incluso muchas industrias tienen elementos de control avanzado. Del mismo modo se extienden y afianzan los buses de campo, a la vez que los sistemas basados en ordenador y la normalización de las comunicaciones permiten disponer de cantidades ingentes de datos de proceso y de potencia de cálculo a precios asequibles.

**¿Qué se entiende por bus?**

**Bus**: componente digital que transfiere datos entre componentes de un ordenador o entre ordenadores.

**¿Qué se entiende por bus de campo?**

**Bus de campo**: redes digitales bidireccionales, multipunto, montadas sobre un bus serie, que conectan dispositivos de campo (transductores, actuadores, sensores, módulos de E/S, controladores de velocidad, terminales de operador) con los sistemas de control (PLCs, PCs, etc.). Es un sistema de comunicación digital, serial y multipunto para comunicación de bajo nivel, destinado a equipos de control de procesos industriales y dispositivos de instrumentación tales como actuadores, sensores y controladores locales.

En el esquema piramidal presentado la conferencia anterior existían diferentes niveles de comunicación, cada uno con distintas necesidades. Se puede hablar de dos tipos de redes: **redes de control** y **redes de datos**. Las redes de control están ligadas a la parte baja de la pirámide, mientras que las redes de datos (u ofimática) están más ligadas a las partes altas de la jerarquía.

En general, las redes de datos están orientadas al transporte de grandes paquetes de datos que aparecen de forma esporádica (baja carga), con gran ancho de banda para el envío rápido de grandes cantidades de datos. En contraste, las redes de control se enfrentan a un tráfico formado por un gran número de pequeños paquetes.

### 1.4.1. Aspectos generales del Profibus

**1.4.1.1. Surgimiento y desarrollo**

PROFIBUS comienza en 1987 como un proyecto de 21 empresas e institutos de investigación alemanes, cuyo objetivo era desarrollar un bus de campo bit serial que soportara manufactura y procesos. Actualmente es el líder de los sistemas basados en buses de campo en Europa y goza de aceptación mundial (20% del mercado en 1999). Todos los fabricantes líderes en tecnología de automatización ofrecen interfaces PROFIBUS para sus dispositivos. Es estándar europeo EN 50170 e internacional IEC 61158.

PROFIBUS puede usarse tanto para transmisión crítica en el tiempo a alta velocidad, como para tareas de comunicación extensas y complejas (red de datos y red de control). Esta versatilidad viene dada por tres versiones compatibles que componen la familia PROFIBUS.

**1.4.1.2. Características principales de las versiones**

**Profibus-DP (Periferia Descentralizada)**

- Optimizado para alta velocidad y costo reducido.
- Intercambio de datos cíclico.
- Transferencia de pequeñas cantidades de datos.
- Plug & Play.
- Diseñado especialmente para la comunicación entre los sistemas de control de automatismos y las entradas/salidas distribuidas en procesos de manufactura.

**Profibus-PA (Automatización de Procesos)**

- Ampliación de Profibus-DP con tecnología apta para ambientes peligrosos y con riesgo de explosión (MBP technology, estándar IEC 1158-2).
- Permite conectar sensores y actuadores a una línea de bus común en áreas especialmente protegidas.
- Comunicación de datos y energía en el bus mediante 2 conductores.
- Destinado a reemplazar la tecnología en lazo de 4 a 20 mA en instrumentación y control.

**Profibus-FMS (Fieldbus Messages Specifications)**

- Diseñado para un gran número de aplicaciones y comunicaciones a nivel de célula, donde PCs y PLCs se comunican entre sí.
- Comunicaciones de propósito general, supervisión, configuración... Transmisión de grandes cantidades de datos: programas y bloques de datos.
- Intercambio acíclico de datos con tiempos no críticos, punto a punto (peer to peer), entre estaciones inteligentes.

**1.4.1.3. Aspectos trascendentes**

Homologado: con ensayo de conformidad e interoperabilidad realizado en laboratorios autorizados por la Asociación de Usuarios de Profibus (PNO). Profibus International (www.profibus.com) y la PNO coordinan el desarrollo y la distribución de los productos Profibus en el mercado. La organización Profibus International (PI), con más de 1100 miembros (año 2004), es la organización de buses de campo más grande del mundo.

**1.4.1.4. Elementos del bus**

- **Nodos**: elementos esenciales del bus.
    - **Activos**: pueden actuar como maestro del bus, tomando enteramente el control.
    - **Pasivos**: solo actúan como esclavos, sin capacidad de control sobre el bus; dialogan con los nodos activos mediante un mecanismo de pregunta-respuesta, pero no pueden dialogar directamente entre sí.
- **Repetidores**: transceptores bidireccionales simples para regenerar la señal (amplificadores).

**Topología**: en forma de bus lineal o de árbol, donde los repetidores constituyen el nodo de partida de una expansión del bus.

**1.4.1.5. Acceso al bus**

**Data Link Layer** (capa 2, modelo ISO/OSI): describe el protocolo de acceso al bus (Medium Access Control, MAC), incluyendo la seguridad de los datos, y el procedimiento que determina en qué momento una estación puede enviar datos.

- **ISO**: International Organization for Standardization.
- **OSI**: Open System Interconnection Reference Model. Define los elementos, estructuras y tareas requeridos para una comunicación, organizados en 7 capas.

El PROFIBUS Bus Access Method combina comunicaciones multi-maestro y maestro-esclavo. El protocolo de acceso al bus es idéntico para los tres perfiles de Profibus:

- Habilita la comunicación transparente entre secciones FMS/DP/PA en una misma red.
- Como FMS/DP usa el mismo medio físico (RS-485/FO), pueden combinarse en el mismo cable.

**1.4.1.6. Acceso al bus. Protocolos**

- **Protocolo de acceso híbrido**:
    - Paso de testigo (Token Passing) entre los maestros.
    - Master-Slave entre maestros y esclavos.
- **Maestros**: estaciones activas que pueden tomar el control del bus durante un tiempo limitado (Token Hold Time).
- **Esclavos**: solo responden cuando son interrogados por el maestro; no controlan el bus.

El paso de testigo en redes multimaestro debe asegurar que cada maestro tenga tiempo suficiente para completar sus tareas de comunicación. El usuario debe configurar el tiempo de rotación proyectado del testigo (Target Token Rotation Time, TTR), considerando las tareas de todos los maestros.

**FMS/DP en común**: DP y FMS están basados en las mismas capas 1 y 2:

- Pueden operar en el mismo bus.
- Encabezados y longitud de datos idénticos.
- Capas físicas iguales.
- Un maestro puede manejar varios esclavos; varios maestros pueden participar en el bus.
- Velocidades de 9.6 kBd hasta 12 MBd.
- Datos transmitidos entre 1 y 244 bytes.
- Hasta 126 estaciones.
- Sistemas con varios segmentos, con 32 estaciones por segmento (repetidores RS-485).
- Componentes comunes (ahorro en mantenimiento e inventario de almacén): cable, conectores, repetidores, fibra óptica.

**PA/DP en común**: DP y PA están basados en la misma definición de protocolo de acceso al bus, DP/V1 (extended DP):

- DP y PA pueden usar el mismo maestro.
- Tramas idénticas.
- Mismas herramientas de configuración.
- Datos transmitidos entre 1 y 244 bytes.

*DP/PA couplers*: bajos tiempos de procesamiento; interfaz entre ambos buses.

*DP/PA link*: para redes grandes; actúa como esclavo DP y maestro PA; desacopla las comunicaciones.

**1.4.1.7. Cableado de Profibus DP/FMS**

**Par trenzado y apantallado**

- Características definidas en EN 50170.
- Se utilizan cables y conectores según el estándar.
- Se logran baudrates > 1.5 MBaud utilizando conectores especiales.
- Se utiliza preferentemente el conector 9 pines Sub-D (provee IP20); otros conectores son posibles, por ejemplo M12 para IP65/67.

**Fibra óptica**

- Fibra de plástico o vidrio, con conectores y módulos específicos.
- Ventajas: inmunidad al ruido, aislamiento galvánico entre distintos potenciales, grandes distancias, operación redundante posible, configuraciones de anillo y estrella.

**Profibus FMS/DP sobre RS-485**

- Se requieren terminaciones; la expansión de la red se da a través de segmentos.
- **Terminación RS-485**: cada segmento debe "terminar" en ambos extremos; la terminación debe estar alimentada todo el tiempo, desde el dispositivo que la posee (se prefiere colocarla en el maestro).
- **Estructura de segmentos**: se necesitan nuevos segmentos cuando se excede la longitud máxima o la cantidad de dispositivos (32, incluidos los repetidores); se pueden usar para ramificar el bus o para aprovechar las 126 estaciones disponibles.

### 1.4.2. Protocolo Modbus

**1.4.2.1. Surgimiento y desarrollo**

Modbus nació como marca registrada de Gould Inc. y posteriormente fue adquirida por el grupo Schneider, que liberó el protocolo en el año 2000. Sus especificaciones están disponibles al público y está reconocido por la IEC como especificación públicamente disponible (Public Available Specification) bajo la designación IEC PAS 6203 <!-- verificar número exacto del estándar, el original trae "6203" y podría ser incompleto -->. Actualmente es soportado por la organización independiente Modbus-IDA.

La designación Modbus no corresponde a un estándar de red que cubra todos los aspectos desde el nivel físico hasta el de aplicación, sino a un protocolo de mensajes, posicionado en la capa de aplicación (nivel 7 del modelo OSI). Es un protocolo de comunicaciones tipo cliente/servidor entre dispositivos conectados sobre diferentes tipos de redes, con tres tipos de implementación:

- **Transmisión serial asincrónica**: sobre cable, fibra óptica o radio.
- **TCP/IP**: sobre Ethernet.
- **Modbus Plus**: sobre redes de alta velocidad.

**1.4.2.2. Principales características**

- Desarrollado por Modicon para comunicación entre PLCs.
- Por su simplicidad y especificación abierta, es ampliamente utilizado por diferentes fabricantes.
- Dispositivos que lo utilizan: PLC, HMI, RTU, drives, sensores y actuadores remotos.
- El protocolo establece cómo se intercambian los mensajes de forma ordenada y la detección de errores.
- Control de acceso al medio tipo maestro/esclavo.
- Especifica formato de trama, secuencias y control de errores.
- Existen dos variantes de formato: ASCII y RTU.
- Solo especifica la capa de enlace del modelo ISO/OSI.
- A cada esclavo se le asigna una dirección fija y única en el rango de 1 a 247; la dirección 0 está reservada para mensajes de difusión sin respuesta.

### 1.4.3. Características de empleo de ambos protocolos de comunicación

*(Comparativa Profibus / Modbus a desarrollar en clase práctica — ver figuras y tablas del material original.)*

## Conclusiones

En la actividad de hoy explicamos qué es un bus de campo, sus características, sus posibles usos y los elementos que lo componen. Explicamos cómo acceder al bus de campo por medio de sus protocolos, y las posibilidades de cableado que presenta. Definimos algunos aspectos del protocolo Modbus, desde su surgimiento y desarrollo hasta los formatos empleados en la práctica industrial. Vimos las características a tener en cuenta a la hora de seleccionar cada protocolo de comunicación.

## Preguntas de comprobación

1. ¿Qué se entiende por redes de campo?
2. Diga la importancia que revisten las redes de campo.
3. Explique las características principales del Profibus.
4. Enuncie las características del protocolo Modbus.
5. Enuncie las facilidades de empleo de cada una de ellas.

## Bibliografía

1. Tema 9. *Buses de campo.* Universidad de Oviedo.
2. Tema 13. *Redes de comunicación industriales.*

## Motivación

En la próxima conferencia comenzaremos con el estudio de los elementos que se utilizan como actuadores en un sistema de instrumentación automatizado — por ejemplo, contactores, relés, etc.

## Glosario

- **DCS**: Sistemas de control distribuido.
- **LAN**: Red de Área Local.
- **PLC**: Controlador Lógico Programable.
- **DP**: Periferia Descentralizada.
- **PA**: Automatización de Procesos.
- **FMS**: Fieldbus Messages Specifications.
- **PNO**: Asociación de Usuarios de Profibus.
- **MAC**: Medium Access Control.
- **ISO**: International Organization for Standardization.
- **OSI**: Open System Interconnection.
