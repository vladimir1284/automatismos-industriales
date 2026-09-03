# Conferencia 4. Componentes para el mando de motores. Esquemas con motores de corriente directa

**Tema II**: Sistemas de automatización industrial empleando relés y contactores.

**Objetivo instructivo**: Desarrollar esquemas de arranque, frenado, inversión y regulación de velocidad de los motores eléctricos a partir de condiciones específicas.

**Contenido del tema**

- 2.1. Componentes utilizados para el arranque, frenaje, protección y regulación de velocidad de los motores eléctricos.
- 2.2. Esquemas típicos utilizados en motores de corriente directa.
- 2.3. Esquemas típicos utilizados en motores de corriente alterna. Seleccionar, basándose en criterios técnico-económicos, accionamientos eléctricos de velocidad variable a lazo abierto.

## Rememoración de la clase anterior

Terminamos el Tema I.

## Sumario

- 2.1. Componentes utilizados para el arranque, frenaje, protección y regulación de velocidad de los motores eléctricos.
    - 2.1.1. Introducción.
    - 2.1.2. Contactores.
    - 2.1.3. Relés.
    - 2.1.4. Protecciones de sobrecarga.
    - 2.1.5. Accesorios.
- 2.2. Esquemas típicos utilizados para el mando de los motores de corriente directa.
    - 2.2.1. Generalidades sobre el motor de corriente directa.
    - 2.2.2. Metodología a utilizar para el diseño de circuitos a relés y contactores.
    - 2.2.3. Mando del arranque del motor de corriente directa.
    - 2.2.4. Mando del frenado del motor de corriente directa.
    - 2.2.5. Mando de inversión de marcha de los motores de corriente directa.

## Objetivos de la actividad

1. Analizar los diferentes componentes que se utilizan en accionamiento eléctrico automatizado.
2. Estudiar la representación circuital de dichos componentes, así como su proceso de selección.
3. Estudiar los diferentes circuitos de control y de fuerza que se utilizan para lograr el mando de los motores de corriente directa.

## Preguntas de evaluación

1. ¿Qué se entiende por pirámide de automatización?
2. Explique la relación que existe entre el sistema a automatizar y la selección de sus componentes.
3. ¿Qué diferencia a una red de campo de una red industrial?

## 2.1. Componentes utilizados para el arranque, frenado, protección y regulación de velocidad de los motores eléctricos

### 2.1.1. Introducción

El desarrollo industrial, la mecanización y en especial la automatización de los procesos industriales se ha incrementado grandemente en los últimos años; ello ha provocado el aumento de la utilización de motores y su control en las industrias.

Para realizar este control industrial son necesarios equipos y elementos con los cuales gobernar y distribuir la energía o potencia necesaria, y además proteger los diferentes equipos ante fallos del sistema.

Al inicio de la introducción de los motores eléctricos en la industria, solo se empleaban interruptores manuales para el arranque y parada, y fusibles para la protección. Con el desarrollo del arte del control se fue introduciendo el contactor magnético y los relés — elementos que actúan gracias a la energía electromagnética y requieren solo una pequeña potencia, por lo que pueden considerarse amplificadores de potencia.

### 2.1.2. Contactores

El contactor se define como un dispositivo empleado para la conexión y desconexión repetida de los circuitos eléctricos de potencia. Su operación puede ser manual o magnética.

Un contactor está formado por un conjunto de contactos fijos o estacionarios, firmemente sujetos a un bastidor o estructura, que en la mayoría de los casos incluye cámaras de arqueo. Los contactos fijos tienen puntos terminales donde se conectan circuitos eléctricos externos, y son accionados mecánica o magnéticamente según el tipo de contactor. El medio actuador puede ser un conjunto de mecanismo y varillas (en los manuales) o electroimanes y bobinas (en los magnéticos) — estos últimos de gran interés por el desarrollo alcanzado por los contactores automáticos.

**Principio de funcionamiento**

Cuando la bobina del contactor queda excitada por la circulación de corriente, mueve el núcleo en su interior y arrastra los contactos principales y auxiliares, estableciendo a través de los polos el circuito entre la red y el receptor. Este desplazamiento puede ser:

- Por rotación, pivotando sobre su eje.
- Por traslación, deslizándose paralelamente a las partes fijas.
- Combinación de rotación y traslación.

Cuando la bobina deja de alimentarse, abre los contactos por efecto del resorte de presión de los polos y del resorte de retorno de la armadura móvil. La bobina está concebida para resistir los choques mecánicos provocados por el cierre y la apertura de los contactos, y los choques electromagnéticos debidos al paso de corriente por sus espiras; para reducir los choques mecánicos, la bobina o el circuito magnético (a veces ambos) se montan sobre amortiguadores.

**Contactos**

Son la parte más delicada de un contactor, por lo que su construcción y mantenimiento deben ser los más adecuados posibles. Salvo en proyectos de poca intensidad, se construyen con aleaciones que buscan buena resistencia mecánica y mínimo desgaste por el arco. Las aleaciones más utilizadas son plata-paladio-cadmio y, sobre todo, plata-níquel.

**Cámaras de arqueo**

Su propósito es reducir y extinguir el arco en el menor tiempo posible, evitando el deterioro de los contactos. El arqueo se produce por la ionización del aire entre los contactos al abrirse; este aire calentado se vuelve conductor y, dada su elevada resistencia, el calentamiento producido es sumamente peligroso, sobre todo en circuitos que conducen corrientes considerables. Además de la cámara de arqueo existen otros métodos para extinguir el arco: soplado de aire a presión, soplado magnético y baño de aceite.

**Tipos de contactores**

1. **Contactores manuales**: mediante una palanca se controlan todas las operaciones de conexión y desconexión.
2. **Contactores magnéticos**: formados básicamente por una parte fija en forma de E (con una bobina en su parte central) y una parte móvil llamada armadura. Al aplicar una diferencia de potencial en los terminales de la bobina, la corriente que circula produce un campo magnético que hace que la parte fija atraiga la armadura; al moverse esta, cierra o abre los contactos.

**Contactor de corriente alterna**: el núcleo y la armadura se construyen laminados, para evitar el calentamiento producido por las corrientes inducidas al variar el flujo.

**Contactor magnético para corriente continua**: al alimentarse la bobina desde una fuente de corriente continua, el núcleo y la armadura se forman de un mismo bloque de hierro macizo, ya que al no existir variación de flujo no habrá corrientes inducidas ni calentamiento.

**Representación esquemática**: [figura pendiente — símbolo de contactor, no recuperado de la conversión automática].

**Selección de los contactores**

Se realiza considerando dos aspectos fundamentales:

1. La capacidad interruptiva de los contactos de fuerza (corriente nominal y pico de los circuitos que deben conectar y desconectar).
2. La tensión del circuito de control en el cual deben operar (tensión de alimentación de la bobina).

Todos los elementos que conforman un contactor son recambiables.

### 2.1.3. Relés

Los relés existen en diferentes formas y para diferentes objetivos; su funcionamiento es sencillo, son baratos y en muchos casos insustituibles. Los relés o relevadores auxiliares son instrumentos electromecánicos de control y protección, usados en aplicaciones donde, al recibir una señal de voltaje, accionan rápida, confiable y simultáneamente un gran número de contactos que a su vez envían señales a diferentes instrumentos de protección.

**Tipos de relés**

**1. Relés de control**: se utilizan para aceptar información de un dispositivo-sensor y obtener múltiples acciones de control.

*Circuito magnético de un relé*

- Pueden ser de corriente continua o de corriente alterna.
- Estructura: núcleo (chapa magnética aislada), armadura (chapa magnética aislada), bobina (en alterna se coloca una espira desfasada 90° respecto de la bobina principal, para evitar la vibración al pasar por cero el campo magnético principal).
- Los contactos pueden ser normalmente abiertos o normalmente cerrados, llamándose "normal" al estado sin corriente en la bobina.

Representación circuital: [figura pendiente].

**Selección de los relés de control** — dos aspectos fundamentales:

1. El número de contactos de control necesarios.
2. La corriente de control que deben operar (corriente nominal que deben conectar y desconectar).
3. La tensión del circuito de control en el cual deben operar (tensión de alimentación de la bobina).

**2. Relevadores de sobrecarga**: formados por dos elementos — una unidad sensora (conectada directamente a la línea de alimentación, o indirectamente a través de transformadores de corriente) y un mecanismo que, accionado por esa unidad, opera directa o indirectamente desconectando el motor de la línea. Estos relevadores originan un menor tiempo de disparo. Pueden ser:

- Térmicos.
- Magnéticos.
- Magnetotérmicos.

**3. Relés de tiempo**: dispositivos de control importantes, ampliamente utilizados en los sistemas de control automáticos.

Representación circuital de los relés de tiempo que cuentan al energizarse: [figura pendiente].

Representación circuital de los relés de tiempo que cuentan al desenergizarse: [figura pendiente].

En la industria se utilizan cuatro tipos básicos de relés de tiempo:

1. Accionados por motor o cuerda.
2. Magnéticos.
3. Electrónicos.
4. Neumáticos.

**Selección de los relés de tiempo** — aspectos a considerar:

1. La función que deben realizar dentro del circuito de control.
2. El número de contactos necesarios (ampliable con ayuda de un relé de control).
3. El tiempo de operación.

### 2.1.4. Protecciones de sobrecarga

Se define sobrecarga como una condición de operación en la que una corriente mayor que la normal fluye en el circuito de potencia del motor.

**Causas comunes de sobrecarga**

1. Cargas mecánicas anormales sostenidas sobre el eje del motor.
2. Ciclo de trabajo intermitente (arranques y paradas frecuentes).
3. Rotor trancado por carga mecánica excesiva.
4. Pérdida de una fase en motores trifásicos.
5. Temperatura ambiente excesiva.

A medida que aumenta la sobrecarga, disminuye el tiempo que tarda el motor en alcanzar la temperatura permisible, por lo que los equipos de protección deben actuar antes de sobrepasar ese límite. Para evitar el sobrecalentamiento de los enrollados del motor, lo ideal es un equipo sensible a la temperatura dentro del enrollado o campo — la llamada **protección inherente**. Su desventaja es que no existe un equipo sensor universal aplicable a todos los motores, y debe ensamblarse en fábrica dentro del propio enrollado (o muy cerca), buscando mejorar la transferencia de calor entre el motor y el protector.

**Protecciones inherentes más difundidas**

1. **Detector de temperatura resistivo (RTD)**: utiliza el cambio de resistencia de un elemento metálico resistivo en función de la temperatura (coeficiente de temperatura positivo), empotrado en la ranura del estator en contacto íntimo con el enrollado. Se conecta a un circuito puente cuya respuesta de voltaje alimenta un relé detector, que actúa por el desbalance del puente ante un cambio de resistencia del RTD. Limitaciones: difícil de ensamblar en máquinas pequeñas/medianas (se usa en máquinas grandes) y velocidad de respuesta lenta.
2. **Disco Spencer**: un termostato basado en un bimetal, ligeramente convexo a temperatura normal y cóncavo al calentarse. No requiere montarse junto al enrollado, basta colocarlo junto a la carcasa del estator. Ventaja frente al RTD: no ocupa espacio en las ranuras del motor ni requiere circuito puente de gran sensibilidad. Limitación: baja velocidad de respuesta.
3. **Detector de Klixon**: consiste en un disco Spencer y un colector por el que fluye la corriente de carga del motor. Mientras la corriente sea igual o menor que la nominal, la temperatura no afecta mucho al disco; al aumentar la corriente por causa anormal, el calentador calienta rápidamente el disco, logrando que el detector responda antes de que el motor se dañe por temperatura. Muy usado en motores de mediana y pequeña potencia.

El contacto que actúa por variación de temperatura se conecta directamente en el circuito de fuerza del motor y requiere ajuste preciso. Este tipo de protección se usa con restablecimiento (reset) automático (contactos que cierran cuando el detector se enfría, una vez desconectado el motor) o manual (un botón cierra los contactos tras la actuación del detector). Es particularmente útil en motores de compresión hermética, como los usados en refrigeración y acondicionadores de aire.

**Protecciones externas**

Se sitúan fuera del motor, mediante relés de sobrecarga:

1. Relés de sobrecarga bimetálico o térmico.
2. Relés de película soldada.
3. Relés térmicos de inducción.

**Relés de sobrecarga bimetálico**: protegen al motor contra sobrecargas prolongadas, pero no lo desconectan en caso de cortocircuito — un cortocircuito requiere desconexión instantánea, mientras que calentar una lámina metálica toma cierto tiempo.

**Relés térmicos de inducción**: su funcionamiento se basa en el principio del transformador — una bobina conectada al circuito del motor (por donde pasa la corriente de trabajo) como primario, y una lámina enrollada en forma helicoidal (en cortocircuito) como secundario. Este bimetal helicoidal actúa y luego se enfría; es necesario restablecer el circuito manualmente para que regrese a su posición inicial. Son más caros que los demás equipos de protección vistos, por lo que su uso es menos frecuente.

**Relés de película soldada**: pueden usarse en muchas aplicaciones prácticas. El elemento principal es una lámina con bajo punto de fusión, basada en el cambio abrupto que sufre un metal al pasar a líquido al alcanzar su temperatura de fusión o crítica. Se restablecen manualmente; sus características de disparo (tiempo en función de la corriente) son similares a los dos tipos anteriores.

Representación circuital de los relés de sobrecarga (térmicos): [figura pendiente].

**Relés térmicos**: aseguran protección térmica contra sobrecargas pequeñas pero prolongadas, provocando la apertura automática de un contacto al alcanzarse un valor límite de temperatura en los arrollamientos del motor. Están compuestos por dos bimetales, cada uno formado por dos láminas estrechas y delgadas de metales diferentes (invar y ferroníquel) soldadas entre sí, con coeficientes de dilatación distintos. (El invar es una aleación de 64% hierro, 30% níquel, 5% cobalto y 1% de otros metales, entre los que pueden estar magnesio, silicio y carbono.)

**Principio de funcionamiento**: un arrollamiento calefactor, conectado en serie en cada fase del motor, está bobinado sobre cada bimetal. Si la intensidad absorbida por el receptor aumenta durante un incidente, los bimetales se deforman, accionando el diferencial mediante su desplazamiento lateral o vertical. Según el tipo de relé, esto provoca la rotación de una leva o de un árbol solidario al dispositivo de disparo; cuando la deformación es suficiente, se libera un tope de bloqueo, provocando la apertura brusca del contacto de disparo (introducido en el circuito de la bobina del contactor) y el cierre de un contacto de señalización. El rearme solo puede efectuarse cuando los bimetales están suficientemente fríos. El bimetal de compensación se deforma en función de las variaciones de la temperatura ambiente, comprendidas entre -40 y +60 ºC.

**Selección de los relés térmicos** — aspectos a considerar:

1. La corriente de fuerza que deben sensar (corriente nominal del circuito de fuerza).
2. El número de contactos de control necesarios.
3. El número de fases que deben interrumpir.

Para valores de corriente muy elevados no se fabrican elementos calefactores, por lo que estos dispositivos se seleccionan junto con transformadores de corriente que adecuan sus características de trabajo.

### 2.1.5. Accesorios

**Desconectores y conmutadores**: los interruptores, desconectores y conmutadores son los elementos de entrada de los sistemas de regulación y control. Existen dos tipos principales: los que operan a mano (cuchilla, termomagnéticos, de levas o tambor, pulsadores, etc.) y los que actúan magnéticamente (interruptores de presión, flotadores, de límite o fin de carrera, de flujo térmico, etc.).

Representación circuital de algunos accesorios: [figura pendiente — legenda de símbolos disponible al final del documento original: desconector, breaker, cuchilla, botón NA/NC, combinador de mando, bobina y contactos de relé de tiempo y térmico].

- **Desconectores de cuchilla**: muy usados en la conexión y desconexión no solo de motores sino de muchas otras máquinas y circuitos eléctricos. Es frecuente encontrar, en la misma envolvente, fusibles que protegen al motor contra sobrecorriente, desconectando la alimentación instantáneamente ante un cortocircuito.
- **Breaker**: su principio de protección es electromagnético/térmico; protege contra cortocircuito y sobrecargas.
- **Fusibles** (tapón, botella, lámina): su función es proteger contra cortocircuito.
- **Cuchilla**: compuesta por el portafusible y la navaja; puede ser monofásica o trifásica.
- **Lámparas de señalización**: se utilizan en los circuitos de control para señalizar distintos aspectos del funcionamiento del sistema.
- **Límites o fin de carrera**: dispositivos usados en mecanismos de traslación y elevación para marcar los finales del movimiento.

**Selección de los accesorios** — aspectos a considerar:

1. La corriente de fuerza que deben interrumpir (corriente nominal y pico del circuito de fuerza).
2. El número de fases que deben interrumpir.
3. Las exigencias del circuito, según las condiciones de operación.

Además, actualmente se producen elementos complejos de mando que incluyen en un solo cuerpo un interruptor, un relé de sobrecarga y un contactor, llamados **arrancadores magnéticos**. En su selección deben tenerse en cuenta todos los aspectos señalados para cada dispositivo por separado.

## 2.2. Esquemas típicos utilizados para el mando de los motores de corriente directa

Los motores de corriente directa se fabrican en tres tipos: motores en derivación, motores en serie y motores de excitación compuesta. La selección de un tipo u otro depende del carácter de la aplicación; sin embargo, uno de los más utilizados en la industria moderna es el motor de corriente directa con excitación en derivación o independiente, debido a la rigidez de sus características mecánicas, lo que explica su gran difusión en nuestras industrias.

Para el mando de los motores eléctricos se consideran diferentes parámetros que varían durante el transitorio de estas máquinas. Durante el proceso de arranque varían tres parámetros: tiempo, corriente y velocidad.

### 2.2.1. Generalidades sobre el motor de corriente directa

Los motores de corriente directa se producen de excitación serie, paralelo (derivación) y compuesta. Se utilizan en sistemas de accionamiento de guías, industrias metalúrgicas, textiles, etc., a tensiones de 110, 220 y 440 V, con potencias de 0.3 a 1400 kW.

### 2.2.2. Metodología para el diseño de circuitos a relés y contactores

Al diseñar los sistemas de mando debe tenerse en cuenta:

1. Diseñar primero el circuito de fuerza.
2. Diseñar después el circuito de control.
3. Que no haya bobinas en serie en el circuito de control.
4. Que no exista carrera de contactos.
5. No pasar de línea a línea sin pasar por alguna resistencia (o carga).

### 2.2.3. Mando del arranque del motor de corriente directa

**Métodos de arranque**

1. Utilizando resistencias adicionales conectadas a la armadura del motor (M. Diez, pág. 66).
2. Con ayuda de convertidores CA/CD — rectificadores controlados o semicontrolados (vistos en Accionamiento Eléctrico).

El mando en los procesos de arranque, frenado e inversión puede realizarse en función de:

- **Tiempo**, con ayuda de relés de tiempo.
- **Velocidad**, por vías indirectas sensando la FEM de armadura, utilizando relés de tensión.
- **Corriente**, utilizando relés de corriente.

**Esquema de arranque en dos pasos, en función del tiempo, de un motor de corriente directa de excitación compuesta** (Figura 4.1): [figura pendiente — solo se recuperaron las etiquetas de componentes: L, T1, T2, 1A, 2A, RT, Rarr1, Rarr2, DES, DEP, P, A].

Lo encerrado en el recuadro (en el original, en rojo) es el circuito de fuerza, donde se encuentran los componentes de fuerza; el resto es el circuito de control.

**Principio de funcionamiento**: al pulsar el botón de arranque se energiza el contactor L, que con su contacto normalmente abierto (CNA) bloquea el botón de arranque; el motor comienza a trabajar con los dos pasos de resistencias conectados en serie con la armadura. Al mismo tiempo se energizan los relés de tiempo T1 y T2, con diferente tiempo de energización. Cuando T1 termina de contar, mueve sus contactos (cerrando los CNA y abriendo los CNC), energizando el contactor 1A, que cortocircuita el primer paso de resistencia, acelerando el motor hasta su segunda característica de aceleración. Al terminar de contar T2, se energiza el contactor 2A, que cortocircuita el segundo paso de resistencia, llevando al motor a su característica mecánica natural. Para frenar solo se necesita pulsar el botón de parada.

### 2.2.4. Mando del frenado de los motores de corriente directa

**Frenado dinámico** [figura pendiente]: puede realizarse en función del tiempo o de la velocidad. (Esquema de la figura 3.20(a) del texto *Accionamiento eléctrico automatizado II*, de M. Diez.)

**Frenado por contracorriente** [figura pendiente]: debe agregarse un paso de resistencia para limitar la corriente que aparece al aplicar este tipo de frenado.

**Frenado regenerativo**: se realiza con ayuda de convertidores CA/CD completamente controlados.

### 2.2.5. Mando de la inversión de marcha de los motores de corriente directa

La reversibilidad de los motores de corriente directa se obtiene invirtiendo la polaridad de la tensión del inducido o del devanado de excitación.

Para motores de corriente directa de excitación independiente y pequeña potencia se utilizan los esquemas del diagrama 4.2 [figura pendiente]: como aparatos de arranque se usan relés (o contactos de control), y para lograr la reversibilidad se emplean los contactores C1 y C2, con ayuda de un contacto NA y uno NC.

Los esquemas del diagrama 4.3 [figura pendiente] se utilizan para motores de excitación en serie, con una y dos bobinas de excitación.

Para motores de corriente directa de mediana y gran potencia, si se quiere trabajar en régimen reversible, se utilizan los esquemas de la figura 4.4 [figura pendiente], usando los contactos de fuerza de los contactores.

El esquema de control puede realizarse con botoneras dobles o combinadores de mando, como se muestra en el diagrama 4.5 [figura pendiente]. En los esquemas de control de accionamientos reversibles se utilizan bloqueos eléctricos de los contactores principales y, en algunos casos, contactos de relés de fin de carrera (límites).

Para que el diagrama de la figura 4.1 trabaje en régimen de reversión, se utiliza uno de los circuitos de fuerza mostrados en la figura 4.4. (En el esquema original, los cambios se señalizaron con líneas de color rojo.)

**Principio de funcionamiento**: se selecciona primero el botón de arranque según la dirección de giro deseada. Por ejemplo, al pulsar el botón Ad se energiza el contactor Ad, que con su CNA bloquea el botón de arranque y, con su contacto normalmente cerrado en serie con At, bloquea la posibilidad de seleccionar el arranque en sentido contrario. El motor comienza a trabajar con los dos pasos de resistencia conectados en serie con la armadura; al mismo tiempo, a través de otro contacto normalmente abierto de Ad, se energizan los relés de tiempo T1 y T2 (con diferente tiempo de energización). Cuando T1 termina de contar, se energiza el contactor 1A, que cortocircuita el primer paso de resistencia; al terminar de contar T2, se energiza el contactor 2A, que cortocircuita el segundo paso de resistencia, llevando al motor a su característica mecánica natural.

Para frenar solo se necesita pulsar el botón de parada. Para seleccionar el otro sentido de giro se pulsaría primero At, y todo el proceso se repetiría de forma similar.

El esquema de la figura 4.6 [figura pendiente] permite frenar dinámicamente al motor de corriente directa analizado. Las conexiones adicionadas para el frenado dinámico (líneas en negro en el original) entran en acción según la actuación de los límites de desaceleración Dad y Dat, que desenergizan el contactor L y energizan el de frenado F — el cual permanece energizado mientras no se accione el límite final Pad o Pat, según el sentido de giro seleccionado. Las líneas adicionadas en rojo activan un bombillo en caso de que actúe la protección de sobrecarga térmica RT.

## Conclusiones

En la actividad de hoy vimos los componentes fundamentales que permiten realizar el mando de los motores eléctricos, y explicamos algunos circuitos típicos utilizados para el arranque, frenado y control de velocidad del motor de corriente directa operando a lazo abierto.

## Preguntas de comprobación

1. ¿Qué se entiende por contactor magnético?
2. ¿Qué se entiende por relé de control?
3. ¿Cuáles son los accesorios más utilizados en accionamiento eléctrico?
4. ¿Cuáles son las posibilidades de mando de los motores eléctricos?
5. ¿Qué se entiende por bloqueo eléctrico?
6. ¿Cuándo se utiliza el bloqueo eléctrico?

## Bibliografía

1. *Accionamiento Eléctrico Automatizado II.* Ing. Mario Morera. Editorial Pueblo y Educación, Cuba, 1988. Págs. 1-70.
2. *Accionamiento Eléctrico Automatizado II.* Ing. M. Diez. Universidad de Camagüey, Cuba, 1988. Págs. 20-65.
3. *Industrial Automation. Circuit Design and Components.* David W. Pessen.
4. Programa CACEL. Juan Carlos Martín Castillo y Jesús Gómez Colorado. Salamanca, España.
5. Programa CADe_SIMU.

Deben abrir los programas sugeridos en la bibliografía y correr sus ejemplos.

## Motivación

¿Cuáles son los componentes que integran un arrancador a tensión plena para un motor de corriente alterna? ¿Siempre se arrancan a tensión plena los motores asincrónicos? Eso será objeto de estudio en la próxima actividad.

---

**Nota sobre figuras**: las figuras 4.1 a 4.6 (esquemas de fuerza y control) no se pudieron recuperar de la conversión automática del .doc — solo se extrajeron etiquetas sueltas de los cuadros de texto (I, F, L, DES, DEP, P, A, RT, T1, T2, 1A, 2A, Rarr1, Rarr2, Ad, At, Pad, Pat, DAd, DAt, M, C1, C2, (+), (-)), sin las líneas de conexión. Recomendado: volver a insertar las imágenes originales o rehacer los diagramas en una herramienta de esquemático (KiCad, draw.io, etc.) a partir del .doc fuente.
