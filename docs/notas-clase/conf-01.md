# Conferencia 1. Introducción a la automatización industrial

## Objetivos de la actividad

- Exponer los contenidos y el sistema evaluativo de la asignatura.
- Explicar las ventajas y desventajas asociadas a la automatización industrial.
- Identificar los diferentes niveles de automatización relacionándolos con tareas a ellos asociadas.

## Sumario

1. Introducción a la Automatización Industrial.
    1. Programa de la asignatura Automatización Industrial y Autómatas (AIA).
    2. La automatización. Aspectos generales.
    3. Niveles de desarrollo de la automatización industrial.
2. Esquema general.
    1. Elementos de un proceso a automatizar.
    2. Evolución de los automatismos industriales.
    3. Selección de la tecnología adecuada para el proceso a automatizar.
    4. Esquema general de un sistema a automatizar.

## 1.1. Introducción a la Automatización Industrial

### 1.1.1. Programa de la asignatura AIA

En esta asignatura estudiaremos los sistemas de automatización que se utilizan en la industria. Comenzaremos por los sistemas automatizados a nivel general, la evolución de los automatismos, refrescaremos tópicos del álgebra de Boole y analizaremos distintas técnicas empleadas en la automatización industrial, relacionando ventajas y desventajas de cada una, a la vez que nos introducimos en las estrategias para el desarrollo de sistemas automatizados con diferentes grados de automatización.

Estudiaremos los sistemas automatizados desde los sistemas a lazo abierto hasta los sistemas a lazo cerrado que emplean sensores y captadores e interactúan con actuadores simples como solenoides o complejos como contactores o relés de diversas topologías, haciendo especial hincapié en los autómatas programables, que permiten la integración de varias tecnologías y la utilización de sistemas SCADA. La asignatura AIA se impartirá durante 15 semanas.

**Objetivos de la asignatura**

1. Operar y evaluar esquemas de automatización industrial típicos.
2. Proyectar esquemas de automatización industrial sencillos.

**Sistema de habilidades**

1. Identificar e interpretar esquemas de automatización industrial típicos.
2. Proyectar esquemas de automatización utilizando autómatas programables.
3. Proyectar esquemas de automatización industrial sencillos utilizando redes de campo y diferentes tipos de sensores y sistemas de medición.
4. Proyectar esquemas de automatización de accionamientos eléctricos utilizando relés, contactores y autómatas programables.
5. Identificar e interpretar los esquemas de automatización utilizados en sistemas eléctricos de potencia y centrales eléctricas.

**Sistema de conocimientos**

1. Introducción a la Automatización Industrial. Esquema general.
2. Sensores y sistemas de medición.
3. Redes de campo y redes industriales de comunicación en tiempo real.
4. Relés y contactores.
5. Autómatas programables.
6. Automatización del arranque y el frenaje de los accionamientos eléctricos utilizando relés, contactores y autómatas programables.
7. Automatización industrial de sistemas de accionamiento eléctrico.
8. Automatización de sistemas eléctricos de potencia y sus componentes.

Se estudiarán los siguientes temas:

- **Tema I**: Elementos y componentes de automatización industrial.
- **Tema II**: Sistemas de automatización industrial empleando relés y contactores.
- **Tema III**: Sistemas de automatización industrial empleando autómatas programables.
- **Tema IV**: Automatización de sistemas eléctricos de potencia.

Total de horas a impartir: 48, repartidas así:

| Actividad | Horas |
|---|---|
| Conferencias | 18 |
| Clases prácticas | 12 |
| Laboratorios | 10 |
| Seminarios | 4 |
| Evaluaciones | 4 |

El proyecto se realizará por brigadas de estudiantes y tendrá como objetivo el desarrollo de sistemas de automatización industrial utilizando diferentes tecnologías. Tendrá componentes teóricos, investigativos y prácticos, por lo que la discusión final se desarrollará en el laboratorio e incluye la puesta en marcha de un sistema automatizado.

Para la comprensión de esta asignatura se necesita la base adquirida en:

- **Matemáticas** (cálculo diferencial e integral)
- **Física** (leyes fundamentales de la electricidad)
- **Circuitos eléctricos** (solución de circuitos de CD, solución de circuitos de CA monofásica y trifásica)
- **Mediciones eléctricas** (medición de corriente y tensiones con amperímetros y voltímetros de CD y CA, medición de potencia monofásica y trifásica)
- **Electrónica** (transistores, amplificadores operacionales y circuitos digitales)
- **Conversión de energía electromecánica** (principio de operación y características de comportamiento de las máquinas de CD y CA)
- **Modelación y simulación** (programación en MATLAB)
- **Ingeniería del control** y **Accionamiento eléctrico** (asignaturas ya vencidas de la disciplina)

La asignatura no tiene examen final; la evaluación final será el promedio de las evaluaciones parciales, las clases prácticas, laboratorios, seminarios y la discusión del proyecto final. Se realizarán dos pruebas intrasemestrales:

- Primera, en la actividad 12: diseño de sistemas de automatización industrial con relés y contactores.
- Segunda, en la actividad 19: diseño de sistemas de automatización industrial con autómatas.

**Bibliografía**

1. *Automatización. Problemas resueltos con autómatas programables.* J. Pedro Romera, Antonio Morite y Sebastián Montoso.
2. *Automatismos eléctricos programables.* Oriol Boix Aragonés, Miguel A. Saigí Grau y Ferran Zabaleta Alaña.
3. *Programmable logic controllers: programming methods and applications.* John R. Hackworth and Frederick Hackworth Jr.
4. *Practical fieldbus. Device net and Ethernet for industry.* IDC Technologies.
5. *Practical Industrial Data Communications. Best Practice Techniques.* Deon Reynders, Steve Mackay and Edwin Wright.
6. Notas de clase. Ver Moodle de la facultad.
7. Artículos y catálogos disponibles en el local de la disciplina.

### 1.1.2. La automatización. Aspectos generales

**¿Qué se entiende por automatización?**

Es un grado superior de la mecanización donde se sustituye el operador humano por un operador artificial. En el ambiente industrial, la automatización puede definirse como el estudio y la aplicación de la automática al control de procesos industriales — es decir, aplicar los conocimientos adquiridos en Ingeniería del control a los procesos industriales.

**¿Cómo se puede realizar el control?** A lazo abierto y a lazo cerrado. La selección depende del tipo de proceso industrial y de la aplicación.

La competencia empresarial obliga a fabricar de forma más eficiente y flexible, y a reducir los tiempos de puesta en el mercado de nuevos productos. Esto pone interés en la calidad, las nuevas tecnologías y el desarrollo rápido de productos, a la vez que se requiere reducir costos (en particular energéticos) y aumentar la eficacia y flexibilidad de los sistemas de producción.

Las exigencias medioambientales suponen también presión hacia la mejora tecnológica, mientras que el desarrollo sostenible apunta al ahorro energético. Esto hace que los sistemas de instrumentación y control automático se conviertan en pilares que marcan la evolución industrial, permitiendo aumentar producciones, mejorar la calidad, reducir costos y personal, y cumplir requisitos medioambientales.

**1.1.2.1. Tipos de procesos industriales**

Los procesos industriales pueden ser continuos, discontinuos (por lotes) o discretos. Esta asignatura se centra en los dos últimos; los procesos continuos son objeto de la asignatura del próximo semestre (Sistemas de Regulación Automáticos de coordenadas y servosistemas).

- **Procesos continuos**: operan ininterrumpidamente durante tiempos relativamente largos. Ejemplo: la calefacción de un edificio.
- **Procesos discretos**: el producto de salida se obtiene mediante una serie de operaciones, muchas de gran similitud entre sí. Ejemplo: elaboración de una pieza metálica con varias máquinas herramientas.
- **Procesos discontinuos o por lotes**: reciben a la entrada diferentes piezas discretas sobre las que se realizan operaciones hasta obtener el producto acabado. Requieren sensores y variables de estados anteriores.

**1.1.2.2. Controladores secuenciales**

Los procesos discretos y discontinuos tienen gran similitud entre sí; ambos pueden controlarse mediante un **controlador secuencial**.

Características de los procesos controlados de forma secuencial:

- El proceso puede descomponerse en una serie de estados que se activan de forma secuencial (variables internas).
- Cada estado, cuando está activo, realiza una serie de acciones sobre los actuadores (variables de salida).
- Las señales procedentes de los sensores (variables de entrada) controlan la transición entre estados.
- Las variables empleadas son múltiples y de tipo discreto: solo toman dos valores, activado o desactivado.

Según cómo se realiza la transición entre estados, los controladores secuenciales pueden ser:

- **Asíncronos**: la transición entre estados se produce en el mismo instante en que se produce la variación en las variables de entrada.
- **Síncronos**: la transición a un estado determinado se produce en función de las variables de entrada y de la variable asociada al estado anterior, sincronizadas mediante un reloj de frecuencia fija.

Ambos tipos se pueden construir con lógica cableada, elementos discretos de tecnología electrónica, eléctrica o neumática.

**1.1.2.3. Desarrollo de los sistemas automatizados. Ventajas y desventajas**

La automatización juega un papel cada vez más importante en la economía mundial. Los ingenieros combinan dispositivos automatizados con herramientas organizacionales y matemáticas para crear sistemas complejos que cubren un abanico cada vez más amplio de actividades humanas.

La automatización es el uso de sistemas de control (como computadores) para controlar maquinaria y procesos industriales, reemplazando a los operadores humanos. Los controladores lógicos programables (PLC) son computadoras especializadas frecuentemente usadas para sincronizar el flujo de entradas provenientes de sensores y eventos con el flujo de salidas dirigidas hacia actuadores y otros eventos, permitiendo un control preciso y ajustado de casi cualquier proceso industrial.

Los interfaces hombre-máquina (HMI) se emplean típicamente para comunicarse con PLCs y otras computadoras, por ejemplo para el ingreso y monitoreo de temperaturas o presiones de un sistema de control, o en respuesta a una emergencia.

El campo del control automático, desde el punto de vista práctico, se divide en tres secciones:

- Control de procesos que involucran cambios químicos y de estado.
- Control de manufactura que involucra cambio de forma.
- Control de posición, fundamentalmente con niveles de potencia por encima de unos pocos watts.

**Ventajas del control automático** (como se vio en Fundamentos de Automatización):

- Aumento en la cantidad o número de productos.
- Mejora de la calidad de los productos.
- Economía de materiales.
- Economía de energía o potencia.
- Economía de equipos industriales.
- Reducción de la inversión de mano de obra en tareas no especializadas.

Estos factores contribuyen a aumentar la productividad. La difusión del control automático en la industria ha creado la necesidad de elevar el nivel educativo de un sector de obreros semi-especializados, capacitándolos para el manejo y mantenimiento de equipos e instrumentos de control.

**Desventajas de la automatización:**

- Requiere mayor conocimiento.
- Mayor costo.
- Resistencia al cambio.
- Despido de trabajadores.

### 1.1.3. Niveles de desarrollo de la automatización industrial

La aparición en el mercado de las computadoras trajo consigo su empleo para el control y supervisión de procesos industriales. Supervisar valores anómalos y generar alarmas fueron los primeros pasos hacia su empleo en lazos de control que requerían cálculos complejos y gran precisión. El desarrollo de los PLC en los años 80 dio lugar al control distribuido, en el cual el micro o la computadora controla más de una variable del sistema con poder de decisión sobre las mismas; el fallo de una parte del sistema controlado así no compromete el funcionamiento del resto del proceso.

La aparición de los sensores inteligentes y las máquinas de control numérico flexibilizó el proceso productivo, de manera que un simple cambio de programa cambia radicalmente las posibilidades de la industria.

Este desarrollo permitió que otros departamentos de la fábrica se involucraran directamente en el proceso productivo, estableciéndose el **control jerarquizado**: cada nivel de automatización realiza labores específicas, y la información se transmite en sentido ascendente o descendente en la pirámide de automatización industrial.

- **Nivel inferior**: control digital de las variables del sistema o de los elementos de fabricación. Se adquieren los datos de los sensores y se actúa según los algoritmos de control y las señales de referencia seleccionadas en el nivel superior.
- **Nivel de supervisión y control**: se elabora la información procedente del nivel inferior, se informa al operario de la situación y se corrigen algoritmos, referencias y programas.
- **Tercer y cuarto nivel**: se coordina y controla el área de producción, y se planifica la producción general de la empresa o fábrica.
- **Nivel superior**: se establece la política de producción, incluyendo gestión, recursos, contabilidad y costo de mercado.

La comunicación entre los diferentes niveles de la pirámide se realiza mediante redes de comunicación, desarrolladas en paralelo con los sistemas de automatización industrial.

## 1.2. Esquema general

### 1.2.1. Elementos de un proceso a automatizar

**1.2.1.1. Elementos de entrada de órdenes**

Permiten al operador introducir órdenes al sistema. Se clasifican en:

- **Binarios**: pulsadores, interruptores, conmutadores, etc.
- **Numéricos**: teclados numéricos, selectores de varias posiciones, etc.

**1.2.1.2. Elementos de entrada de información**

Según el tipo de señal:

- **Binario**: termostato.
- **Numérico**: encoder.
- **Analógico**: transductor. Rangos: 0-10 V, 0-20 mA, -10 a 10 V y 4 a 20 mA.

Las señales de corriente tienen la ventaja, respecto a las de tensión, de no verse afectadas por la longitud de los conductores. Además, el tipo 4-20 mA facilita la detección de averías, ya que el valor de 0 mA solo se obtiene en caso de mal funcionamiento — por eso es el más utilizado.

Magnitudes a detectar o medir: temperatura, presión, caudal, pH, velocidad, aceleración, fuerza, par mecánico, deformación, corriente eléctrica, tensión eléctrica, potencia, iluminación, presencia (final de carrera), proximidad (inductivos, capacitivos, etc.). También se incluyen dentro de esta categoría los avisos (binarios) procedentes de los preaccionadores: contactos de contactores, fusibles, relés térmicos, etc.

**1.2.1.3. Elementos de salida de información**

Se encargan de la comunicación con el operador; se clasifican de forma similar a los de entrada de órdenes.

- **Binarios**: dan información del tipo sí/no, cierto/falso, activado/desactivado. Ejemplos: pilotos, sirenas, timbres.
- **Alfanuméricos**: displays de 7 segmentos, pantallas de cristal líquido, etc.

**1.2.1.4. Preaccionadores y accionadores**

Los accionadores actúan sobre el proceso, pero a veces son accionados por preaccionadores. Por ejemplo, un motor eléctrico necesita un contactor, un interruptor o un variador de velocidad para accionar; un cilindro neumático necesita una válvula distribuidora. Entre ellos hay elementos binarios y analógicos.

**1.2.1.5. Sistema de tratamiento de la información**

Establece cómo se combinan las entradas de información para activar las salidas del proceso.

- Si una combinación de entradas siempre produce la misma combinación de salidas, el proceso es de tipo **combinacional**.
- Si una combinación de entradas produce combinaciones diferentes de salidas dependiendo de la historia del proceso, el proceso es de tipo **secuencial**.

### 1.2.2. Evolución de los automatismos industriales

**1.2.2.1. La lógica cableada**

Fue la primera en usarse y la de mayor difusión. Consiste en interconectar relés con los elementos de entrada y salida, mediante conexiones en serie y paralelo, hasta obtener el automatismo deseado. Se dispone de relés de conmutación, contactores, relés de funciones lógicas, temporizadores, relés de control, etc.

Inconvenientes: gran volumen ocupado (las dimensiones de un relé son importantes) y pocas funciones posibles (enclavamiento, negación), lo que hace que los esquemas se vuelvan difíciles de interpretar al reducir su número. Cuando los automatismos se complican, los esquemas se realizan de forma intuitiva, y modificarlos a menudo implica desmontar y recablear buena parte del sistema. Además, la presencia de contactos móviles exige mantenimiento importante. En automatismos sencillos sigue teniendo ventajas, ya que es la única tecnología que no requiere forzosamente un cambio de niveles de tensión entre el automatismo y los elementos a controlar.

Las representaciones a base de relés siguen siendo la forma más familiar de representar un automatismo para el personal de mantenimiento, razón por la cual los autómatas programables usan un lenguaje de programación a base de diagramas de relés (ladder).

**1.2.2.2. La lógica neumática**

Usa aire comprimido y elementos como válvulas distribuidoras, detectores, pulsadores y pilotos neumáticos, válvulas biestables, cilindros neumáticos, válvulas de funciones lógicas, etc. Ventaja: no se ve afectada por interferencias electromagnéticas. Desventajas: necesita mucho espacio, genera ruido importante, requiere compresor, y la distribución de aire comprimido es más compleja que la de la energía eléctrica (diámetro de tubos, radio mínimo de curvatura). Requiere mantenimiento importante. Resulta interesante para automatismos sencillos que actúan sobre accionamientos neumáticos. Para mayor potencia o precisión puede usarse la oleohidráulica.

**1.2.2.3. La lógica estática discreta**

Tras la aparición de los transistores se empezaron a usar circuitos electrónicos (resistencias, transistores, diodos) para controlar los automatismos. Inconveniente: requiere cambio de niveles de tensión entre potencia y lógica; ventaja en circuitos complejos: reducción importante de volumen, y al no haber contactos móviles que se desgasten, mayor velocidad de respuesta. Las puertas lógicas simplificaron el montaje al permitir conectar directamente salidas de una a entradas de otra.

**1.2.2.4. La lógica estática integrada**

Con los circuitos integrados, las puertas con circuitos compactos se sustituyeron por circuitos integrados de menor volumen. La mayor parte de la lógica se redujo a dos familias: TTL (5 V) y CMOS (habitualmente 12 V), con circuitos integrados para las principales funciones (puertas lógicas, biestables, temporizadores, contadores, selectores, decodificadores, etc.). Inconvenientes: necesidad de cambio de niveles de tensión y la imposibilidad de modificación — un cambio requiere un nuevo circuito impreso.

**1.2.2.5. La lógica estática programada**

Para resolver la dificultad de modificación de la lógica estática y cableada, se usan sistemas basados en microprocesador, que permiten mayor reducción del circuito electrónico y hacerlo programable, de forma que modificar las relaciones lógicas es relativamente sencillo. Sigue presentando el inconveniente de que añadir una entrada o salida adicional implica un nuevo circuito impreso.

**1.2.2.6. El ordenador de proceso**

Mejora de los sistemas basados en microprocesador: similar al ordenador de gestión, pero preparado para el ambiente industrial y equipado con entradas y salidas. Ventaja adicional: capacidad para cálculos complejos. Inconveniente importante: requiere personal informático con conocimientos de automatización industrial y del proceso a automatizar.

**1.2.2.7. El autómata programable industrial**

Ante esta problemática aparecieron los autómatas programables (PLC, *Programmable Logic Controller*). Inicialmente se concibieron como circuitos electrónicos basados en microprocesador que debían funcionar como lógica estática, pero con funciones programables y fácilmente modificables. Para que la programación y el mantenimiento fuesen posibles sin formación informática del personal, la mayoría de los equipos permitían programar reproduciendo un diagrama de relés.

### 1.2.3. Selección de la tecnología adecuada para el proceso a automatizar

Soluciones tecnológicas disponibles:

| Solución tecnológica | Elementos de trabajo |
|---|---|
| Electromagnética | Relés, temporizadores y contadores |
| Electrónica cableada | Puertas lógicas, biestables y contadores electrónicos |
| Electrónica programada | Ordenadores industriales, autómatas programables |
| Neumática | Válvulas distribuidoras |

La solución más moderna no siempre es la que mejor se adapta al proceso; es necesario analizar la tecnología más adecuada a la función requerida y con mejor relación calidad-precio. Antes de decidir una tecnología es necesario tener definido:

1. **Necesidad de entradas y salidas**: número y tipo (analógicas, digitales, codificadas...).
2. **Necesidad de elementos auxiliares**: contadores, temporizadores, relés internos (o biestables), etc.
3. **Necesidad de potencia de cálculo**: operaciones aritméticas y de comparación, raíces cuadradas, funciones trigonométricas, logarítmicas y exponenciales, bucles PID.
4. **Necesidad de tarjetas inteligentes**: control de ejes, control de motores paso a paso, etc.
5. **Comunicación con operadores**: definir la comunicación con el hombre y la información a intercambiar.
6. **Comunicación con otros equipos** de control y auxiliares (autómatas, ordenadores de proceso o de gestión, impresoras, etc.), indicando la jerarquía si procede.
7. **Variabilidad**: si se prevé que el proceso evolucione con mejoras y refinamientos, conviene poder introducir modificaciones en cada serie de fabricación.

Conclusiones:

- **Lógica cableada** (electromagnética o electrónica): adecuada cuando solo se necesitan funciones binarias, temporización y conteo sobre un número reducido (hasta 15-20) de entradas y salidas, básicamente para equipos eléctricos.
- **Neumática**: adecuada cuando solo se necesitan funciones binarias y temporización sobre un número reducido (hasta 15-20) de entradas y salidas, si los equipos a controlar son neumáticos.
- **Microprocesadores**: adecuados para sistemas que requieren operaciones aritméticas o de comparación sobre un número moderado (entre 15 y 40) de entradas y salidas. No permiten variar el número de entradas/salidas una vez terminado el equipo.
- **Ordenador industrial**: por ahora, la mejor herramienta cuando se necesitan operaciones matemáticas complejas y/o almacenamiento de información, trabajando sobre un número no muy alto (hasta unas 700) de entradas y salidas.
- **Autómata programable**: recomendable para sistemas que requieren operaciones aritméticas o de comparación sobre un número medio o elevado (por encima de 30) de entradas y salidas. La capacidad de cálculo, comunicación y el número de entradas/salidas disponibles va en aumento.

**1.2.3.1. Velocidad de respuesta**

Los sistemas más lentos son el electromagnético y el neumático, ya que su respuesta depende de un movimiento que debe vencer inercias iniciales. Los circuitos de puertas electrónicas son los más rápidos, ya que todas las entradas se tratan simultáneamente. Los equipos electrónicos programados son rápidos, pero menos que las puertas, ya que las decisiones se toman una tras otra y no simultáneamente. Ordenar convenientemente el programa, fragmentarlo en partes con diferentes prioridades de ejecución y usar interrupciones por tiempo son herramientas que el programador puede usar para conseguir el tiempo de respuesta requerido.

**1.2.3.2. Entorno de trabajo**

Los autómatas programables son los equipos programables más preparados para el agresivo ambiente industrial. Los equipos electrónicos cableados y los electromecánicos también son bastante robustos, pero en ambientes con importantes perturbaciones electromagnéticas pueden ser poco fiables; los equipos electromecánicos, además, son propensos a producir chispas, lo que los hace prohibitivos en atmósferas explosivas o con riesgo de incendio.

También hay que considerar que implantar diferentes tecnologías en una misma planta implica la necesidad de cursos de aprendizaje para el personal, o disponer de personal distinto para cada tecnología. La automatización con ordenadores industriales requiere que el personal de mantenimiento tenga amplios conocimientos de programación.

### 1.2.4. Esquema general de un sistema a automatizar

El esquema de automatización industrial más difundido en los ambientes universitarios incluye las redes que se utilizan para la comunicación, mostrando algunos de los componentes esenciales de los primeros niveles de la pirámide de automatización así como las redes de comunicación involucradas, destacando los tiempos de ciclo de bus de cada nivel.

En esta asignatura integraremos los conocimientos alcanzados hasta ahora en las disciplinas mencionadas, a la vez que conoceremos nuevos elementos que se utilizan en los sistemas de automatización industrial, aprendiendo a seleccionarlos y explotarlos correctamente.

## Conclusiones

En la actividad de hoy se explicaron aspectos generales de la asignatura, incluyendo las particularidades del sistema evaluativo. Se refrescaron aspectos relacionados con los sistemas automatizados y se analizaron los esquemas que representan los sistemas de automatización industrial, con referencia a las redes de comunicación que ellos utilizan.

## Preguntas de comprobación

1. Mencione las ventajas asociadas a la automatización industrial. Explique en qué están fundamentadas.
2. Mencione las desventajas asociadas a la automatización industrial. Explique en qué están fundamentadas.
3. Identifique los diferentes niveles de automatización relacionándolos con tareas a ellos asociadas.

## Bibliografía y estudio independiente

1. *Automatización. Problemas resueltos con autómatas programables.* J. Pedro Romera, Antonio Morite y Sebastián Montoso. Páginas 1-17.
2. *Automatismos eléctricos programables.* Oriol Boix Aragonés, Miguel A. Saigí Grau y Ferran Zabaleta Alaña. Páginas 13-15.
3. Notas de clase. Moodle facultad.

**Tarea**: en la bibliografía orientada, ampliar sobre los aspectos tratados en clase y escoger un proceso industrial cualquiera para identificar cada una de las partes que se involucran en un sistema de control. Ejemplo: en la maniobra de un ascensor, las entradas son los pulsadores de los pisos y la cabina, los detectores de posición de la cabina, los detectores de puerta abierta, el relé térmico, etc.; los elementos de salida son los pilotos, las alarmas y el motor.

## Motivación

En la próxima conferencia comenzaremos con el estudio de los sensores y sistemas de medición correspondientes al primer nivel de automatización.
