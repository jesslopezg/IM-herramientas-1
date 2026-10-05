const STORAGE_KEY = 'im-lab-v2';

const categories = [
  'Instrumentos base',
  'Experiencia y comportamiento',
  'Digital y comunidades',
  'Pruebas de investigación'
];

const techniques = {
  encuesta: {
    order: 1,
    category: 'Instrumentos base',
    name: 'Encuesta',
    subtitle: 'Cuestionario estructurado',
    instrument: 'Cuestionario',
    title: 'Cuestionario de encuesta',
    description: 'Construye el cuestionario directamente: define qué medirás y agrega los reactivos con su tipo de respuesta.',
    baseFields: [
      f('Objetivo del instrumento','objective','textarea','Ej. Medir la satisfacción de estudiantes con el servicio de cafetería.','full'),
      f('Población / participante','population','input','Ej. Estudiantes de pregrado'),
      f('Variable principal','variable','input','Ej. Satisfacción'),
      f('Dimensión','dimension','input','Ej. Calidad del servicio'),
      f('Introducción para el encuestado','intro','textarea','Ej. Esta encuesta es anónima y toma menos de 5 minutos.','full')
    ],
    itemFields: [
      f('Texto de la pregunta','text','textarea','Ej. ¿Qué tan satisfecho(a) estás con el tiempo de espera?','full',true),
      s('Tipo de pregunta','type',['Escala Likert 1–5','Satisfacción 1–5','Frecuencia','Opción múltiple','Dicotómica Sí/No','Abierta']),
      f('Opciones / anclajes','options','input','Ej. 1=Muy insatisfecho; 5=Muy satisfecho')
    ],
    itemLabel: 'reactivo',
    checklist: [
      'Cada pregunta responde al objetivo del instrumento.',
      'No hay preguntas dobles, ambiguas o que sugieran la respuesta.',
      'Las opciones de respuesta son exhaustivas y mutuamente excluyentes cuando corresponde.',
      'Las escalas mantienen el mismo sentido y numeración.',
      'Se realizará una prueba piloto antes de la aplicación definitiva.'
    ]
  },

  entrevista: {
    order: 2,
    category: 'Instrumentos base',
    name: 'Entrevista',
    subtitle: 'Guía semiestructurada',
    instrument: 'Guía de entrevista',
    title: 'Guía de entrevista semiestructurada',
    description: 'Organiza la entrevista por bloques temáticos y prepara preguntas principales y probes de seguimiento.',
    baseFields: [
      f('Objetivo de la entrevista','objective','textarea','Ej. Comprender cómo los clientes eligen una cafetería para trabajar.','full'),
      f('Perfil del participante','profile','textarea','Ej. Personas de 20–35 años que visitan cafeterías al menos 2 veces por semana.','full'),
      f('Apertura / rapport','opening','textarea','Ej. Gracias por participar. No hay respuestas correctas o incorrectas.','full')
    ],
    itemFields: [
      f('Bloque temático','block','input','Ej. Elección del lugar'),
      f('Pregunta principal','question','textarea','Ej. Cuéntame cómo decides a qué cafetería ir.','full',true),
      f('Probes / seguimiento','probes','textarea','Ej. ¿Qué comparas? ¿Qué te hace descartar un lugar?','full')
    ],
    endFields: [
      f('Pregunta o mensaje de cierre','closing','textarea','Ej. ¿Hay algo importante sobre este tema que no te haya preguntado?','full')
    ],
    itemLabel: 'pregunta',
    checklist: [
      'Las preguntas son abiertas y no sugieren la respuesta.',
      'La guía avanza de temas generales a específicos.',
      'Cada bloque está relacionado con el objetivo.',
      'Los probes sirven para profundizar, no para dirigir.',
      'Existe una apertura y un cierre claros.'
    ]
  },

  focus: {
    order: 3,
    category: 'Instrumentos base',
    name: 'Focus Group',
    subtitle: 'Guía de moderación',
    instrument: 'Guía de moderación',
    title: 'Guía de moderación de Focus Group',
    description: 'Configura la sesión, estructura la discusión por bloques y vincula cada estímulo con una pregunta concreta.',
    baseFields: [
      f('Objetivo del Focus Group','objective','textarea','Ej. Explorar percepciones sobre una nueva propuesta de valor para una app de movilidad.','full'),
      f('Perfil de participantes','profile','textarea','Ej. Usuarios frecuentes de apps de movilidad, 18–35 años.','full'),
      f('Número de participantes','participants','input','Ej. 6–8'),
      f('Duración estimada','duration','input','Ej. 60–75 min'),
      f('Apertura del moderador','opening','textarea','Ej. Presentación, reglas de participación, confidencialidad y permiso de grabación.','full')
    ],
    itemFields: [
      f('Bloque / momento','block','input','Ej. Reacciones iniciales'),
      f('Pregunta al grupo','question','textarea','Ej. ¿Qué es lo primero que les llama la atención de este concepto?','full',true),
      f('Profundización','probe','textarea','Ej. ¿Por qué? ¿Qué les genera confianza o desconfianza?','full'),
      f('Estímulo / material','stimulus','input','Ej. Mockup A, anuncio, empaque, video'),
      f('Tiempo','time','input','Ej. 10 min')
    ],
    endFields: [f('Cierre del moderador','closing','textarea','Ej. Si pudieran cambiar una sola cosa de la propuesta, ¿cuál sería?','full')],
    itemLabel: 'bloque',
    checklist: [
      'Las preguntas generan conversación y no solo respuestas de sí/no.',
      'El moderador tiene probes preparados.',
      'Los estímulos están vinculados con una pregunta concreta.',
      'La sesión tiene tiempos aproximados por bloque.',
      'Se definieron reglas de participación, confidencialidad y cierre.'
    ]
  },

  observacion: {
    order: 4,
    category: 'Instrumentos base',
    name: 'Observación',
    subtitle: 'Ficha / protocolo',
    instrument: 'Ficha de observación',
    title: 'Protocolo de observación',
    description: 'Convierte conceptos en conductas observables y registra qué ocurrirá, dónde y con qué criterio se codificará.',
    baseFields: [
      f('Objetivo de la observación','objective','textarea','Ej. Identificar comportamientos durante la elección de productos en una tienda.','full'),
      f('Contexto / lugar','setting','input','Ej. Supermercado — pasillo de bebidas'),
      f('Unidad de observación','unit','input','Ej. Compradores que se detienen frente al anaquel'),
      s('Rol del observador','observerRole',['No participante','Participante','Observación encubierta autorizada','Otro'])
    ],
    itemFields: [
      f('Categoría','categoryItem','input','Ej. Búsqueda de información'),
      f('Indicador observable','indicator','textarea','Ej. Lee etiqueta, compara precios o revisa ingredientes.','full',true),
      s('Forma de registro','responseType',['Presencia / ausencia','Frecuencia','Duración','Escala de intensidad','Nota de campo']),
      f('Escala / codificación','scale','input','Ej. 0=No ocurre; 1=Ocurre'),
      f('Nota / evidencia esperada','notes','textarea','Ej. Registrar producto comparado y reacción visible.','full')
    ],
    itemLabel: 'criterio',
    checklist: [
      'Cada indicador describe una conducta observable, no una interpretación mental.',
      'La unidad de observación está claramente definida.',
      'Las categorías no se traslapan innecesariamente.',
      'La forma de registro es consistente entre observadores.',
      'Se definieron criterios éticos y de privacidad para el contexto.'
    ]
  },

  mystery: {
    order: 5,
    category: 'Experiencia y comportamiento',
    name: 'Mystery Shopping',
    subtitle: 'Guion + checklist',
    instrument: 'Checklist de visita',
    title: 'Protocolo de Mystery Shopping',
    description: 'Diseña un escenario estandarizado y un checklist centrado en conductas y puntos de contacto verificables.',
    baseFields: [
      f('Objetivo de la visita','objective','textarea','Ej. Evaluar consistencia del servicio durante una solicitud de información.','full'),
      f('Tipo de establecimiento','establishment','input','Ej. Sucursal bancaria'),
      f('Perfil del mystery shopper','shopperProfile','input','Ej. Cliente potencial que solicita información de una cuenta'),
      f('Escenario que debe representar','scenario','textarea','Ej. Preguntar requisitos y costos sin revelar intención de evaluación.','full')
    ],
    itemFields: [
      f('Punto de contacto','touchpoint','input','Ej. Recepción / caja'),
      f('Criterio a evaluar','criterion','input','Ej. Claridad de la explicación'),
      f('Conducta observable','observable','textarea','Ej. Explica costos completos y verifica si el cliente entendió.','full',true),
      f('Escala / respuesta','scale','input','Ej. Sí/No o 1–5'),
      f('Evidencia / comentario','evidence','textarea','Ej. Frase utilizada, tiempo de espera o detalle observado.','full')
    ],
    itemLabel: 'criterio',
    checklist: [
      'El escenario puede repetirse de forma comparable entre visitas.',
      'Los criterios se basan en conductas observables.',
      'La escala tiene anclajes claros.',
      'Se distinguen hechos observados de opiniones del evaluador.',
      'La visita no solicita acciones indebidas ni vulnera privacidad.'
    ]
  },

  shopalong: {
    order: 6,
    category: 'Experiencia y comportamiento',
    name: 'Shop-Along',
    subtitle: 'Protocolo de recorrido',
    instrument: 'Guía de acompañamiento',
    title: 'Protocolo de Shop-Along',
    description: 'Estructura el acompañamiento durante la compra: observa decisiones reales y pregunta sin interrumpir el proceso.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Comprender cómo las familias eligen cereal durante una compra real.','full'),
      f('Perfil del comprador','shopperProfile','input','Ej. Responsable de compras del hogar'),
      f('Producto / categoría','productCategory','input','Ej. Cereales'),
      f('Lugar del recorrido','location','input','Ej. Supermercado de gran formato')
    ],
    itemFields: [
      f('Etapa del recorrido','stage','input','Ej. Entrada al pasillo'),
      f('Qué observar','observe','textarea','Ej. Productos que mira, toca, compara o descarta.','full',true),
      f('Pregunta breve','question','textarea','Ej. ¿Qué estás buscando en este momento?','full'),
      f('Decisión / señal a registrar','decision','input','Ej. Producto elegido / descartado'),
      f('Fricción o duda','friction','input','Ej. Precio, empaque, disponibilidad')
    ],
    itemLabel: 'momento',
    checklist: [
      'Las preguntas son breves y no alteran innecesariamente la compra.',
      'Se observan acciones antes de pedir explicaciones.',
      'Se registran alternativas consideradas y descartadas.',
      'El protocolo contempla momentos antes, durante y después de la elección.',
      'Existe consentimiento para el acompañamiento y registro.'
    ]
  },

  diario: {
    order: 7,
    category: 'Experiencia y comportamiento',
    name: 'Diario de consumo',
    subtitle: 'Registro longitudinal',
    instrument: 'Plantilla de diario',
    title: 'Diario de consumo / experiencia',
    description: 'Crea entradas repetibles para capturar experiencias en contexto a lo largo de varios días o momentos de consumo.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Registrar cuándo, cómo y por qué se consumen bebidas energéticas durante una semana.','full'),
      f('Perfil del participante','participantProfile','input','Ej. Universitarios que consumen al menos 2 por semana'),
      f('Duración del diario','duration','input','Ej. 7 días'),
      f('Frecuencia de registro','frequency','input','Ej. Después de cada consumo'),
      f('Instrucción general','instructions','textarea','Ej. Completa una entrada inmediatamente después de consumir el producto.','full')
    ],
    itemFields: [
      f('Momento / disparador','moment','input','Ej. Después de cada consumo'),
      f('Pregunta o consigna','prompt','textarea','Ej. ¿Dónde estabas, con quién y qué necesitabas resolver?','full',true),
      s('Evidencia solicitada','evidenceType',['Texto','Foto','Video','Captura de pantalla','Audio','Sin evidencia']),
      f('Contexto a registrar','context','input','Ej. Lugar, hora, compañía'),
      f('Emoción / valoración','emotion','input','Ej. Escala 1–5 + palabra que describa la experiencia')
    ],
    itemLabel: 'entrada',
    checklist: [
      'Cada entrada puede completarse rápidamente en el contexto real.',
      'La frecuencia de registro está definida.',
      'Las consignas son consistentes durante todo el periodo.',
      'La evidencia solicitada es necesaria y proporcional al objetivo.',
      'Se aclaró cómo manejar imágenes o datos de terceros.'
    ]
  },

  usabilidad: {
    order: 8,
    category: 'Experiencia y comportamiento',
    name: 'Prueba de usabilidad',
    subtitle: 'Tareas + observación',
    instrument: 'Guion de prueba',
    title: 'Protocolo de prueba de usabilidad',
    description: 'Convierte objetivos de uso en tareas realistas, criterios de éxito, métricas y preguntas posteriores.',
    baseFields: [
      f('Objetivo de la prueba','objective','textarea','Ej. Evaluar si nuevos usuarios pueden completar una compra sin asistencia.','full'),
      f('Perfil del participante','participantProfile','input','Ej. Usuarios móviles que compran en línea al menos una vez al mes'),
      f('Producto / interfaz','product','input','Ej. Prototipo de e-commerce móvil'),
      f('Contexto de prueba','context','input','Ej. Remota moderada / dispositivo móvil')
    ],
    itemFields: [
      f('Tarea / escenario','task','textarea','Ej. Imagina que necesitas comprar un regalo y recibirlo antes del viernes.','full',true),
      f('Criterio de éxito','successCriterion','input','Ej. Completa compra sin ayuda'),
      f('Qué observar','observation','textarea','Ej. Dudas, retrocesos, errores, comentarios espontáneos.','full'),
      f('Métrica','metric','input','Ej. Éxito, tiempo, errores'),
      f('Pregunta posterior','probe','textarea','Ej. ¿Qué parte te resultó más difícil?','full')
    ],
    itemLabel: 'tarea',
    checklist: [
      'Las tareas describen un objetivo del usuario sin explicar cómo resolverlo.',
      'Cada tarea tiene un criterio de éxito observable.',
      'Se registran errores y ayudas por separado.',
      'Las preguntas posteriores no justifican el diseño al participante.',
      'Se definió qué datos de pantalla o grabación se conservarán.'
    ]
  },

  eyetracking: {
    order: 9,
    category: 'Experiencia y comportamiento',
    name: 'Eye Tracking',
    subtitle: 'Protocolo + AOI',
    instrument: 'Protocolo de prueba',
    title: 'Protocolo de Eye Tracking',
    description: 'Define estímulos, tareas, áreas de interés y métricas antes de recolectar datos de atención visual.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Comparar atención visual entre dos propuestas de empaque.','full'),
      f('Perfil del participante','participantProfile','input','Ej. Compradores habituales de la categoría'),
      f('Estímulo','stimulus','input','Ej. Anaquel simulado con 8 empaques'),
      f('Equipo / modalidad','equipment','input','Ej. Eye tracker de escritorio / webcam validada')
    ],
    itemFields: [
      f('Área de interés (AOI)','aoi','input','Ej. Marca / precio / claim'),
      f('Tarea del participante','task','textarea','Ej. Elige el producto que comprarías normalmente.','full',true),
      s('Métrica principal','metric',['Tiempo hasta primera fijación','Duración total de fijación','Número de fijaciones','Revisitas','Proporción de participantes']),
      f('Comparación / criterio','benchmark','input','Ej. AOI marca vs. AOI precio'),
      f('Nota de análisis','note','textarea','Ej. Interpretar junto con elección declarada, no como intención automática.','full')
    ],
    itemLabel: 'AOI / medida',
    checklist: [
      'Las áreas de interés se definieron antes del análisis.',
      'La tarea es la misma entre participantes o condiciones comparables.',
      'Las métricas seleccionadas responden al objetivo.',
      'Se evita interpretar atención visual como agrado o intención por sí sola.',
      'Se contemplan calibración, calidad de señal y exclusiones.'
    ]
  },

  social: {
    order: 10,
    category: 'Digital y comunidades',
    name: 'Social Listening',
    subtitle: 'Matriz de monitoreo',
    instrument: 'Matriz de codificación',
    title: 'Protocolo de Social Listening',
    description: 'Delimita plataformas, periodo, términos de búsqueda y reglas de codificación para analizar conversación digital.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Identificar temas y fricciones asociados a entregas de última milla.','full'),
      f('Plataformas / fuentes','platforms','input','Ej. X, Reddit, TikTok, reseñas públicas'),
      f('Periodo','period','input','Ej. 1–30 de septiembre'),
      f('Tema / entidad','topic','input','Ej. Entregas a domicilio')
    ],
    itemFields: [
      f('Palabra clave / consulta','keyword','input','Ej. "pedido llegó tarde"'),
      f('Categoría de codificación','codingCategory','input','Ej. Tiempo de entrega'),
      s('Sentimiento / valoración','sentiment',['No aplica','Positivo / neutral / negativo','Escala -2 a +2','Codificación manual definida por el equipo']),
      f('Métrica / dato','metric','input','Ej. Frecuencia, engagement, autor único'),
      f('Regla de inclusión / exclusión','rule','textarea','Ej. Incluir publicaciones en español que describan experiencia propia.','full',true)
    ],
    itemLabel: 'regla / consulta',
    checklist: [
      'Las consultas incluyen variantes relevantes y excluyen ruido conocido.',
      'El periodo y las fuentes están definidos.',
      'Las categorías tienen reglas de codificación claras.',
      'Se distingue volumen de conversación de prevalencia en la población.',
      'Se respetan privacidad, términos de uso y límites de datos públicos.'
    ]
  },

  netnografia: {
    order: 11,
    category: 'Digital y comunidades',
    name: 'Etnografía / Netnografía',
    subtitle: 'Protocolo + diario de campo',
    instrument: 'Diario de campo',
    title: 'Protocolo de Etnografía / Netnografía',
    description: 'Prepara un registro sistemático de prácticas, interacciones, lenguaje, contexto y evidencia de campo.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Comprender prácticas y normas de una comunidad digital de corredores aficionados.','full'),
      f('Comunidad / contexto','community','input','Ej. Grupo público y encuentros presenciales'),
      f('Periodo de observación','period','input','Ej. 4 semanas'),
      f('Consideraciones éticas','ethics','textarea','Ej. Anonimizar usuarios y no copiar contenido de espacios privados sin permiso.','full')
    ],
    itemFields: [
      f('Fuente / situación','source','input','Ej. Hilo de discusión / evento / interacción'),
      f('Práctica o conducta a registrar','behavior','textarea','Ej. Cómo recomiendan marcas o justifican una compra.','full',true),
      f('Interacción relevante','interaction','input','Ej. Respuesta, aprobación, conflicto, ritual'),
      f('Lenguaje / símbolo','language','input','Ej. Términos propios, memes, etiquetas'),
      f('Evidencia / nota reflexiva','evidence','textarea','Ej. Descripción densa + interpretación separada.','full')
    ],
    itemLabel: 'foco de campo',
    checklist: [
      'El protocolo separa descripción de interpretación.',
      'Se registra contexto suficiente para entender cada observación.',
      'La selección de espacios o participantes es coherente con el objetivo.',
      'Se documenta la posición del investigador cuando pueda influir.',
      'Las decisiones éticas consideran privacidad y expectativas del contexto.'
    ]
  },

  mroc: {
    order: 12,
    category: 'Digital y comunidades',
    name: 'MROC',
    subtitle: 'Comunidad de investigación',
    instrument: 'Plan de actividades',
    title: 'Plan de MROC',
    description: 'Diseña una comunidad de investigación en línea por etapas, con actividades, estímulos y seguimiento del moderador.',
    baseFields: [
      f('Objetivo de la comunidad','objective','textarea','Ej. Explorar hábitos, necesidades y reacciones a conceptos durante dos semanas.','full'),
      f('Perfil de participantes','participantProfile','input','Ej. 20 clientes activos de la categoría'),
      f('Duración','duration','input','Ej. 14 días'),
      f('Plataforma','platform','input','Ej. Comunidad privada / plataforma MROC'),
      f('Rol / nombre del moderador','moderator','input','Ej. Equipo de Investigación de Mercados')
    ],
    itemFields: [
      f('Día / etapa','day','input','Ej. Día 3'),
      f('Actividad','activity','input','Ej. Mapa de rutina'),
      f('Consigna','prompt','textarea','Ej. Muéstranos cómo encaja esta categoría en un día normal.','full',true),
      f('Estímulo','stimulus','input','Ej. Imagen / concepto / video'),
      f('Entregable esperado','expected','input','Ej. Foto + texto de 150 palabras'),
      f('Seguimiento del moderador','followup','textarea','Ej. Preguntar por excepciones, tensiones y decisiones.','full')
    ],
    itemLabel: 'actividad',
    checklist: [
      'La secuencia de actividades progresa sin saturar a los participantes.',
      'Cada actividad produce información vinculada al objetivo.',
      'Se distingue participación individual de interacción entre miembros.',
      'El moderador tiene reglas claras para profundizar y mantener engagement.',
      'Se definieron privacidad, consentimiento y tratamiento de contenidos.'
    ]
  },

  proyectivas: {
    order: 13,
    category: 'Pruebas de investigación',
    name: 'Técnicas proyectivas',
    subtitle: 'Estímulos + profundización',
    instrument: 'Guía proyectiva',
    title: 'Guía de técnicas proyectivas',
    description: 'Define el estímulo, la instrucción y la forma de profundizar sin convertir la interpretación en una conclusión automática.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Explorar asociaciones espontáneas y significados vinculados a una marca.','full'),
      f('Perfil de participante','profile','input','Ej. Consumidores actuales y potenciales'),
      s('Técnica principal','technique',['Asociación de palabras','Completar frases','Personificación','Collage','Tercera persona','Analogías / metáforas','Otra']),
      f('Instrucción general','instruction','textarea','Ej. Responde lo primero que venga a tu mente; no hay respuestas correctas.','full')
    ],
    itemFields: [
      f('Estímulo','stimulus','input','Ej. Nombre de marca / imagen / frase'),
      f('Consigna','prompt','textarea','Ej. Si esta marca fuera una persona, ¿cómo sería?','full',true),
      f('Respuesta a registrar','responseType','input','Ej. Texto libre + palabras exactas utilizadas'),
      f('Profundización','followup','textarea','Ej. ¿Qué te hace decir eso? Dame un ejemplo.','full'),
      f('Criterio para análisis posterior','analysisNote','textarea','Ej. Codificar temas recurrentes; no inferir rasgos psicológicos clínicos.','full')
    ],
    itemLabel: 'estímulo',
    checklist: [
      'La consigna no explica la respuesta que se espera.',
      'Los estímulos son comparables entre participantes cuando se necesita comparación.',
      'Se registran las palabras o producciones originales antes de interpretar.',
      'Las preguntas de seguimiento exploran el significado atribuido por el participante.',
      'La interpretación se presenta como evidencia cualitativa, no como diagnóstico.'
    ]
  },

  concepto: {
    order: 14,
    category: 'Pruebas de investigación',
    name: 'Prueba de concepto / producto',
    subtitle: 'Evaluación estructurada',
    instrument: 'Ficha de evaluación',
    title: 'Prueba de concepto / producto',
    description: 'Construye una evaluación comparable del concepto o producto y combina escalas con preguntas abiertas de diagnóstico.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Evaluar comprensión, relevancia y potencial de una nueva propuesta de servicio.','full'),
      f('Perfil del participante','profile','input','Ej. Usuarios potenciales del segmento objetivo'),
      f('Concepto / producto','concept','input','Ej. Suscripción mensual de snacks saludables'),
      f('Forma de exposición','exposure','input','Ej. Texto + mockup de empaque')
    ],
    itemFields: [
      f('Dimensión','dimension','input','Ej. Relevancia'),
      f('Pregunta','question','textarea','Ej. ¿Qué tan relevante es esta propuesta para ti?','full',true),
      s('Tipo de respuesta','responseType',['Escala 1–5','Escala 0–10','Elección','Abierta','Ranking']),
      f('Anclajes / escala','scale','input','Ej. 1=Nada relevante; 5=Muy relevante'),
      f('Profundización','probe','textarea','Ej. ¿Qué tendría que cambiar para que fuera más relevante?','full')
    ],
    itemLabel: 'medida',
    checklist: [
      'El estímulo presenta la propuesta de forma comprensible y consistente.',
      'Las dimensiones evaluadas responden a decisiones reales del proyecto.',
      'Las escalas incluyen anclajes claros.',
      'Las preguntas abiertas ayudan a explicar las puntuaciones.',
      'No se confunde intención declarada con comportamiento futuro garantizado.'
    ]
  },

  experimento: {
    order: 15,
    category: 'Pruebas de investigación',
    name: 'Experimento / A-B Test',
    subtitle: 'Protocolo experimental',
    instrument: 'Protocolo experimental',
    title: 'Protocolo de Experimento / A-B Test',
    description: 'Especifica hipótesis, condiciones, manipulación, medidas y criterios para que la comparación pueda interpretarse correctamente.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Evaluar si un mensaje de beneficio aumenta la conversión frente al mensaje actual.','full'),
      f('Hipótesis','hypothesis','textarea','Ej. La versión B tendrá mayor tasa de conversión que la versión A.','full'),
      f('Población / muestra','population','input','Ej. Visitantes elegibles del sitio'),
      f('Variable independiente','independentVariable','input','Ej. Mensaje principal'),
      f('Variable dependiente','dependentVariable','input','Ej. Conversión'),
      f('Condiciones controladas','control','textarea','Ej. Misma audiencia, periodo, precio y página salvo el mensaje.','full')
    ],
    itemFields: [
      f('Condición / versión','condition','input','Ej. A — mensaje actual'),
      f('Manipulación / estímulo','manipulation','textarea','Ej. Headline centrado en ahorro de tiempo.','full',true),
      f('Medida','measure','input','Ej. Tasa de conversión'),
      f('Momento / ventana','timing','input','Ej. 14 días o hasta tamaño definido'),
      f('Criterio de comparación','success','textarea','Ej. Comparar diferencia con intervalo de confianza y tamaño de efecto.','full')
    ],
    itemLabel: 'condición',
    checklist: [
      'La hipótesis se formuló antes de observar resultados.',
      'La variable manipulada y la medida de resultado están claramente definidas.',
      'Las condiciones difieren solo en lo que se pretende probar, cuando es posible.',
      'Se definieron duración/tamaño y criterio de análisis antes de detener la prueba.',
      'La causalidad se limita al diseño y condiciones efectivamente controladas.'
    ]
  },

  panel: {
    order: 16,
    category: 'Pruebas de investigación',
    name: 'Panel de consumidores',
    subtitle: 'Seguimiento longitudinal',
    instrument: 'Ficha de seguimiento',
    title: 'Plan de Panel de Consumidores',
    description: 'Define qué se medirá de forma repetida, con qué frecuencia y cómo se mantendrá comparabilidad entre olas.',
    baseFields: [
      f('Objetivo','objective','textarea','Ej. Seguir cambios mensuales en uso, gasto y percepción de una categoría.','full'),
      f('Perfil del panel','panelProfile','input','Ej. Hogares compradores de la categoría'),
      f('Duración total','duration','input','Ej. 6 meses'),
      f('Frecuencia de medición','frequency','input','Ej. Mensual')
    ],
    itemFields: [
      f('Indicador','indicator','input','Ej. Frecuencia de compra'),
      f('Pregunta / medida','measure','textarea','Ej. ¿Cuántas veces compraste la categoría en los últimos 30 días?','full',true),
      f('Escala / unidad','scale','input','Ej. Número de compras'),
      f('Fuente / evidencia','source','input','Ej. Autorreporte / ticket / registro'),
      f('Ola / periodicidad','wave','input','Ej. En todas las olas')
    ],
    itemLabel: 'indicador',
    checklist: [
      'Los indicadores clave permanecen comparables entre olas.',
      'El periodo de recuerdo está definido y es consistente.',
      'Se registra abandono o sustitución de participantes.',
      'Los cambios del instrumento quedan documentados.',
      'Se separan cambios reales de posibles efectos de composición del panel.'
    ]
  }
};

function f(label,key,type='input',placeholder='',cls='',required=false){
  return {kind:'field',label,key,type,placeholder,cls,required};
}
function s(label,key,options,cls=''){
  return {kind:'select',label,key,options,cls};
}

const defaultState = {
  active: 'encuesta',
  global: {studentName:'', courseGroup:'', brief:''},
  data: {}
};

function blankTechniqueState(def){
  const obj = {items:[], checks:{}};
  [...(def.baseFields||[]), ...(def.endFields||[])].forEach(field => obj[field.key] = '');
  return obj;
}

let state = loadState();
Object.entries(techniques).forEach(([key,def]) => {
  if(!state.data[key]) state.data[key] = blankTechniqueState(def);
  if(!Array.isArray(state.data[key].items)) state.data[key].items = [];
  if(!state.data[key].checks) state.data[key].checks = {};
});
if(!techniques[state.active]) state.active = 'encuesta';

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return structuredCloneSafe(defaultState);
    const parsed = JSON.parse(raw);
    return {
      active: parsed.active || 'encuesta',
      global: {...defaultState.global, ...(parsed.global||{})},
      data: parsed.data || {}
    };
  }catch(e){ return structuredCloneSafe(defaultState); }
}
function structuredCloneSafe(v){ return JSON.parse(JSON.stringify(v)); }
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function esc(v=''){
  return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function nl(v=''){ return esc(v).replace(/\n/g,'<br>'); }
function has(v){ return String(v||'').trim().length>0; }

function renderNavigation(filter=''){
  const nav = document.getElementById('techNav');
  const q = filter.trim().toLowerCase();
  let count = 0;
  nav.innerHTML = categories.map(category => {
    const entries = Object.entries(techniques)
      .filter(([,d]) => d.category===category)
      .filter(([,d]) => !q || `${d.name} ${d.subtitle} ${d.instrument}`.toLowerCase().includes(q))
      .sort((a,b)=>a[1].order-b[1].order);
    if(!entries.length) return '';
    count += entries.length;
    return `<div class="nav-group">
      <div class="nav-group-title">${esc(category)}</div>
      ${entries.map(([key,d])=>`<button class="tech-btn ${key===state.active?'active':''}" data-tech="${key}">
        <span class="tech-number">${String(d.order).padStart(2,'0')}</span>
        <span><b>${esc(d.name)}</b><small>${esc(d.subtitle)}</small></span>
      </button>`).join('')}
    </div>`;
  }).join('');
  if(!count) nav.innerHTML='<div class="empty-nav">No encontré una técnica con ese término.</div>';
  nav.querySelectorAll('[data-tech]').forEach(btn => btn.addEventListener('click',()=>{
    state.active = btn.dataset.tech; save(); render();
    if(window.innerWidth<1120) document.querySelector('.main').scrollIntoView({behavior:'smooth'});
  }));
}

function render(){
  const def = techniques[state.active];
  renderNavigation(document.getElementById('techSearch')?.value || '');
  document.getElementById('techDescription').textContent = def.description;
  document.getElementById('categoryPill').textContent = def.category;
  document.getElementById('builderTitle').textContent = def.name;
  document.getElementById('instrumentBadge').textContent = def.instrument;
  document.getElementById('previewTitle').textContent = def.title;
  document.getElementById('builder').innerHTML = buildBuilder(def);
  bindTechniqueFields();
  bindItemComposer();
  renderItems();
  renderPreview();
  renderChecklist();
  syncGlobalFields();
}

function buildBuilder(def){
  const base = step(1,'Configura el instrumento','Completa únicamente los datos necesarios para tu estudio.',`<div class="form-grid">${renderFields(def.baseFields||[], false)}</div>`);
  const items = step(2,`Agrega ${pluralItem(def.itemLabel)}`,`Cada elemento aparecerá de inmediato en la vista previa.`,`
    <div class="item-composer">
      <div class="form-grid">${renderFields(def.itemFields||[], true)}</div>
      <div class="inline-actions"><button class="add-btn" id="addItemBtn">Agregar ${esc(def.itemLabel)}</button></div>
    </div>
    <div class="items-list" id="itemsList"></div>`);
  const end = def.endFields?.length ? step(3,'Cierre / instrucciones finales','Completa esta parte cuando aplique.',`<div class="form-grid">${renderFields(def.endFields,false)}</div>`) : '';
  const reviewNum = def.endFields?.length ? 4 : 3;
  const review = step(reviewNum,'Revisa antes de aplicar','Usa el checklist de la vista previa antes de pilotear.',`<p class="help">La revisión no sustituye el pilotaje. Verifica lenguaje, secuencia, escalas, viabilidad y criterios éticos.</p>`);
  return base + items + end + review;
}

function step(n,title,subtitle,content){
  return `<section class="step"><div class="step-title"><div class="step-index">${n}</div><div><h3>${esc(title)}</h3><p>${esc(subtitle)}</p></div></div>${content}</section>`;
}

function renderFields(fields, local){
  const current = state.data[state.active];
  return fields.map(field=>{
    const cls = field.cls || '';
    const id = `${local?'local':'base'}-${field.key}`;
    const dataAttr = local ? `data-item-key="${field.key}"` : `data-key="${field.key}"`;
    if(field.kind==='select'){
      const val = local ? '' : current[field.key] || '';
      return `<div class="field ${cls}"><label for="${id}">${esc(field.label)}</label><select id="${id}" ${dataAttr}>
        <option value="">Selecciona…</option>
        ${field.options.map(o=>`<option ${o===val?'selected':''}>${esc(o)}</option>`).join('')}
      </select></div>`;
    }
    const value = local ? '' : current[field.key] || '';
    const req = field.required ? ' data-required-item="true"' : '';
    const el = field.type==='textarea'
      ? `<textarea id="${id}" ${dataAttr}${req} placeholder="${esc(field.placeholder)}">${esc(value)}</textarea>`
      : `<input id="${id}" ${dataAttr}${req} value="${esc(value)}" placeholder="${esc(field.placeholder)}">`;
    return `<div class="field ${cls}"><label for="${id}">${esc(field.label)}</label>${el}</div>`;
  }).join('');
}

function bindTechniqueFields(){
  document.querySelectorAll('[data-key]').forEach(el=>{
    el.addEventListener('input',()=>{
      state.data[state.active][el.dataset.key] = el.value;
      save(); renderPreview();
    });
  });
}

function bindItemComposer(){
  const btn = document.getElementById('addItemBtn');
  if(btn) btn.addEventListener('click', addItem);
}

function addItem(){
  const def = techniques[state.active];
  const item = {};
  let requiredMissing = false;
  (def.itemFields||[]).forEach(field=>{
    const el = document.querySelector(`[data-item-key="${field.key}"]`);
    item[field.key] = el ? el.value.trim() : '';
    if(field.required && !item[field.key]) requiredMissing = true;
  });
  if(requiredMissing) return flash(`Completa el campo principal antes de agregar el ${def.itemLabel}.`);
  const anyValue = Object.values(item).some(has);
  if(!anyValue) return flash(`Completa al menos un campo antes de agregar el ${def.itemLabel}.`);
  state.data[state.active].items.push(item);
  save();
  render();
  flash('Elemento agregado.');
}

function renderItems(){
  const list = document.getElementById('itemsList');
  if(!list) return;
  const items = state.data[state.active].items;
  const def = techniques[state.active];
  if(!items.length){ list.innerHTML='<div class="help">Todavía no has agregado elementos al instrumento.</div>'; return; }
  list.innerHTML = items.map((item,i)=>{
    const values = def.itemFields.map(f=>item[f.key]).filter(has);
    const main = values[0] || `${capitalize(def.itemLabel)} ${i+1}`;
    const sub = values.slice(1,4).join(' · ');
    return `<div class="item-row"><div><strong>${i+1}. ${esc(main)}</strong>${sub?`<span>${esc(sub)}</span>`:''}</div><button class="remove-btn" data-remove="${i}" title="Eliminar">×</button></div>`;
  }).join('');
  list.querySelectorAll('[data-remove]').forEach(btn=>btn.addEventListener('click',()=>{
    state.data[state.active].items.splice(Number(btn.dataset.remove),1); save(); render();
  }));
}

function renderChecklist(){
  const box = document.getElementById('checklist');
  const def = techniques[state.active];
  const checks = state.data[state.active].checks || {};
  box.innerHTML = `<h3>Checklist antes de pilotear</h3>${def.checklist.map((text,i)=>`<label class="check"><input type="checkbox" data-check="${i}" ${checks[i]?'checked':''}><span>${esc(text)}</span></label>`).join('')}`;
  box.querySelectorAll('[data-check]').forEach(ch=>ch.addEventListener('change',()=>{
    state.data[state.active].checks[ch.dataset.check] = ch.checked; save();
  }));
}

function renderPreview(){
  const def = techniques[state.active];
  const data = state.data[state.active];
  const box = document.getElementById('preview');
  let html = '';

  const globalBits = [
    ['Nombre / equipo',state.global.studentName],
    ['Grupo / curso',state.global.courseGroup]
  ].filter(([,v])=>has(v));
  if(globalBits.length){
    html += `<div class="preview-meta">${globalBits.map(([k,v])=>`<div class="meta-box"><b>${esc(k)}</b>${nl(v)}</div>`).join('')}</div>`;
  }
  if(has(state.global.brief)) html += section('Brief / problema', `<div class="preview-box">${nl(state.global.brief)}</div>`);

  const baseHtml = (def.baseFields||[]).filter(field=>has(data[field.key])).map(field=>`<div class="preview-question"><b>${esc(field.label)}:</b><div>${nl(data[field.key])}</div></div>`).join('');
  html += section('Configuración', baseHtml || placeholder('Completa la configuración del instrumento.'));

  const items = data.items || [];
  const itemsHtml = items.map((item,i)=>{
    const pieces = def.itemFields.filter(field=>has(item[field.key])).map((field,idx)=> idx===0
      ? `<b>${esc(field.label)}:</b> ${nl(item[field.key])}`
      : `<div class="detail"><b>${esc(field.label)}:</b> ${nl(item[field.key])}</div>`
    ).join('');
    return `<div class="preview-question"><b>${i+1}.</b> ${pieces}</div>`;
  }).join('');
  html += section(capitalize(def.itemLabel)+'s', itemsHtml || placeholder(`Agrega al menos un ${def.itemLabel}.`));

  if(def.endFields?.length){
    const endHtml = def.endFields.filter(field=>has(data[field.key])).map(field=>`<div class="preview-question"><b>${esc(field.label)}:</b><div>${nl(data[field.key])}</div></div>`).join('');
    if(endHtml) html += section('Cierre',endHtml);
  }
  box.innerHTML = html;
}

function section(title,content){ return `<div class="preview-section"><h3>${esc(title)}</h3>${content}</div>`; }
function placeholder(text){ return `<div class="preview-box placeholder">${esc(text)}</div>`; }

function syncGlobalFields(){
  document.querySelectorAll('[data-global-key]').forEach(el=>{
    el.value = state.global[el.dataset.globalKey] || '';
    el.oninput = ()=>{
      state.global[el.dataset.globalKey] = el.value; save(); renderPreview();
    };
  });
}

function textVersion(){
  const def = techniques[state.active];
  const data = state.data[state.active];
  const lines = [def.title.toUpperCase(),''];
  if(has(state.global.studentName)) lines.push(`Nombre / equipo: ${state.global.studentName}`);
  if(has(state.global.courseGroup)) lines.push(`Grupo / curso: ${state.global.courseGroup}`);
  if(has(state.global.brief)) lines.push(`Brief / problema: ${state.global.brief}`);
  if(lines.length>2) lines.push('');
  lines.push('CONFIGURACIÓN');
  (def.baseFields||[]).forEach(field=>{ if(has(data[field.key])) lines.push(`${field.label}: ${data[field.key]}`); });
  lines.push('',`${capitalize(def.itemLabel).toUpperCase()}S`);
  if(!data.items.length) lines.push('(Sin elementos agregados)');
  data.items.forEach((item,i)=>{
    lines.push(`${i+1}.`);
    def.itemFields.forEach(field=>{ if(has(item[field.key])) lines.push(`   ${field.label}: ${item[field.key]}`); });
  });
  if(def.endFields?.length){
    const finals = def.endFields.filter(field=>has(data[field.key]));
    if(finals.length){ lines.push('','CIERRE'); finals.forEach(field=>lines.push(`${field.label}: ${data[field.key]}`)); }
  }
  return lines.join('\n');
}

function resetActive(){
  const def = techniques[state.active];
  if(!confirm(`¿Limpiar todo lo escrito en ${def.name}? Esta acción no afecta las demás técnicas.`)) return;
  state.data[state.active] = blankTechniqueState(def); save(); render(); flash('Técnica reiniciada.');
}

function copyInstrument(){
  const text = textVersion();
  if(navigator.clipboard?.writeText){
    navigator.clipboard.writeText(text).then(()=>flash('Instrumento copiado.')).catch(()=>fallbackCopy(text));
  }else fallbackCopy(text);
}
function fallbackCopy(text){
  const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); flash('Instrumento copiado.');
}
function downloadInstrument(){
  const def=techniques[state.active];
  const blob=new Blob([textVersion()],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob); const a=document.createElement('a');
  a.href=url; a.download=`${slug(def.name)}-instrumento.txt`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); flash('Archivo descargado.');
}
function slug(v){ return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }

function pluralItem(v='') {
  const map = {
    'reactivo':'reactivos', 'pregunta':'preguntas', 'bloque':'bloques', 'criterio':'criterios',
    'momento':'momentos', 'entrada':'entradas', 'tarea':'tareas', 'AOI / medida':'AOI / medidas',
    'regla / consulta':'reglas / consultas', 'foco de campo':'focos de campo', 'actividad':'actividades',
    'estímulo':'estímulos', 'medida':'medidas', 'condición':'condiciones', 'indicador':'indicadores'
  };
  return map[v] || `${v}s`;
}
function capitalize(v=''){ return v.charAt(0).toUpperCase()+v.slice(1); }
let toastTimer;
function flash(text){ const t=document.getElementById('toast'); t.textContent=text; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),1800); }

// Eventos generales
document.getElementById('techSearch').addEventListener('input',e=>renderNavigation(e.target.value));
document.getElementById('resetBtn').addEventListener('click',resetActive);
document.getElementById('copyBtn').addEventListener('click',copyInstrument);
document.getElementById('downloadBtn').addEventListener('click',downloadInstrument);
document.getElementById('printBtn').addEventListener('click',()=>window.print());

render();