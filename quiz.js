(() => {
 'use strict';
 const filter=document.getElementById('quizFilter');if(!filter)return;
 const $=id=>document.getElementById(id),engine=window.StudyExercises;
 const bank=[...(window.REVIEW_QUESTIONS||[]),...(window.CHECK_QUESTIONS||[])];
 let deck=[],states={},position=0,reviewOpen=false;
 const lecture2=['probability','conditional','poker'];
 const matching=()=>bank.filter(q=>filter.value==='all'||q.topic===filter.value||(filter.value==='lecture2'&&lecture2.includes(q.topic))||(filter.value==='lecture1'&&!lecture2.includes(q.topic)));
 function shuffle(items){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
 function start(items){const selected=items||matching(),size=$('quizSize').value;deck=shuffle(selected).slice(0,size==='all'?selected.length:Number(size));states={};position=0;reviewOpen=false;show();}
 function review(){
  const box=$('quizResults');box.replaceChildren();box.hidden=!reviewOpen;
  if(!reviewOpen)return;
  const title=document.createElement('h3');title.textContent='Your review';box.append(title);
  deck.forEach((q,i)=>{const state=states[q.id]||{},row=document.createElement('div');row.className='quiz-result';const status=state.firstCorrect===undefined?'Not answered':state.everRevealed?'Solution viewed':state.firstCorrect?'Correct on first check':state.status==='correct'?'Solved after retry':'Needs another try';const button=document.createElement('button');button.type='button';button.textContent=`${i+1}. ${q.prompt}`;button.onclick=()=>{position=i;show();$('quizExercise').scrollIntoView({block:'center',behavior:'smooth'})};const text=document.createElement('span');text.className='mini';text.textContent=status;const link=document.createElement('a');link.href=q.review;link.textContent='Review the concept';row.append(button,text,link);box.append(row)});
 }
 function update(){
  const answered=deck.filter(q=>states[q.id]?.firstCorrect!==undefined).length;
  const correct=deck.filter(q=>states[q.id]?.firstCorrect===true).length;
  const missed=deck.filter(q=>states[q.id]?.firstCorrect===false).length;
  $('quizStatus').textContent=`Question ${position+1} of ${deck.length} · ${answered} checked · ${correct} correct on first check`;
  $('quizBankCount').textContent=`${matching().length} available for this filter · ${bank.length} in the full bank`;
  $('retryMissed').disabled=!missed;
  if(answered===deck.length)reviewOpen=true;
  $('quizSummary').hidden=answered!==deck.length;
  $('quizSummary').textContent=`Set complete: ${correct}/${deck.length} correct on first check (${Math.round(100*correct/deck.length)}%). ${missed?'Retry the missed questions or use the review links below.':'Choose another topic or start a fresh set.'}`;
  review();
 }
 function show(){const q=deck[position];states[q.id]??={};engine.render($('quizExercise'),q,states[q.id],update,{prefix:'quiz'});$('prevQuestion').disabled=position===0;$('nextQuestion').disabled=position===deck.length-1;const link=$('quizReviewLink');link.href=q.review;link.textContent='Review this concept';update()}
 $('restartQuiz').onclick=()=>start();filter.onchange=()=>start();$('quizSize').onchange=()=>start();
 $('prevQuestion').onclick=()=>{if(position>0){position--;show()}};$('nextQuestion').onclick=()=>{if(position<deck.length-1){position++;show()}};
 $('retryMissed').onclick=()=>start(deck.filter(q=>states[q.id]?.firstCorrect===false));
 $('showQuizReview').onclick=()=>{reviewOpen=!reviewOpen;review()};
 start();
})();
