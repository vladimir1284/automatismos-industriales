# Guía de preguntas para la discusión del proyecto de curso

Estas son las preguntas que le permitirán al estudiante prepararse para la
discusión del proyecto de curso. Están agrupadas por conferencia, según el
contenido en el que se responden, con enlace directo al epígrafe de las
[notas de clase](../notas-clase/index.md) correspondiente. Cuando la
respuesta no aparece de forma explícita en las notas de clase, se indica la
bibliografía de esa conferencia donde ampliar.

!!! note "Sobre la correspondencia original entre preguntas y conferencias"
    El documento original agrupaba las preguntas así: 1-13 → Conferencia 1;
    14-24 → Conferencia 2; 25-35 → Conferencia 3; 35-84 → Conferencias 4 y 5
    ("ver textos entregados"); 85 en adelante → Conferencia 6. Esos rangos se
    solapan en la pregunta 35 y no calzan del todo con el contenido real (la
    34, por ejemplo, es de contactores y relés — Conferencia 4 — y la 83-84
    ya son de PLC — Conferencia 6). Abajo se reagrupó cada pregunta según en
    qué conferencia se responde realmente; **confirmar con el profesor** si
    el corte pretendido era otro.

!!! warning "Preguntas de respuesta obligatoria en el informe del proyecto"
    Las preguntas **5, 12, 85 y 90** deben quedar respondidas explícitamente
    en el informe del proyecto (no basta con saberlas responder en la
    discusión oral) — ver la tarea 1 de las
    [tareas generales del proyecto](variantes/00-tareas-generales.md). El
    documento original también menciona una pregunta "91" en ese mismo grupo,
    pero la lista de preguntas no llega a esa numeración (termina en la 90);
    parece un error de trascripción del original — **confirmar con el
    profesor** a qué pregunta se refería.

## Conferencia 1. Introducción a la automatización industrial

Preguntas 1 a 13. Notas de clase: [Conferencia 1](../notas-clase/conf-01.md).

- **1.** Diga las ventajas y desventajas que están asociadas a la automatización industrial. — Ver [§1.1.2. La automatización. Aspectos generales](../notas-clase/conf-01.md#112-la-automatizacion-aspectos-generales) ("Ventajas del control automático" / "Desventajas de la automatización").
- **2.** ¿Qué se entiende por automatización industrial? — Ver [§1.1.2](../notas-clase/conf-01.md#112-la-automatizacion-aspectos-generales) ("¿Qué se entiende por automatización?").
- **3.** ¿Qué entiende usted por proceso secuencial? Ejemplifíquelo. — Ver [§1.1.2](../notas-clase/conf-01.md#112-la-automatizacion-aspectos-generales) ("Controladores secuenciales").
- **4.** Mencione los niveles de automatización que están presentes en la industria hoy día y diga que los caracteriza. — Ver [§1.1.3. Niveles de desarrollo de la automatización industrial](../notas-clase/conf-01.md#113-niveles-de-desarrollo-de-la-automatizacion-industrial).
- **5.** Muestre a través de su proyecto los elementos de entrada de órdenes, de entrada de información y de salida de información. **(respuesta obligatoria en el informe, ver nota arriba)** — Ver [§1.2.1. Elementos de un proceso a automatizar](../notas-clase/conf-01.md#121-elementos-de-un-proceso-a-automatizar) y la tarea 1 de las [tareas generales del proyecto](variantes/00-tareas-generales.md).
- **6.** ¿Qué se entiende por lógica cableada? Diga las ventajas y desventajas. — Ver [§1.2.2. Evolución de los automatismos industriales](../notas-clase/conf-01.md#122-evolucion-de-los-automatismos-industriales) ("La lógica cableada").
- **7.** ¿Qué se entiende por lógica neumática? Diga las ventajas y desventajas. — Ver [§1.2.2](../notas-clase/conf-01.md#122-evolucion-de-los-automatismos-industriales) ("La lógica neumática").
- **8.** ¿Qué se entiende por lógica discreta? Diga las ventajas y desventajas. — Ver [§1.2.2](../notas-clase/conf-01.md#122-evolucion-de-los-automatismos-industriales) ("La lógica estática discreta").
- **9.** ¿Qué se entiende por lógica integrada? Diga las ventajas y desventajas. — Ver [§1.2.2](../notas-clase/conf-01.md#122-evolucion-de-los-automatismos-industriales) ("La lógica estática integrada").
- **10.** ¿Qué se entiende por lógica programada? Diga las ventajas y desventajas. — Ver [§1.2.2](../notas-clase/conf-01.md#122-evolucion-de-los-automatismos-industriales) ("La lógica estática programada").
- **11.** Justifique las siguientes afirmaciones:
    1. El ordenador en el proceso cumple la misma función que el PLC.
    2. La solución más moderna no es siempre la que mejor se adapta al proceso que se quiere controlar.
    3. Es necesario analizar cuál es la tecnología más preparada para la función requerida y que, además, presente una buena relación calidad-precio.

    — (1) ver [§1.2.2](../notas-clase/conf-01.md#122-evolucion-de-los-automatismos-industriales) ("El ordenador de proceso" y "El autómata programable industrial"); (2) y (3) ver [§1.2.3. Selección de la tecnología adecuada para el proceso a automatizar](../notas-clase/conf-01.md#123-seleccion-de-la-tecnologia-adecuada-para-el-proceso-a-automatizar).
- **12.** ¿Cuáles son los aspectos que debe tener definidos antes de decidir una tecnología de automatización? **(respuesta obligatoria en el informe, ver nota arriba)** — Ver [§1.2.3](../notas-clase/conf-01.md#123-seleccion-de-la-tecnologia-adecuada-para-el-proceso-a-automatizar) (lista de 7 aspectos) y la tarea 1 de las [tareas generales del proyecto](variantes/00-tareas-generales.md).
- **13.** ¿Por qué es necesario tener en cuenta la velocidad de respuesta en los sistemas de automatización industrial? — Ver [§1.2.3](../notas-clase/conf-01.md#123-seleccion-de-la-tecnologia-adecuada-para-el-proceso-a-automatizar) ("Velocidad de respuesta").

## Conferencia 2. Sensores y sistemas de medición

Preguntas 14 a 24. Notas de clase: [Conferencia 2](../notas-clase/conf-02.md).

!!! note ""
    Las preguntas 14, 15 y 16 pueden responderse también con ayuda del
    analizador de redes que se emplea en el proyecto.

- **14.** Defina los conceptos relacionados con las acciones medir, sensar y controlar, identificando sus diferencias y/o similitudes. — Ver [§1.3.1. Generalidades sobre el proceso de medir](../notas-clase/conf-02.md#131-generalidades-sobre-el-proceso-de-medir) ("Otros conceptos. Comparaciones").
- **15.** Explique las cualidades fundamentales de los instrumentos que utilizan los sistemas de medición industrial. — Ver [§1.3.1](../notas-clase/conf-02.md#131-generalidades-sobre-el-proceso-de-medir) ("Especificaciones").
- **16.** Enumere las partes que integran un sistema de medición industrial. — Ver [§1.3.5. Sistema de medición](../notas-clase/conf-02.md#135-sistema-de-medicion).
- **17.** Diga el concepto de sensor y en qué basan estos su funcionamiento. — Ver [§1.3.1](../notas-clase/conf-02.md#131-generalidades-sobre-el-proceso-de-medir) ("Otros conceptos. Comparaciones" — Sensor).
- **18.** Diga el concepto de transductor. — Ver [§1.3.1](../notas-clase/conf-02.md#131-generalidades-sobre-el-proceso-de-medir) ("Otros conceptos. Comparaciones" — Transductor).
- **19.** ¿Cuál es la diferencia fundamental entre un sensor y un transductor? — Ver [§1.3.1](../notas-clase/conf-02.md#131-generalidades-sobre-el-proceso-de-medir) ("Las diferencias entre sensores y transductores son ligeras...").
- **20.** ¿Cuáles son las especificaciones que debe cumplir un sensor? Explique cada una de ellas. — Ver [§1.3.1](../notas-clase/conf-02.md#131-generalidades-sobre-el-proceso-de-medir) ("Especificaciones": precisión, linealidad, repetibilidad, histéresis, resolución, rango, ambiente, respuesta dinámica, calibración, costo).
- **21.** Ponga ejemplo de sensores y diga cuales utilizó en su proyecto. — Ver [§1.3.2. Sensores](../notas-clase/conf-02.md#132-sensores) y la variante de proyecto asignada en [Proyectos](index.md).
- **22.** Mencione los criterios que se deben seguir para elegir un sensor. — Ver [§1.3.4. Criterios de selección de un sensor](../notas-clase/conf-02.md#134-criterios-de-seleccion-de-un-sensor).
- **23.** ¿Cuál es la misión del control estadístico de la calidad? — Ver [§1.3.5](../notas-clase/conf-02.md#135-sistema-de-medicion) ("Control Estadístico de Calidad (SPC)").
- **24.** ¿Cuáles son los errores que se pueden encontrar en cuanto a precisión y exactitud en un sistema de medición industrial? — Ver [§1.3.5](../notas-clase/conf-02.md#135-sistema-de-medicion) ("Errores de exactitud" / "Errores de precisión").

## Conferencia 3. Redes de campo y redes industriales de comunicación en tiempo real

Preguntas 25 a 33. Notas de clase: [Conferencia 3](../notas-clase/conf-03.md).

- **25.** Defina que entiende usted por redes de campo y redes de control. — Ver [§1.4.0. Introducción](../notas-clase/conf-03.md#140-introduccion) ("¿Qué se entiende por bus de campo?" y redes de control vs. redes de datos).
- **26.** Explicar las características de cada tipo de red. — Ver [§1.4.1. Aspectos generales del Profibus](../notas-clase/conf-03.md#141-aspectos-generales-del-profibus) y [§1.4.2. Protocolo Modbus](../notas-clase/conf-03.md#142-protocolo-modbus).
- **27.** Enunciar las facilidades de empleo de cada una de ellas. — Ver [§1.4.3. Características de empleo de ambos protocolos de comunicación](../notas-clase/conf-03.md#143-caracteristicas-de-empleo-de-ambos-protocolos-de-comunicacion) (comparativa desarrollada en la clase práctica).
- **28.** Mencione las características de la Profibus DP. — Ver [§1.4.1](../notas-clase/conf-03.md#141-aspectos-generales-del-profibus) ("Profibus-DP").
- **29.** Mencione las características de la Profibus-PA (Automatización de Procesos). — Ver [§1.4.1](../notas-clase/conf-03.md#141-aspectos-generales-del-profibus) ("Profibus-PA").
- **30.** Mencione las características de la Profibus–FMS. — Ver [§1.4.1](../notas-clase/conf-03.md#141-aspectos-generales-del-profibus) ("Profibus-FMS").
- **31.** ¿Cuáles son los elementos del bus? — Ver [§1.4.1](../notas-clase/conf-03.md#141-aspectos-generales-del-profibus) ("1.4.1.4. Elementos del bus").
- **32.** Enuncie las características del protocolo MODBUS. — Ver [§1.4.2. Protocolo Modbus](../notas-clase/conf-03.md#142-protocolo-modbus).
- **33.** Medios físicos. — Ver [§1.4.1](../notas-clase/conf-03.md#141-aspectos-generales-del-profibus) ("1.4.1.7. Cableado de Profibus DP/FMS": par trenzado apantallado, fibra óptica, RS-485).

## Conferencias 4 y 5. Relés, contactores y esquemas de mando de motores

Preguntas 34 a 82. Notas de clase: [Conferencia 4](../notas-clase/conf-04.md)
(motores de corriente directa) y [Conferencia 5](../notas-clase/conf-05.md)
(motores de corriente alterna). Buena parte de este bloque se apoya en los
textos entregados en clase — *Accionamiento Eléctrico Automatizado II* (Ing.
Mario Morera, [págs. 1-70 en Conf. 4](../notas-clase/conf-04.md#bibliografia) /
[págs. 40-90 en Conf. 5](../notas-clase/conf-05.md#bibliografia); Ing. M.
Diez, págs. 20-65 / 65-90) e *Industrial Automation. Circuit Design and
Components* (David W. Pessen) — más que en el texto de las notas de clase;
donde no hay un epígrafe puntual se indica "ver bibliografía".

- **34.** ¿Cuál es la diferencia entre un contactor y un relé (relevador) de control? — Ver [§2.1.2. Contactores](../notas-clase/conf-04.md#212-contactores) y [§2.1.3. Relés](../notas-clase/conf-04.md#213-reles).
- **35.** ¿Cuál es la función del relé de contra corriente? — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **36.** ¿En que función de que parámetros se debe realizar el mando automático del accionamiento eléctrico? Explique el por qué. — Ver [§2.2. Esquemas típicos... corriente directa](../notas-clase/conf-04.md#22-esquemas-tipicos-utilizados-para-el-mando-de-los-motores-de-corriente-directa) y [§2.2.3](../notas-clase/conf-04.md#223-mando-del-arranque-del-motor-de-corriente-directa) (tiempo, velocidad, corriente).
- **37.** Enumere las ventajas y desventajas del mando en función de la velocidad. — No se detalla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **38.** Diga las desventajas del arranque utilizando resistencias. — Ver [§2.2.3. Mando del arranque del motor de corriente directa](../notas-clase/conf-04.md#223-mando-del-arranque-del-motor-de-corriente-directa) ("Utilizando resistencias adicionales..."); detalle en bibliografía (M. Diez, pág. 66).
- **39.** ¿Cuándo utilizamos el arranque estrella-delta? — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 5](../notas-clase/conf-05.md#bibliografia).
- **40.** ¿Por qué los motores de inducción de J/A son los más utilizados en la práctica? — Ver [§2.3.1. Generalidades sobre el mando de los motores asincrónicos](../notas-clase/conf-05.md#231-generalidades-sobre-el-mando-de-los-motores-asincronicos).
- **41.** Diga las ventajas del Breaker sobre el fusible. — Ver [§2.1.5. Accesorios](../notas-clase/conf-04.md#215-accesorios).
- **42.** Enumere los distintos componentes que se emplean en el mando automático. — Ver [§2.1. Componentes utilizados para el arranque, frenado, protección y regulación de velocidad](../notas-clase/conf-04.md#21-componentes-utilizados-para-el-arranque-frenado-proteccion-y-regulacion-de-velocidad-de-los-motores-electricos) completo.
- **43.** ¿Cuál es la función de las cámaras de arqueo? — Ver [§2.1.2. Contactores](../notas-clase/conf-04.md#212-contactores) ("Cámaras de arqueo").
- **44.** ¿Cómo trabajan los relés polarizados de frecuencia que se utilizan para el arranque de los motores sincrónicos? — Ver [§2.3.7. Mando del arranque de los motores sincrónicos](../notas-clase/conf-05.md#237-mando-del-arranque-de-los-motores-sincronicos) ("Arranque a baja frecuencia"); detalle del relé polarizado en bibliografía.
- **45.** Cuando se realiza la automatización del proceso de arranque se tratan de eliminar errores eléctricos y mecánicos de este proceso. Enumere cuáles son. — No se enumeran en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **46.** Diga las ventajas del mando automático sobre el mando manual. — Relacionado con [§1.1.2](../notas-clase/conf-01.md#112-la-automatizacion-aspectos-generales) (ventajas de la automatización) y [§3.2.2. Ciclos de trabajo](../notas-clase/conf-06.md#322-ciclos-de-trabajo) (ciclo manual vs. automático); detalle específico en bibliografía.
- **47.** ¿Cuál es la función del fusible? ¿Cómo se seleccionan? — Ver [§2.1.5. Accesorios](../notas-clase/conf-04.md#215-accesorios) ("Fusibles"); criterio de selección en bibliografía.
- **48.** Explique cómo funciona el relé de corriente que se utiliza para el mando en función de la corriente. — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **49.** ¿Para qué se utilizan los transformadores de corriente en serie con el elemento calefactor de los térmicos? — Ver [§2.1.4. Protecciones de sobrecarga](../notas-clase/conf-04.md#214-protecciones-de-sobrecarga) ("Selección de los relés térmicos").
- **50.** ¿Cómo se realiza el frenado dinámico en los motores J/A? — Ver [§2.3.5. Frenado de los motores asincrónicos](../notas-clase/conf-05.md#235-frenado-de-los-motores-asincronicos) ("Frenado dinámico").
- **51.** ¿Cuál es la función del polo sombra? ¿Qué tipo de contactor se emplea? — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **52.** ¿Por qué el arranque en función de la corriente utiliza un relé de bloqueo? ¿Cuál es la función? — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **53.** Diga los tipos de protección de sobrecarga que usted conoce. — Ver [§2.1.4. Protecciones de sobrecarga](../notas-clase/conf-04.md#214-protecciones-de-sobrecarga) (RTD, disco Spencer, Klixon, bimetálico, película soldada, térmico de inducción).
- **54.** ¿Cuál es la función de la resistencia de corriente? — No se desarrolla en las notas de clase con ese nombre (posible relación con la pregunta 73, "resistencia de contracorriente"); ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia) — **confirmar con el profesor** si se trata de la misma resistencia.
- **55.** ¿En función de qué parámetros se realiza el arranque por autotransformador? — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 5](../notas-clase/conf-05.md#bibliografia).
- **56.** ¿Por qué es importante que el reseteo de los térmicos se realice en la mayoría de los casos de forma manual? — Ver [§2.1.4](../notas-clase/conf-04.md#214-protecciones-de-sobrecarga) ("reset automático" / "manual").
- **57.** ¿Cuándo se emplea el relé de sobre corriente? — Relacionado con [§2.1.3. Relés](../notas-clase/conf-04.md#213-reles) ("Relevadores de sobrecarga"); detalle en bibliografía.
- **58.** ¿Por qué el mando en función de la velocidad se hace a través de vías indirectas? — Ver [§2.2.3. Mando del arranque del motor de corriente directa](../notas-clase/conf-04.md#223-mando-del-arranque-del-motor-de-corriente-directa) ("Velocidad, por vías indirectas sensando la FEM de armadura...").
- **59.** Diga las ventajas y desventajas del mando en función del tiempo. — No se detalla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **60.** ¿Cómo se obtiene la disminución de la corriente de arranque en el método de arranque por devanado parcial? Explíquelo. — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 5](../notas-clase/conf-05.md#bibliografia).
- **61.** ¿Cuáles son las perturbaciones contra las que se debe tomar medidas de protección? — No se enumeran en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **62.** Diga las protecciones de bajo voltaje que usted conoce y en qué consisten. — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **63.** ¿Cuáles son las diferencias fundamentales entre los contactores de corriente alterna y los contactores de corriente directa? — Ver [§2.1.2. Contactores](../notas-clase/conf-04.md#212-contactores) ("Contactor de corriente alterna" / "Contactor magnético para corriente continua").
- **64.** Enumere los diferentes métodos de arranque que existen para los motores asincrónicos de inducción de rotor en corto circuito. — Ver [§2.3.2. Mando de arranque de los motores de jaula de ardilla](../notas-clase/conf-05.md#232-mando-de-arranque-de-los-motores-de-jaula-de-ardilla).
- **65.** Explique el funcionamiento del relé de sobrecarga (térmicos) bimetálicos. — Ver [§2.1.4. Protecciones de sobrecarga](../notas-clase/conf-04.md#214-protecciones-de-sobrecarga) ("Relés térmicos" — principio de funcionamiento).
- **66.** ¿Qué aspectos debemos tener en cuenta al conectar directamente un motor a la red? — Ver [§2.3.2](../notas-clase/conf-05.md#232-mando-de-arranque-de-los-motores-de-jaula-de-ardilla) ("Directo de línea: posible siempre que la red y la carga lo permitan"); detalle en bibliografía.
- **67.** ¿Para qué se utiliza el bloqueo eléctrico y en qué consiste? Ejemplifíquelo. — Ver [§2.2.5. Mando de la inversión de marcha de los motores de corriente directa](../notas-clase/conf-04.md#225-mando-de-la-inversion-de-marcha-de-los-motores-de-corriente-directa) ("bloqueos eléctricos de los contactores principales" y ejemplo Ad/At).
- **68.** Explique el método de arranque a baja frecuencia de los motores sincrónicos. — Ver [§2.3.7. Mando del arranque de los motores sincrónicos](../notas-clase/conf-05.md#237-mando-del-arranque-de-los-motores-sincronicos).
- **69.** ¿Cómo se realiza la inversión en marcha de los motores asincrónicos de inducción de rotor en corto circuito? — Ver [§2.3.4. Mando de inversión de marcha de los motores asincrónicos](../notas-clase/conf-05.md#234-mando-de-inversion-de-marcha-de-los-motores-asincronicos).
- **70.** ¿Cómo se puede obtener de un relé electromagnético un relé de tiempo? — No se desarrolla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia) ("Relés de tiempo").
- **71.** ¿Por qué el arranque en función de la corriente utiliza un relé de bloqueo? ¿Cuál es su función? — Repite la pregunta 52; misma referencia.
- **72.** ¿Cuáles son las partes integrantes de un arrancador a tensión plena? — Pregunta motivadora de la propia [Conferencia 4](../notas-clase/conf-04.md) (ver "Motivación" al final); desarrollada en [§2.3.2](../notas-clase/conf-05.md#232-mando-de-arranque-de-los-motores-de-jaula-de-ardilla) y bibliografía.
- **73.** ¿Cuál es la función de la resistencia de contracorriente? — Ver [§2.2.4. Mando del frenado de los motores de corriente directa](../notas-clase/conf-04.md#224-mando-del-frenado-de-los-motores-de-corriente-directa) y [§2.3.5. Frenado de los motores asincrónicos](../notas-clase/conf-05.md#235-frenado-de-los-motores-asincronicos) ("Frenado por contracorriente").
- **74.** Explique en qué consiste el frenado por contracorriente. ¿Cómo se realiza en los motores de corriente directa y corriente alterna? — Ver [§2.2.4](../notas-clase/conf-04.md#224-mando-del-frenado-de-los-motores-de-corriente-directa) y [§2.3.5](../notas-clase/conf-05.md#235-frenado-de-los-motores-asincronicos).
- **75.** ¿Qué entiende usted por contactor? — Ver [§2.1.2. Contactores](../notas-clase/conf-04.md#212-contactores) (definición).
- **76.** Diga las partes que componen un contactor y dónde se utilizan. — Ver [§2.1.2. Contactores](../notas-clase/conf-04.md#212-contactores) (contactos, cámaras de arqueo, bobina, núcleo).
- **77.** Explique en qué consiste el frenado dinámico y cómo se realiza en los motores de corriente directa y corriente alterna. — Ver [§2.2.4](../notas-clase/conf-04.md#224-mando-del-frenado-de-los-motores-de-corriente-directa), [§2.3.5](../notas-clase/conf-05.md#235-frenado-de-los-motores-asincronicos) y [§2.3.8. Frenado de los motores sincrónicos](../notas-clase/conf-05.md#238-frenado-de-los-motores-sincronicos).
- **78.** Explique el método de arranque asincrónico de los motores sincrónicos. — Ver [§2.3.7. Mando del arranque de los motores sincrónicos](../notas-clase/conf-05.md#237-mando-del-arranque-de-los-motores-sincronicos) ("Arranque asincrónico").
- **79.** Enumere las ventajas y desventajas del mando en función de la corriente. — No se detalla en las notas de clase; ver bibliografía de la [Conferencia 4](../notas-clase/conf-04.md#bibliografia).
- **80.** ¿Qué entiende usted por relé de tiempo? — Ver [§2.1.3. Relés](../notas-clase/conf-04.md#213-reles) ("Relés de tiempo").
- **81.** ¿Para qué se utiliza el relé de control? — Ver [§2.1.3. Relés](../notas-clase/conf-04.md#213-reles) ("Relés de control").
- **82.** ¿Por qué se produce el arco eléctrico? — Ver [§2.1.2. Contactores](../notas-clase/conf-04.md#212-contactores) ("Cámaras de arqueo": ionización del aire entre contactos al abrirse).

## Conferencia 6. Aspectos generales sobre los autómatas programables (PLCs)

Preguntas 83 a 90. Notas de clase: [Conferencia 6](../notas-clase/conf-06.md).

- **83.** Diga qué se entiende por PLC. Concepto y partes fundamentales de un PLC. — Ver [§3.1. Aspectos generales sobre los autómatas (PLCs)](../notas-clase/conf-06.md#31-aspectos-generales-sobre-los-automatas-plcs) (definición) y [§3.1.1. Estructura de los PLCs](../notas-clase/conf-06.md#311-estructura-de-los-plcs) ("Componentes de la estructura básica de un autómata").
- **84.** Diga cómo puede ser la estructura de los PLC's. — Ver [§3.1.1. Estructura de los PLCs](../notas-clase/conf-06.md#311-estructura-de-los-plcs) (compacta / modular).
- **85.** Mencione la función que realizan las diferentes partes de un autómata. **(respuesta obligatoria en el informe, ver nota arriba)** — Ver [§3.1.1](../notas-clase/conf-06.md#311-estructura-de-los-plcs) (fuente de alimentación, CPU, módulo de entradas, módulo de salidas, equipos de programación, periféricos) y la tarea 4-6 de las [tareas generales del proyecto](variantes/00-tareas-generales.md).
- **86.** ¿Qué se entiende por lenguaje de programación? Explique uno de ellos. — Ver [§3.1.1](../notas-clase/conf-06.md#311-estructura-de-los-plcs) ("Lenguajes de programación") y [§3.3. Ejemplos de programación para PLC](../notas-clase/conf-06.md#33-ejemplos-de-programacion-para-plc).
- **87.** ¿Cuáles son los aspectos a tener en cuenta al seleccionar un PLC? — Ver [§3.1.2. Selección de un autómata](../notas-clase/conf-06.md#312-seleccion-de-un-automata).
- **88.** ¿Cómo se realiza el cableado de un autómata? — Ver [§3.1.1](../notas-clase/conf-06.md#311-estructura-de-los-plcs) ("Antes de conectar cualquier elemento a las salidas del autómata...") y [§3.2.1. Alimentación y protección de un PLC](../notas-clase/conf-06.md#321-alimentacion-y-proteccion-de-un-plc).
- **89.** ¿Cuáles son las averías que se deben tener en cuenta al programar un autómata programable? — Ver [§3.2.3. Averías a programar](../notas-clase/conf-06.md#323-averias-a-programar).
- **90.** ¿Qué se entiende por ciclo de trabajo de un PLC? **(respuesta obligatoria en el informe, ver nota arriba)** — Ver [§3.2.2. Ciclos de trabajo](../notas-clase/conf-06.md#322-ciclos-de-trabajo) y [§3.4. Ciclos del programa](../notas-clase/conf-06.md#34-ciclos-del-programa) (tiempo de ciclo, Tc).
