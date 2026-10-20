(() => {
 'use strict';
 const el=(tag,attrs={},text)=>{const node=document.createElement(tag);for(const [key,value] of Object.entries(attrs)){if(key==='class')node.className=value;else node.setAttribute(key,value)}if(text!==undefined)node.textContent=text;return node};
 function parseNumber(raw){
  let text=String(raw).trim().replace(/−/g,'-');
  if(!text)return null;
  let percent=false;if(text.endsWith('%')){percent=true;text=text.slice(0,-1).trim()}
  const parts=text.split('/');if(parts.length>2)return null;
  const number=part=>{let s=part.trim();if(/^[+-]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s))s=s.replace(/,/g,'');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;const v=Number(s);return Number.isFinite(v)?v:null};
  const a=number(parts[0]),b=parts.length===2?number(parts[1]):1;if(a===null||b===null||b===0)return null;
  const value=a/b/(percent?100:1);return Number.isFinite(value)?value:null;
 }
 function grade(q,value){
  if(q.type==='number'){const v=parseNumber(value);return v!==null&&Math.abs(v-q.answer)<=(q.tolerance||1e-9)}
  if(q.type==='choice')return value===q.answer;
  return Array.isArray(value)&&value.length===q.answer.length&&q.answer.every(x=>value.includes(x));
 }
 function answerLabel(q){if(q.type==='number')return q.answerText;return (q.type==='multi'?q.answer:[q.answer]).map(i=>q.options[i]).join('; ')}
 function render(host,q,state,changed,{prefix='check'}={}){
  host.replaceChildren();host.dataset.question=q.id;
  const locked=state.status==='correct'||state.status==='revealed';
  const form=el('form',{class:'exercise-form',novalidate:''});
  const heading=el('h4',{id:`${prefix}-${q.id}-prompt`},q.prompt);form.append(heading);
  const mode=q.type==='multi'?'Select all that apply':q.type==='number'?'Enter a number':'Choose one answer';
  form.append(el('p',{class:'exercise-type'},mode));
  const controls=[];let input;
  if(q.type==='number'){
   const id=`${prefix}-${q.id}-input`,helpId=id+'-help';
   const label=el('label',{for:id,class:'answer-label'},'Your answer');
   input=el('input',{id,type:'text',class:'numeric-answer',autocomplete:'off',spellcheck:'false','aria-describedby':helpId,'aria-labelledby':heading.id+' '+id+'-label'});
   label.id=id+'-label';input.value=state.input??'';input.disabled=locked;controls.push(input);
   form.append(label,input,el('p',{id:helpId,class:'mini'},q.tolerance?'Use a decimal with a dot, a fraction (1/3), or a percentage (25%). Round decimals to at least 4 places.':'Enter the final value. Fractions and comma-separated thousands are accepted.'));
  }else{
   const fieldset=el('fieldset',{class:'exercise-options','aria-labelledby':heading.id});
   q.options.forEach((text,i)=>{const id=`${prefix}-${q.id}-option-${i}`;const label=el('label',{class:'answer-option',for:id});const control=el('input',{id,type:q.type==='multi'?'checkbox':'radio',name:`${prefix}-${q.id}`,value:String(i)});control.checked=q.type==='multi'?(state.input||[]).includes(i):state.input===i;control.disabled=locked;controls.push(control);label.append(control,el('span',{},text));fieldset.append(label)});
   form.append(fieldset);
  }
  const actions=el('div',{class:'exercise-actions no-print'});
  const check=el('button',{type:'submit',class:'primary-button'},'Check answer');check.disabled=locked;
  const hint=el('button',{type:'button','aria-expanded':String(!!state.hintOpen)},'Hint');
  const reveal=el('button',{type:'button'},'Show solution');reveal.disabled=locked;
  actions.append(check,hint,reveal);form.append(actions);
  const hintBox=el('div',{class:'exercise-hint'},q.hint);hintBox.hidden=!state.hintOpen;form.append(hintBox);
  const feedback=el('div',{class:'exercise-feedback','aria-live':'polite','aria-atomic':'true'});
  function feedbackText(){
   feedback.replaceChildren();feedback.className='exercise-feedback';
   if(state.status==='correct'){feedback.classList.add('correct');feedback.append(el('strong',{},state.everRevealed?'Correct after reviewing the solution.':state.attempts>1?`Correct — solved after ${state.attempts} checks.`:'Correct.'),el('p',{},q.explanation))}
   else if(state.status==='revealed'){feedback.classList.add('revealed');feedback.append(el('strong',{},'Solution viewed — not counted as solved.'),el('p',{},'Answer: '+answerLabel(q)),el('p',{},q.explanation))}
   else if(state.error){feedback.classList.add('incorrect');feedback.append(el('p',{},state.error))}
   else if(state.attempts){feedback.classList.add('incorrect');feedback.append(el('strong',{},'Not quite. Try again.'),el('p',{},q.hint))}
  }
  feedbackText();form.append(feedback);
  if(locked){const retry=el('button',{type:'button',class:'no-print'},'Try again without the answer');retry.onclick=()=>{state.status='';state.input=q.type==='multi'?[]:'';state.error='';state.hintOpen=false;changed();render(host,q,state,changed,{prefix})};form.append(retry)}
  function value(){return q.type==='number'?input.value:q.type==='choice'?(controls.find(x=>x.checked)?Number(controls.find(x=>x.checked).value):undefined):controls.filter(x=>x.checked).map(x=>Number(x.value))}
  controls.forEach(control=>control.addEventListener('input',()=>{state.input=value();state.error='';changed()}));
  form.onsubmit=event=>{
   event.preventDefault();if(locked)return;
   state.input=value();
   const invalid=q.type==='number'?parseNumber(state.input)===null:q.type==='choice'?state.input===undefined:!state.input.length;
   if(invalid){state.error=q.type==='number'?'Enter a valid number, decimal, fraction, or percentage. Use a nonzero denominator.':'Select an answer before checking.';feedbackText();return}
   state.error='';state.attempts=(state.attempts||0)+1;const correct=grade(q,state.input);
   if(state.firstCorrect===undefined)state.firstCorrect=correct&&!state.everRevealed;
   if(correct)state.status='correct';changed();render(host,q,state,changed,{prefix});
  };
  hint.onclick=()=>{state.hintOpen=!state.hintOpen;state.hintUsed=true;hintBox.hidden=!state.hintOpen;hint.setAttribute('aria-expanded',String(state.hintOpen));changed()};
  reveal.onclick=()=>{state.input=value();state.status='revealed';state.everRevealed=true;state.firstCorrect??=false;state.error='';changed();render(host,q,state,changed,{prefix})};
  host.append(form);
 }
 window.StudyExercises={parseNumber,grade,answerLabel,render};
 const key='math-checks-v1-'+document.body.dataset.page;
 let saved={};try{saved=JSON.parse(localStorage.getItem(key))||{}}catch{}
 if(typeof saved!=='object'||Array.isArray(saved))saved={};
 const blocks=[...document.querySelectorAll('[data-checkpoint]')];
 const groups=(window.CHECK_GROUPS||[]).filter(g=>blocks.some(b=>b.dataset.checkpoint===g.id));
 const questions=groups.flatMap(g=>g.items);
 const persist=()=>{try{localStorage.setItem(key,JSON.stringify(saved))}catch{}};
 function totals(){const solved=questions.filter(q=>saved[q.id]?.status==='correct'&&!saved[q.id]?.everRevealed).length;const viewed=questions.filter(q=>saved[q.id]?.everRevealed).length;const status=document.getElementById('practiceProgress');if(status)status.textContent=`${solved} of ${questions.length} solved · ${viewed} solutions viewed`;persist()}
 blocks.forEach(block=>{
  const group=groups.find(g=>g.id===block.dataset.checkpoint);if(!group)return;
  let position=0;
  const label=block.querySelector('.checkpoint-status');
  const stage=el('div',{class:'exercise-stage'});
  const navigation=el('div',{class:'checkpoint-nav no-print'});
  const previous=el('button',{type:'button'},'← Previous'),next=el('button',{type:'button'},'Next question →');
  const count=el('span',{class:'mini'});navigation.append(previous,count,next);block.append(stage,navigation);
  function update(){const solved=group.items.filter(q=>saved[q.id]?.status==='correct'&&!saved[q.id]?.everRevealed).length;const viewed=group.items.filter(q=>saved[q.id]?.everRevealed).length;label.textContent=`${solved}/${group.items.length} solved${viewed?' · '+viewed+' viewed':''}`;totals()}
  function show(){const q=group.items[position];saved[q.id]??={};render(stage,q,saved[q.id],update,{prefix:'inline'});count.textContent=`${position+1} of ${group.items.length}`;previous.disabled=position===0;next.disabled=position===group.items.length-1;update()}
  previous.onclick=()=>{if(position>0){position--;show()}};next.onclick=()=>{if(position<group.items.length-1){position++;show()}};show();
 });
 document.getElementById('resetChecks')?.addEventListener('click',()=>{saved={};persist();location.reload()});
 totals();
})();
