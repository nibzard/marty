(() => {
  const $ = s => document.querySelector(s);
  const states = {
    pairing: {title:'Pair your Marty.',detail:'Scan with your phone.',left:'preview only',right:'no device paired',sync:'setup study',note:'Scan this demonstration code to open the pairing section of the report. The actual product would show an expiring setup code, then request sign-in and a physical confirmation.'},
    idle: {face:'· ‿ ·', title:'All quiet.', detail:'Your next check is at 10:00.', left:'1 responsibility', right:'connected', sync:'09:41 · synced', note:'The agent is waiting for a scheduled check. Rest is a valid state. The face does not ask for attention.'},
    working: {face:'· _ ·', title:'Preparing your brief.', detail:'One worker is checking the sources.', left:'1 worker', right:'within budget', sync:'09:42 · synced', note:'Show the current job and a useful fact. Keep text stable between updates. The face reports activity without constant animation.'},
    approval: {face:'· o ·', title:'Send the report?', detail:'Reviewed brief → Alex\nExpires at 09:48.', left:'request 0184', right:'decision needed', sync:'09:43 · synced', note:'This study assumes you already reviewed the complete report. A press names this request only. New content needs a new approval.'},
    done: {face:'˘ ‿ ˘', title:'Your brief is ready.', detail:'The file is saved. The worker is released.', left:'result saved', right:'job complete', sync:'09:44 · synced', note:'Show completion only after the result is stored. A short useful update is enough. The person can open the full result elsewhere.'},
    offline: {face:'— —', title:'Connection lost.', detail:'Last known: preparing the brief.', left:'last sync 09:42', right:'offline', sync:'sync unavailable', note:'The powered device has detected a lost connection. The service may still be working. An unpowered screen keeps its old image; check the last sync time. Approval controls stay disabled until the live request is checked.'}
  };
  function setState(name) {
    const s=states[name];
    $('.screen').classList.toggle('pairing-screen',name==='pairing');
    $('#device-qr').hidden=name!=='pairing';
    $('#device-face').dataset.pose=name;
    const eyes={idle:'M30 39h.01M48 36h.01',working:'M29 34L31 44M47 31L49 41',approval:'M30 39h.01M48 36h.01',done:'M26 40Q30 30 35 39M44 37Q48 27 53 36',offline:'M26 40H35M44 37H53'};
    $('#device-eyes').setAttribute('d',eyes[name]||eyes.working);
    $('#device-eyes').setAttribute('stroke-width',name==='approval'?'9':'5');
    ['title','detail','left','right','sync'].forEach(k => $('#device-'+k).textContent=s[k]);
    $('#state-explanation').textContent=s.note;
    $('#device-allow').disabled=name!=='approval'; $('#device-deny').disabled=name!=='approval';
    document.querySelectorAll('[data-state]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.state===name)));
  }
  document.querySelectorAll('[data-state]').forEach(b=>b.addEventListener('click',()=>setState(b.dataset.state)));
  $('#device-allow').addEventListener('click',()=>{setState('working');$('#device-title').textContent='Decision recorded.';$('#device-detail').textContent='Request 0184 allowed once.';$('#state-explanation').textContent='Simulated approval recorded. The service would now execute the approved action and store its outcome. This page sends nothing.';});
  $('#device-deny').addEventListener('click',()=>{setState('idle');$('#device-title').textContent='Send cancelled.';$('#device-detail').textContent='The draft stays saved.';$('#state-explanation').textContent='Simulated denial recorded. The prepared file remains available. The agent can continue other work within its existing permissions.';});
  const money=n=>'$'+n.toFixed(2);
  function updateCost(){
    const wh=Number($('#worker-hours').value),bh=Number($('#browser-hours').value),mc=Number($('#model-cost').value);
    const costs=[6,wh*30*.08,bh*30*.04,mc],total=costs.reduce((a,b)=>a+b,0);
    $('#worker-value').textContent=wh.toFixed(1)+' h';$('#browser-value').textContent=bh.toFixed(2).replace(/0$/,'')+' h';$('#model-value').textContent='$'+mc;
    $('#cost-total').textContent=money(total);$('#cost-worker').textContent=money(costs[1]);$('#cost-browser').textContent=money(costs[2]);$('#cost-model').textContent=money(mc);
    ['base','worker','browser','model'].forEach((k,i)=>$('#bar-'+k).style.width=(costs[i]/total*100)+'%');
  }
  ['worker-hours','browser-hours','model-cost'].forEach(id=>$('#'+id).addEventListener('input',updateCost));updateCost();
  $('#print-report').addEventListener('click',()=>window.print());
  let openState=[];
  window.addEventListener('beforeprint',()=>{openState=[...document.querySelectorAll('details')].map(d=>d.open);document.querySelectorAll('details').forEach(d=>d.open=true);});
  window.addEventListener('afterprint',()=>document.querySelectorAll('details').forEach((d,i)=>d.open=openState[i]??true));
  const links=[...document.querySelectorAll('.rail nav a')];
  function onScroll(){const h=document.documentElement;$('#reading-progress').value=h.scrollHeight>innerHeight?(scrollY/(h.scrollHeight-innerHeight))*100:100;let active=links[0];for(const l of links){if($(l.getAttribute('href')).getBoundingClientRect().top<180)active=l;}links.forEach(l=>{l.classList.toggle('active',l===active);if(l===active)l.setAttribute('aria-current','location');else l.removeAttribute('aria-current');});}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
})();
