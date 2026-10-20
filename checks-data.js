// Original practice problems, separate from the supplied exercise sheets.
(() => {
 const c=(prompt,options,answer,hint,explanation)=>({type:'choice',prompt,options,answer,hint,explanation});
 const n=(prompt,answer,answerText,hint,explanation,tolerance=0)=>({type:'number',prompt,answer,answerText,hint,explanation,tolerance});
 const m=(prompt,options,answer,hint,explanation)=>({type:'multi',prompt,options,answer,hint,explanation});
 const groups=[];
 const add=(id,page,topic,title,items)=>groups.push({id,page,topic,title,items:items.map((q,i)=>({...q,id:`${id}-${i+1}`,topic,review:`${page}.html#check-${id}`}))});
 add('model-choice','models','models','Deterministic or random?',[
  c('A model uses exactly 12 V and exactly 4 Ω to calculate a current. What kind of model is it?',['Deterministic','Random','Neither'],0,'Ask whether fixed inputs produce one modeled answer.','The model gives I = 12/4 = 3 A every time. Measurement variation could be added in a separate random model.'),
  c('A sensor model adds a randomly varying noise value to its ideal output. What does it predict?',['One guaranteed reading','A range of possible readings with probabilities','No useful information'],1,'Random does not mean patternless.','The reading is uncertain, but the model can describe its distribution and the likelihood of different readings.'),
  m('Which statements about models are valid? Select all that apply.',['A deterministic model can approximate a real noisy system.','A random model must give every outcome the same probability.','The same device can have deterministic and random models.','A random model can describe long-run patterns.'],[0,2,3],'Think about ideal circuit behavior, noise, and unequal probabilities.','Models are chosen for a purpose. Ideal circuit behavior can be deterministic while noise is random; random outcomes need not be equally likely.')
 ]);
 add('frequency','models','models','Observed frequency vs probability',[
  n('A test detects 18 faulty components in 120 trials. What is the observed relative frequency of a fault?',.15,'0.15 (15%)','Divide the number of faults by the total number of trials.','The relative frequency is 18/120 = 0.15. This estimates a probability; it does not prove the true fault rate is exactly 0.15.',.0001),
  c('An independent fair coin has just given four tails. What is the probability of heads next?',['1/2','Greater than 1/2 because heads is due','Less than 1/2 because tails is more likely now'],0,'Independent tosses do not compensate for earlier outcomes.','The next probability remains 1/2. A short streak does not change the fair-coin model.'),
  m('What can a long sequence of independent, identically distributed trials tell you? Select all valid statements.',['Relative frequencies tend to stabilize near their probabilities.','Every additional trial must improve the estimate.','Finite samples can still differ from the model probability.','A 10% event must occur exactly once in every ten trials.'],[0,2],'Long-run convergence allows short-run fluctuations.','The law of large numbers describes convergence. It does not guarantee exact batch proportions or steady improvement after every observation.')
 ]);
 add('event-language','models','spaces','Outcome, sample space, event',[
  c('For one die roll, which expression is the event “less than 3”?',['2','{1, 2}','{1, 2, 3, 4, 5, 6}'],1,'An event is a set of outcomes satisfying the description.','Both 1 and 2 satisfy “less than 3”, so the event is {1, 2}.'),
  m('Two lamps are tested in order. Select every outcome where exactly one lamp works (W = works, F = fails).',['WW','WF','FW','FF'],[1,2],'Exactly one means one W and one F.','WF and FW each contain one working lamp. They are different outcomes because the lamp positions are different.'),
  n('How many outcomes are in the impossible event?',0,'0','The impossible event is the empty set.','The empty set contains no outcomes. Its size and its probability are both zero, though size and probability are different concepts.')
 ]);
 add('recording','models','spaces','What are you recording?',[
  n('Four switches can each be ON or OFF. If you record the ordered switch states, how many outcomes are possible?',16,'16','There are two choices at each of four positions.','2 × 2 × 2 × 2 = 16 ordered state strings.'),
  n('For those four switches, how many different outcomes are possible if you record only the number of ON switches?',5,'5','List the possible counts, including zero.','The count can be 0, 1, 2, 3, or 4, so the reduced sample space has five outcomes.'),
  c('Suppose all sixteen switch-state strings are equally likely. Are the five ON-counts equally likely?',['Yes, because each is a possible count','No: different counts correspond to different numbers of strings','Only if the switches are named'],1,'Compare the number of strings with zero ON switches and with one ON switch.','There is one all-OFF string, but four strings with exactly one ON switch. Collapsing outcomes does not preserve equal probabilities.')
 ]);
 add('space-types','models','spaces','Discrete, continuous, and equally likely',[
  n('A meter reports 0, 0.5, 1.0, …, 5.0 V. How many distinct readings can it report?',11,'11','Count the increments, then include the starting endpoint.','There are 5/0.5 = 10 increments and 11 readings including both 0 and 5.'),
  c('An ideal meter can report any real voltage between 0 and 5. Its sample space is…',['Finite','Countably infinite','Continuous'],2,'“Any real value” includes all values in an interval.','The space [0, 5] is continuous and uncountable, unlike a meter restricted to fixed decimal steps.'),
  m('When is favorable outcomes / total outcomes a valid probability calculation? Select all valid cases.',['Selecting one component uniformly from 20 distinct components','A loaded die with unequal face probabilities, using face counts alone','Choosing one binary string uniformly from all length-3 strings','Counting points inside a disk and a square'],[0,2],'The sample space must be finite and equally likely.','Uniform selection from a finite set supports the count ratio. Unequal face probabilities need weights; continuous geometric regions need areas rather than point counts.')
 ]);
 add('set-operations','events','operations','Build the event',[
  m('Let A = {1, 3, 5} and B = {3, 4, 5}. Select every element of A ∪ B.',['1','2','3','4','5','6'],[0,2,3,4],'Union means in A, in B, or in both.','A ∪ B = {1, 3, 4, 5}. Shared elements appear only once in a set.'),
  m('With A = {1, 3, 5} and B = {3, 4, 5}, select every element of A ∩ B.',['1','2','3','4','5','6'],[2,4],'Intersection keeps only elements common to both sets.','A ∩ B = {3, 5}. The element 1 is only in A, and 4 only in B.'),
  m('In Ω = {1, 2, 3, 4, 5, 6}, let A = {1, 3, 5}. Select every element of Aᶜ.',['1','2','3','4','5','6'],[1,3,5],'Stay inside Ω, and remove everything in A.','Aᶜ = {2, 4, 6}. A complement is relative to the chosen sample space.')
 ]);
 add('disjoint','events','operations','Disjoint is not the same as independent',[
  c('For a single die roll, which pair of events is mutually exclusive?',['Even and greater than 2','Less than 3 and greater than 4','Odd and less than 4'],1,'Look for two sets with no common outcomes.','{1, 2} and {5, 6} are disjoint. The other pairs overlap.'),
  c('Events A and B are disjoint and both have positive probability. Are they independent?',['Yes','No','Always, if their union is Ω'],1,'Compare P(A ∩ B) with P(A)P(B).','Disjoint events have zero intersection probability, but the product of two positive probabilities is positive. They cannot be independent.'),
  m('Which claims are true?',['Complementary events are disjoint.','Every pair of disjoint events covers Ω.','Disjoint events have an empty intersection.','Two disjoint events must have equal probabilities.'],[0,2],'Disjoint describes overlap, not coverage or equal likelihood.','A and Aᶜ are disjoint, and all disjoint events have empty intersection. They may leave some outcomes uncovered and have different probabilities.')
 ]);
 add('union-probability','events','operations','Subtract the overlap',[
  n('P(A) = 0.45, P(B) = 0.35, and P(A ∩ B) = 0.15. Find P(A ∪ B).',.65,'0.65','Add the two event probabilities, then subtract the overlap once.','0.45 + 0.35 − 0.15 = 0.65. The overlap had been included in both individual probabilities.',.0001),
  n('A and B are disjoint, with probabilities 0.2 and 0.3. What is the probability of neither event?',.5,'0.5','First find the union, then take its complement.','The union is 0.2 + 0.3 = 0.5. Neither has probability 1 − 0.5 = 0.5.',.0001),
  c('Why is P(A) + P(B) sometimes too large for P(A ∪ B)?',['The overlap has been counted twice','The probabilities must always be multiplied','Union excludes outcomes common to A and B'],0,'An outcome in both events contributes to both terms.','The overlap is counted twice in the sum but should appear once in the union. Subtract P(A ∩ B).')
 ]);
 add('venn-regions','events','venn','Read the four Venn regions',[
  m('A two-event Venn diagram has four regions. Which belong to A ∪ B?',['A only','B only','Both A and B','Outside both'],[0,1,2],'Include every outcome in at least one circle.','The union includes A only, B only, and the overlap. Only the outside region is excluded.'),
  m('Which regions belong to Aᶜ?',['A only','B only','Both A and B','Outside both'],[1,3],'Remove all of circle A, including the overlap.','The complement of A contains B only and the region outside both circles.'),
  c('In an ordinary Venn sketch, a larger circle necessarily means a more likely event.',['True','False'],1,'Was the diagram specifically drawn with area proportional to probability?','Ordinary Venn diagrams show set membership. Their areas have no probability meaning unless explicitly scaled that way.')
 ]);
 add('demorgan','events','venn','Negate the statement',[
  c('What is the negation of “at least one of A and B occurs”?',['Exactly one occurs','Neither occurs','Both occur'],1,'For “at least one” to be false, how many can occur?','Zero can occur. Thus (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ.'),
  m('Which regions satisfy “not both A and B”?',['A only','B only','Both A and B','Outside both'],[0,1,3],'Only the overlap makes “both” true.','Exclude the overlap and keep all three remaining regions. Not both includes the case where neither occurs.'),
  c('A series system works only if both components work. What describes its failure?',['Both components must fail','At least one component fails','Exactly one component works'],1,'Negate “component 1 works AND component 2 works”.','De Morgan gives “component 1 fails OR component 2 fails”, including the possibility that both fail.')
 ]);
 add('set-laws','events','venn','Use the set rules',[
  c('If A ⊆ B, what is A ∪ B?',['A','B','The empty set'],1,'B already contains every element of A.','Adding A to B contributes no new outcomes, so the union is B.'),
  c('Which expression equals A ∩ (B ∪ C)?',['(A ∩ B) ∪ (A ∩ C)','(A ∪ B) ∩ C','A ∩ B ∩ C'],0,'Distribute intersection over union.','An outcome must be in A and in at least one of B or C. That is (A ∩ B) ∪ (A ∩ C).'),
  m('Which identities always hold?',['(Aᶜ)ᶜ = A','A ∩ Aᶜ = Ω','A ∪ Aᶜ = Ω','A ∪ A = A'],[0,2,3],'An event and its complement never overlap.','Double complement returns A; an event and its complement cover Ω; adding an event to itself changes nothing. A ∩ Aᶜ is empty.')
 ]);
 add('counting-rules','counting','counting','Add alternatives, multiply stages',[
  n('A device comes in 3 colors and 4 sizes. Every color has every size. How many color–size choices are there?',12,'12','Choose a color, then a size.','3 × 4 = 12 combinations of these two design choices.'),
  n('Choose exactly one connector: either one of 5 distinct USB connectors or one of 3 distinct coaxial connectors. How many choices?',8,'8','The two types are disjoint alternatives, and you choose only one connector.','5 + 3 = 8. Multiplication would describe choosing one of each type, which is a different task.'),
  c('Does the multiplication rule for counting require probabilistic independence?',['Yes','No'],1,'Counting choices and assigning probabilities are different operations.','The counting rule multiplies the number of available choices at successive stages. It does not assume anything about probabilities.')
 ]);
 add('factorial','counting','counting','Arrange all the objects',[
  n('Five distinct circuit modules are arranged in a line. How many orders are possible?',120,'120','Five choices for the first position, then four, and so on.','5! = 5 × 4 × 3 × 2 × 1 = 120.'),
  n('Simplify 7! / 5!.',42,'42','Cancel the shared factor 5!.','7!/5! = (7 × 6 × 5!)/5! = 42.'),
  c('Why does 0! equal 1 in counting?',['There is one empty arrangement','There are no arrangements at all','It is approximately 1'],0,'How many ways are there to choose and arrange nothing?','There is one empty arrangement. The convention 0! = 1 keeps the counting formulas consistent.')
 ]);
 add('count-model','counting','counting','Choose a counting model',[
  c('Choose 4 students from 9 for a team with no assigned roles. Which count fits?',['9⁴','P(9, 4)','C(9, 4)'],2,'Does swapping two selected students create a different team?','Order does not matter and students cannot be repeated, so use C(9, 4).'),
  c('Make a three-symbol code from five symbols, with repeats allowed. Which count fits?',['5³','P(5, 3)','C(5, 3)'],0,'Each of three positions has the same five choices.','There are 5³ = 125 ordered codes. Repetition is allowed, so the choices do not decrease.'),
  c('From 9 people choose a chair, a secretary, and a treasurer, all different people. Which count fits?',['9³','P(9, 3)','C(9, 3)'],1,'The roles are distinct and one person cannot fill two of them.','Role assignments are ordered selections without repetition: 9 × 8 × 7 = P(9, 3).')
 ]);
 add('ordered-selection','counting','counting','Fill positions without repetition',[
  n('Visit 3 different stations from 7, recording their visit order. How many routes?',210,'210','The choices decrease after each station is visited.','7 × 6 × 5 = 210 routes.'),
  n('Assign 4 distinct modules to 4 of 6 labeled slots, at most one per slot. How many assignments?',360,'360','Choose a slot for each distinct module, in a fixed module order.','6 × 5 × 4 × 3 = 360. The module identities distinguish the assignments.'),
  c('Why is C(7, 3) too small for ordered three-station routes?',['It ignores the 3! orders of each chosen group','It allows repeated stations','It chooses too many stations'],0,'The same three stations can be visited in several orders.','Each three-station subset has 3! = 6 orders. P(7, 3) = C(7, 3) × 3!.')
 ]);
 add('identical-objects','counting','counting','Avoid counting swaps of identical objects',[
  n('How many distinct strings can be made by rearranging AAB?',3,'3','Begin with 3!, then divide by the swaps of the two identical A’s.','3!/2! = 3: AAB, ABA, BAA.'),
  n('How many distinct strings can be made by rearranging AABBCC?',90,'90','There are three groups of two identical letters.','6!/(2! × 2! × 2!) = 720/8 = 90.'),
  c('Which problem uses 6!/(3!2!1!)?',['Arrange a fixed collection of 3 red, 2 blue, and 1 green identical-within-color tokens','Choose a six-symbol code freely from three colors','Choose any six distinct objects from a large collection'],0,'The multiplicities must be fixed before the arrangement.','The formula arranges six tokens with fixed color counts. Free repetition permits the counts to vary and needs a different model.')
 ]);
 add('choose-k','counting','newton','Count an unordered selection',[
  n('Select 2 distinct test points from 7, with no order. How many selections?',21,'21','Divide the ordered count 7 × 6 by 2!.','C(7, 2) = 7 × 6 / 2 = 21.'),
  n('Choose 3 distinct components from 8 for a test batch. How many batches?',56,'56','Choose without assigning positions or roles.','C(8, 3) = (8 × 7 × 6)/(3 × 2 × 1) = 56.'),
  c('Why is P(n, k) divided by k! to obtain C(n, k)?',['Each chosen set appears in k! orders','To make repeated objects possible','Because there are k! objects available'],0,'Count how often the same selected group appears in the ordered list.','All k! rearrangements represent the same unordered selection, so division removes the repeated counting.')
 ]);
 add('binomial-identities','counting','newton','Use the identities',[
  n('What is C(9, 0)?',1,'1','There is one way to select nothing.','The empty subset is a valid, unique selection, so C(9, 0) = 1.'),
  n('Use symmetry to find C(10, 8).',45,'45','Choosing 8 included objects is equivalent to choosing 2 excluded ones.','C(10, 8) = C(10, 2) = 45.'),
  n('Pascal’s identity gives C(7, 3) = C(6, 2) + C(6, 3). What is the result?',35,'35','The two cases are 15 and 20.','15 + 20 = 35. The cases split selections according to whether a specified object is included.')
 ]);
 add('binomial-expansion','counting','newton','Coefficients count choices',[
  n('What is the coefficient of a³b² in (a + b)⁵?',10,'10','Choose which two of five factors contribute b.','C(5, 2) = 10. The other three factors contribute a.'),
  n('How many subsets does a six-element set have, including the empty set?',64,'64','Each element is independently included or excluded as a counting choice.','2⁶ = 64 subsets. Equivalently, sum C(6, k) from k = 0 through 6.'),
  c('Which term in (a + b)⁵ corresponds to choosing b from four factors?',['5ab⁴','4a⁴b','5a⁴b'],0,'Four factors give b; the remaining one gives a.','The term is C(5, 4)ab⁴ = 5ab⁴.')
 ]);
 add('axioms','probability','probability','Check a proposed probability model',[
  c('Which weights form a valid model for three exhaustive outcomes?',['0.2, 0.3, 0.5','0.2, 0.3, 0.6','−0.1, 0.4, 0.7'],0,'Every weight must be nonnegative and their sum must be 1.','Only 0.2, 0.3, 0.5 meets both requirements. The second sums to 1.1; the third includes a negative weight.'),
  n('Three mutually exclusive events cover Ω. Their probabilities are 0.12, 0.53, and p. Find p.',.35,'0.35','Their probabilities must sum to 1.','p = 1 − 0.12 − 0.53 = 0.35.',.0001),
  m('Which conclusions always follow from the axioms?',['P(Ω) = 1','P(∅) = 0','Every nonempty event has positive probability','A ⊆ B implies P(A) ≤ P(B)'],[0,1,3],'Containment cannot increase the smaller event’s probability. Consider continuous models for zero-probability events.','Normalization, the empty-event rule, and monotonicity hold. In continuous models, a nonempty singleton can have probability zero.')
 ]);
 add('weighted-events','probability','probability','Add outcome weights',[
  n('Ω = {a, b, c, d} has probabilities 0.1, 0.2, 0.3, 0.4. Find P({b, d}).',.6,'0.6','Add the probabilities of b and d.','0.2 + 0.4 = 0.6. The event contains two outcomes, but its probability is not 2/4 because the outcomes are unequal.',.0001),
  n('Using the same four weights, find P({a, c}ᶜ).',.6,'0.6','The complement is {b, d}.','P({a, c}) = 0.1 + 0.3 = 0.4, so its complement has probability 0.6.',.0001),
  c('An event contains half the outcomes in a finite sample space. Must it have probability 1/2?',['Yes','No'],1,'Counting outcomes ignores their individual weights.','Only equal outcome probabilities guarantee the count ratio. Otherwise half the outcomes can carry more or less than half the total weight.')
 ]);
 add('probability-rules','probability','probability','Combine probabilities carefully',[
  n('P(A) = 0.7 and P(B) = 0.6. What is the smallest possible P(A ∩ B)?',.3,'0.3','The union cannot exceed 1.','P(A ∩ B) ≥ P(A) + P(B) − 1 = 0.3. This lower bound is attainable.',.0001),
  n('P(A), P(B), P(C) are 0.3, 0.4, 0.2. Pairwise overlaps are 0.1, 0.05, 0.08, and the triple overlap is 0.02. Find the union probability.',.69,'0.69','Add singles, subtract all pairs, then add the triple.','0.3 + 0.4 + 0.2 − 0.1 − 0.05 − 0.08 + 0.02 = 0.69.',.0001),
  c('If A ⊆ B and P(A) = 0.4, which value of P(B) is impossible?',['0.3','0.4','0.9'],0,'The larger set cannot have smaller probability.','P(B) must be at least 0.4, so 0.3 is impossible.')
 ]);
 add('two-successes','probability','probability','At least one, exactly one, neither',[
  n('Two tests succeed with P(A) = 0.7, P(B) = 0.5, and P(A ∩ B) = 0.4. Find the probability of at least one success.',.8,'0.8','Use the union rule.','0.7 + 0.5 − 0.4 = 0.8.',.0001),
  n('For those same two tests, find the probability of exactly one success.',.4,'0.4','Remove the overlap from each event before adding the two exclusive parts.','A only is 0.7 − 0.4 = 0.3; B only is 0.5 − 0.4 = 0.1. Total: 0.4.',.0001),
  n('For those same two tests, find the probability of neither success.',.2,'0.2','Neither is the complement of at least one.','1 − 0.8 = 0.2. This is not the probability of exactly one success.',.0001)
 ]);
 add('tails-boundaries','probability','probability','Watch “less than” and “at most”',[
  n('X takes values 0, 1, 2, 3 with probabilities 0.1, 0.2, 0.4, 0.3. Find P(X < 2).',.3,'0.3','Include 0 and 1, but exclude 2.','P(X < 2) = 0.1 + 0.2 = 0.3.',.0001),
  n('For the same distribution, find P(X ≤ 2).',.7,'0.7','This time include the probability at 2.','0.1 + 0.2 + 0.4 = 0.7. Equivalently, 1 − P(X = 3).',.0001),
  n('For the same distribution, find P(X ≥ 2).',.7,'0.7','At least 2 includes both 2 and 3.','0.4 + 0.3 = 0.7. It is the complement of X < 2, not X ≤ 2.',.0001)
 ]);
 add('given-definition','conditional','conditional','Identify the new denominator',[
  c('You know that a selected component failed inspection. In P(sensor | failed), what is the reference group?',['All sensors','All failed components','All components'],1,'The condition is the event after the vertical bar.','Restrict attention to failed components, then ask what fraction are sensors.'),
  n('P(A ∩ B) = 0.12 and P(B) = 0.3. Find P(A | B).',.4,'0.4','Divide the overlap by the condition’s probability.','0.12/0.3 = 0.4.',.0001),
  c('If P(B) = 0, can the elementary ratio P(A ∩ B)/P(B) define P(A | B)?',['Yes, it is zero','No, the denominator is zero','Yes, it is one'],1,'Division by zero is not defined.','The elementary conditional-probability formula requires P(B) > 0. More advanced conditional constructions are outside this guide.')
 ]);
 add('conditional-numbers','conditional','conditional','Restrict the candidate outcomes',[
  n('Choose uniformly from 1–12. Given that the number is even, what is the probability that it is divisible by 3?',1/3,'1/3 (about 0.3333)','List the six even numbers and find the multiples of 3 among them.','The condition leaves {2, 4, 6, 8, 10, 12}; favorable outcomes are {6, 12}. Thus 2/6 = 1/3.',.0001),
  n('Choose uniformly from 1–12. Given that the number is divisible by 3, what is the probability that it is even?',.5,'1/2','Reverse the conditioning group, not the overlap.','Among {3, 6, 9, 12}, two are even. The result is 2/4 = 1/2.',.0001),
  m('For a uniform choice from 1–12, let A = divisible by 3 and B = even. Which numbers belong to A ∩ B?',['2','3','6','9','10','12'],[2,5],'An overlap must satisfy both properties.','Only 6 and 12 are both even and divisible by 3.')
 ]);
 add('conditional-defects','conditional','conditional','Translate percentages into a conditional chance',[
  n('In a batch, 20% have a length defect and 3% have both length and texture defects. Find P(texture defect | length defect).',.15,'0.15 (15%)','Divide 3% by 20%; use the same units in numerator and denominator.','0.03/0.20 = 0.15. Among the length-defective group, 15% also have a texture defect.',.0001),
  n('In that batch, 10% have a texture defect. Find P(length defect | texture defect).',.3,'0.3 (30%)','Keep the 3% overlap, but change the denominator to 10%.','0.03/0.10 = 0.30. The reversed condition has a different reference group.',.0001),
  c('Which interpretation of “3% have both defects” is correct?',['3% of the length-defective group have a texture defect','3% of the whole batch have both defects','The conditional probability is always 3%'],1,'Without a stated condition, the denominator is the whole batch.','The 3% is a joint probability relative to the whole batch. Conditional probabilities divide it by the probability of the known group.')
 ]);
 add('conditional-products','conditional','conditional','Keep the condition fixed',[
  n('P(B) = 0.4 and P(A | B) = 0.25. Find P(A ∩ B).',.1,'0.1','Rearrange the conditional definition.','P(A ∩ B) = P(B)P(A | B) = 0.4 × 0.25 = 0.1. No independence assumption is needed.',.0001),
  n('P(A | B) = 0.65. Find P(Aᶜ | B).',.35,'0.35','Complement A while keeping the same known group B.','1 − 0.65 = 0.35. This does not give P(A | Bᶜ).',.0001),
  m('Assume P(A) > 0 and P(B) > 0. Which equalities always hold?',['P(A ∩ B) = P(B)P(A | B)','P(A | B) = P(B | A)','P(Aᶜ | B) = 1 − P(A | B)','P(A ∩ B) = P(A)P(B | A)'],[0,2,3],'The product rule works in either direction, but reversed conditional probabilities can differ.','Both product identities follow from the definition, and complementing the target works within B. The two reversed conditional probabilities need not be equal.')
 ]);
 add('hand-space','poker','poker','Count hands rather than dealing orders',[
  c('Why does a five-card hand use C(52, 5), rather than P(52, 5)?',['The same five cards form the same hand in any order','Cards may be repeated','All suits are identical'],0,'Changing the dealing order does not change the resulting hand.','A hand is an unordered subset of distinct cards. P(52, 5) would count each hand 5! times.'),
  n('A miniature deck has 8 distinct cards. How many unordered three-card hands are possible?',56,'56','Use C(8, 3).','8 × 7 × 6 / (3 × 2 × 1) = 56.'),
  c('In a standard deck, how many rank choices and suit choices does one card have?',['4 ranks and 13 suits','13 ranks and 4 suits','52 ranks and 4 suits'],1,'Rank means values such as 7 or king; suit means hearts, diamonds, clubs, or spades.','Thirteen ranks times four suits gives 52 distinct cards.')
 ]);
 add('some-pair','poker','poker','At least one repeated rank',[
  c('What is the complement of “some two cards share a rank”?',['Exactly one pair','All five ranks are distinct','All five suits are distinct'],1,'Negate the existence of a rank match.','If no two cards share a rank, all five ranks must be distinct.'),
  n('A miniature deck has 5 ranks and 2 suits per rank. How many three-card hands have all ranks distinct?',80,'80','Choose 3 ranks, then choose a suit for each.','C(5, 3) × 2³ = 10 × 8 = 80.'),
  n('For the same 10-card deck, how many three-card hands have at least one repeated rank?',40,'40','Subtract the 80 all-distinct-rank hands from all C(10, 3) hands.','C(10, 3) − 80 = 120 − 80 = 40. There are only two suits, so a triple of one rank is impossible.')
 ]);
 add('one-pair','poker','poker','Prevent extra repeated ranks',[
  c('In a standard-deck hand with exactly one pair, how should the other three ranks be chosen?',['Any three from all thirteen ranks, allowing repetition','Three different ranks from the twelve remaining ranks','The same rank for all three'],1,'Prevent a second pair and avoid adding a third card to the first pair.','Choose three distinct ranks from the twelve ranks different from the pair’s rank.'),
  n('From a miniature deck with 5 ranks and 2 suits, how many four-card hands have exactly one pair?',120,'120','Choose the pair rank; both its suits are forced. Then choose two distinct other ranks and their suits.','5 × C(4, 2) × 2² = 5 × 6 × 4 = 120.'),
  n('If instead you count four-card hands with two pairs in that miniature deck, how many are there?',10,'10','Choose two pair ranks; each pair uses both suits.','C(5, 2) = 10. The two pair ranks are an unordered selection.')
 ]);
 add('hand-categories','poker','poker','Make the categories disjoint',[
  c('A hand has three queens and two sevens. What is its category?',['Three of a kind','Two pairs','Full house'],2,'The triple and pair together define a specific category.','A full house has one triple and one pair. The “three of a kind” category requires the other two ranks to differ.'),
  n('The ten standard straight rank patterns occur in four suits. If royal flushes are a separate category, how many straight flushes remain?',36,'36','Remove one royal sequence in each suit.','10 × 4 − 4 = 36 non-royal straight flushes.'),
  m('Which statements are true for the task list’s categories?',['A royal flush is also counted in the flush row.','A full house is excluded from exactly one pair.','The ten category counts sum to all five-card hands.','“At least one repeated rank” includes four of a kind.'],[1,2,3],'The named poker categories do not overlap, but broader event descriptions may include several categories.','The table partitions all hands into disjoint categories. Royals are counted separately; full houses are not exactly one pair; four of a kind does contain a repeated rank.')
 ]);
 window.CHECK_GROUPS=groups;
 window.CHECK_QUESTIONS=groups.flatMap(g=>g.items);
})();
