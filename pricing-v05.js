// BMH public-facing indicative pricing v0.5. No costs, salaries, margins or keys.
// Setup is a separate one-off deliverable, never silently part of monthly management.
const BMH_PUBLIC_BANDS={
 video_edit:[180,350],video_reel:[350,850],video_ai:[260,680],
 video_master:[900,2100],video_batch3:[850,1800],video_subtitles:[70,200],
 video_day:[700,1600],photo_session:[320,780],
 social_audit:[180,420],social_strategy:[350,950],social_posts8:[380,960],
 social_manage:[300,500],social_extra:[150,310],social_community:[260,850],social_report:[90,220],
 ads_meta_setup:[350,850],ads_tiktok_setup:[350,850],ads_google_setup:[450,1100],
 ads_meta_manage:[320,800],ads_tiktok_manage:[320,800],ads_google_manage:[400,950],
 ads_creative:[120,340],
 web_landing:[850,2600],web_site:[1700,6500],web_seo:[320,1200],
 web_automation:[600,2400],web_dashboard:[450,1700],
 print_flyer_design:[150,370],print_card_design:[100,260],print_banner_design:[200,520],
 brand_identity:[580,1950]
};
const BMH_SCOPE={state:'ready',channels:1,level:'standard'};
const BMH_ROUND=n=>Math.round(n/5)*5;
function BMH_BAND(id,method){
 const b=BMH_PUBLIC_BANDS[id];if(!b)return null;
 // Execution methods, AI, subcontractors are internal to BMH.
 // Prices depend only on selected service and visible scope.
 return {low:BMH_ROUND(b[0]),high:BMH_ROUND(b[1])};
}
const BMH_TEXT={
 uk:{step:'00 / ПОТРЕБИ',title:'Що вже маєте?',description:'Початкове налаштування й щомісячний супровід — різні роботи.',state:'Соцмережі',ready:'Уже працюють',optimize:'Потрібна оптимізація',new:'Створити з нуля',channels:'Кількість каналів',level:'Обсяг робіт',basic:'Базовий',standard:'Стандартний',expanded:'Розширений',help:'Супровід уже налаштованого каналу: 300–500 €/місяць. Створення, контент, реклама і відео рахуються окремо.',setup:'Початкове налаштування каналів',net:'без ПДВ',unknown:'ПДВ визначається після перевірки',custom:' + індивідуальні позиції',monthly:'Наступні місяці (без ПДВ)',first:'Перший період (без ПДВ)',once:'Разові послуги і підключення (без ПДВ)',total:'Витрати з рекламним бюджетом (без ПДВ)',tax:'ПДВ після підтвердження статусу'},
 en:{step:'00 / REQUIREMENTS',title:'What is already in place?',description:'Initial onboarding and ongoing management are separate services.',state:'Social channels',ready:'Already running',optimize:'Need optimization',new:'Create from scratch',channels:'Number of channels',level:'Scope of work',basic:'Basic',standard:'Standard',expanded:'Extended',help:'Management of an established channel: €300–500/month. Setup, content, ads and video are separate.',setup:'Initial account setup',net:'excl. VAT',unknown:'VAT treatment pending verification',custom:' + custom items',monthly:'Following months (excl. VAT)',first:'First period (excl. VAT)',once:'One-time services / setup (excl. VAT)',total:'Including advertising budget (excl. VAT)',tax:'VAT pending confirmation'},
 de:{step:'00 / BEDARF',title:'Was ist bereits vorhanden?',description:'Einrichtung und laufende Betreuung sind separate Leistungen.',state:'Social-Media-Kanäle',ready:'Bereits eingerichtet',optimize:'Optimierung nötig',new:'Neu aufbauen',channels:'Anzahl der Kanäle',level:'Leistungsumfang',basic:'Basis',standard:'Standard',expanded:'Erweitert',help:'Betreuung eines bestehenden Kanals: 300–500 €/Monat. Einrichtung, Content, Werbung und Video separat.',setup:'Einmalige Kanaleinrichtung',net:'zzgl. ggf. USt.',unknown:'Umsatzsteuerstatus noch zu prüfen',custom:' + Positionen auf Anfrage',monthly:'Folgende Monate (ohne USt.)',first:'Erster Zeitraum (ohne USt.)',once:'Einmalige Leistungen und Einrichtung (ohne USt.)',total:'Mit Werbebudget (ohne USt.)',tax:'USt. nach Klärung'}
};
function BMH_TR(k){return (BMH_TEXT[lang]||BMH_TEXT.uk)[k]||k;}
function BMH_SPAN(a,b){
 if(a===undefined||a===null)return '—';
 return a===b?euro(a):euro(a)+' – '+euro(b);
}
function BMH_CALC(){
 const pkg=_bundles.find(x=>x.id===_quote.bundleId)||_bundles[0];
 const rows=[...pkg.items.map(x=>({...x,source:'package'})),..._quote.items.map(x=>({...x,source:'extra'}))];
 const f=BMH_SCOPE.level==='basic'?0.95:BMH_SCOPE.level==='expanded'?1.25:1;
 let onceLow=0,onceHigh=0,monthLow=0,monthHigh=0;
 const missing=[],lines=[];
 for(const x of rows){
  const service=_cat.services.find(s=>s.id===x.id);
  if(!service)continue;
  const method=x.method||service.methods?.[0]||'none';
  const band=BMH_BAND(x.id,method);
  if(!band){missing.push(x.id);lines.push({id:x.id,qty:x.qty,source:x.source,kind:'custom',method,unresolved:true});continue;}
  const discount=x.source==='package'?1-pkg.discount:1;
  const low=BMH_ROUND(band.low*x.qty*f*discount),high=BMH_ROUND(band.high*x.qty*f*discount);
  lines.push({id:x.id,qty:x.qty,source:x.source,kind:service.kind,method,unresolved:false,low,high,net:low});
  if(service.kind==='monthly'){monthLow+=low;monthHigh+=high;} else{onceLow+=low;onceHigh+=high;}
 }
 const setup=BMH_SCOPE.state==='new'?[290,550]:BMH_SCOPE.state==='optimize'?[120,270]:[0,0];
 const addLow=BMH_ROUND(setup[0]*BMH_SCOPE.channels*f),addHigh=BMH_ROUND(setup[1]*BMH_SCOPE.channels*f);
 if(addHigh){onceLow+=addLow;onceHigh+=addHigh;lines.push({id:'__setup',qty:BMH_SCOPE.channels,source:'setup',kind:'once',method:'none',low:addLow,high:addHigh,net:addLow,unresolved:false});}
 const firstLow=onceLow+monthLow,firstHigh=onceHigh+monthHigh;
 return {lines,missing,onceNet:onceLow,monthNet:monthLow,firstPeriodNet:firstLow,
  onceLow,onceHigh,monthLow,monthHigh,firstLow,firstHigh,
  firstPeriodVAT:null,firstPeriodGross:null,monthlyGross:null,
  mediaBudget:_quote.mediaBudget,estimatedClientSpend:null,vatMode:'unconfirmed',vatRate:null,vatVerified:false,canFinalize:false};
}
window._compute=BMH_CALC;
window._bundlePrices=function(){
 const selected=_quote.bundleId,out={};
 for(const p of _bundles){_quote.bundleId=p.id;const r=BMH_CALC();out[p.id]={firstPeriodNet:r.firstLow,firstHigh:r.firstHigh,onceNet:r.onceLow,monthNet:r.monthLow,monthHigh:r.monthHigh};}
 _quote.bundleId=selected;return out;
};
// Make legacy displayed catalog starting values consistent with the public range model.
for(const service of _cat.services){
 const defaultMethod=service.methods?.[0]||'none';
 service.indicativeNet=BMH_BAND(service.id,defaultMethod)?.low??null;
 for(const method of service.methods||['none']){
  if(_rates[service.id])_rates[service.id][method]=BMH_BAND(service.id,method)?.low??null;
 }
}
function BMH_RENDER_SCOPE(){
 for(const el of document.querySelectorAll('[data-scope-i18n]'))el.textContent=BMH_TR(el.dataset.scopeI18n);
 const labels={onceNet:'once',monthlyNet:'monthly',vat:'tax',firstGross:'first',nextMonth:'monthly',totalSpend:'total'};
 for(const [key,value] of Object.entries(labels)){
  const el=document.querySelector('[data-i18n="'+key+'"]');
  if(el)el.textContent=BMH_TR(value);
 }
}
window.renderPackages=function(){
 if(!catalog||!quote)return;
 $('packages').innerHTML=catalog.bundles.map(b=>{
  const amount=bundlePriceMap?.[b.id];
  return '<button type="button" data-bundle="'+b.id+'" class="package '+(quote.bundleId===b.id?'active':'')+'"><span class="package-name">'+esc(label(b.title))+'</span><span class="package-info">'+esc(label(b.description))+'</span>'+
   (b.id!=='custom'?'<span class="package-price">'+BMH_SPAN(amount?.firstPeriodNet,amount?.firstHigh)+' <small>'+esc(BMH_TR('net'))+'</small></span>':'')+
   (quote.bundleId===b.id?'<span class="package-active">✓ '+esc(tr('selected'))+'</span>':'')+'</button>';
 }).join('');
};
window.renderServices=function(){
 if(!catalog||!quote)return;
 $('servicesList').innerHTML=catalog.services.filter(s=>s.category===filter).map(s=>{
  const selected=quote.items.find(x=>x.id===s.id),qty=selected?.qty||0;
  const chosen=selected?.method||s.methods?.[0]||'none',band=BMH_BAND(s.id,chosen);
  const selector=qty&&s.methods?.length>1?
    '<select aria-label="'+esc(tr('chooseMethod'))+'" class="method-select" data-method="'+s.id+'">'+s.methods.map(k=>'<option value="'+k+'" '+(k===chosen?'selected':'')+'>'+esc(label(method(k)?.label))+'</option>').join('')+'</select>':'';
  return '<article class="service '+(qty?'selected':'')+'"><div><div class="service-title">'+esc(label(s.label))+'</div><div class="service-desc">'+esc(label(s.description))+'</div></div>'+
    '<div class="service-price">'+(band?esc(tr('approx'))+' '+BMH_SPAN(band.low,band.high):esc(tr('customPrice')))+' <small>'+esc(BMH_TR('net'))+' · '+esc(s.kind==='monthly'?tr('perMonth'):tr('oneOff'))+'</small></div>'+
    '<div class="service-footer">'+(selector||'<span></span>')+'<div class="counter">'+(qty?
      '<button data-qty="'+s.id+'" data-step="-1" aria-label="minus">−</button><b>'+qty+'</b><button data-qty="'+s.id+'" data-step="1" aria-label="plus">+</button>':
      '<button class="add-btn" data-qty="'+s.id+'" data-step="1">'+esc(tr('add'))+'</button>')+'</div></div></article>';
 }).join('');
 $('countText').textContent=quote.items.reduce((a,x)=>a+x.qty,0)+' '+tr('selected');
};
window.renderQuote=function(){
 if(!quote||!pricing)return;
 $('selectedLines').innerHTML=pricing.lines.length?pricing.lines.map(x=>{
  const title=x.id==='__setup'?BMH_TR('setup'):label(service(x.id)?.label);
  return '<div class="line-item"><span>'+esc(title)+'<small>'+x.qty+' × · '+esc(x.source==='setup'?BMH_TR('setup'):x.source==='package'?tr('included'):tr('packageExtra'))+'</small></span><strong>'+
    (x.unresolved?esc(tr('customPrice')):BMH_SPAN(x.low,x.high))+'</strong></div>';
 }).join(''):'<p class="empty">'+esc(tr('quoteEmpty'))+'</p>';
 const extra=pricing.missing.length?BMH_TR('custom'):'';
 const fields={
  onceNet:BMH_SPAN(pricing.onceLow,pricing.onceHigh),
  monthlyNet:BMH_SPAN(pricing.monthLow,pricing.monthHigh),
  vatTotal:BMH_TR('unknown'),
  gross:BMH_SPAN(pricing.firstLow,pricing.firstHigh)+extra,
  monthGross:BMH_SPAN(pricing.monthLow,pricing.monthHigh),
  platformBudget:euro(pricing.mediaBudget),
  totalSpend:BMH_SPAN(pricing.firstLow+pricing.mediaBudget,pricing.firstHigh+pricing.mediaBudget)+extra
 };
 for(const [key,value] of Object.entries(fields))$(key).textContent=value;
 if(document.activeElement!==$('mediaBudget'))$('mediaBudget').value=String(pricing.mediaBudget);
 if(document.activeElement!==$('clientName'))$('clientName').value=quote.clientName||'';
 if(document.activeElement!==$('noteInput'))$('noteInput').value=quote.note||'';
 $('missingWarning').textContent=pricing.missing.length?tr('incomplete'):'';
 $('taxStatus').textContent=BMH_TR('unknown');
 $('print').disabled=true;
 BMH_RENDER_SCOPE();
};
const previousRenderAll=window.renderAll;
window.renderAll=function(){previousRenderAll();BMH_RENDER_SCOPE();};
for(const [id,key] of [['scopeState','state'],['scopeChannels','channels'],['scopeLevel','level']]){
 const el=document.getElementById(id);
 if(el)el.addEventListener('change',event=>{
  BMH_SCOPE[key]=key==='channels'?Number(event.target.value):event.target.value;
  if(quote){pricing=BMH_CALC();bundlePriceMap=_bundlePrices();renderAll();}
 });
}
BMH_RENDER_SCOPE();

// Reconcile a quote already created before this enhancement script loaded.
if(typeof quote!=='undefined' && quote){pricing=BMH_CALC();bundlePriceMap=_bundlePrices();renderAll();}
