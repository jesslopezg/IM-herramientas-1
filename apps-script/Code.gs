function doGet(e) {
  var callback = sanitizeCallback_(e.parameter.callback || 'callback');
  var formUrl = (e.parameter.formUrl || '').trim();
  var payload;
  try {
    payload = inspectPublicForm_(formUrl);
  } catch (err) {
    payload = { ok: false, error: String(err && err.message ? err.message : err) };
  }
  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(payload) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function sanitizeCallback_(value) {
  return /^[A-Za-z_$][A-Za-z0-9_$.]*$/.test(value) ? value : 'callback';
}

function inspectPublicForm_(url) {
  if (!url) throw new Error('Falta el enlace del Google Form.');
  if (!/^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/i.test(url)) {
    throw new Error('El enlace no parece corresponder a Google Forms.');
  }

  var response = UrlFetchApp.fetch(url, {
    followRedirects: true,
    muteHttpExceptions: true,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; IM-Prepilot-Reader/1.0)' }
  });
  var status = response.getResponseCode();
  if (status < 200 || status >= 400) {
    throw new Error('Google Forms respondió con código ' + status + '. Revisa que el formulario esté publicado.');
  }

  var html = response.getContentText();
  var raw = extractPublicLoadData_(html);
  if (!raw) {
    throw new Error('No se pudo leer la estructura del formulario. Verifica que el enlace sea el de encuestado y que el formulario esté publicado.');
  }

  var data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error('La estructura del formulario no pudo interpretarse.');
  }

  var meta = data && data[1] ? data[1] : [];
  var entries = Array.isArray(meta[1]) ? meta[1] : [];
  var questions = [];

  entries.forEach(function(entry) {
    if (!Array.isArray(entry)) return;
    var title = typeof entry[1] === 'string' ? entry[1] : '';
    var description = typeof entry[2] === 'string' ? entry[2] : '';
    var typeId = entry.length > 3 ? entry[3] : null;
    var sub = Array.isArray(entry[4]) ? entry[4] : [];
    var required = false;
    var options = [];
    var entryIds = [];

    sub.forEach(function(s) {
      if (!Array.isArray(s)) return;
      if (typeof s[0] === 'number') entryIds.push(s[0]);
      if (s.length > 2 && !!s[2]) required = true;
      if (Array.isArray(s[1])) {
        s[1].forEach(function(o) {
          if (Array.isArray(o) && o.length && typeof o[0] === 'string' && o[0].trim()) {
            options.push(o[0].trim());
          }
        });
      }
      if (Array.isArray(s[3])) {
        s[3].forEach(function(v) {
          if (typeof v === 'string' && v.trim()) options.push(v.trim());
        });
      }
    });

    options = unique_(options);
    var kind = (typeId === 6 || typeId === 8) ? 'section' : 'question';
    if (!title && kind === 'question' && !sub.length) return;

    questions.push({
      kind: kind,
      title: title,
      description: description,
      type: typeName_(typeId),
      typeId: typeId,
      required: required,
      options: options,
      entryIds: entryIds
    });
  });

  return {
    ok: true,
    title: typeof meta[8] === 'string' ? meta[8] : '',
    description: typeof meta[0] === 'string' ? meta[0] : '',
    formId: typeof data[14] === 'string' ? data[14] : '',
    questions: questions,
    fetchedAt: new Date().toISOString()
  };
}

function extractPublicLoadData_(html) {
  var marker = 'FB_PUBLIC_LOAD_DATA_';
  var at = html.indexOf(marker);
  if (at < 0) return null;
  var start = html.indexOf('[', at);
  if (start < 0) return null;

  var depth = 0;
  var inString = false;
  var escaped = false;

  for (var i = start; i < html.length; i++) {
    var ch = html.charAt(i);

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) return html.substring(start, i + 1);
    }
  }
  return null;
}

function unique_(arr) {
  var seen = {};
  return arr.filter(function(v) {
    var k = String(v).toLowerCase();
    if (seen[k]) return false;
    seen[k] = true;
    return true;
  });
}

function typeName_(id) {
  var map = {
    0: 'Respuesta corta',
    1: 'Párrafo',
    2: 'Opción múltiple',
    3: 'Desplegable',
    4: 'Casillas',
    5: 'Escala lineal',
    6: 'Sección',
    7: 'Cuadrícula',
    8: 'Sección',
    9: 'Fecha',
    10: 'Hora'
  };
  return Object.prototype.hasOwnProperty.call(map, id) ? map[id] : 'Tipo ' + id;
}
