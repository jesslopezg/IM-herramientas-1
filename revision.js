const STORE='im-prepilot-v1', BACKEND_STORE='im-prepilot-backend';
const $=id=>document.getElementById(id);
let loadedForm=null;

const STOP=new Set('a al algo ante bajo cabe con contra cual cuando de del desde donde durante e el ella ellas ellos en entre era es esa ese eso esta estas este estos fue ha hay la las le les lo los mas me mi muy ni no nos o para pero por que se sin sobre su sus te tu un una uno unas unos y ya como cómo qué cuál cuáles quien quienes cuyo cuya ser estar hacer analizar conocer determinar identificar evaluar medir explorar comprender establecer informacion información datos dato factor factores aspecto aspectos'.split(/\s+/));
const SYN={
  precio:['costo','valor','tarifa','economia','económico','economico'],
  costo:['precio','valor','tarifa'],
  satisfaccion:['agrado','experiencia','valoracion','conformidad'],
  servicio:['atencion','trato','personal'],
  calidad:['calidad','desempeno','desempeño'],
  frecuencia:['veces','periodicidad','habitual','visita','compra'],
  eleccion:['elige','elegir','seleccion','seleccionar','preferencia','prefiere'],
  compra:['comprar','adquisicion','consumo','consume'],
  abandono:['dejar','dejo','volver','regresar','desercion'],
  confianza:['seguridad','credibilidad','confiable'],
  intencion:['piensa','planea','probabilidad','dispuesto','disposicion'],
  recomendacion:['recomendar','recomendaria','recomienda'],
  edad:['anos','años','rango etario'],
  genero:['sexo','identidad']
};

function normalize(s=''){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim()}
function stem(w){if(w.length>5)w=w.replace(/(amientos|imientos|aciones|mente)$/,'');if(w.length>4)w=w.replace(/(es|os|as)$/,'');else if(w.length>3)w=w.replace(/s$/,'');return w}
function conceptTokens(s=''){
  const out=new Set();
  normalize(s).split(' ').forEach(w=>{if(w.length<3||STOP.has(w))return;const sw=stem(w);out.add(sw);Object.entries(SYN).forEach(([k,vs])=>{if(stem(k)===sw||vs.some(v=>stem(normalize(v))===sw)){out.add(stem(k));vs.forEach(v=>out.add(stem(normalize(v))))}})});
  return out;
}
function similarity(a,b){
  const A=conceptTokens(a),B=conceptTokens(b); if(!A.size||!B.size)return 0;
  let hit=0;A.forEach(x=>{if(B.has(x))hit++}); return hit/A.size;
}
function lines(v=''){return String(v).split(/\n+/).map(x=>x.trim()).filter(Boolean)}
function brief(){
  return {
    problem:$('problem').value.trim(), generalObjective:$('generalObjective').value.trim(),
    specificObjectives:$('specificObjectives').value.trim(), population:$('population').value.trim(),
    inclusion:$('inclusion').value.trim(), constructs:$('constructs').value.trim(), requiredInfo:$('requiredInfo').value.trim()
  }
}
function saveState(){localStorage.setItem(STORE,JSON.stringify({brief:brief(),formUrl:$('formUrl').value.trim()}))}
function restoreState(){try{const s=JSON.parse(localStorage.getItem(STORE)||'{}');if(s.brief)Object.entries(s.brief).forEach(([k,v])=>{if($(k))$(k).value=v||''});if(s.formUrl)$('formUrl').value=s.formUrl}catch{}}
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(window.__rt);window.__rt=setTimeout(()=>t.classList.remove('show'),1800)}
function setReader(kind,msg){const e=$('readerStatus');e.className='reader-status '+kind;e.innerHTML='<span class="dot"></span><span>'+escapeHtml(msg)+'</span>'}
function escapeHtml(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function validFormUrl(u){try{const x=new URL(u);return x.hostname==='forms.gle'||(x.hostname==='docs.google.com'&&x.pathname.includes('/forms/'))}catch{return false}}
function backend(){return (window.PREPILOT_CONFIG&&window.PREPILOT_CONFIG.backendUrl)||localStorage.getItem(BACKEND_STORE)||''}
function responderEmbedUrl(u){
  try{const x=new URL(u);if(x.hostname==='docs.google.com'){x.searchParams.set('embedded','true');return x.toString()}return u}catch{return u}
}
function previewForm(){
  const u=$('formUrl').value.trim();if(!validFormUrl(u)){setReader('error','Pega un enlace válido de Google Forms para encuestados.');return}
  saveState();$('formFrame').src=responderEmbedUrl(u);$('formViewerSection').classList.remove('hidden');$('loadedFormTitle').textContent='Vista del formulario';$('openNewTabBtn').dataset.url=u;setReader('ok','Vista de encuestado cargada. Ahora puedes ejecutar la revisión.')
}
function configureBackend(){
  $('backendSetup').classList.remove('hidden');$('backendUrl').value=backend();setReader('error','Falta conectar el lector de formularios. Configura la URL de Apps Script una sola vez.')
}
function jsonpForm(u){
  return new Promise((resolve,reject)=>{
    const b=backend();if(!b)return reject(new Error('NO_BACKEND'));
    const cb='__imcb_'+Date.now()+'_'+Math.random().toString(36).slice(2),script=document.createElement('script');
    const cleanup=()=>{delete window[cb];script.remove();clearTimeout(timer)};
    window[cb]=data=>{cleanup();data&&data.ok?resolve(data):reject(new Error((data&&data.error)||'No se pudo leer el formulario.'))};
    script.onerror=()=>{cleanup();reject(new Error('No se pudo contactar el lector de Google Forms.'))};
    script.src=b+(b.includes('?')?'&':'?')+'callback='+encodeURIComponent(cb)+'&formUrl='+encodeURIComponent(u)+'&_='+Date.now();
    document.body.appendChild(script);
    const timer=setTimeout(()=>{cleanup();reject(new Error('La lectura tardó demasiado. Revisa que el formulario sea público y que la URL de Apps Script sea correcta.'))},18000);
  });
}
async function analyze(){
  const u=$('formUrl').value.trim(),B=brief();
  if(!B.generalObjective||!B.population){toast('Completa objetivo general y población.');return}
  if(!validFormUrl(u)){setReader('error','Pega el enlace para encuestados del Google Form.');return}
  if(!backend()){configureBackend();return}
  saveState();previewForm();setReader('loading','Leyendo la estructura pública del formulario…');$('analyzeBtn').disabled=true;
  try{
    loadedForm=await jsonpForm(u);
    setReader('ok','Formulario leído: '+loadedForm.questions.length+' preguntas identificadas.');
    $('loadedFormTitle').textContent=loadedForm.title||'Google Form';
    renderAnalysis(runAnalysis(B,loadedForm));
  }catch(e){setReader('error',e.message||'No se pudo leer el formulario.');if(String(e.message).includes('NO_BACKEND'))configureBackend()}
  finally{$('analyzeBtn').disabled=false}
}
function qText(q){return [q.title,q.description,(q.options||[]).join(' ')].filter(Boolean).join(' ')}
function bestMatch(target,questions){
  let best={score:0,q:null};questions.forEach((q,i)=>{const s=similarity(target,qText(q));if(s>best.score)best={score:s,q:{...q,index:i+1}}});return best
}
function coverageRows(B,questions){
  const rows=[];
  const push=(group,label)=>{if(!label)return;const m=bestMatch(label,questions),state=m.score>=.45?'green':m.score>=.2?'yellow':'red';rows.push({group,label,state,score:m.score,match:m.q})};
  push('Objetivo general',B.generalObjective);
  lines(B.specificObjectives).forEach(x=>push('Objetivo específico',x));
  lines(B.constructs).forEach(x=>push('Variable / tema',x));
  lines(B.requiredInfo).forEach(x=>push('Información requerida',x));
  if(B.inclusion)push('Filtro / inclusión',B.inclusion);
  return rows;
}
function issue(severity,title,detail,q=null){return{severity,title,detail,q}}
function detectFindings(B,F,coverage){
  const Q=F.questions||[],out=[],desc=normalize(F.description||''),briefAll=[B.problem,B.generalObjective,B.specificObjectives,B.population,B.inclusion,B.constructs,B.requiredInfo].join(' ');
  coverage.filter(r=>r.state==='red').forEach(r=>out.push(issue(r.group.includes('Información')||r.group.includes('Filtro')?'critical':'review','Cobertura insuficiente: '+r.group,'No se identifica una pregunta que cubra claramente "'+r.label+'". Revisa si el instrumento permite obtener esa información.')));
  coverage.filter(r=>r.state==='yellow').forEach(r=>out.push(issue('review','Cobertura parcial: '+r.group,'La relación con "'+r.label+'" es débil o indirecta. Verifica que puedas responder ese punto del brief con los datos obtenidos.')));
  if(!F.description||F.description.trim().length<20)out.push(issue('suggestion','Introducción insuficiente','El formulario tiene poca o ninguna introducción. Verifica que el participante entienda propósito, instrucciones y uso de la información.'));
  if(desc&&!/(voluntar|anonim|confidencial|privacidad)/.test(desc))out.push(issue('suggestion','Condiciones de participación poco explícitas','La introducción no parece mencionar voluntariedad, anonimato/confidencialidad o privacidad. Revisa qué aplica a tu estudio.'));
  const required=Q.filter(q=>q.required).length, open=Q.filter(q=>['Respuesta corta','Párrafo'].includes(q.type)).length, reqOpen=Q.filter(q=>q.required&&['Respuesta corta','Párrafo'].includes(q.type)).length;
  if(Q.length>30)out.push(issue('suggestion','Extensión del cuestionario','Se identificaron '+Q.length+' preguntas. Comprueba en el piloto el tiempo real y la fatiga de respuesta.'));
  if(Q.length>=12&&required/Q.length>.9)out.push(issue('suggestion','Casi todo es obligatorio',required+' de '+Q.length+' preguntas son obligatorias. Revisa si todas necesitan ser forzosas.'));
  if(reqOpen>=4)out.push(issue('suggestion','Carga de respuesta abierta','Hay '+reqOpen+' preguntas abiertas obligatorias. Observa en el piloto si generan abandono o respuestas superficiales.'));
  Q.forEach((q,i)=>{
    const t=normalize(q.title), n=i+1;
    if(!t)return;
    if(/(no cree que|verdad que|no considera que|obviamente|evidentemente|sin duda|claramente)/.test(t))out.push(issue('critical','Posible pregunta sugestiva','La redacción puede orientar la respuesta. Formula la idea de forma neutral.',{...q,index:n}));
    if(/\b(y|e)\b/.test(t)&&/(que tan|califique|eval|satisfe|considera|importante|opinion|percepcion|valora)/.test(t)&&t.split(/\b(y|e)\b/).length>1)out.push(issue('review','Posible pregunta doble','La pregunta parece evaluar más de un atributo en el mismo reactivo. Verifica que una persona pueda responder una sola cosa con coherencia.',{...q,index:n}));
    if(/\b(siempre|nunca|todos|todas|ninguno|ninguna)\b/.test(t))out.push(issue('review','Término absoluto','Palabras como "siempre", "nunca" o "todos" pueden forzar respuestas. Confirma que el absoluto sea necesario.',{...q,index:n}));
    if(/\b(frecuentemente|regularmente|normalmente|recientemente|a menudo)\b/.test(t)&&!/\b(dia|dias|semana|semanas|mes|meses|ano|anos|últimos|ultimos|veces)\b/.test(t))out.push(issue('review','Temporalidad vaga','La frecuencia o periodo no está delimitado con claridad. Define un marco temporal si el recuerdo del participante es relevante.',{...q,index:n}));
    const opts=(q.options||[]).map(normalize), yesNo=opts.length===2&&opts.some(x=>/^si$/.test(x))&&opts.some(x=>/^no$/.test(x));
    if(yesNo&&/(satisf|importan|calidad|confian|percep|acuerdo|recom|valor|experiencia)/.test(t))out.push(issue('suggestion','Respuesta dicotómica para un concepto gradual','Sí/No puede perder variación en una percepción o actitud. Verifica si el nivel o intensidad importa para el objetivo.',{...q,index:n}));
    const dup=opts.filter((x,j)=>x&&opts.indexOf(x)!==j);if(dup.length)out.push(issue('critical','Opciones duplicadas','Hay opciones de respuesta repetidas o equivalentes. Revisa la lista antes de pilotear.',{...q,index:n}));
    if(q.title.length>180)out.push(issue('suggestion','Pregunta extensa','El reactivo es largo y puede aumentar la carga cognitiva. Comprueba comprensión durante el piloto.',{...q,index:n}));
  });
  const briefTokens=conceptTokens(briefAll);
  const low=[];Q.forEach((q,i)=>{const txt=normalize(q.title);if(/edad|genero|sexo|ciudad|correo|email|nombre/.test(txt))return;const qt=conceptTokens(qText(q));let h=0;qt.forEach(x=>{if(briefTokens.has(x))h++});const s=qt.size?h/qt.size:0;if(s<.08)low.push({...q,index:i+1})});
  low.slice(0,3).forEach(q=>out.push(issue('suggestion','Revisa pertinencia con el brief','La pregunta tiene poca relación léxica con los elementos declarados del brief. Confirma qué decisión u objetivo justifica mantenerla.',q)));
  return dedupe(out);
}
function dedupe(arr){const seen=new Set;return arr.filter(x=>{const k=x.title+'|'+(x.q?x.q.index:'')+'|'+x.detail;if(seen.has(k))return false;seen.add(k);return true})}
function runAnalysis(B,F){
  const Q=(F.questions||[]).filter(q=>q.kind!=='section'),coverage=coverageRows(B,Q),findings=detectFindings(B,F,coverage);
  const reds=coverage.filter(x=>x.state==='red').length, greens=coverage.filter(x=>x.state==='green').length, critical=findings.filter(x=>x.severity==='critical').length, reviews=findings.filter(x=>x.severity==='review').length;
  let status=critical||reds>=2?'red':(reds||reviews>=2?'yellow':'green');
  const advice=[];
  const missing=coverage.filter(x=>x.state==='red');if(missing.length)advice.push({title:'Vuelve al brief antes de agregar preguntas',text:'Hay '+missing.length+' necesidad(es) sin cobertura clara. Decide qué información necesitas obtener para responderlas y después revisa qué tipo de pregunta permitiría obtenerla; no agregues reactivos solo por llenar el vacío.'});
  if(B.inclusion&&coverage.find(x=>x.group==='Filtro / inclusión')?.state!=='green')advice.push({title:'Comprueba que el encuestado pertenece a la población',text:'El criterio de inclusión no aparece cubierto con claridad. Antes del piloto, verifica cómo identificarás o filtrarás a quienes realmente cumplen el perfil del brief.'});
  if(findings.some(x=>x.title.includes('pregunta doble')))advice.push({title:'Separa atributos cuando puedan recibir respuestas distintas',text:'Si una persona podría pensar una cosa de un atributo y otra del segundo, el reactivo no debe obligarla a responder ambos con una sola opción.'});
  if(findings.some(x=>x.title.includes('sugestiva')))advice.push({title:'Neutraliza el lenguaje',text:'Evita redactar desde la respuesta que esperas obtener. Durante el piloto pregunta a los participantes qué entendieron, no si "les pareció clara".'});
  if(!advice.length)advice.push({title:'El instrumento está listo para pasar a prueba de comprensión',text:'No se detectaron vacíos críticos con estas reglas. El siguiente paso sigue siendo pilotear con personas similares a la población y registrar tiempos, dudas, omisiones y opciones que no funcionen.'});
  advice.push({title:'No aceptes una bandera automáticamente',text:'Cada observación es una señal para revisar. Conserva, cambia o elimina una pregunta solo si puedes justificar la decisión desde el brief y la lógica metodológica.'});
  return{B,F,Q,coverage,findings,status,advice,critical,reviews,greens,reds}
}
function renderAnalysis(R){
  $('resultsSection').classList.remove('hidden');
  const stat={red:['Todavía no pilotear','Hay vacíos o problemas que pueden comprometer la información.'],yellow:['Revisión recomendada','Conviene corregir algunos puntos antes del piloto.'],green:['Listo para pilotear','No se detectaron problemas críticos con estas reglas.']}[R.status];
  $('statusBadge').className='status-badge '+R.status;$('statusBadge').querySelector('strong').textContent=stat[0];$('summaryText').textContent=stat[1]+' La revisión automatizada orienta; no sustituye el juicio metodológico ni la prueba piloto.';
  const covered=R.coverage.length?Math.round(R.greens/R.coverage.length*100):0,required=R.Q.filter(q=>q.required).length;
  $('metrics').innerHTML=metric('Preguntas',R.Q.length,'leídas del formulario')+metric('Obligatorias',required,'de '+R.Q.length)+metric('Cobertura clara',covered+'%','del brief declarado')+metric('Alertas prioritarias',R.critical+R.reds,'críticas o sin cobertura');
  $('coverageTable').innerHTML=R.coverage.length?R.coverage.map(c=>'<div class="coverage-row"><div class="coverage-state '+c.state+'">'+(c.state==='green'?'Cubierto':c.state==='yellow'?'Parcial':'Sin cubrir')+'</div><div><b>'+escapeHtml(c.label)+'</b><p>'+(c.match?'Mejor coincidencia: P'+c.match.index+' — '+escapeHtml(c.match.title):'No se encontró una coincidencia clara.')+'</p></div></div>').join(''):'<p class="micro">Agrega objetivos, variables o información requerida para evaluar la cobertura.</p>';
  const rank={critical:0,review:1,suggestion:2};R.findings.sort((a,b)=>rank[a.severity]-rank[b.severity]);
  $('findingsList').innerHTML=R.findings.length?R.findings.map(f=>'<div class="finding '+f.severity+'"><div class="finding-head"><span class="severity">'+(f.severity==='critical'?'Crítico':f.severity==='review'?'Revisar':'Sugerencia')+'</span>'+(f.q?'<b>P'+f.q.index+' — '+escapeHtml(f.q.title)+'</b>':'<b>'+escapeHtml(f.title)+'</b>')+'</div><p>'+(f.q?'<b>'+escapeHtml(f.title)+'.</b> ':'')+escapeHtml(f.detail)+'</p></div>').join(''):'<div class="finding suggestion"><div class="finding-head"><b>Sin alertas automáticas</b></div><p>No se detectaron patrones problemáticos con estas reglas. Revisa comprensión y funcionamiento en el piloto.</p></div>';
  $('adviceList').innerHTML=R.advice.map(a=>'<div class="advice"><b>'+escapeHtml(a.title)+'</b><p>'+escapeHtml(a.text)+'</p></div>').join('');
  $('resultsSection').scrollIntoView({behavior:'smooth',block:'start'});
}
function metric(label,value,note){return '<div class="metric"><span>'+label+'</span><strong>'+value+'</strong><small>'+note+'</small></div>'}

document.querySelectorAll('[data-brief]').forEach(e=>e.addEventListener('input',saveState));
$('formUrl').addEventListener('input',saveState);
$('previewFormBtn').onclick=previewForm;
$('analyzeBtn').onclick=analyze;
$('reanalyzeBtn').onclick=analyze;
$('openNewTabBtn').onclick=()=>{const u=$('openNewTabBtn').dataset.url||$('formUrl').value.trim();if(u)window.open(u,'_blank','noopener')};
$('printReviewBtn').onclick=()=>window.print();
$('saveBackendBtn').onclick=()=>{const u=$('backendUrl').value.trim();if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(u)){toast('La URL debe ser la del Web App terminado en /exec.');return}localStorage.setItem(BACKEND_STORE,u);$('backendSetup').classList.add('hidden');setReader('neutral','Conexión guardada. Ya puedes leer el formulario.');toast('Lector conectado.')};

restoreState();
if(!backend())$('backendSetup').classList.remove('hidden');
