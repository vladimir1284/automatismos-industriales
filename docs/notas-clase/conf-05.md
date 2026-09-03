# Conferencia 5. Esquemas de mando de motores de corriente alterna

**Tema II**: Sistemas de automatización industrial empleando relés y contactores.

## Sumario

- 2.3. Esquemas de mando típicos utilizados para el mando de los motores de corriente alterna.
    - 2.3.1. Generalidades sobre el motor de corriente alterna.
    - 2.3.2. Mando del arranque del motor de jaula de ardilla.
    - 2.3.3. Mando del arranque del motor de rotor bobinado.
    - 2.3.4. Mando del frenado de los motores de corriente alterna asincrónicos.
    - 2.3.5. Esquemas de inversión del motor asincrónico.
    - 2.3.6. Motores sincrónicos. Generalidades.
    - 2.3.7. Mando del arranque de los motores sincrónicos.
    - 2.3.8. Frenado de los motores sincrónicos.
- 2.4. Esquemas de accionamiento eléctrico complejos.

## Objetivos de la actividad

1. Estudiar los diferentes circuitos de control y de fuerza que se utilizan para lograr el mando de los motores de corriente alterna asincrónicos.

## Rememoración de la clase anterior

El mando en los motores de corriente directa se realiza en función de tres parámetros: tiempo, velocidad y corriente. Se estudiaron: arranque, frenado e inversión de marcha.

## Preguntas de evaluación

1. ¿Cuál es la diferencia fundamental entre el mando en función del tiempo y el mando en función de la velocidad?
2. Explique cómo se realiza el frenado dinámico en los motores de corriente directa.
3. Diga cómo se logra la inversión de marcha en los motores de corriente directa.
4. Explique el principio de funcionamiento de los esquemas vistos en la clase anterior.

## 2.3.1. Generalidades sobre el mando de los motores asincrónicos

Las máquinas asincrónicas se fabrican monofásicas y trifásicas, siendo estas últimas las más empleadas en la industria moderna. De los motores eléctricos, el de inducción es el que se emplea con mayor frecuencia; su sencillez, resistencia y el poco mantenimiento que requiere justifican su popularidad.

Los motores de corriente alterna trifásicos se dividen en dos grandes grupos: los motores sincrónicos y los motores asincrónicos — estos últimos de jaula de ardilla y de rotor bobinado. Los motores asincrónicos están ampliamente difundidos en la industria debido a sus posibilidades de mando, control y a la calidad de sus características mecánicas.

En general, el motor de inducción consta de dos partes principales: estator y rotor.

- El **estator** consiste en una armazón o culata, en cuyo interior se instala firmemente el núcleo laminado dotado de ranuras, donde se coloca un devanado formado por varios grupos de bobinas.
- El **rotor** puede ser de dos tipos:
    - **Jaula de ardilla**: formado por un conjunto de láminas que forman una estructura cilíndrica con ranuras oblicuas, en las que se instalan barras (de cobre, acero o aleación especial) cortocircuitadas en sus extremos con anillos de material conductor.
    - **Rotor bobinado**: en vez de barras, aloja un devanado muy similar al del estator; se manda al exterior a través de anillos rozantes.

Cuando se conectan los devanados del estator a una fuente polifásica de corriente alterna, se crea un campo magnético giratorio cuya velocidad depende de la frecuencia y del número de polos. Esta velocidad se conoce como **velocidad sincrónica**.

## 2.3.2. Mando de arranque de los motores de jaula de ardilla

1. **Directo de línea**: posible siempre que la red y la carga lo permitan.
2. **A tensión reducida**.
3. **Disminuyendo directamente la corriente de arranque**, aprovechando la posibilidad que brindan algunos motores de cambiar sus devanados: variando el número de pares de polos, o utilizando motores 220/440 V.

**¿Cuáles son las condiciones a tener en cuenta al diseñar los sistemas de mando para un accionamiento eléctrico?**

1. Diseñar primero el circuito de fuerza.
2. Diseñar el circuito de control.
3. Que no haya bobinas en serie en el circuito de control.
4. Que no exista carrera de contactos.
5. No pasar de línea a línea sin pasar por alguna resistencia.

### 2.3.2.1. Esquemas de arranque de los motores de jaula de ardilla (ejemplos)

**Figura 5.1. Arranque directo de un motor asincrónico de rotor en cortocircuito** [figura pendiente — etiquetas: MA~, F, RT, L, P, A].

## 2.3.3. Mando del arranque del motor de rotor bobinado

A diferencia de los motores de jaula de ardilla (J/A), en los motores de rotor bobinado (R/B) la intensidad de corriente del estator es un reflejo — por acción del efecto transformador — de la intensidad en el circuito del rotor, cuando se introducen modificaciones o ajustes en el valor de la resistencia.

Para eliminar las resistencias del motor a medida que este se acelera, pueden emplearse dos métodos:

a. Cortocircuitar simultáneamente resistencias iguales en las tres ramas mediante contactores tripolares.
b. Cortocircuitar simultáneamente resistencias iguales en las tres ramas mediante contactores monopolares.

El primer método es el más aceptado, pues el segundo tiende a crear condiciones de desequilibrio que originan pulsaciones en el valor del par y esfuerzos mecánicos adicionales.

Al rotor del motor se pueden conectar resistencias metálicas (hierro-cromo-níquel) o líquidas (carbonato de sodio).

**Ventajas de las resistencias metálicas**

- Mecánicamente fuertes.
- Alto valor de resistividad.
- Resisten la oxidación.
- La variación de resistencia con la temperatura es insignificante para uso industrial (±10%).

Para motores grandes, de más de 200 CV, las resistencias del secundario pueden ser columnas de líquido en recipientes de acero. Para las maniobras de arranque y marcha, las resistencias pueden graduarse impulsando el líquido con bombas a distintos niveles del recipiente, ocupado por una disposición especial de placas.

**Ventajas de las resistencias líquidas**

- Aceleración suave, sin escalones.
- Alta capacidad térmica.
- Construcción sencilla.

Durante el arranque de los motores de rotor bobinado, la corriente de arranque disminuye al conectar resistencias en el rotor. El arranque se realiza a momento constante, y la desconexión de los pasos de resistencia se realiza también a momento constante, mayor que el de carga. La conmutación de las resistencias se realiza en función de tres parámetros: tiempo, velocidad y corriente.

### 2.3.3.1. Esquemas de arranque de los motores de rotor bobinado (ejemplos)

**Figura 5.2. Arranque por pasos de resistencia de un motor asincrónico de rotor bobinado** [figura pendiente].

## 2.3.4. Mando de inversión de marcha de los motores asincrónicos

Para obtener regímenes de trabajo reversibles se utiliza el esquema de la Figura 5.3, donde la inversión se obtiene invirtiendo dos de las fases de alimentación, utilizando dos o tres contactores.

### 2.3.4.1. Esquemas de inversión de marcha de los motores asincrónicos (ejemplos)

**Figura 5.3. Arranque reversible de un motor asincrónico de jaula de ardilla** [figura pendiente — etiquetas: MA~, Ad, At, P, A, L, RT, 1A, T].

## 2.3.5. Frenado de los motores asincrónicos

**Frenado dinámico**: se realiza cortocircuitando el rotor (si es de rotor bobinado) e inyectando corriente directa por dos o tres fases del estator, una vez desconectado este de la red de alimentación. Se controla en función del tiempo o de la velocidad. Se utiliza como frenado de emergencia, pues es rápido y logra que el motor se detenga completamente, llevando el momento motor a cero. Generalmente los sistemas comerciales traen resistencias y se frenan dinámicamente.

**Frenado por contracorriente**: se obtiene intercalando resistencias de frenado en el rotor de la máquina (para limitar la corriente producida por la contracorriente) y permutando dos de las fases de alimentación del motor. Se puede controlar en función del tiempo o de la velocidad. Es un frenado muy brusco, por lo que solo se utiliza en motores de jaula de ardilla de pequeña potencia — en estos no es posible limitar la corriente de frenado, ya que no hay acceso al rotor de la máquina. Se emplea generalmente en accionamientos reversibles donde, una vez detenido el motor, este debe arrancar en sentido contrario — por ejemplo, en una rectificadora (máquina herramienta).

**Frenado regenerativo**: se realiza con ayuda de convertidores rotatorios o estáticos completamente controlados.

### 2.3.5.1. Esquemas de frenado de los motores asincrónicos (ejemplos)

**Figura 5.4. Arranque por pasos de resistencia de un motor asincrónico de rotor bobinado y frenado dinámico en función del tiempo** [figura pendiente].

**Figura 5.5. Foto de un panel de control** utilizado para el mando de motores eléctricos [imagen no recuperada].

## 2.3.6. Motores sincrónicos. Generalidades

Los motores sincrónicos son máquinas que trabajan a una velocidad promedio constante: la velocidad sincrónica. Su rotor gira en sincronismo con el campo magnético creado por el estator, el cual gira a una velocidad directamente proporcional a la frecuencia de la fuente de alimentación e inversamente proporcional al número de polos.

En la práctica, el motor no siempre gira exactamente a la velocidad sincrónica: debido a cambios repentinos en la carga puede haber alguna variación angular entre los polos del rotor y del estator, de modo que la velocidad instantánea puede ser mayor o menor que la sincrónica. Si se produce un aumento de carga tal que la separación de los polos aumente demasiado, el rotor deja de girar al unísono con el campo, perdiendo rápidamente la velocidad.

La construcción de este motor es similar a la de un alternador, con diferencias de detalle orientadas a su operación. Básicamente tiene un estator de corriente alterna (inducido), formado por un devanado alojado en las ranuras de un núcleo laminado, asegurado firmemente a él, sobre todo cuando el par de arranque es particularmente severo. Las bobinas del estator son de varias espiras en las máquinas grandes, y de una sola espira en los motores pequeños.

Además del arrollamiento estatórico, sobre el rotor (en la mayoría de los casos, de polos salientes) se devana un arrollamiento de corriente continua (inductor), cuyos terminales se conectan a unos anillos a través de los cuales se envía la corriente continua al rotor. Su objetivo es producir polos alternos norte y sur que sean atraídos por el campo magnético del estator — por esto el rotor y el estator deben tener el mismo número de polos.

Los rotores de los motores sincrónicos suelen llevar además un devanado amortiguador de barras en cortocircuito, análogo al empleado en los motores de jaula de ardilla de los motores de inducción. Estos devanados amortiguadores se incluyen para obtener un par de arranque que permita acelerar al motor con alguna carga, y para evitar el movimiento pendular.

<!--
Nota de revisión: el párrafo siguiente, en el documento original, atribuye estas limitaciones y ventajas a "los motores asincrónicos", pero por contexto (sección 2.3.6, generalidades de motores SINCRÓNICOS, comparándolos con los asincrónicos) parece que el sujeto real debería ser "los motores sincrónicos". Se deja aquí la observación para que el profesor confirme cuál de los dos motores tiene realmente estas limitaciones/ventajas antes de publicar.
-->

Los motores [sincrónicos, a confirmar] presentan limitaciones como: par de arranque limitado, puesta en marcha que puede ser lenta, capacidad de sobrecarga reducida y necesidad de dos fuentes de alimentación. Su característica de velocidad constante y su capacidad de ajustar fácilmente el factor de potencia — algo que no existe en ningún otro tipo de máquina — los hacen insustituibles en accionamientos de gran potencia que funcionan en régimen permanente de trabajo, como compresores, bombas, grupos motor-generador, trenes de laminación, etc.

## 2.3.7. Mando del arranque de los motores sincrónicos

Los motores sincrónicos pueden arrancarse de varias formas, dependiendo del tiempo de arranque considerado, la corriente demandada y el par de oposición dado por la carga accionada. Tres métodos de arranque:

- Arranque con máquina auxiliar.
- Arranque asincrónico.
- Arranque a baja frecuencia (sincrónico).

### 2.3.7.1. Esquemas de arranque de los motores sincrónicos

**Figura 5.6. Arranque asincrónico de un motor sincrónico en función del tiempo** [figura pendiente].

**Figura 5.7. Arranque del motor sincrónico asincrónicamente en función de la velocidad** [figura pendiente].

## 2.3.8. Frenado de los motores sincrónicos

Existen instalaciones donde se requiere que el motor se detenga más rápido de lo que permite simplemente desconectar su alimentación. En esos casos puede emplearse el frenado dinámico o el frenado por contracorriente.

**Frenado dinámico**: se obtiene conservando la alimentación del devanado de excitación del rotor, desconectando el estator de la red y conectándolo a una resistencia exterior. El motor trabaja entonces como generador, desarrollando un par de frenado y disipando la energía rotatoria en la resistencia. Cuando la excitación proviene de una excitatriz montada en el eje del motor, el frenado es más débil que cuando la excitación proviene de una fuente independiente — porque la tensión de la excitatriz, al girar con el motor, disminuye al disminuir la velocidad.

**Frenado por contracorriente**: cuando el motor tiene devanados amortiguadores, puede usarse este frenado, esencialmente igual al de los motores de inducción, salvo que en el momento del frenado se retira la excitación, quedando el motor como si fuera de inducción.

## 2.4. Esquemas de accionamiento eléctrico complejos

Explicar el principio de funcionamiento de los siguientes esquemas:

a. Carretilla eléctrica [figura pendiente].
b. Elevador de cuatro pisos [figura pendiente].

Todos los estudiantes deben explicarle al profesor el principio de funcionamiento de los esquemas anteriores. La discusión se realizará en la medida en que los estudiantes estén preparados, pero antes de la evaluación de este tema.

## Conclusiones

En la actividad de hoy vimos los esquemas fundamentales que permiten realizar el mando de los motores de corriente alterna asincrónicos y sincrónicos. Además, mostramos esquemas de mando complejo de sistemas reales en los que se utilizan técnicas de control diferentes a las de los esquemas típicos.

## Preguntas de comprobación

1. ¿Cuáles son las posibilidades de mando de los motores eléctricos asincrónicos?
2. ¿Qué se entiende por arranque a tensión reducida?
3. ¿Cuándo se utiliza el frenado dinámico?

## Bibliografía

1. *Accionamiento Eléctrico Automatizado II.* Ing. Mario Morera. Editorial Pueblo y Educación, Cuba, 1988. Págs. 40-90.
2. *Accionamiento Eléctrico Automatizado II.* Ing. M. Diez. Universidad de Camagüey, Cuba, 1988. Págs. 65-90.
3. Programa CACEL. Juan Carlos Martín Castillo y Jesús Gómez Colorado. Salamanca, España.
4. Sitio web de Accionamiento Eléctrico. Ing. M. Diez y colectivo de estudiantes. Universidad de Camagüey.
5. Programa CADe_SIMU.

Deben utilizar el programa sugerido en la bibliografía para correr los ejemplos explicados en clase.

## Motivación

En las dos próximas actividades comenzaremos a realizar diseños de circuitos de control y de fuerza a partir de condiciones específicas, apoyándonos en la guía de problemas de la multimedia de la disciplina y los ejercicios que muestra y resuelve el CACEL.

---

**Nota sobre figuras**: las figuras 5.1 a 5.7 (esquemas de arranque, inversión y frenado) y la foto del panel de control (5.5) no se recuperaron de la conversión automática del .doc — solo quedaron etiquetas sueltas de los cuadros de texto. Recomendado reinsertar las imágenes originales.
