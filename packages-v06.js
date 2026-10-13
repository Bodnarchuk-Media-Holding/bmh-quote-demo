// Public customer-only package presentation.
// Private execution methods, AI subscriptions, freelancers and supplier economics
// do not appear in this client-facing website or affect public prices.
const BMH_PACKAGE_LABELS={
 uk:{included:'Що входить',once:'разово',monthly:'щомісяця',first:'Перший період',later:'Надалі щомісяця',from:'від',to:'до',notIncluded:'Налаштування нових акаунтів, рекламний бюджет та додатковий контент рахуються окремо.',custom:'Складіть індивідуальний перелік послуг нижче.'},
 en:{included:'What is included',once:'one-time',monthly:'monthly',first:'First period',later:'Monthly thereafter',from:'from',to:'to',notIncluded:'New account setup, ad spend and extra content are priced separately.',custom:'Build your own selection using the services below.'},
 de:{included:'Enthaltene Leistungen',once:'einmalig',monthly:'monatlich',first:'Erster Zeitraum',later:'Danach monatlich',from:'ab',to:'bis',notIncluded:'Neue Konten, Werbebudget und zusätzlicher Content werden separat berechnet.',custom:'Stellen Sie Ihre Leistungen unten selbst zusammen.'}
};
function BMH_PACKAGE_T(key){return (BMH_PACKAGE_LABELS[lang]||BMH_PACKAGE_LABELS.uk)[key]||key;}
function BMH_PACKAGE_FROM(low,high){
 if(low===null||low===undefined)return '—';
 const a=BMH_PACKAGE_T('from')+' '+euro(low);
 return high>low?a+' · '+BMH_PACKAGE_T('to')+' '+euro(high):a;
}
window.renderPackages=function(){
 if(!catalog||!quote)return;
 $('packages').innerHTML=catalog.bundles.map(pack=>{
  const rows=pack.items||[];
  const included=rows.map(entry=>{
   const svc=catalog.services.find(x=>x.id===entry.id);
   if(!svc)return '';
   const freq=svc.kind==='monthly'?'monthly':'once';
   return '<li><span><strong>'+entry.qty+' ×</strong> '+esc(label(svc.label))+'</span>'+
    '<small>'+esc(BMH_PACKAGE_T(freq))+'</small></li>';
  }).join('');
  const price=bundlePriceMap?.[pack.id];
  const monthlyPrice=Number(price?.monthNet||0);
  const section=pack.id==='custom'
   ?'<p class="package-custom">'+esc(BMH_PACKAGE_T('custom'))+'</p>'
   :'<div class="package-inclusions"><span class="package-inclusions-title">'+esc(BMH_PACKAGE_T('included'))+'</span>'+
     '<ul>'+included+'</ul><p class="package-notincluded">'+esc(BMH_PACKAGE_T('notIncluded'))+'</p></div>'+
     '<div class="package-price-totals"><div><small>'+esc(BMH_PACKAGE_T('first'))+' · '+esc(BMH_TR('net'))+'</small>'+
       '<strong>'+BMH_PACKAGE_FROM(price?.firstPeriodNet,price?.firstHigh)+'</strong></div>'+
     (monthlyPrice>0?'<div><small>'+esc(BMH_PACKAGE_T('later'))+' · '+esc(BMH_TR('net'))+'</small>'+
       '<strong>'+BMH_PACKAGE_FROM(monthlyPrice,price?.monthHigh)+'</strong></div>':'')+
     '</div>';
  return '<button type="button" class="package bmh-package '+(pack.id===quote.bundleId?'active':'')+
   '" data-bundle="'+pack.id+'" aria-pressed="'+(pack.id===quote.bundleId)+'">'+
   '<span class="package-name">'+esc(label(pack.title))+'</span>'+
   '<span class="package-info">'+esc(label(pack.description))+'</span>'+
   section+
   (pack.id===quote.bundleId?'<span class="package-active">✓ '+esc(tr('selected'))+'</span>':'')+
   '</button>';
 }).join('');
};
if(quote)renderAll();
