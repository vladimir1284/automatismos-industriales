# Conferencia 2. Sensores y sistemas de medición

## Objetivos

1. Definir conceptos relacionados con las acciones medir, sensar y controlar.
2. Explicar las cualidades fundamentales de los instrumentos que utilizan los sistemas de medición industrial.
3. Enumerar las partes que integran un sistema de medición industrial.

## Rememoración de la clase anterior

En la conferencia anterior vimos los aspectos generales de la asignatura y algunos conceptos relacionados con los procesos de automatización industrial, el desarrollo que ha alcanzado la humanidad en aspectos relacionados al tema y los niveles de automatización industrial instaurados por el hombre. Por último, describimos los componentes fundamentales de cada nivel, enfatizando en los que corresponden a este curso.

**Preguntas de evaluación**

1. ¿Cuáles son los elementos de un sistema automatizado?
2. Mencione los niveles de automatización y explique cómo están relacionados.
3. ¿Cuáles son los elementos que se encuentran en el nivel de control directo?

## 1.3. Sensores y sistemas de medición

### 1.3.0. Introducción

En esta asignatura trataremos los elementos básicos de los sistemas de instrumentación y control, con el objetivo de desarrollar las habilidades necesarias para comprender estos sistemas, utilizar la información que brindan y explotarlos en función del ahorro energético.

En su trabajo futuro como ingenieros, en la inmensa mayoría de los casos deberán comprender el funcionamiento de sistemas ya construidos, o prepararse para enfrentar remodelaciones o inversiones importantes en la empresa que incluyan la esfera de la automatización.

Actualmente, en la industria de procesos y en muchas instalaciones de servicios ya se tiene un alto grado de automatización básica: salas de control con sistemas de control distribuido (DCS), PLCs para sistemas de seguridad o secuenciamiento, etc. Incluso muchas industrias tienen elementos de control avanzado. Del mismo modo se extienden y afianzan los buses de campo, a la vez que los sistemas basados en ordenador y la normalización de las comunicaciones permiten disponer de cantidades ingentes de datos de proceso y de potencia de cálculo a precios asequibles.

Para entender mejor esta temática conviene aclarar algunos conceptos, ya que los instrumentos que se utilizan para sensar y medir en los sistemas de automatización industrial son relativamente complejos y su función puede entenderse mejor si se clasifican adecuadamente. Dos clasificaciones bastante extendidas son: por función del instrumento y por variable de proceso a medir.

**Clasificación de los instrumentos según la variable a medir**

Los instrumentos se clasifican de acuerdo con la variable de proceso medida por el sistema del que forman parte:

- Instrumentos de caudal.
- Instrumentos de nivel.
- Instrumentos de presión.
- Instrumentos de temperatura.
- Instrumentos de humedad.
- Instrumentos de viscosidad, etc.

Si un sistema de medición de presión da una respuesta en forma de corriente, los instrumentos de ese sistema seguirán clasificándose como de presión.

**Clasificación de los instrumentos por función**

- **Instrumentos ciegos**: no tienen indicación visible de la variable. Ej.: termostatos o presostatos (solo permiten calibrar el punto de disparo); transmisores de caudal, presión, etc. sin indicación.
- **Instrumentos indicadores**: disponen de un indicador y escala sobre la que puede leerse el valor de la variable.
- **Instrumentos registradores**: registran gráficamente la evolución de la variable.
- **Elementos primarios**: en contacto con el medio, obtienen una señal que sirve de indicación para generar la medición de la variable controlada. Ej.: un termómetro.
- **Transductores**: reciben una señal de entrada función de una o más cantidades físicas y la convierten, modificada o no, en una señal de salida. Ej.: un relé, un elemento primario, un convertidor presión-intensidad.
- **Transmisores**: captan la señal producida por el elemento primario y la envían a distancia a un receptor, en forma de señal neumática (3-15 psi), electrónica (4-20 mA), pulsos, protocolarizada (HART) o bus de campo (Fieldbus Foundation, Profibus, etc.). Dan una señal continua de la variable de proceso. Los hay ciegos (sin indicador local) y con indicador local incorporado.
- **Indicadores locales**: captan la variable de proceso y la muestran en una escala visible localmente. Los más utilizados son los manómetros (presión), termómetros (temperatura) y rotámetros (caudal). Normalmente no llevan electrónica asociada, aunque también se consideran indicadores locales los indicadores electrónicos conectados a los transmisores (analógicos o digitales).
- **Interruptores**: captan la variable de proceso y, para un valor establecido, actúan sobre un interruptor — cambian de reposo a activado cuando el proceso llega a un valor predeterminado. Es un instrumento todo-nada. Ejemplos: presostatos (presión), termostatos (temperatura), interruptores de nivel, flujostatos (caudal).
- **Convertidores**: reciben un tipo de señal de un instrumento y la modifican a otro tipo (neumática a electrónica, mV a mA, señal continua a tipo contacto, etc.). Se usan habitualmente por necesidades de los sistemas de control de homogeneización.
- **Receptores**: reciben las señales procedentes de los transmisores y las indican o registran.
- **Controladores**: comparan la variable controlada (presión, nivel, temperatura) con un valor deseado y ejercen una acción correctiva de acuerdo con la desviación.
- **Elemento final de control**: recibe la señal del controlador y modifica el caudal del fluido o agente de control. Los más habituales son las válvulas de control, servomotores o variadores de frecuencia.

### 1.3.1. Generalidades sobre el proceso de medir

El propio desarrollo de la humanidad ha llevado a que sea necesario manejar un volumen de información inmenso. En todos los sistemas de control es necesario medir las variables a controlar, utilizar esta información para diagnosticar la mejor forma de operar el proceso o la planta, y disponer de medios que permitan modificarlo para que se comporte de la manera deseada.

La secuencia medir-decidir-actuar es válida tanto para una sola variable como para una planta completa, donde medir una propiedad en el producto terminado puede conllevar acciones sobre determinadas operaciones en la línea del proceso. No solo es necesario medir con el propósito de controlar; también es habitual medir otras variables para tener información completa de lo que está sucediendo, y transmitirla con el objetivo de representarla o almacenarla para uso posterior. Para medir se utilizan instrumentos.

> Los instrumentos utilizados para la detección y medición de magnitudes físicas son los **sensores**. Estos se basan en fenómenos físicos para obtener señales que pueden ser medidas, típicamente voltajes o corrientes.

Fenómenos físicos empleados para construir sensores: la temperatura, la posición angular o lineal, el sonido, la intensidad luminosa, etc.

Los sensores se pueden dividir en:

- **Pasivos**: necesitan un aporte de energía externa.
    - **Resistivos**: transforman la variación de la magnitud a medir en una variación de su resistencia eléctrica. Ejemplo: un termistor, para medir temperaturas.
    - **Capacitivos**: transforman la variación de la magnitud a medir en una variación de la capacidad de un condensador. Ejemplo: un condensador con un material en el dieléctrico que cambia su conductividad ante la presencia de ciertas sustancias.
    - **Inductivos**: transforman la variación de la magnitud a medir en una variación de la inductancia de una bobina. Ejemplo: una bobina con núcleo móvil, para medir desplazamientos.
- **Activos**: capaces de generar su propia energía (también llamados sensores generadores). Ejemplo: un transistor en el que la puerta se sustituye por una membrana permeable solo a algunas sustancias (ISFET), para medir concentraciones.

Muchos sensores basados en propiedades eléctricas de materiales y dispositivos producen señales que requieren acondicionamiento para ser utilizadas por el resto de los instrumentos; a menudo se emplean amplificadores como acondicionadores de señal, elevando corrientes y voltajes. A veces también se aprovecha una característica no deseada de un elemento, como la dependencia de la temperatura en los semiconductores, para usarlo como sensor.

**1.3.1.1. Otros conceptos. Comparaciones**

- **Sensor**: instrumento que produce una señal, usualmente eléctrica, que refleja el valor de una propiedad mediante alguna correlación definida (su ganancia). En términos estrictos, no altera la propiedad sensada — un sensor de temperatura ideal no agrega ni cede calor a la masa sensada (p. ej. un termómetro de radiación infrarroja).
- **Transductor**: instrumento que convierte una forma de energía en otra (o una propiedad en otra).

Las diferencias entre sensores y transductores son ligeras: un sensor realiza funciones de transductor, y un transductor tiene necesariamente que sensar alguna cantidad física. La diferencia fundamental radica en la eficiencia de la conversión energética, más trascendental en los transductores propiamente dichos. Por ejemplo, un generador eléctrico en una caída de agua es un transductor de energía cinética de un fluido en energía eléctrica; análogamente, un transductor de flujo a señal eléctrica podría consistir en un pequeño generador de paletas movido por el caudal a medir. Como los transductores siempre retiran algo de energía de la propiedad medida, al usarlos para cuantificar una propiedad de un proceso hay que verificar que esa pérdida no impacte al proceso sensado de forma importante — es responsabilidad del diseñador asegurar que la medición no altere el proceso.

La señal de salida de un sensor no suele ser válida para su procesado directo: por lo general requiere amplificación para adaptar sus niveles al resto de la circuitería. En algunos casos la salida del sensor no es lineal, o depende de las condiciones de funcionamiento (temperatura ambiente, tensión de alimentación), por lo que hay que linealizar el sensor y compensar sus variaciones (compensación hardware o software). Otras veces la información no está en el nivel de tensión sino en la frecuencia o la corriente, por lo que se necesitan demoduladores, filtros o convertidores corriente-tensión. Los circuitos que adecuan estas señales se conocen como **acondicionadores**.

Un ejemplo clásico de acondicionador es el puente de Wheatstone, donde se sustituyen una o varias impedancias del puente por sensores, seguido típicamente de un amplificador. Entre el acondicionador y el siguiente paso del proceso de señal puede haber cierta distancia o alto nivel de ruido, por lo que una señal de tensión resulta inadecuada; en ese caso se adecua la señal para su transporte transmitiendo la información en frecuencia o en corriente (por ejemplo, el bucle de 4-20 mA).

**1.3.1.2. Especificaciones**

Aplicables tanto a sensores como a actuadores (no todas a la vez):

- **Precisión**: máxima diferencia entre el valor indicado y el valor real de la magnitud, expresada como desviación en porcentaje del valor máximo. Ejemplo: un sensor que mide 50 N con precisión de ±1% puede indicar entre 49.5 N y 50.5 N.
- **Linealidad**: la función que relaciona la variable de salida con la de entrada es lineal. Cuando la relación no es lineal, convertir la salida del sensor a una cantidad calculada se vuelve más complejo.
- **Repetibilidad**: habilidad del instrumento para entregar la misma lectura en aplicaciones repetidas del mismo valor de la variable medida. Ejemplo: a una misma presión de 25 kg/cm², un manómetro de precisión 1 kg/cm² que entrega 25.5, 26, 24.3 y 24 kg/cm² es repetible; una lectura de 27 kg/cm² indicaría un problema de repetibilidad (salvo que se trate de histéresis).
- **Histéresis**: diferencia entre los valores indicados por el sistema para un mismo valor de magnitud medida, según se haya alcanzado por valores crecientes o decrecientes.
- **Resolución**: menor incremento que el sensor puede detectar. Ejemplo: un sensor que mide hasta 25 cm de desplazamiento lineal con salida de 0 a 100 tiene una resolución de 2.5 mm.
- **Rango**: límites naturales del sensor. Ejemplo: un sensor de posición angular que solo puede rotar 200 grados.
- **Ambiente**: limitaciones por factores ambientales (temperatura, humedad, presión, polvo/aceite, atmósferas corrosivas). Ejemplo: muchos sensores deben trabajar en humedades relativas (RH) entre 10% y 80%.
- **Respuesta dinámica**: rango de frecuencia para la operación regular del sensor; típicamente hay un límite superior de frecuencia de operación, y ocasionalmente uno inferior.
- **Calibración**: al fabricarse o instalarse, muchos sensores necesitan calibrarse para determinar o ajustar la relación entre el fenómeno de entrada y la salida; puede requerir equipo especial y repetirse frecuentemente.
- **Costo**: generalmente mayor precisión cuesta más. Algunos sensores son económicos, pero el costo del equipamiento de acondicionamiento de señal es significativo.

**1.3.1.3. Clasificación**

La clasificación de los sensores puede realizarse atendiendo a: principio de conversión, variable medida, tecnología empleada o aplicación. A continuación se dividen por aplicación, según las categorías más comunes en los sistemas de medición.

### 1.3.2. Sensores

**Sensores de temperatura**

La medición de temperatura es muy común en todos los procesos y sistemas de control. Rangos típicos:

| Tipo de sistema | Temperaturas a medir |
|---|---|
| Refrigeración | -60 ºC a 0 ºC |
| Climatización | 0 a 100 ºC |
| Metalurgia y refinación de metales | hasta 1600 ºC |
| Plasma | por encima de 2000 ºC |

**1.3.2.1. Termopares**

Muy utilizados en la mayoría de las aplicaciones industriales por la sencillez de su construcción, la precisión que permiten cuando están debidamente calibrados, su bajo costo y fiabilidad. Miden temperaturas desde -200 ºC hasta cerca de 2000 ºC. Los fabricantes, ajustados a normas internacionales, establecen la composición de los metales de los termopares y sus cables de extensión, lo que permite intercambiabilidad de elementos primarios e instrumentos (indicadores, registradores, transmisores y controladores de temperatura).

Cada metal tiene un nivel de potencial natural; cuando dos metales diferentes se unen por sus extremos y estos están a diferentes temperaturas, se genera una diferencia de potencial que hace circular una corriente eléctrica por el circuito. Este principio (efecto Seebeck) fue descubierto por T. J. Seebeck en 1821, y en él se basa la construcción de los termopares.

La unión a mayor temperatura se denomina **unión caliente** y se ubica donde se quiere medir la temperatura; la otra se ubica junto al instrumento de medida y se denomina **unión fría** o de referencia. Existen tablas que indican la f.e.m. en milivoltios para diversas temperaturas de la unión caliente cuando la unión fría se mantiene a una temperatura de referencia (normalmente 0 ºC). En la práctica, la unión de referencia suele estar a temperatura ambiente, distinta de cero y variable con el tiempo, por lo que hay que corregir automática o manualmente.

Existen varios tipos normalizados de termopares, identificados por letra (las más típicas: J, K y T), que difieren en el material de los metales A y B, y por tanto en el rango de trabajo, el voltaje generado por grado y la máxima temperatura útil. El termopar más conveniente se selecciona según el rango de temperatura, los efectos corrosivos del ambiente y la precisión deseada.

Por su naturaleza, los termopares presentan una resistencia prácticamente nula y su capacidad de generar potencia es muy débil, por lo que se utiliza un amplificador que demande el mínimo de corriente posible del termopar.

Es posible conectar dos o más termopares según la aplicación: en serie directamente, cuando las FEM de salida son muy pequeñas, para sumar las FEM individuales; o en oposición, para medir la diferencia de temperaturas (el termopar que mide la mayor temperatura debe conectarse con su salida positiva al positivo del milivoltímetro).

**1.3.2.2. Termorresistencias**

Cuando se necesita mayor precisión que la que permiten los termopares, o para medir pequeñas desviaciones de temperatura (del orden de 0.02 ºC), se recurre a termorresistencias. También son imprescindibles al medir temperaturas cercanas a la ambiente.

Se basan en que la resistencia de los metales aumenta al elevarse la temperatura, por lo que esta puede medirse mediante la resistencia de un alambre. Normalmente emplean un hilo o lámina de platino, níquel, cobre o aleaciones de hierro y níquel, enrollado sobre un soporte aislante (generalmente cerámico) y cubierto externamente por una funda termométrica (metal, cerámica, vidrio, pirex, etc.).

La variación de la resistencia de un conductor con la temperatura se puede representar mediante una expresión lineal:

R = R₀ (1 + αT)

donde R es la resistencia en Ω a la temperatura medida T (ºC), R₀ es la resistencia en Ω a 0 ºC, y α es el coeficiente de temperatura de la resistencia.

Los sensores de temperatura normados para instrumentación se basan típicamente en la resistividad del platino; el más común tiene 100 Ω a 0 ºC (de ahí su nombre: **PT100**).

| Metal | Resistividad (μΩ·cm) | Coeficiente de temperatura (Ω/Ω/ºC) | Intervalo útil (ºC) | Resistencia a 0 ºC (Ω) | Precisión (ºC) |
|---|---|---|---|---|---|
| Platino | 9.83 | 0.00392 | -200 a 950 | 100 | 0.01 |
| Níquel | 6.38 | 0.0063 a 0.0066 | -150 a 300 | 100 | 0.50 |
| Cobre | 1.56 | 0.00425 | -200 a 120 | 10 | 0.10 |

El elemento de medida puede ser un puente de resistencia de corriente directa o alterna. En el montaje de dos hilos (el más sencillo y barato), la termorresistencia se une a uno de los brazos del puente mediante los hilos a y b; en la condición de balance, el valor leído en R₃ no se corresponde exactamente con la resistencia de la sonda, porque incluye la resistencia de los propios hilos de conexión (K·(a+b)). Este montaje solo se emplea cuando la resistencia del cable es moderada y la lectura no requiere mucha exactitud; para mayor exactitud existe el montaje de tres hilos.

**Sensores de presión**

La presión es una fuerza por unidad de superficie que un material ejerce sobre otro; en el Sistema Internacional se mide en N/m² o Pascal (Pa). Los sensores de presión normalmente constan de dos partes: la primera convierte la presión en fuerza o desplazamiento, y la segunda convierte esa fuerza o desplazamiento en una señal eléctrica.

Tipos de medición:

- **Presión manométrica**: diferencia entre la presión medida y la del ambiente (a nivel del mar, 101.3 kPa).
- **Presión diferencial**: mide la diferencia entre dos presiones, ninguna necesariamente igual a la atmosférica.
- **Presión absoluta**: usa un sensor de presión diferencial con un lado referenciado a cero (cercano al vacío total).

**Tubos de Bourdon**

El elemento de medida de presión más usual: un tubo de sección elíptica enrollado en espiral o hélice que tiende a enderezarse cuando aumenta la presión interior, con un movimiento proporcional a la presión aplicada. Se construyen en materiales elásticos (bronce, cobre-berilio, acero, acero inoxidable, etc., según el fluido). El desplazamiento (lineal o angular) acciona un sensor de posición, como un transformador diferencial, para convertirlo en señal eléctrica. Disponibles en rangos de 200 a 700 000 kPa, con precisión típica de 0.5%; empleo típico en manómetros para agua y vapor.

**Sensores de caudal**

Miden la cantidad de material que pasa por un punto en cierto tiempo (líquidos o gases en tubería o canal abierto). Se dividen en los basados en presión diferencial, los que accionan un dispositivo mecánico y los de tecnología más sofisticada.

*Basados en presión diferencial*: la presión de un fluido en movimiento es proporcional al caudal. El sensor más sencillo es la placa de orificio: una restricción en la tubería que provoca una caída de presión, medida con dos tomas (aguas arriba y aguas abajo). También se usan el tubo de Venturi, turbinas, medidores electromagnéticos y medidores ultrasónicos de caudal.

**Sensores de nivel**

Miden la altura de un líquido en un recipiente; se clasifican en discretos y continuos.

- **Discretos**: solo detectan si el líquido está a un nivel determinado. El tipo más sencillo usa un flotante y un interruptor límite (a veces el flotante va unido a una varilla vertical). También se usan fotoceldas en las paredes del tanque (la señal del fotodetector cambia cuando el haz de luz queda sumergido) o electrodos, en líquidos ligeramente conductores, que cierran un circuito al ser bañados por el líquido.
- **Continuos**: la señal es proporcional a la altura del líquido. Métodos: flotante sobre sensor de posición; celdas de carga que monitorean el peso (calculando el nivel según diámetro del tanque, peso vacío y densidad del líquido); electrodos verticales que dan una resistencia o capacidad proporcional al nivel; detectores de rango ultrasónicos montados sobre el tanque; o métodos hidrostáticos, midiendo la presión en el fondo del tanque (proporcional a la columna de líquido) con sensores de presión diferencial — uno de los métodos más comunes en la industria.

**Sensores de desplazamiento angular**

Reportan la posición angular de un objeto respecto a una referencia. Incluyen potenciómetros, encoders y tacómetros.

**Sensores de posición lineal**

Para conocer la posición de elementos que se desplazan linealmente. Incluyen el potenciómetro lineal y el transformador diferencial variable lineal (LVDT).

**Sensores de proximidad**

Indican al controlador si una parte móvil está en cierto lugar. Entre las variantes: sensores ópticos y sensores magnéticos.

- **Sensores ópticos**: emplean una fuente de luz y un fotosensor dispuestos de manera que el objeto a detectar corte la trayectoria del haz luminoso. Comúnmente usan un reflector, de forma que detector y fuente estén en el mismo encapsulado; la fuente de luz puede modularse para que el detector distinga el haz de otra luz ambiental. Se emplean cuatro tipos de fotodetectores: fotorresistencias, fotodiodos, fototransistores y celdas fotovoltaicas.

**Otros tipos de sensores**

En la práctica profesional existe un sinnúmero de sensores desarrollados según las exigencias del proceso tecnológico; es imposible recogerlos todos aquí. El texto del profesor Ramón Medina, *Instrumentación Industrial*, amplía estas temáticas, por ejemplo:

- Capítulo 4. Medición de tensión y carga.
- Capítulo 5. Medición de vibración y aceleración.
- Capítulo 7. Medición de flujo.

### 1.3.3. Sensores inteligentes

Un sensor inteligente combina la función de detección con alguna función de procesamiento de señal y comunicación, generalmente mediante un microprocesador — de ahí que a cualquier combinación de sensor con microprocesador se le llame sensor inteligente. Además de la transducción, puede ofrecer:

- Acondicionamiento de señal.
- Correcciones de cero, ganancia y linealidad.
- Compensación ambiental (temperatura, humedad).
- Escalado.
- Conversión de unidades.
- Comunicación digital.
- Autodiagnóstico.
- Detección y acción sobre el sistema al que se conecta.

### 1.3.4. Criterios de selección de un sensor

- La magnitud que se mide: tipo y rango de la magnitud a medir.
- El principio básico de transducción más adecuado: garantizar compatibilidad entre las características de entrada/salida del sensor y del resto del sistema.
- La exactitud requerida: no linealidad, histéresis, comportamiento en frecuencia, efectos de temperatura, aceleraciones, golpes y vibraciones.
- Otras consideraciones: disponibilidad, costo, condiciones ambientales a las que se someterá.

### 1.3.5. Sistema de medición

Un sistema de medición está compuesto por uno o varios instrumentos, según las necesidades del proceso y la variable a medir.

Siempre que se registran o miden los resultados de un proceso aparece cierta variación en los datos obtenidos, que puede provenir de dos fuentes: las diferencias intrínsecas entre cualquier par de elementos medidos (variación intrínseca), y el hecho de que ningún método de medición es perfecto (medir el mismo elemento repetidas veces no siempre da el mismo dato numérico).

El Control Estadístico de Calidad (SPC) busca identificar las causas de variaciones intrínsecas en los procesos para reducirlas a niveles "tolerables", pero antes de aplicar sus técnicas hay que asegurarse de que la variación registrada no se deba, en su mayor parte, a los propios sistemas de medición.

Los errores en los sistemas de medición se clasifican en dos categorías:

- **Errores de exactitud**: diferencia entre el valor registrado y el real.
- **Errores de precisión**: variación observada al medir el mismo elemento de forma repetida con el mismo método.

Un sistema puede verse afectado por uno solo de estos tipos de error, o por ambos.

La exactitud se descompone en tres componentes:

1. **Linealidad**: cómo varía el nivel de exactitud obtenido en función del tamaño del objeto medido.
2. **Exactitud**: diferencia entre la medición media observada y un "valor maestro" — qué tan centrado o ajustado está el sistema de medida.
3. **Estabilidad**: variación total al medir el mismo elemento repetidas veces con el mismo aparato — qué tan estable es el sistema con el paso del tiempo.

La precisión se descompone en dos partes:

1. **Repetibilidad**: variación observada cuando el mismo operario mide el mismo elemento repetidamente con el mismo aparato — variación debida al aparato.
2. **Reproducibilidad**: variación observada cuando distintos operarios miden el mismo elemento con el mismo aparato — variación debida al operario.

> En el terreno de la instrumentación y control se habla de "sensores" para englobar tanto transductores como sensores, dando por sentado que cuando se utilizan transductores la potencia absorbida será mínima.

## Conclusiones

En la actividad de hoy explicamos las características de los instrumentos de medición conocidos como sensores. Definimos algunos de los más utilizados, explicando su principio de funcionamiento, e indicamos el estudio de otros muchos utilizados en la práctica industrial. Vimos las características a tener en cuenta al seleccionar un sensor para determinada aplicación y, por último, describimos las partes que integran un sistema de medición.

## Preguntas de comprobación

1. Defina los siguientes conceptos: medir, sensar y controlar.
2. Explique la relación entre los mismos.
3. Mencione los instrumentos que se utilizan para cada una de las acciones mencionadas.
4. Enumere las partes que integran un sistema de medición industrial.

## Bibliografía

1. *Temas Especiales de Instrumentación y Control.* Dr. C. Julio R. Gómez Sarduy, MSc. Roy Reyes Calvo y Dr. C. Daniel Guzmán del Río. Capítulo I.
2. *Instrumentación Industrial.* Ramón Medina.
3. *Process measurement and transducers.* (Mediciones).
4. Página web de automatización y control.
5. Actividades de la disciplina. Moodle.

## Motivación

En la próxima conferencia comenzaremos con el estudio de las redes de comunicación existentes entre los diferentes niveles de automatización.
