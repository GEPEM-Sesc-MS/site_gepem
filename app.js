/* MECÂNICA DO PORTAL. A configuração cotidiana fica em config.js. */
(() => {
  'use strict';
  const config = window.OBSERVATORIO;
  const byId = id => document.getElementById(id);
  if (!config || !Array.isArray(config.grupos)) {
    byId('empty').hidden = false;
    byId('empty').querySelector('h2').textContent = 'Não foi possível carregar a configuração.';
    byId('empty').querySelector('p').textContent = 'Verifique se config.js está na mesma pasta e se a sintaxe está correta.';
    return;
  }
  for (const key of ['nome','sigla','subtitulo','selo','rodape']) byId(key).textContent = config.marca[key] || '';
  if (config.marca.logo) {
    byId('logo').src = config.marca.logo;
    byId('logo').alt = config.marca.nome;
    byId('logo').hidden = false;
    byId('logo').addEventListener('load', () => document.querySelector('.brand-symbol').hidden = true);
    byId('logo').addEventListener('error', () => byId('logo').hidden = true);
  }
  // Aceita os dois formatos usuais de iframe. Não aceita links de edição/compartilhamento.
  function powerBiUrl(raw) {
    try {
      const url = new URL(raw);
      return url.protocol === 'https:' && url.hostname === 'app.powerbi.com' && !url.username && !url.password &&
        ((url.pathname === '/view' && url.searchParams.get('r')) ||
        (url.pathname === '/reportEmbed' && url.searchParams.get('reportId'))) ? url.href : null;
    } catch { return null; }
  }
  const panels = new Map();
  const links = new Map();
  for (const group of config.grupos) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = group.titulo;
    details.append(summary);
    const list = document.createElement('div');
    list.className = 'panel-links';
    for (const panel of group.paineis || []) {
      if (!panel.id || panels.has(panel.id)) continue;
      const link = document.createElement('a');
      link.className = 'panel-link';
      link.href = '#' + encodeURIComponent(panel.id);
      link.textContent = panel.titulo;
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        byId('menu-toggle').setAttribute('aria-expanded', 'false');
        byId('menu-toggle').textContent = 'Mostrar temas';
      });
      panels.set(panel.id, {...panel, group:group.titulo, details});
      links.set(panel.id, link);
      list.append(link);
    }
    details.append(list);
    byId('menu').append(details);
  }
  let timer;
  let currentId;
  function selectPanel() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { id = ''; }
    const panel = panels.get(id) || panels.get(config.painelInicial) || panels.values().next().value;
    if (!panel) { byId('empty').hidden = false; byId('empty').querySelector('h2').textContent = 'Nenhum painel cadastrado'; return; }
    if (currentId === panel.id) return;
    currentId = panel.id;
    clearTimeout(timer);
    for (const [key,link] of links) {
      if (key === panel.id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    panel.details.open = true;
    byId('titulo').textContent = panel.titulo;
    byId('descricao').textContent = panel.descricao || '';
    byId('nota').textContent = panel.nota || '';
    byId('fonte').textContent = panel.fonte ? 'Fonte: ' + panel.fonte : 'Conteúdo em preparação';
    document.title = panel.titulo + ' | ' + config.marca.nome;
    const url = powerBiUrl(panel.url);
    // PONTO DA TROCA DO IFRAME: cada clique seleciona a url do painel em config.js.
    const previous = byId('powerbi-frame');
    const frame = previous.cloneNode(false);
    frame.removeAttribute('src');
    previous.replaceWith(frame); // Descarta o relatório anterior e seus eventos pendentes.
    frame.title = panel.titulo + ' — Power BI';
    frame.hidden = !url;
    byId('empty').hidden = !!url;
    byId('loading').hidden = !url;
    byId('embed-help').hidden = !url;
    byId('abrir').hidden = !url;
    if (url) {
      byId('abrir').href = url;
      frame.addEventListener('load', () => { byId('loading').hidden = true; clearTimeout(timer); });
      frame.src = url; // Equivale a: <iframe src="URL_DO_RELATORIO"></iframe>
      timer = setTimeout(() => { byId('loading').hidden = true; }, 15000);
      // load não confirma sucesso interno: o conteúdo é de outro domínio.
    } else {
      byId('abrir').removeAttribute('href');
      byId('empty').querySelector('h2').textContent = panel.url ? 'Link do painel indisponível' : 'Painel em preparação';
      byId('empty').querySelector('p').textContent = panel.url ? 'Não foi possível reconhecer o endereço deste relatório. A configuração precisa ser revisada.' : 'Este tema fará parte do observatório. Os indicadores serão disponibilizados nesta área.';
    }
  }
  byId('menu-toggle').addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    byId('menu-toggle').setAttribute('aria-expanded', String(open));
    byId('menu-toggle').textContent = open ? 'Ocultar temas' : 'Mostrar temas';
  });
  function expand(enabled) {
    document.body.classList.toggle('expanded', enabled);
    byId('expandir').textContent = enabled ? 'Restaurar painel ↙' : 'Ampliar painel ⛶';
    byId('expandir').setAttribute('aria-pressed', String(enabled));
  }
  byId('expandir').addEventListener('click', () => expand(!document.body.classList.contains('expanded')));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') expand(false); });
  window.addEventListener('hashchange', selectPanel);
  selectPanel();
})();
