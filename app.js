const state = {
  active: 'encuesta',
  encuesta: { objective:'', population:'', variable:'', dimension:'', intro:'', items:[] },
  entrevista: { objective:'', profile:'', opening:'', closing:'', items:[] },
  focus: { objective:'', profile:'', participants:'6–8', duration:'60–75 min', opening:'', closing:'', items:[] }
};

const configs = {
  encuesta: {
    title:'Cuestionario de encuesta',
    build(){ return `
      ${step(1,'Define qué vas a medir','Concreta el objetivo antes de escribir reactivos.',`
        <div class="form-grid">
          ${field('Objetivo del instrumento','objective','textarea','Ej. Medir la satisfacción de estudiantes con el servicio de cafetería.','full')}
          ${field('Población / participante','population','input','Ej. Estudiantes de pregrado')}
          ${field('Variable principal','variable','input','Ej. Satisfacción')}
          ${field('Dimensión','dimension','input','Ej. Calidad del servicio')}
          ${field('Introducción para el encuestado','intro','textarea','Ej. Esta encuesta es anónima y toma menos de 5 minutos.','full')}
        </div>`)}
      ${step(2,'Agrega reactivos','Escribe cada pregunta y define cómo se responderá.',`
        <div class="item-composer">
          <div class="form-grid">
            ${localField('Texto de la pregunta','qText','textarea','Ej. ¿Qué tan satisfecho(a) estás con el tiempo de espera?','full')}
            ${localSelect('Tipo de pregunta','qType',[
              'Escala Likert 1–5','Satisfacción 1–5','Frecuencia','Opción múltiple','Dicotómica Sí/No','Abierta'
            ])}
            ${localField('Opciones / anclajes','qOptions','input','Ej. 1=Muy insatisfecho; 5=Muy satisfecho')}
          </div>
          <div class="inline-actions"><button class="add-btn" data-add="encuesta">Agregar reactivo</button></div>
        </div>
        <div class="items-list" id="itemsList"></div>`)}
      ${step(3,'Revisión rápida','Marca lo que ya verificaste antes de pilotear.',`<p class="help">La lista de verificación aparece junto a la vista previa.</p>`)}
    `},
    checklist:[
      'Cada pregunta responde al objetivo del instrumento.',
      'No hay preguntas dobles ni ambiguas.',
      'Las opciones de respuesta son mutuamente excluyentes cuando corresponde.',
      'Las escalas mantienen el mismo sentido y numeración.',
      'Se realizó o se realizará una prueba piloto.'
    ]
  },
  entrevista: {
    title:'Guía de entrevista semiestructurada',
    build(){ return `
      ${step(1,'Define el propósito','La guía debe explorar decisiones, experiencias o significados.',`
        <div class="form-grid">
          ${field('Objetivo de la entrevista','objective','textarea','Ej. Comprender cómo los clientes eligen una cafetería para trabajar.','full')}
          ${field('Perfil del participante','profile','textarea','Ej. Personas de 20–35 años que visitan cafeterías al menos 2 veces por semana.','full')}
          ${field('Apertura / rapport','opening','textarea','Ej. Gracias por participar. No hay respuestas correctas o incorrectas.','full')}
        </div>`)}
      ${step(2,'Construye la guía','Organiza por bloques y agrega preguntas de profundización.',`
        <div class="item-composer">
          <div class="form-grid">
            ${localField('Bloque temático','iBlock','input','Ej. Elección del lugar')}
            ${localField('Pregunta principal','iQuestion','textarea','Ej. Cuéntame cómo decides a qué cafetería ir.','full')}
            ${localField('Probes / seguimiento','iProbes','textarea','Ej. ¿Qué comparas? ¿Qué te hace descartar un lugar?','full')}
          </div>
          <div class="inline-actions"><button class="add-btn" data-add="entrevista">Agregar pregunta</button></div>
        </div>
        <div class="items-list" id="itemsList"></div>`)}
      ${step(3,'Cierre','Termina sin introducir ideas nuevas.',`
        <div class="form-grid">${field('Pregunta o mensaje de cierre','closing','textarea','Ej. ¿Hay algo importante sobre este tema que no te haya preguntado?','full')}</div>`)}
    `},
    checklist:[
      'Las preguntas son abiertas y no sugieren la respuesta.',
      'La guía avanza de temas generales a específicos.',
      'Cada bloque está relacionado con el objetivo.',
      'Los probes sirven para profundizar, no para dirigir.',
      'Existe una apertura y un cierre claros.'
    ]
  },
  focus: {
    title:'Guía de moderación de Focus Group',
    build(){ return `
      ${step(1,'Configura la sesión','Define a quién necesitas reunir y para qué.',`
        <div class="form-grid">
          ${field('Objetivo del Focus Group','objective','textarea','Ej. Explorar percepciones sobre una nueva propuesta de valor para una app de movilidad.','full')}
          ${field('Perfil de participantes','profile','textarea','Ej. Usuarios frecuentes de apps de movilidad, 18–35 años.','full')}
          ${field('Número de participantes','participants','input','Ej. 6–8')}
          ${field('Duración estimada','duration','input','Ej. 60–75 min')}
          ${field('Apertura del moderador','opening','textarea','Ej. Presentación, reglas de participación, confidencialidad y permiso de grabación.','full')}
        </div>`)}
      ${step(2,'Diseña la discusión','Trabaja con bloques, preguntas y estímulos.',`
        <div class="item-composer">
          <div class="form-grid">
            ${localField('Bloque / momento','fBlock','input','Ej. Reacciones iniciales')}
            ${localField('Pregunta al grupo','fQuestion','textarea','Ej. ¿Qué es lo primero que les llama la atención de este concepto?','full')}
            ${localField('Profundización','fProbe','textarea','Ej. ¿Por qué? ¿Qué les genera confianza o desconfianza?','full')}
            ${localField('Estímulo / material','fStimulus','input','Ej. Mockup A, anuncio, empaque, video')}
            ${localField('Tiempo','fTime','input','Ej. 10 min')}
          </div>
          <div class="inline-actions"><button class="add-btn" data-add="focus">Agregar bloque</button></div>
        </div>
        <div class="items-list" id="itemsList"></div>`)}
      ${step(3,'Cierre','Recapitula y permite una última reacción.',`
        <div class="form-grid">${field('Cierre del moderador','closing','textarea','Ej. Si pudieran cambiar una sola cosa de la propuesta, ¿cuál sería?','full')}</div>`)}
    `},
    checklist:[
      'Las preguntas generan conversación, no respuestas de sí/no.',
      'El moderador tiene probes preparados.',
      'Los estímulos están vinculados con una pregunta concreta.',
      'La sesión tiene tiempos aproximados por bloque.',
      'Se definieron reglas de participación y cierre.'
    ]
  }
};

function step(n,title,subtitle,content){
  return `<section class="step"><div class="step-title"><div class="step-index">${n}</div><div><h3>${title}</h3><p>${subtitle}</p></div></div>${content}</section>`;
}
function field(label,key,type,placeholder,cls=''){
  const value = esc(state[state.active][key] || '');
  const el = type==='textarea'
    ? `<textarea data-key="${key}" placeholder="${placeholder}">${value}</textarea>`
    : `<input data-key="${key}" value="${value}" placeholder="${placeholder}">`;
  return `<div class="field ${cls}"><label>${label}</label>${el}</div>`;
}
function localField(label,id,type,placeholder,cls=''){
  const el = type==='textarea'
    ? `<textarea id="${id}" placeholder="${placeholder}"></textarea>`
    : `<input id="${id}" placeholder="${placeholder}">`;
  return `<div class="field ${cls}"><label>${label}</label>${el}</div>`;
}
function localSelect(label,id,options){
  return `<div class="field"><label>${label}</label><select id="${id}">${options.map(o=>`<option>${o}</option>`).join('')}</select></div>`;
}
function esc(v=''){
  return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function nl(v=''){ return esc(v).replace(/\n/g,'<br>'); }

function render(){
  document.querySelectorAll('.tech-btn').forEach(b=>b.classList.toggle('active',b.dataset.tech===state.active));
  document.getElementById('builder').innerHTML=configs[state.active].build();
  document.getElementById('previewTitle').textContent=configs[state.active].title;
  bindFields();
  renderItems();
  renderPreview();
  renderChecklist();
}

function bindFields(){
  document.querySelectorAll('[data-key]').forEach(el=>{
    el.addEventListener('input',()=>{
      state[state.active][el.dataset.key]=el.value;
      save();
      renderPreview();
    });
  });
  document.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',addItem));
}

function addItem(){
  const t=state.active;
  if(t==='encuesta'){
    const text=v('qText'); if(!text) return flash('Escribe la pregunta primero');
    state.encuesta.items.push({text,type:v('qType'),options:v('qOptions')});
  }
  if(t==='entrevista'){
    const question=v('iQuestion'); if(!question) return flash('Escribe la pregunta primero');
    state.entrevista.items.push({block:v('iBlock'),question,probes:v('iProbes')});
  }
  if(t==='focus'){
    const question=v('fQuestion'); if(!question) return flash('Escribe la pregunta al grupo primero');
    state.focus.items.push({block:v('fBlock'),question,probe:v('fProbe'),stimulus:v('fStimulus'),time:v('fTime')});
  }
  save(); render();
}
function v(id){const el=document.getElementById(id); return el?el.value.trim():''}

function renderItems(){
  const list=document.getElementById('itemsList'); if(!list) return;
  const items=state[state.active].items;
  if(!items.length){list.innerHTML='<div class="help">Todavía no has agregado elementos al instrumento.</div>';return}
  list.innerHTML=items.map((it,i)=>{
    let main='',sub='';
    if(state.active==='encuesta'){main=`${i+1}. ${esc(it.text)}`;sub=`${esc(it.type)}${it.options?' · '+esc(it.options):''}`}
    if(state.active==='entrevista'){main=`${i+1}. ${esc(it.question)}`;sub=`${it.block?esc(it.block)+' · ':''}${it.probes?'Probes: '+esc(it.probes):'Sin probes'}`}
    if(state.active==='focus'){main=`${i+1}. ${esc(it.question)}`;sub=`${it.block?esc(it.block)+' · ':''}${it.stimulus?'Estímulo: '+esc(it.stimulus)+' · ':''}${it.time?esc(it.time):''}`}
    return `<div class="item-row"><div><strong>${main}</strong><span>${sub}</span></div><button class="remove-btn" data-remove="${i}">×</button></div>`
  }).join('');
  document.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{state[state.active].items.splice(Number(b.dataset.remove),1);save();render()}));
}

function renderPreview(){
  const d=state[state.active];
  let html='';
  if(state.active==='encuesta'){
    html+=section('Objetivo',d.objective);
    html+=section('Participantes',d.population);
    html+=section('Variable / dimensión',[d.variable,d.dimension].filter(Boolean).join(' · '));
    html+=section('Introducción',d.intro);
    html+=questionList(d.items.map((x,i)=>({title:`${i+1}. ${x.text}`,meta:`${x.type}${x.options?' — '+x.options:''}`})),'Reactivos');
  }
  if(state.active==='entrevista'){
    html+=section('Objetivo',d.objective);
    html+=section('Perfil del participante',d.profile);
    html+=section('Apertura',d.opening);
    html+=questionList(d.items.map((x,i)=>({title:`${i+1}. ${x.question}`,meta:`${x.block?'Bloque: '+x.block+'. ':''}${x.probes?'Probes: '+x.probes:''}`})),'Guía de preguntas');
    html+=section('Cierre',d.closing);
  }
  if(state.active==='focus'){
    html+=section('Objetivo',d.objective);
    html+=section('Participantes',[d.profile,d.participants?`Grupo: ${d.participants}`:'',d.duration?`Duración: ${d.duration}`:''].filter(Boolean).join('<br>'),true);
    html+=section('Apertura del moderador',d.opening);
    html+=questionList(d.items.map((x,i)=>({title:`${i+1}. ${x.question}`,meta:[x.block?`Bloque: ${x.block}`:'',x.probe?`Profundización: ${x.probe}`:'',x.stimulus?`Estímulo: ${x.stimulus}`:'',x.time?`Tiempo: ${x.time}`:''].filter(Boolean).join(' · ')})),'Bloques de discusión');
    html+=section('Cierre',d.closing);
  }
  document.getElementById('preview').innerHTML=html || '<div class="placeholder">Completa los campos para ver el instrumento.</div>';
}
function section(title,value,raw=false){
  const content=value ? (raw?value:nl(value)) : '<span class="placeholder">Pendiente</span>';
  return `<div class="preview-section"><h3>${title}</h3><div class="preview-box">${content}</div></div>`;
}
function questionList(items,title){
  const content=items.length?items.map(x=>`<div class="preview-question"><b>${esc(x.title)}</b>${x.meta?`<div>${esc(x.meta)}</div>`:''}</div>`).join(''):'<span class="placeholder">Aún no hay elementos agregados.</span>';
  return `<div class="preview-section"><h3>${title}</h3><div class="preview-box">${content}</div></div>`;
}
function renderChecklist(){
  document.getElementById('checklist').innerHTML=`<h3>Checklist antes de pilotear</h3>${configs[state.active].checklist.map((c,i)=>`<label class="check"><input type="checkbox" data-check="${state.active}-${i}"><span>${c}</span></label>`).join('')}`;
}

function instrumentText(){
  const t=state.active,d=state[t]; let out=`${configs[t].title.toUpperCase()}\n${'='.repeat(configs[t].title.length)}\n\n`;
  if(t==='encuesta'){
    out+=`OBJETIVO\n${d.objective||'[Pendiente]'}\n\nPARTICIPANTES\n${d.population||'[Pendiente]'}\n\nVARIABLE / DIMENSIÓN\n${[d.variable,d.dimension].filter(Boolean).join(' / ')||'[Pendiente]'}\n\nINTRODUCCIÓN\n${d.intro||'[Pendiente]'}\n\nREACTIVOS\n`;
    d.items.forEach((x,i)=>out+=`${i+1}. ${x.text}\n   Tipo: ${x.type}${x.options?`\n   Opciones: ${x.options}`:''}\n`);
  }
  if(t==='entrevista'){
    out+=`OBJETIVO\n${d.objective||'[Pendiente]'}\n\nPERFIL DEL PARTICIPANTE\n${d.profile||'[Pendiente]'}\n\nAPERTURA\n${d.opening||'[Pendiente]'}\n\nGUÍA DE PREGUNTAS\n`;
    d.items.forEach((x,i)=>out+=`${i+1}. ${x.question}\n   ${x.block?`Bloque: ${x.block}\n   `:''}${x.probes?`Probes: ${x.probes}`:''}\n`);
    out+=`\nCIERRE\n${d.closing||'[Pendiente]'}\n`;
  }
  if(t==='focus'){
    out+=`OBJETIVO\n${d.objective||'[Pendiente]'}\n\nPERFIL DE PARTICIPANTES\n${d.profile||'[Pendiente]'}\nGrupo: ${d.participants||'[Pendiente]'}\nDuración: ${d.duration||'[Pendiente]'}\n\nAPERTURA DEL MODERADOR\n${d.opening||'[Pendiente]'}\n\nBLOQUES DE DISCUSIÓN\n`;
    d.items.forEach((x,i)=>out+=`${i+1}. ${x.question}\n   ${x.block?`Bloque: ${x.block}\n   `:''}${x.probe?`Profundización: ${x.probe}\n   `:''}${x.stimulus?`Estímulo: ${x.stimulus}\n   `:''}${x.time?`Tiempo: ${x.time}`:''}\n`);
    out+=`\nCIERRE\n${d.closing||'[Pendiente]'}\n`;
  }
  return out;
}

function save(){localStorage.setItem('im-instrumentos',JSON.stringify(state))}
function load(){try{const s=JSON.parse(localStorage.getItem('im-instrumentos'));if(s)Object.assign(state,s)}catch(e){}}
function flash(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}

load();
render();

document.querySelectorAll('.tech-btn').forEach(btn=>btn.addEventListener('click',()=>{state.active=btn.dataset.tech;save();render()}));
document.getElementById('resetBtn').addEventListener('click',()=>{
  const t=state.active;
  if(t==='encuesta') state.encuesta={objective:'',population:'',variable:'',dimension:'',intro:'',items:[]};
  if(t==='entrevista') state.entrevista={objective:'',profile:'',opening:'',closing:'',items:[]};
  if(t==='focus') state.focus={objective:'',profile:'',participants:'6–8',duration:'60–75 min',opening:'',closing:'',items:[]};
  save();render();flash('Instrumento limpio');
});
document.getElementById('copyBtn').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(instrumentText());flash('Instrumento copiado')}catch(e){flash('No se pudo copiar')}
});
document.getElementById('downloadBtn').addEventListener('click',()=>{
  const blob=new Blob([instrumentText()],{type:'text/plain;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`instrumento-${state.active}.txt`;a.click();URL.revokeObjectURL(a.href);flash('Archivo descargado');
});
