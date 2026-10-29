// Edición y eliminación de partidos ya guardados.
const editStyle=document.createElement('style');
editStyle.textContent=`.match-actions{display:flex;align-items:center;gap:5px;flex:none}.match-actions .iconbtn{width:31px;height:31px;background:#eff4e9;color:var(--green)}.match-actions .iconbtn.delete{background:#fff1ec;color:#a64a34}.match .match-info{flex:1;min-width:0}`;
document.head.appendChild(editStyle);

function statsForEdit(match,playerId){return (match?.stats||[]).find(s=>s.playerId===playerId)||{goals:0,bestGoal:false,mvp:false,second:false}}
function playersForEdit(match){
  if(!match)return db.players.filter(p=>p.active!==false);
  return (match.stats||[]).map(s=>db.players.find(p=>p.id===s.playerId)||{id:s.playerId,name:'Jugador',active:false});
}
function courtOptionsForEdit(match){
  const selected=match?.courtId||'',available=db.courts.map(c=>`<option value="${esc(c.id)}" ${c.id===selected?'selected':''}>${esc(c.name)}</option>`).join('');
  const historic=match?.courtName&&!db.courts.some(c=>c.id===selected)?`<option value="__historic" selected>${esc(match.courtName)} (cancha del historial)</option>`:'';
  return `<option value="">Sin cancha seleccionada</option>${historic}${available}`;
}
function openMatchForm(match=null){
  const roster=playersForEdit(match);if(!roster.length&&!match)return addPlayerFirst();
  if(!roster.length)return toast('Este partido no tiene jugadores para editar');
  const label=match?'Editar partido':'Anotar partido',date=match?.date||localToday(),time=match?.time|| (match?'':localTime()),stats=match?.stats||[];
  const courtField=`<div class="field"><label>Cancha</label><select id="matchCourt">${courtOptionsForEdit(match)}</select>${db.courts.length?'':'<small class="hint">Puedes guardar canchas en Ajustes → Administrar canchas.</small>'}</div>`;
  modal(label,`<div class="row"><div class="field" style="flex:1"><label>Fecha</label><input type="date" id="matchDate" value="${esc(date)}"/></div><div class="field" style="width:112px"><label>Hora</label><input type="time" id="matchTime" value="${esc(time)}"/></div></div>${courtField}<div class="field"><label>Nombre del partido <span class="hint">(opcional)</span></label><input id="matchLabel" placeholder="Ej. El clásico del jueves" maxlength="50" value="${esc(match?.label||'')}"/></div><p class="hint">Corrige los goles y premios. Cada premio es opcional.</p><div class="scoreline hint" style="grid-template-columns:1fr 68px"><span>Jugador</span><span style="text-align:center">⚽ goles</span></div><div id="scoreRows">${roster.map(p=>{const s=statsForEdit(match,p.id);return `<div class="scoreline" style="grid-template-columns:1fr 68px"><label>${esc(p.name)}</label><input type="number" min="0" max="30" value="${Number(s.goals)||0}" data-goals="${esc(p.id)}" aria-label="Goles de ${esc(p.name)}"/></div>`}).join('')}</div><div class="field"><label>Mejor gol del partido ✨ <span class="hint">(+2 puntos)</span></label><select id="bestGoal"><option value="">Sin elegir</option>${roster.map(p=>`<option value="${esc(p.id)}" ${statsForEdit(match,p.id).bestGoal?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div><div class="field"><label>Mejor jugador ⭐ <span class="hint">(+3 puntos)</span></label><select id="mvp"><option value="">Sin elegir</option>${roster.map(p=>`<option value="${esc(p.id)}" ${statsForEdit(match,p.id).mvp?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div><div class="field"><label>Segundo mejor jugador 🥈 <span class="hint">(+2 puntos)</span></label><select id="second"><option value="">Sin elegir</option>${roster.map(p=>`<option value="${esc(p.id)}" ${statsForEdit(match,p.id).second?'selected':''}>${esc(p.name)}</option>`).join('')}</select></div><button class="btn full" id="saveMatch">${match?'Guardar cambios':'Guardar partido'}</button>`);
  document.querySelector('#saveMatch').onclick=()=>{
    const date=document.querySelector('#matchDate').value,time=document.querySelector('#matchTime').value;
    if(!date||(!time&&!match))return toast('Completa la fecha y la hora');
    const mvp=document.querySelector('#mvp').value,second=document.querySelector('#second').value;
    if(mvp&&second&&mvp===second)return toast('Elige jugadores distintos para esos dos premios');
    const bestGoal=document.querySelector('#bestGoal').value;
    if(bestGoal&&Number(document.querySelector(`[data-goals="${bestGoal}"]`)?.value||0)<1)return toast('Para elegir el mejor gol, anota al menos un gol para esa persona');
    const selectedCourt=document.querySelector('#matchCourt').value,court=db.courts.find(c=>c.id===selectedCourt);
    const stats=roster.map(p=>({playerId:p.id,goals:Math.max(0,Number(document.querySelector(`[data-goals="${p.id}"]`).value)||0),bestGoal:bestGoal===p.id,mvp:mvp===p.id,second:second===p.id}));
    const beforeSeason=match?.season;
    const values={date,time,courtId:selectedCourt==='__historic'?(match.courtId||''):court?.id||'',courtName:selectedCourt==='__historic'?match.courtName:court?.name||'',label:document.querySelector('#matchLabel').value.trim(),season:Number(date.slice(0,4)),stats};
    if(match)Object.assign(match,values);else db.matches.push({id:crypto.randomUUID(),...values});
    if(values.season>db.season)db.season=values.season;
    if(match&&beforeSeason!==values.season)refreshAwardResult(beforeSeason);
    refreshAwardResult(values.season);
    selectedSeason=values.season;save();close();update();toast(match?'Cambios guardados':'Partido guardado');
  };
}
function refreshAwardResult(season){
  const state=db.awards?.[String(season)];if(!state?.results?.length)return;
  const results=totals(Number(season)).filter(x=>x.matches>0).slice(0,3).map(x=>({id:x.player.id,name:x.player.name,points:x.points,goals:x.goals,bestGoals:x.bestGoals,mvp:x.mvp,second:x.second}));
  if(results.length)state.results=results;
}
function editMatch(id){const match=db.matches.find(m=>m.id===id);if(match)openMatchForm(match)}
function removeMatch(id){
  const match=db.matches.find(m=>m.id===id);if(!match)return;
  const awardsRevealed=Boolean(db.awards?.[String(match.season)]?.results?.length);
  const note=awardsRevealed?' La temporada ya fue revelada; al eliminar este partido se actualizarán los puntos guardados del podio.':'';
  if(!confirm(`¿Eliminar el partido del ${match.date}${match.label?` (“${match.label}”)`:''}? Esta acción no se puede deshacer.${note}`))return;
  db.matches=db.matches.filter(m=>m.id!==id);refreshAwardResult(match.season);save();update();toast('Partido eliminado');
}
newMatch=function(){openMatchForm(null)};
document.querySelector('#newMatchBtn').onclick=newMatch;
renderMatches=function(sel,ms){
  const el=document.querySelector(sel);if(!el)return;
  if(!ms.length){el.innerHTML='<div class="empty"><div class="ball">⚽</div>El primer partido todavía está por jugarse.<br>Cuando termine, anótalo acá.</div>';return}
  el.innerHTML=ms.map(m=>{const date=new Date(m.date+'T12:00:00'),day=date.getDate(),month=date.toLocaleDateString('es-AR',{month:'short'}).replace('.',''),goals=(m.stats||[]).reduce((n,s)=>n+(Number(s.goals)||0),0),awards=(m.stats||[]).filter(s=>s.mvp||s.second).map(s=>`${s.mvp?'⭐':'🥈'} ${esc(db.players.find(p=>p.id===s.playerId)?.name||'')}`).join(' · '),points=(m.stats||[]).reduce((n,s)=>n+(Number(s.goals)||0)+(s.bestGoal?2:0)+(s.mvp?3:0)+(s.second?2:0),0),meta=[m.time,m.courtName].filter(Boolean).map(esc).join(' · ');return `<div class="match"><div class="datebox"><b>${day}</b><small>${month}</small></div><div class="match-info"><b>${esc(m.label||'Partido de fútbol')}</b><small>${goals} goles${awards?' · '+awards:''}</small>${meta?`<small class="match-meta">${meta}</small>`:''}</div><div class="match-actions"><span class="pill">${points} pts</span><button class="iconbtn" data-edit-match="${esc(m.id)}" title="Editar partido" aria-label="Editar partido">✎</button><button class="iconbtn delete" data-delete-match="${esc(m.id)}" title="Eliminar partido" aria-label="Eliminar partido">×</button></div></div>`}).join('');
};
document.body.addEventListener('click',e=>{const edit=e.target.closest('[data-edit-match]');if(edit){editMatch(edit.dataset.editMatch);return}const del=e.target.closest('[data-delete-match]');if(del)removeMatch(del.dataset.deleteMatch)});
update();
