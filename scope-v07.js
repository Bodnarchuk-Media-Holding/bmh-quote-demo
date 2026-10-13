// BMH Quote Builder v0.7 — customer-visible scope and delivery contingencies.
// This public file contains only WHAT the client can order, not HOW BMH delivers it.
const bmhPackageStyles=document.createElement('link');bmhPackageStyles.rel='stylesheet';bmhPackageStyles.href='./packages-v06.css';document.head.appendChild(bmhPackageStyles);
for(const tag of document.querySelectorAll('.vtag'))tag.textContent='v0.7';
const BMH_EXTRA={
 uk:{heading:'Додаткові умови замовлення',intro:'Ці відповіді уточнюють кошторис. Невідомі ризики показуємо як «за запитом», а не як 0 €.',access:'Доступ до наявних сторінок',yes:'Є права адміністратора',missing:'Немає доступу / права втрачено',materials:'Фото й вихідні відео',ready:'Готові матеріали є',partial:'Потрібно підготувати матеріали',none:'Немає матеріалів — потрібна підготовка/зйомка',brand:'Логотип та стиль',hasBrand:'Оформлення вже є',needBrand:'Потрібен базовий фірмовий комплект',ads:'Рекламний кабінет',adsReady:'Уже налаштований / не потрібен',adsNeed:'Потрібно налаштувати рекламу',revisions:'Додаткові раунди правок',revisions0:'Без додаткових',revisions1:'Ще один раунд',revisions2:'Ще два раунди',urgency:'Термін виконання',normal:'Звичайний графік',rush:'Терміново, після перевірки можливості',travel:'Місце зйомки / роботи',local:'Нюрнберг / Фюрт / Штайн або дистанційно',far:'Поза локальною зоною — транспорт за запитом',lineExtra:'Підготовка наявного контенту',lineShoot:'Стартовий набір фото/відео',lineBrand:'Базове оформлення бренду',lineAds:'Підключення рекламного кабінету',lineRevisions:'Додаткові правки',lineRush:'Термінове виконання (за погодженням)',lineChannels:'Супровід додаткових каналів',lineAccess:'Відновлення доступу / підтвердження права власності',lineTravel:'Додатковий виїзд / відстань',warning:'Потрібне окреме узгодження умов і доступності.',note:'Прайс стартовий, без ПДВ. Жодних списань або замовлень сайт не здійснює.'},
 en:{heading:'Additional project conditions',intro:'These answers refine the estimate. Uncertain work is shown as “on request,” never as €0.',access:'Access to existing pages',yes:'Administrator access available',missing:'Access missing / ownership unclear',materials:'Photos and video assets',ready:'Ready to use',partial:'Some preparation needed',none:'None — preparation or filming required',brand:'Logo and visual identity',hasBrand:'Already available',needBrand:'Basic brand kit needed',ads:'Advertising account',adsReady:'Already configured / not needed',adsNeed:'Ad account setup required',revisions:'Extra revision rounds',revisions0:'None',revisions1:'One extra round',revisions2:'Two extra rounds',urgency:'Deadline',normal:'Standard timeline',rush:'Urgent, subject to confirmation',travel:'Location',local:'Nuremberg / Fürth / Stein or remote',far:'Outside local area — travel quote required',lineExtra:'Preparing existing content',lineShoot:'Starter photo/video material',lineBrand:'Basic brand styling',lineAds:'Advertising account setup',lineRevisions:'Extra revision rounds',lineRush:'Rush delivery (subject to approval)',lineChannels:'Additional channel management',lineAccess:'Access recovery / ownership verification',lineTravel:'Extra travel / distant location',warning:'Separate confirmation of access and feasibility required.',note:'Introductory estimates excl. VAT. This page creates no orders or payments.'},
 de:{heading:'Weitere Projektbedingungen',intro:'Diese Angaben präzisieren die Schätzung. Offene Fragen werden als „auf Anfrage“ angezeigt, nicht als 0 €.',access:'Zugriff auf bestehende Konten',yes:'Administratorzugriff vorhanden',missing:'Zugriff fehlt / Eigentum unklar',materials:'Fotos und Rohvideos',ready:'Material vorhanden',partial:'Material muss aufbereitet werden',none:'Kein Material — Vorbereitung/Dreh nötig',brand:'Logo und Erscheinungsbild',hasBrand:'Bereits vorhanden',needBrand:'Basis-Designpaket benötigt',ads:'Werbekonto',adsReady:'Eingerichtet / nicht benötigt',adsNeed:'Werbekonto muss eingerichtet werden',revisions:'Zusätzliche Korrekturschleifen',revisions0:'Keine zusätzlichen',revisions1:'Eine zusätzliche Runde',revisions2:'Zwei zusätzliche Runden',urgency:'Liefertermin',normal:'Normaler Zeitplan',rush:'Dringend, nur nach Bestätigung',travel:'Einsatzort',local:'Nürnberg / Fürth / Stein oder remote',far:'Außerhalb — Fahrtkosten auf Anfrage',lineExtra:'Aufbereitung vorhandener Inhalte',lineShoot:'Foto-/Videostartpaket',lineBrand:'Basis-Markenauftritt',lineAds:'Einrichtung Werbekonto',lineRevisions:'Zusätzliche Korrekturen',lineRush:'Expressbearbeitung (nach Zusage)',lineChannels:'Betreuung weiterer Kanäle',lineAccess:'Wiederherstellung des Zugriffs / Prüfung der Inhaberschaft',lineTravel:'Zusätzlicher Anfahrtsweg',warning:'Zugriff und Durchführbarkeit müssen separat geklärt werden.',note:'Unverbindliche Einstiegspreise ohne USt. Keine Buchung oder Zahlung auf dieser Seite.'}
};
function BMH_EXTRA_TR(k){return (BMH_EXTRA[lang]||BMH_EXTRA.uk)[k]||k;}
const extras=[
 {id:'assetAccess',label:'access',choices:[['yes','yes'],['missing','missing']]},
 {id:'assetMaterials',label:'materials',choices:[['ready','ready'],['partial','partial'],['none','none']]},
 {id:'assetBrand',label:'brand',choices:[['ready','hasBrand'],['need','needBrand']]},
 {id:'assetAds',label:'ads',choices:[['ready','adsReady'],['needs','adsNeed']]},
 {id:'assetRevisions',label:'revisions',choices:[['0','revisions0'],['1','revisions1'],['2','revisions2']]},
 {id:'assetUrgency',label:'urgency',choices:[['normal','normal'],['rush','rush']]},
 {id:'assetTravel',label:'travel',choices:[['local','local'],['far','far']]}
];
const markup='<details id="bmh-extra-options" class="bmh-extra-options"><summary data-extra-i18n="heading"></summary>'+
 '<p class="fine" data-extra-i18n="intro"></p><div class="bmh-extra-grid">'+extras.map(f=>
 '<label><span data-extra-i18n="'+f.label+'"></span><select id="'+f.id+'">'+
 f.choices.map(c=>'<option value="'+c[0]+'" data-extra-i18n="'+c[1]+'"></option>').join('')+
 '</select></label>').join('')+'</div><p id="bmh-extra-alert" class="bmh-extra-alert" role="status" aria-live="polite"></p>'+
 '<p class="fine" data-extra-i18n="note"></p></details>';
document.querySelector('#bmh-scope .bmh-scope-note')?.insertAdjacentHTML('afterend',markup);
for(const id of ['assetAccess','assetMaterials','assetBrand','assetAds','assetRevisions','assetUrgency','assetTravel']){
 BMH_SCOPE[id]=document.getElementById(id)?.value;
}
function BMH_V07_LABELS(){
 for(const el of document.querySelectorAll('[data-extra-i18n]'))el.textContent=BMH_EXTRA_TR(el.dataset.extraI18n);
 const alert=document.getElementById('bmh-extra-alert');
 if(alert)alert.textContent=(BMH_SCOPE.assetAccess==='missing'||BMH_SCOPE.assetTravel==='far')?BMH_EXTRA_TR('warning'):'';
 const access=document.getElementById('assetAccess');
 if(access){access.disabled=BMH_SCOPE.state==='new';}
}
const BMH_V07_PREVIOUS_CALC=BMH_CALC;
BMH_CALC=function(){
 const price=BMH_V07_PREVIOUS_CALC();
 const selected=_bundles.find(x=>x.id===_quote.bundleId)||_bundles[0];
 const all=[...selected.items,..._quote.items];
 const factor=BMH_SCOPE.level==='basic'?.95:BMH_SCOPE.level==='expanded'?1.25:1;
 const packChannelCount=(selected.items||[]).filter(x=>x.id==='social_manage').reduce((sum,x)=>sum+x.qty,0);
 const managed=all.filter(x=>['social_manage','social_extra'].includes(x.id)).reduce((sum,x)=>sum+x.qty,0);
 const effectiveChannels=Math.max(Number(BMH_SCOPE.channels)||1,packChannelCount);
 function add(id,key,low,high,kind='once',qty=1){
  const l=BMH_ROUND(low*factor),h=BMH_ROUND(high*factor);
  price.lines.push({id,qty,source:'setup',kind,method:'none',unresolved:false,label:BMH_EXTRA[key]?{uk:BMH_EXTRA.uk[key],en:BMH_EXTRA.en[key],de:BMH_EXTRA.de[key]}:null,low:l,high:h,net:l});
  if(kind==='monthly'){price.monthLow+=l;price.monthHigh+=h;}
  else{price.onceLow+=l;price.onceHigh+=h;}
 }
 function unresolved(id,key){
  price.missing.push(id);
  price.lines.push({id,qty:1,source:'setup',kind:'custom',unresolved:true,label:{uk:BMH_EXTRA.uk[key],en:BMH_EXTRA.en[key],de:BMH_EXTRA.de[key]},low:null,high:null});
 }
 // If PRO promises two managed channels, onboarding accounts must include both
 // even if the customer leaves the original selector at "one".
 if(effectiveChannels>Number(BMH_SCOPE.channels)){
  const additional=effectiveChannels-Number(BMH_SCOPE.channels);
  const setupBand=BMH_SCOPE.state==='new'?[290,550]:BMH_SCOPE.state==='optimize'?[120,270]:[0,0];
  if(setupBand[1]>0){
   const old=price.lines.find(x=>x.id==='__setup');
   const extraLow=BMH_ROUND(setupBand[0]*additional*factor),extraHigh=BMH_ROUND(setupBand[1]*additional*factor);
   if(old){old.qty=effectiveChannels;old.low+=extraLow;old.high+=extraHigh;old.net=old.low;}
   else add('__setup','lineExtra',setupBand[0]*additional,setupBand[1]*additional);
   price.onceLow+=extraLow;price.onceHigh+=extraHigh;
  }
 }
 // The channel selector has a meaningful recurring impact only if the quote
 // actually includes an ongoing social media management service.
 if(managed>0 && effectiveChannels>managed){
  const extra=effectiveChannels-managed;
  const b=BMH_BAND('social_extra');
  add('__channels','lineChannels',b.low*extra,b.high*extra,'monthly',extra);
 }
 if(BMH_SCOPE.assetMaterials==='partial')add('__materials','lineExtra',120,320);
 if(BMH_SCOPE.assetMaterials==='none'){
  const alreadyFilming=all.some(x=>['video_reel','video_batch3','video_day','photo_session'].includes(x.id));
  if(!alreadyFilming)add('__shoot','lineShoot',450,1050);
 }
 if(BMH_SCOPE.assetBrand==='need' && !all.some(x=>x.id==='brand_identity'))add('__brand','lineBrand',180,450);
 if(BMH_SCOPE.assetAds==='needs' && !all.some(x=>['ads_meta_setup','ads_tiktok_setup','ads_google_setup'].includes(x.id))){
  const b=BMH_BAND('ads_meta_setup');
  add('__ads','lineAds',b.low,b.high);
 }
 const revisions=Number(BMH_SCOPE.assetRevisions)||0;
 if(revisions)add('__revisions','lineRevisions',80*revisions,180*revisions,'once',revisions);
 if(BMH_SCOPE.assetUrgency==='rush' && price.onceHigh>0){
  add('__rush','lineRush',price.onceLow*0.20/factor,price.onceHigh*0.20/factor);
 }
 if(BMH_SCOPE.assetAccess==='missing' && BMH_SCOPE.state!=='new')unresolved('__access','lineAccess');
 if(BMH_SCOPE.assetTravel==='far')unresolved('__travel','lineTravel');
 price.onceNet=price.onceLow;price.monthNet=price.monthLow;
 price.firstLow=price.onceLow+price.monthLow;price.firstHigh=price.onceHigh+price.monthHigh;
 price.firstPeriodNet=price.firstLow;price.firstPeriodVAT=null;price.firstPeriodGross=null;
 price.monthlyGross=null;price.estimatedClientSpend=null;price.canFinalize=false;
 return price;
};
window._compute=BMH_CALC;
const beforeQuoteRender=window.renderQuote;
window.renderQuote=function(){
 // Show descriptive labels for transparent real-life extras in the existing
 // customer summary, rather than blank service names.
 beforeQuoteRender();
 const div=document.getElementById('selectedLines');
 const special=BMH_CALC().lines.filter(x=>x.label);
 // All existing lines are rendered; replace only their empty title via the
 // safe, predictable output position, without exposing internal data.
 if(div&&special.length){
  const rows=div.querySelectorAll('.line-item');
  const lineData=BMH_CALC().lines;
  rows.forEach((node,i)=>{
   const title=lineData[i]?.label;
   if(!title)return;
   const span=node.querySelector('span');
   if(!span)return;
   const small=span.querySelector('small');
   span.replaceChildren(document.createTextNode(title[lang]||title.en),small);
  });
 }
 BMH_V07_LABELS();
};
const beforeAll=window.renderAll;
window.renderAll=function(){beforeAll();BMH_V07_LABELS();};
function BMH_V07_UPDATE(){
 pricing=BMH_CALC();
 bundlePriceMap=_bundlePrices();
 renderAll();
}
for(const field of extras){
 const el=document.getElementById(field.id);
 el?.addEventListener('change',event=>{BMH_SCOPE[field.id]=event.target.value; if(quote)BMH_V07_UPDATE();});
}
document.getElementById('scopeState')?.addEventListener('change',()=>BMH_V07_LABELS());
BMH_V07_LABELS();
if(quote)BMH_V07_UPDATE();
