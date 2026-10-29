// Canchas, hora, estadisticas destacadas y revelacion anual del podio.
db.courts = Array.isArray(db.courts) ? db.courts : [];
db.awards = db.awards && typeof db.awards === 'object' ? db.awards : {};
save();

const featureStyle = document.createElement('style');
featureStyle.textContent = `
  .feature-grid{display:grid;grid-template-columns:1fr;gap:9px}
  .feature-card{background:#f6f8f4;border:1px solid var(--line);border-radius:15px;padding:13px}
  .feature-card small{display:block;color:var(--muted);font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.6px}
  .feature-card b{display:block;margin-top:5px;font-size:15px;line-height:1.2}
  .feature-card span{display:block;color:var(--muted);font-size:11px;margin-top:4px}
  .contenders{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
  .contender{background:#eff4e9;color:var(--green);border-radius:99px;padding:9px 13px;font-weight:800;font-size:13px}
  .secret-note{font-size:12px;color:var(--muted);margin:8px 0 0}
  .award-box{background:linear-gradient(135deg,#1f6848,#174630);color:#fff;border-radius:18px;padding:17px;margin:12px 0}
  .award-box h3{margin:0 0 5px;font-size:16px}.award-box p{margin:0;color:#dbe9de;font-size:12px}
  .award-results{display:grid;gap:8px;margin-top:13px}
  .award-result{display:flex;align-items:center;gap:9px;background:#ffffff16;border-radius:12px;padding:10px}
  .award-result b{font-size:13px}.award-result small{margin-left:auto;color:#deebdf;font-size:11px}
  .court-row{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--line)}
  .court-row:last-child{border-bottom:0}.court-row span{flex:1;font-weight:700;font-size:13px}
  .court-add{display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:12px}
  .court-add input{min-width:0;border:1px solid var(--line);background:#fff;border-radius:11px;padding:10px}
  .match-meta{font-size:10px!important;color:var(--muted)!important}
  @media(min-width:480px){.feature-grid{grid-template-columns:1fr 1fr}}
`;
document.head.appendChild(featureStyle);

const rankingHeader = document.querySelector('#topRanking')?.previousElementSibling;
if (rankingHeader) rankingHeader.querySelector('h2').textContent = 'Curiosidades de temporada';
const settingsCard = document.querySelector('#settingsPage .card');
if (settingsCard && !document.querySelector('#courtManagerBtn')) {
  const b = document.createElement('button');
  b.id = 'courtManagerBtn'; b.className = 'settings-btn'; b.textContent = '⚽　Administrar canchas';
  settingsCard.insertBefore(b, settingsCard.firstElementChild);
  b.onclick = manageCourts;
}
const rankingPage = document.querySelector('#rankingPage');
const fullRankingCard = document.querySelector('#fullRanking');
if (rankingPage && fullRankingCard && !document.querySelector('#awardPanel')) {
  const panel = document.createElement('div'); panel.id = 'awardPanel';
  rankingPage.insertBefore(panel, fullRankingCard);
}

function localToday(){const n=new Date();return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`}
function localTime(){const n=new Date();return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`}
function stableNameOrder(list,season){const hash=id=>{let h=2166136261;for(const c of `${season}:${id}`){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};return list.slice().sort((a,b)=>hash(a.player.id)-hash(b.player.id))}
function renderHighlights(){
  const el=document.querySelector('#topRanking');if(!el)return;
  const rows=totals(db.season).filter(x=>x.matches>0);
  if(!rows.length){el.innerHTML='<div class="empty"><div class="ball">⚽</div>Cuando haya partidos, acá aparecen curiosidades de la banda.</div>';return}
  const played=rows.filter(x=>x.matches>=2),average=x=>x.goals/x.matches,bestAvg=played.length?Math.max(...played.map(average)):null,lowAvg=played.length?Math.min(...played.map(average)):null,maxMatches=Math.max(...rows.map(x=>x.matches)),names=xs=>xs.map(x=>esc(x.player.name)).join(', '),cards=[];
  if(bestAvg!==null){const xs=played.filter(x=>Math.abs(average(x)-bestAvg)<1e-9);cards.push(`<div class="feature-card"><small>Más goles por partido</small><b>${names(xs)}</b><span>${bestAvg.toFixed(2).replace('.',',')} goles de promedio</span></div>`)}
  if(lowAvg!==null){const xs=played.filter(x=>Math.abs(average(x)-lowAvg)<1e-9);cards.push(`<div class="feature-card"><small>Menos goles por partido</small><b>${names(xs)}</b><span>${lowAvg.toFixed(2).replace('.',',')} goles de promedio</span></div>`)}
  const frequent=rows.filter(x=>x.matches===maxMatches);cards.push(`<div class="feature-card"><small>Los que más jugaron</small><b>${names(frequent)}</b><span>${maxMatches} partidos registrados</span></div>`);
  if(!played.length)cards.push('<div class="feature-card"><small>Promedio goleador</small><b>En construcción</b><span>Se calcula cuando haya al menos dos partidos.</span></div>');
  el.innerHTML=`<div class="feature-grid">${cards.join('')}</div>`;
}
function rankRow(x,place){return `<div class="rank-row"><div class="rank-num">${String(place).padStart(2,'0')}</div><div class="avatar">${esc(initials(x.player.name))}</div><div class="rank-name">${esc(x.player.name)}<small>${x.goals} ⚽ · ${x.bestGoals} mejor gol · ${x.mvp} figura · ${x.second} segundo puesto</small></div><div class="points">${x.points} <small>PTS</small></div></div>`}
function renderCandidateCard(list,season){
  const card=document.querySelector('#fullRanking');if(!card)return;
  const state=db.awards[String(season)],played=list.filter(x=>x.matches>0);
  if(!played.length){card.innerHTML='<div class="empty">La tabla se está preparando. Registren algunos partidos primero.</div>';return}
  if(state?.results?.length){const badges=['🥇','🥈','🥉'],winner=state.results[0],finalRows=state.results.map((x,i)=>`<div class="award-result"><b>${badges[i]||'🏅'} ${i===0?'Ganador del Balón del Lloro':i===1?'Segundo puesto':'Tercer puesto'}: ${esc(x.name)}</b><small>${x.points} pts</small></div>`).join(''),otherRows=played.slice(3).map((x,i)=>rankRow(x,i+4)).join('');card.innerHTML=`<div class="award-box"><h3>🏆 El Balón del Lloro es para ${esc(winner.name)}</h3><p>Orden revelado el 26 de octubre de ${esc(season)}.</p><div class="award-results">${finalRows}</div></div>${otherRows}`;return}
  const top=played.slice(0,3),tail=played.slice(3),anonymousOrder=stableNameOrder(top,season).map(x=>`<span class="contender">${esc(x.player.name)}</span>`).join('');
  card.innerHTML=`<div class="card" style="box-shadow:none;background:#fbfcfa"><b>🎭 En la pelea por el podio</b><div class="contenders">${anonymousOrder}</div><p class="secret-note">Están juntos y sin orden. Los puntos de estos tres quedan reservados hasta la entrega.</p></div>${tail.map((x,i)=>rankRow(x,i+4)).join('')}`;
}
function renderAwardPanel(){
  const panel=document.querySelector('#awardPanel');if(!panel)return;
  const season=Number(selectedSeason),state=db.awards[String(season)];
  if(state?.results?.length){panel.innerHTML='<div class="hint" style="margin:5px 2px 10px">El resultado de esta temporada ya fue revelado.</div>';return}
  if(!db.matches.some(m=>Number(m.season)===season)){panel.innerHTML='<div class="hint" style="margin:5px 2px 10px">La revelación aparece cuando haya partidos de esta temporada.</div>';return}
  if(localToday()===`${season}-10-26`){panel.innerHTML='<div class="award-box"><h3>🎭 Llegó el día de la entrega</h3><p>Un toque revela el podio y entrega el Balón del Lloro.</p><button class="btn" id="revealAwardBtn" style="margin-top:12px;background:var(--lime);color:#17211c">Revelar el orden y entregar premios</button></div>';return}
  panel.innerHTML=`<div class="hint" style="margin:5px 2px 10px">🔒 El podio seguirá en secreto. La revelación solo estará disponible el 26 de octubre de ${season}.</div>`;
}
function revealAward(){
  const season=Number(selectedSeason),sorted=totals(season).filter(x=>x.matches>0).slice(0,3);
  if(localToday()!==`${season}-10-26`)return toast('El podio solo se puede revelar el 26 de octubre');
  if(!sorted.length)return toast('Todavía no hay partidos para esta temporada');
  db.awards[String(season)]={revealedAt:new Date().toISOString(),results:sorted.map(x=>({id:x.player.id,name:x.player.name,points:x.points,goals:x.goals,bestGoals:x.bestGoals,mvp:x.mvp,second:x.second}))};
  save();update();go('ranking');toast(`¡El Balón del Lloro es para ${sorted[0].player.name}!`);
}
function manageCourts(){
  const rows=db.courts.map(c=>`<div class="court-row"><span>⚽ ${esc(c.name)}</span><button class="iconbtn" data-remove-court="${esc(c.id)}" aria-label="Eliminar cancha">×</button></div>`).join('')||'<p class="hint">Todavía no agregaste canchas.</p>';
  modal('Tus canchas',`<p class="hint">Guárdalas una sola vez y después las eliges al anotar cada partido.</p><div id="courtRows">${rows}</div><div class="court-add"><input id="courtNameInput" maxlength="40" placeholder="Ej. La 10 de Caballito"/><button class="btn" id="addCourtBtn">Agregar</button></div>`);
  document.querySelector('#addCourtBtn').onclick=()=>{const input=document.querySelector('#courtNameInput'),name=input.value.trim();if(!name)return toast('Escribí el nombre de la cancha');if(db.courts.some(c=>c.name.toLowerCase()===name.toLowerCase()))return toast('Esa cancha ya está guardada');db.courts.push({id:crypto.randomUUID(),name});save();manageCourts();toast('Cancha guardada')};
}
function matchCourtOptions(){return `<option value="">${db.courts.length?'Sin cancha seleccionada':'Todavía no hay canchas guardadas'}</option>${db.courts.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}`}
renderRanking=function(sel,list){if(sel==='#topRanking'){renderHighlights();return}if(sel==='#fullRanking'){renderCandidateCard(list||totals(selectedSeason),selectedSeason);renderAwardPanel()}};
renderMatches=function(sel,ms){
  const el=document.querySelector(sel);if(!el)return;
  if(!ms.length){el.innerHTML='<div class="empty"><div class="ball">⚽</div>El primer partido todavía está por jugarse.<br>Cuando termine, anótalo acá.</div>';return}
  el.innerHTML=ms.map(m=>{const date=new Date(m.date+'T12:00:00'),day=date.getDate(),month=date.toLocaleDateString('es-AR',{month:'short'}).replace('.',''),goals=(m.stats||[]).reduce((n,s)=>n+(Number(s.goals)||0),0),awards=(m.stats||[]).filter(s=>s.mvp||s.second).map(s=>`${s.mvp?'⭐':'🥈'} ${esc(db.players.find(p=>p.id===s.playerId)?.name||'')}`).join(' · '),points=(m.stats||[]).reduce((n,s)=>n+(Number(s.goals)||0)+(s.bestGoal?2:0)+(s.mvp?3:0)+(s.second?2:0),0),meta=[m.time,m.courtName].filter(Boolean).map(esc).join(' · ');return `<div class="match"><div class="datebox"><b>${day}</b><small>${month}</small></div><div class="match-info"><b>${esc(m.label||'Partido de fútbol')}</b><small>${goals} goles${awards?' · '+awards:''}</small>${meta?`<small class="match-meta">${meta}</small>`:''}</div><span class="pill">${points} pts</span></div>`}).join('');
};
newMatch=function(){
  const active=db.players.filter(p=>p.active!==false);if(!active.length)return addPlayerFirst();
  modal('Anotar partido',`<div class="row"><div class="field" style="flex:1"><label>Fecha</label><input type="date" id="matchDate" value="${localToday()}"/></div><div class="field" style="width:112px"><label>Hora</label><input type="time" id="matchTime" value="${localTime()}"/></div></div><div class="field"><label>Cancha</label><select id="matchCourt">${matchCourtOptions()}</select>${db.courts.length?'':'<small class="hint">Puedes guardar tus canchas en Ajustes → Administrar canchas.</small>'}</div><div class="field"><label>Nombre del partido <span class="hint">(opcional)</span></label><input id="matchLabel" placeholder="Ej. El clásico del jueves" maxlength="50"/></div><p class="hint">Anota los goles y elige los premios. Cada premio es opcional.</p><div class="scoreline hint" style="grid-template-columns:1fr 68px"><span>Jugador</span><span style="text-align:center">⚽ goles</span></div><div id="scoreRows">${active.map(p=>`<div class="scoreline" style="grid-template-columns:1fr 68px"><label>${esc(p.name)}</label><input type="number" min="0" max="30" value="0" data-goals="${p.id}" aria-label="Goles de ${esc(p.name)}"/></div>`).join('')}</div><div class="field"><label>Mejor gol del partido ✨ <span class="hint">(+2 puntos)</span></label><select id="bestGoal"><option value="">Sin elegir</option>${active.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div><div class="field"><label>Mejor jugador ⭐ <span class="hint">(+3 puntos)</span></label><select id="mvp"><option value="">Sin elegir</option>${active.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div><div class="field"><label>Segundo mejor jugador 🥈 <span class="hint">(+2 puntos)</span></label><select id="second"><option value="">Sin elegir</option>${active.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div><button class="btn full" id="saveMatch">Guardar partido</button>`);
  document.querySelector('#saveMatch').onclick=()=>{
    const date=document.querySelector('#matchDate').value,time=document.querySelector('#matchTime').value;if(!date||!time)return toast('Completa la fecha y la hora');
    const mvp=document.querySelector('#mvp').value,second=document.querySelector('#second').value;if(mvp&&second&&mvp===second)return toast('Elige jugadores distintos para esos dos premios');
    const bestGoal=document.querySelector('#bestGoal').value;if(bestGoal&&Number(document.querySelector(`[data-goals="${bestGoal}"]`)?.value||0)<1)return toast('Para elegir el mejor gol, anota al menos un gol para esa persona');
    const courtId=document.querySelector('#matchCourt').value,court=db.courts.find(c=>c.id===courtId),stats=active.map(p=>({playerId:p.id,goals:Math.max(0,Number(document.querySelector(`[data-goals="${p.id}"]`).value)||0),bestGoal:bestGoal===p.id,mvp:mvp===p.id,second:second===p.id}));
    db.matches.push({id:crypto.randomUUID(),date,time,courtId:court?.id||'',courtName:court?.name||'',label:document.querySelector('#matchLabel').value.trim(),season:Number(date.slice(0,4)),stats});
    if(Number(date.slice(0,4))>db.season)db.season=Number(date.slice(0,4));selectedSeason=db.season;save();close();update();toast('Partido guardado');
  };
};
const baseUpdate=update;
update=function(){db.courts=Array.isArray(db.courts)?db.courts:[];db.awards=db.awards&&typeof db.awards==='object'?db.awards:{};baseUpdate();const headline=document.querySelector('#leaderName');if(headline)headline.textContent='En suspenso 🤫';const caption=headline?.parentElement?.querySelector('span');if(caption)caption.textContent='el orden se revela en la gala';renderHighlights();renderAwardPanel()};
document.querySelector('#newMatchBtn').onclick=newMatch;
document.querySelector('#courtManagerBtn').onclick=manageCourts;
document.body.addEventListener('click',e=>{if(e.target.closest('#revealAwardBtn'))revealAward();const remove=e.target.closest('[data-remove-court]');if(remove){const id=remove.dataset.removeCourt;db.courts=db.courts.filter(c=>c.id!==id);save();manageCourts();toast('Cancha quitada de la lista')}});
update();
