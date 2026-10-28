/* =========================================================================
   DATA — DEFAULT_DEPTS, COURSE_CATALOG, and MINOR_TEMPLATES now live in
   database.js (loaded above). This block just seeds the BCSA degree itself,
   using the same generic schema as everything in database.js — edit freely
   in the Programs tab.
   ========================================================================= */
// Reusable pool code lists, straight from the catalog.
const L = {
  WRITING: ["76-101","76-102","76-106","76-107","76-108"],
  MATH_ALT: ["21-259","21-266","21-241"],
  PROB: ["15-259","21-325","36-218","36-225","36-226"],
  SCI_ENG: ["03-121","03-125","03-132","03-133","03-135","03-140","03-161","06-100","09-105","09-106","09-225","12-100","12-201",
    "12-351","18-095","18-100","18-220","18-240","24-101","24-292","24-358","24-381","27-215","33-114","33-120","33-121","33-141",
    "33-224","33-225","33-226","42-101","42-202","85-219","02-261","03-124","27-100","33-104","42-203"],
  ECON_POL_OR_COGNITION: ["19-101","36-303","66-221","70-332","73-102","73-104","73-103","76-425","79-101","79-189","79-237","79-244",
    "79-253","79-300","79-320","79-321","79-331","79-370","79-383","79-391","79-392","80-135","80-136","80-244","80-245","80-324",
    "80-334","80-335","80-348","84-104","84-110","84-275","84-322","84-324","84-352","84-362","84-365","84-380","84-386","84-387",
    "84-389","84-390","84-393","84-402","84-405","88-281","88-284","70-311","70-318","70-385","80-101","80-130","80-150","80-180",
    "80-221","80-252","80-270","80-271","80-275","80-330","85-102","85-104","85-211","85-213","85-221","85-241","85-251","85-261",
    "85-370","85-408","85-414","85-421","88-120","88-230","88-231"],
  CS_ELECTIVE_SUGGESTED: ["05-391","05-318","05-319","05-320","05-360","05-418","05-430","10-301","10-335","11-324","11-344","11-411",
    "15-281","15-322","15-362","15-367","15-388","15-415","15-451","15-463","15-464","15-465","15-466","15-494","16-220","16-264",
    "16-362","16-376","16-385","16-467","16-480","17-214","17-313","17-356","17-437"],
  CS_ELECTIVE_EXCLUDE: ["02-223","02-261","15-351","16-223","17-200","17-333","17-562"],
  DIETRICH_CFA_DEPTS: ["19","36","66","70","73","76","79","80","84","85","88","48","51","54","57","60","62"],
  SCS_DEPTS: ["02","05","07","10","11","15","16","17"]
};

function defaultPrograms(){
  return [
    {
      id:"bcsa", name:"BCSA Degree (CS + Art)", type:"degree", removable:true, totalUnitsTarget:380,
      sections:[
        { id:"bcsa-genx", name:"I. BCSA General Education", unitsTarget:122, categories:[
          { id:"bcsa-genx-writing", name:"Writing", kind:"pool", minCourses:null, minUnits:9, targetUnits:9, targetCourses:1,
            pool:{explicit:L.WRITING, patterns:[], excludes:[]},
            note:"Either one full course (76-101/102), or two of the three mini-courses 76-106/107/108." },
          { id:"bcsa-genx-math", name:"Mathematics", kind:"fixed", targetUnits:20, targetCourses:2,
            slots:[
              {label:"21-122 Integration and Approximation (required)", codes:["21-122"]},
              {label:"Choose one: 21-259 / 21-266 / 21-241", codes:L.MATH_ALT}
            ]},
          { id:"bcsa-genx-prob", name:"Probability", kind:"pool", minCourses:1, minUnits:9, targetUnits:9, targetCourses:1,
            pool:{explicit:L.PROB, patterns:[], excludes:[]},
            note:"36-225 + 36-226 together (18 units) is one path; the others are single courses." },
          { id:"bcsa-genx-sci", name:"Science & Engineering", kind:"pool", minCourses:2, minUnits:18, targetUnits:18, targetCourses:2,
            requireDifferentDepartments:true,
            pool:{explicit:L.SCI_ENG, patterns:[], excludes:[]},
            note:"Choose two from differing departments, or one science + one engineering course. Lab courses included." },
          { id:"bcsa-genx-social", name:"Econ/Political/Social Institutions OR Cognition, Choice & Behavior", kind:"pool",
            minCourses:1, minUnits:9, targetUnits:9, targetCourses:1,
            pool:{explicit:L.ECON_POL_OR_COGNITION, patterns:[], excludes:[]} },
          { id:"bcsa-genx-dietrich", name:"Additional Dietrich/CFA Courses", kind:"pool", minCourses:2, minUnits:18, targetUnits:18, targetCourses:2,
            pool:{explicit:[], patterns:[{depts:L.DIETRICH_CFA_DEPTS, min:0, max:999}], excludes:[]},
            note:"Two non-technical courses approved by your BXA advisor. Manually assign if it doesn't auto-match." },
          { id:"bcsa-genx-univ", name:"University Requirement", kind:"fixed", targetUnits:3, targetCourses:1,
            slots:[{label:"99-101 Core@CMU (pass/no pass)", codes:["99-101"]}] },
          { id:"bcsa-genx-bxa", name:"BXA Required Courses", kind:"fixed", targetUnits:36, targetCourses:5,
            slots:[
              {label:"52-190 BXA Seminar I", codes:["52-190"]},
              {label:"52-291 BXA Seminar II", codes:["52-291"]},
              {label:"52-392 BXA Seminar III", codes:["52-392"]},
              {label:"52-401 BXA Seminar IV", codes:["52-401"]},
              {label:"52-402 BXA Seminar V", codes:["52-402"]}
            ]}
        ]},
        { id:"bcsa-cs", name:"II. School of Computer Science Concentration", unitsTarget:117, categories:[
          { id:"bcsa-cs-prereq", name:"Prerequisite", kind:"fixed", targetUnits:0, targetCourses:1,
            slots:[{label:"15-112 Fundamentals of Programming and Computer Science", codes:["15-112"]}],
            note:"Excluded from the 117-unit SCS total per the catalog — it's a prerequisite for the major, not part of it." },
          { id:"bcsa-cs-core", name:"Computer Science Core", kind:"fixed", targetUnits:60, targetCourses:5,
            slots:[
              {label:"15-122 Principles of Imperative Computation", codes:["15-122"]},
              {label:"15-150 Principles of Functional Programming", codes:["15-150"]},
              {label:"15-210 Parallel and Sequential Data Structures and Algorithms", codes:["15-210"]},
              {label:"15-213 Introduction to Computer Systems", codes:["15-213"]},
              {label:"15-251 Great Ideas in Theoretical Computer Science", codes:["15-251"]}
            ]},
          { id:"bcsa-cs-math", name:"Concepts of Mathematics", kind:"fixed", targetUnits:12, targetCourses:1,
            slots:[{label:"21-127 (or 15-151 for first-year BCSA students)", codes:["21-127","15-151"]}] },
          { id:"bcsa-cs-electives", name:"Applications Courses / CS Electives", kind:"pool", minCourses:5, minUnits:45, targetUnits:45, targetCourses:5,
            pool:{explicit:L.CS_ELECTIVE_SUGGESTED, patterns:[{depts:L.SCS_DEPTS, min:200, max:999}], excludes:L.CS_ELECTIVE_EXCLUDE},
            note:"Min. 5 courses, SCS depts (02,05,07,10,11,15,16,17), 200-level or higher, beyond the core. Excludes 02-223, 02-261, 15-351, 16-223, 17-200, 17-333, 17-562." }
        ]},
        { id:"bcsa-art", name:"III. CFA Art Concentration", unitsTarget:114, categories:[
          { id:"bcsa-art-fy", name:"First-Year Seminar", kind:"fixed", targetUnits:6, targetCourses:1,
            slots:[{label:"60-104 Foundations: Art First-Year Seminar", codes:["60-104"]}] },
          { id:"bcsa-art-foundation", name:"Foundation Studios", kind:"pool", minCourses:3, minUnits:30, targetUnits:30, targetCourses:3,
            pool:{explicit:["60-110","60-120","60-131","60-135","60-150","60-170"], patterns:[], excludes:[]} },
          { id:"bcsa-art-intermediate", name:"Intermediate Studios", kind:"pool", minCourses:3, minUnits:30, targetUnits:30, targetCourses:3,
            pool:{explicit:[], patterns:[{depts:["60"], min:200, max:299}], excludes:[]} },
          { id:"bcsa-art-advanced", name:"Advanced Studios", kind:"pool", minCourses:3, minUnits:30, targetUnits:30, targetCourses:3,
            pool:{explicit:[], patterns:[{depts:["60"], min:400, max:499}], excludes:[]},
            note:"60-499 Studio Independent Study can only be counted once." },
          { id:"bcsa-art-critical", name:"Critical Studies", kind:"pool", minCourses:2, minUnits:18, targetUnits:18, targetCourses:2,
            pool:{explicit:["60-107"], patterns:[{depts:["60"], min:300, max:399}], excludes:[]},
            note:"Typically 60-107 plus one 60-3xx Critical Studies elective." },
          { id:"bcsa-art-review", name:"Sophomore Review", kind:"fixed", targetUnits:0, targetCourses:1,
            slots:[{label:"60-200 Sophomore Review (pass/no pass)", codes:["60-200"]}] }
        ]},
        { id:"bcsa-free", name:"IV. Free Electives", unitsTarget:27, categories:[
          { id:"bcsa-free-electives", name:"Free Electives", kind:"pool", minCourses:0, minUnits:27, targetUnits:27, targetCourses:null,
            pool:{explicit:[], patterns:[{depts:"ANY", min:0, max:999}], excludes:[]},
            note:"27 units minimum for the Art concentration (380 − 122 − 117 − 114). Recompute if your CFA concentration's unit total ever changes." }
        ]}
      ]
    }
  ];
}

/* =========================================================================
   STATE
   ========================================================================= */
const STORAGE_KEY = "bxaPlanner_v1";

function freshState(){
  const scenario = { id: uid("scn"), name: "No Minor", minorProgramIds: [], assignments: [] };
  return { courses:[], programs: defaultPrograms(), depts: Object.assign({}, DEFAULT_DEPTS),
    scenarios: [scenario], activeScenarioId: scenario.id, extraTerms: [], inProgressMigrated: true };
}
// Older saves had one global `assignments` list instead of per-scenario ones.
// Wrap it into a single scenario covering whatever minors already existed, so nothing is lost.
function migrateState(parsed){
  if(!parsed.scenarios || !parsed.scenarios.length){
    const minorIds = parsed.programs.filter(p=>p.id!=="bcsa").map(p=>p.id);
    const scenario = { id: uid("scn"), name: "Default", minorProgramIds: minorIds, assignments: parsed.assignments || [] };
    parsed.scenarios = [scenario];
    parsed.activeScenarioId = scenario.id;
  }
  delete parsed.assignments;
  // 07 (SCS's AI dept, e.g. 07-280) was added to the CS electives depts after some saves were made.
  const bcsa = parsed.programs.find(p=>p.id==="bcsa");
  const electives = bcsa && bcsa.sections.flatMap(s=>s.categories).find(c=>c.id==="bcsa-cs-electives");
  const scsPattern = electives && electives.pool && (electives.pool.patterns||[]).find(p=>Array.isArray(p.depts) && p.depts.includes("15"));
  if(scsPattern && !scsPattern.depts.includes("07")){
    scsPattern.depts.push("07"); scsPattern.depts.sort();
    electives.note = (electives.note||"").replace("(02,05,10,", "(02,05,07,10,");
  }
  // Empty semesters the user added to the plan grid so they can drag courses into them.
  if(!Array.isArray(parsed.extraTerms)) parsed.extraTerms = [];
  // "In progress" didn't exist as a status before; courses in the current term were saved as planned.
  if(!parsed.inProgressMigrated){
    for(const c of parsed.courses){
      if(c.status==="planned" && termCompare(c.semester) === 0) c.status = "inprogress";
    }
    parsed.inProgressMigrated = true;
  }
  return parsed;
}
function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw){
    try{
      const parsed = JSON.parse(raw);
      if(parsed && parsed.programs && parsed.courses) return migrateState(parsed);
    }catch(e){ console.warn("Could not parse saved state, starting fresh.", e); }
  }
  return freshState();
}
let state = loadState();
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let activeTab = "courses";
const courseUiState = {}; // courseId -> { showAll: bool }

/* =========================================================================
   UTILITIES
   ========================================================================= */
function uid(prefix){ return prefix + "_" + Math.random().toString(36).slice(2,9); }
function normalizeCode(raw){
  if(!raw) return "";
  let s = raw.trim().replace(/\s+/g,"");
  // Accept SIO-style codes without the hyphen: 15322 -> 15-322
  const bare = s.match(/^(\d{2})(\d{3})$/);
  if(bare) s = bare[1] + "-" + bare[2];
  const parts = s.split("-");
  if(parts.length < 2) return s;
  let dept = parts[0]; if(dept.length === 1) dept = "0"+dept;
  return dept + "-" + parts.slice(1).join("-");
}
function deptOf(code){ return (code.split("-")[0] || "").trim(); }
function levelOf(code){
  const part = (code.split("-")[1] || "0").replace(/\D/g,"");
  const n = parseInt(part,10) || 0;
  return Math.floor(n/100)*100;
}
function deptName(code){
  const d = deptOf(code);
  return state.depts[d] || ("Unknown dept " + d);
}
function fmtUnits(u){
  const n = Math.round((Number(u)||0) * 100) / 100;
  return n % 1 === 0 ? String(n) : String(n);
}
const SEASON_RANK = {Fall:0, Spring:1, Summer:2};
function parseSemesterParts(semester){
  const s = (semester||"").trim();
  const m = s.match(/^(spring|summer|fall)\s*'?(\d{2,4})$/i);
  if(!m) return null;
  let year = parseInt(m[2],10);
  if(year < 100) year += 2000;
  const season = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
  return {season, year};
}
function semesterGroupLabel(semester){
  const parts = parseSemesterParts(semester);
  if(parts) return `${parts.season} ${parts.year}`;
  const s = (semester||"").trim();
  return s || "No semester set";
}
// A school year runs Fall (year Y) -> Spring/Summer (year Y+1). Returns Y.
function schoolYearOf(season, year){
  return season === "Fall" ? year : year - 1;
}
function termIndex(parts){ return parts.year*3 + ({Spring:0, Summer:1, Fall:2})[parts.season]; }
function currentTerm(){
  const now = new Date(), m = now.getMonth();
  return {season: m<=4 ? "Spring" : m<=6 ? "Summer" : "Fall", year: now.getFullYear()};
}
// -1 past, 0 current, 1 future; null if the semester isn't a "Season Year" term.
function termCompare(semester){
  const parts = parseSemesterParts(semester);
  if(!parts) return null;
  return Math.sign(termIndex(parts) - termIndex(currentTerm()));
}
const STATUS_LABELS = {taken:"taken", inprogress:"in progress", planned:"planned"};
const NEXT_STATUS = {planned:"inprogress", inprogress:"taken", taken:"planned"};
function statusLabel(status){ return STATUS_LABELS[status] || status; }
function parseStatus(raw){
  const s = (raw||"").trim().toLowerCase().replace(/[\s_-]/g,"");
  return s==="taken" ? "taken" : (s==="inprogress" || s==="current") ? "inprogress" : "planned";
}
function escapeHtml(s){
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function toast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._timer); t._timer = setTimeout(()=>t.classList.remove("show"), 2200);
}
function findCourse(id){ return state.courses.find(c=>c.id===id); }
function findProgram(id){ return state.programs.find(p=>p.id===id); }
function findScenario(id){ return state.scenarios.find(s=>s.id===id); }
function activeScenario(){ return findScenario(state.activeScenarioId) || state.scenarios[0]; }
// The main degree is implicit in every scenario; minors are whatever that scenario bundles in.
function relevantProgramIds(){
  return ["bcsa", ...activeScenario().minorProgramIds].filter(id => findProgram(id));
}
function relevantPrograms(){ return relevantProgramIds().map(findProgram); }
function courseIsRelevant(course){
  const scenario = activeScenario();
  const courseAssignments = scenario.assignments.filter(a => a.courseId === course.id);
  if(courseAssignments.length === 0) return true;
  const ids = new Set(relevantProgramIds());
  return courseAssignments.some(a => ids.has(a.programId));
}
function findCategory(programId, categoryId){
  const p = findProgram(programId); if(!p) return null;
  for(const s of p.sections){ const c = s.categories.find(c=>c.id===categoryId); if(c) return c; }
  return null;
}
function allCategories(program){
  const out = [];
  for(const s of program.sections) for(const c of s.categories) out.push({section:s, category:c});
  return out;
}

/* =========================================================================
   ENGINE — matching courses to requirement categories, progress calc
   ========================================================================= */
function poolMatches(pool, code){
  if(!pool) return false;
  if(pool.excludes && pool.excludes.includes(code)) return false;
  if(pool.explicit && pool.explicit.includes(code)) return true;
  if(pool.patterns){
    const d = deptOf(code), lvl = levelOf(code);
    for(const p of pool.patterns){
      const deptOk = p.depts === "ANY" || (Array.isArray(p.depts) && p.depts.includes(d));
      if(!deptOk) continue;
      const min = (p.min==null) ? 0 : p.min, max = (p.max==null) ? 999 : p.max;
      if(lvl>=min && lvl<=max) return true;
    }
  }
  return false;
}
function categoryMatchesCourse(category, code){
  if(category.kind === "pool") return poolMatches(category.pool, code);
  if(category.kind === "fixed") return category.slots.some(slot => slot.codes.includes(code));
  return false;
}
function matchablePrograms(code){
  // returns [{program, categories:[{section,category}]}], scoped to the active scenario's programs
  return relevantPrograms().map(program => {
    const cats = [];
    for(const section of program.sections){
      for(const category of section.categories){
        if(categoryMatchesCourse(category, code)) cats.push({section, category});
      }
    }
    return {program, categories: cats};
  }).filter(p => p.categories.length>0);
}
function getAssignedCourses(programId, categoryId){
  return activeScenario().assignments
    .filter(a => a.programId===programId && a.categoryId===categoryId)
    .map(a => findCourse(a.courseId))
    .filter(Boolean);
}
// Returns the course filling each slot (or null). Courses whose code matches a slot claim it first;
// courses forced into the category (no matching code) then fill whatever slots are left, in order.
function fillSlots(category, assigned){
  const filled = category.slots.map(()=>null);
  const used = new Set();
  category.slots.forEach((slot, i) => {
    const c = assigned.find(c => !used.has(c.id) && slot.codes.includes(c.code));
    if(c){ filled[i] = c; used.add(c.id); }
  });
  const forced = assigned.filter(c => !used.has(c.id) && !categoryMatchesCourse(category, c.code));
  filled.forEach((c, i) => { if(!c && forced.length) filled[i] = forced.shift(); });
  return filled;
}
function categoryProgress(program, category){
  const assigned = getAssignedCourses(program.id, category.id);
  const unitsEarned = assigned.reduce((s,c)=>s+(Number(c.units)||0),0);
  const coursesEarned = assigned.length;
  if(category.kind === "fixed"){
    const filledSlots = fillSlots(category, assigned).filter(Boolean).length;
    const complete = filledSlots >= category.slots.length;
    return {assigned, unitsEarned, coursesEarned, filledSlots, totalSlots: category.slots.length, complete};
  } else {
    const courseOk = category.minCourses ? coursesEarned >= category.minCourses : true;
    const unitOk = category.minUnits ? unitsEarned >= category.minUnits : true;
    const complete = courseOk && unitOk;
    return {assigned, unitsEarned, coursesEarned, complete};
  }
}
function programProgress(program){
  // Program total is always the sum of its categories' targetUnits — a category with an
  // explicit target of 0 (e.g. a prerequisite that doesn't count toward the major's own
  // units) is excluded from both sides; a category with no target at all (null) still adds
  // whatever's been earned to the numerator, since there's nothing to cap it against.
  // unitsTaken is the same calculation counting only taken courses, unitsThroughNow counts taken + in progress
  // (unitsEarned includes planned ones too).
  let unitsEarned = 0, unitsTaken = 0, unitsThroughNow = 0, unitsTarget = 0;
  const sumUnits = cs => cs.reduce((s,c)=>s+(Number(c.units)||0),0);
  for(const {category} of allCategories(program)){
    const prog = categoryProgress(program, category);
    const taken = sumUnits(prog.assigned.filter(c=>c.status==="taken"));
    const throughNow = sumUnits(prog.assigned.filter(c=>c.status!=="planned"));
    const cap = u => category.targetUnits != null ? Math.min(u, category.targetUnits) : u;
    if(category.targetUnits != null) unitsTarget += category.targetUnits;
    unitsEarned += cap(prog.unitsEarned);
    unitsTaken += cap(taken);
    unitsThroughNow += cap(throughNow);
  }
  const pctOf = u => unitsTarget ? Math.min(100, Math.round(u/unitsTarget*100)) : 0;
  return {unitsEarned, unitsTaken, unitsThroughNow, unitsTarget,
    pct: pctOf(unitsEarned), takenPct: pctOf(unitsTaken), nowPct: pctOf(unitsThroughNow)};
}
function setAssignment(courseId, programId, categoryId){
  const scenario = activeScenario();
  scenario.assignments = scenario.assignments.filter(a => !(a.courseId===courseId && a.programId===programId));
  if(categoryId) scenario.assignments.push({id:uid("asn"), courseId, programId, categoryId});
  saveState();
}
function getAssignmentForProgram(courseId, programId){
  return activeScenario().assignments.find(a => a.courseId===courseId && a.programId===programId);
}

// ---------- Auto-assign ----------
// Lower = more specific: an exact slot beats a named list, which beats a dept/level rule, which beats "any course".
// Among dept rules, fewer departments wins (60-2xx Intermediate Studios before the 17-dept Dietrich/CFA pool).
function matchSpecificity(category, code){
  if(category.kind === "fixed") return 0;
  if(category.pool.explicit && category.pool.explicit.includes(code)) return 1;
  const deptCounts = (category.pool.patterns||[])
    .filter(p => p.depts !== "ANY" && poolMatches({patterns:[p]}, code))
    .map(p => p.depts.length);
  return deptCounts.length ? 2 + Math.min(...deptCounts)/1000 : 3;
}
function categoryHasRoom(program, category, course){
  const prog = categoryProgress(program, category);
  if(category.kind === "fixed"){
    const filled = fillSlots(category, prog.assigned);
    return category.slots.some((slot, i) => slot.codes.includes(course.code) && !filled[i]);
  }
  if(category.requireDifferentDepartments && prog.assigned.some(c => deptOf(c.code)===deptOf(course.code))) return false;
  return !prog.complete;
}
// Taken, then in progress, then planned; then chronological. Semesters that aren't "Season Year" (e.g. AP/Transfer)
// go last so real coursework claims specific requirements first.
function autoAssignOrder(course){
  const parts = parseSemesterParts(course.semester);
  const chrono = parts ? termIndex(parts) : Infinity;
  return [({taken:0, inprogress:1})[course.status] ?? 2, chrono];
}
// Fills "Counts toward" for every program in the active scenario where the course has no assignment yet.
// Existing assignments are never changed. Returns how many assignments were made.
function autoAssignCourses(courses){
  const ordered = courses.slice().sort((a,b)=>{
    const ka = autoAssignOrder(a), kb = autoAssignOrder(b);
    return ka[0]-kb[0] || (ka[1]===kb[1] ? 0 : ka[1] < kb[1] ? -1 : 1);
  });
  const scenario = activeScenario();
  let made = 0;
  for(const course of ordered){
    for(const program of relevantPrograms()){
      if(getAssignmentForProgram(course.id, program.id)) continue;
      const best = allCategories(program)
        .filter(({category}) => categoryMatchesCourse(category, course.code) && categoryHasRoom(program, category, course))
        .map(({category}, i) => ({category, rank: matchSpecificity(category, course.code), i}))
        .sort((a,b)=> a.rank-b.rank || a.i-b.i)[0];
      if(!best) continue;
      scenario.assignments.push({id:uid("asn"), courseId:course.id, programId:program.id, categoryId:best.category.id});
      made++;
    }
  }
  saveState();
  return made;
}
function instantiateTemplate(template){
  const suffix = uid("inst");
  const clone = JSON.parse(JSON.stringify(template));
  clone.id = clone.id + "-" + suffix;
  clone.removable = true;
  for(const section of clone.sections){
    section.id = section.id + "-" + suffix;
    for(const category of section.categories) category.id = category.id + "-" + suffix;
  }
  state.programs.push(clone);
  saveState();
  return clone;
}

/* =========================================================================
   RENDER
   ========================================================================= */
function render(){
  renderHeader();
  document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab===activeTab));
  const main = document.getElementById("main");
  if(activeTab==="courses") main.innerHTML = renderCoursesTab();
  else if(activeTab==="requirements") main.innerHTML = renderRequirementsTab();
  else if(activeTab==="programs") main.innerHTML = renderProgramsTab();
  else if(activeTab==="settings") main.innerHTML = renderSettingsTab();
}
function renderHeader(){
  const bcsa = findProgram("bcsa");
  let pct = 0, takenPct = 0, nowPct = 0, earned = 0, taken = 0, throughNow = 0, target = 380;
  if(bcsa){
    const pp = programProgress(bcsa);
    ({pct, takenPct, nowPct, unitsEarned: earned, unitsTaken: taken, unitsThroughNow: throughNow, unitsTarget: target} = pp);
  }
  document.getElementById("overallBarFill").style.width = takenPct + "%";
  document.getElementById("overallBarInProgress").style.width = (nowPct - takenPct) + "%";
  document.getElementById("overallBarPlanned").style.width = (pct - nowPct) + "%";
  const inProgress = throughNow - taken, planned = earned - throughNow;
  document.getElementById("overallText").textContent =
    `${fmtUnits(taken)} / ${fmtUnits(target)} units completed toward BCSA degree (${takenPct}%)` +
    (inProgress > 0 ? ` · +${fmtUnits(inProgress)} in progress` : "") +
    (planned > 0 ? ` · +${fmtUnits(planned)} planned (${pct}% with planned)` : "");
  const sel = document.getElementById("scenarioSwitcher");
  if(sel){
    sel.innerHTML = state.scenarios.map(s=>
      `<option value="${s.id}" ${s.id===state.activeScenarioId?"selected":""}>${escapeHtml(s.name)}</option>`
    ).join("");
  }
}

function statusDot(complete, started, hasPlanned){
  if(hasPlanned){
    const topColor = complete ? "var(--green)" : "var(--amber)";
    return `<span class="status-dot" style="background:linear-gradient(to bottom, ${topColor} 50%, var(--blue) 50%);"></span>`;
  }
  return `<span class="status-dot ${complete?'dot-green':(started?'dot-amber':'dot-gray')}"></span>`;
}

// ---------- Courses tab ----------
// Every semester cell (and the "No semester set" group) is a drop target: data-drop-term is the semester
// string a dragged course gets, "" meaning unscheduled.
function renderSemesterCell(season, year, group){
  const term = `${season} ${year}`;
  if(!group || group.length===0){
    const removable = season==="Summer" && state.extraTerms.includes(term);
    return `<div class="semester-cell empty" data-drop-term="${term}">
      <h3>${term}${removable?` <button class="icon-btn" title="Remove this summer" data-action="removeTerm" data-term="${term}">✕</button>`:""}</h3>
      <div class="muted">Drag planned courses here</div>
    </div>`;
  }
  const sorted = group.slice().sort((a,b)=>a.code.localeCompare(b.code));
  const units = sorted.reduce((s,c)=>s+(Number(c.units)||0),0);
  return `<div class="semester-cell" data-drop-term="${term}">
    <h3>${term} <span class="muted">(${sorted.length} course${sorted.length===1?"":"s"}, ${fmtUnits(units)} units)</span></h3>
    ${sorted.map(renderCourseRow).join("")}
  </div>`;
}
// Every Fall/Spring/Summer from the earliest school year on the grid through the latest, for the semester dropdown.
function planTerms(){
  const keys = [...state.courses.map(c=>c.semester), ...state.extraTerms]
    .map(parseSemesterParts).filter(Boolean).map(p=>schoolYearOf(p.season, p.year));
  const now = currentTerm();
  keys.push(schoolYearOf(now.season, now.year));
  const terms = [];
  for(let key = Math.min(...keys); key <= Math.max(...keys); key++){
    terms.push(`Fall ${key}`, `Spring ${key+1}`, `Summer ${key+1}`);
  }
  return terms;
}
function renderSemesterSelect(course){
  const current = semesterGroupLabel(course.semester);
  const terms = planTerms();
  // Keep a non-"Season Year" semester (e.g. AP/Transfer) selectable so the dropdown doesn't silently change it.
  if(course.semester && !terms.includes(current)) terms.unshift(current);
  const opts = terms.map(term => `<option value="${escapeHtml(term)}" ${term===current?"selected":""}>${escapeHtml(term)}</option>`).join("");
  return `<select class="semester-select" data-action="setSemester" data-id="${course.id}" title="Move to semester">
    <option value="" ${course.semester?"":"selected"}>No semester</option>${opts}
  </select>`;
}
function nextPlanYear(){
  const keys = [...state.courses.map(c=>c.semester), ...state.extraTerms]
    .map(parseSemesterParts).filter(Boolean).map(p=>schoolYearOf(p.season, p.year));
  if(keys.length) return Math.max(...keys) + 1;
  const now = currentTerm();
  return schoolYearOf(now.season, now.year);
}
function renderCoursesTab(){
  const allCourses = state.courses.slice();
  const courses = allCourses.filter(courseIsRelevant);
  const hiddenCount = allCourses.length - courses.length;
  const groups = new Map(); // semesterLabel -> courses[]
  for(const c of courses){
    const label = semesterGroupLabel(c.semester);
    if(!groups.has(label)) groups.set(label, []);
    groups.get(label).push(c);
  }

  const yearRows = new Map(); // schoolYearOf -> {Fall, Spring, Summer, showSummer}
  const yearBucket = key => { if(!yearRows.has(key)) yearRows.set(key, {}); return yearRows.get(key); };
  const otherLabels = [];
  for(const [label, group] of groups){
    const parts = parseSemesterParts(label);
    if(parts){
      const bucket = yearBucket(schoolYearOf(parts.season, parts.year));
      bucket[parts.season] = group;
      if(parts.season==="Summer") bucket.showSummer = true;
    } else {
      otherLabels.push(label);
    }
  }
  // Empty semesters added via "+ Add next year" / "+ Summer" so courses can be planned into them.
  for(const term of state.extraTerms){
    const parts = parseSemesterParts(term); if(!parts) continue;
    const bucket = yearBucket(schoolYearOf(parts.season, parts.year));
    if(parts.season==="Summer") bucket.showSummer = true;
  }

  const yearGridHtml = [...yearRows.keys()].sort((a,b)=>a-b).map(key => {
    const bucket = yearRows.get(key);
    const cells = [renderSemesterCell("Fall", key, bucket.Fall), renderSemesterCell("Spring", key+1, bucket.Spring)];
    if(bucket.showSummer) cells.push(renderSemesterCell("Summer", key+1, bucket.Summer));
    const isEmpty = !bucket.Fall && !bucket.Spring && !bucket.Summer;
    return `<div class="year-block">
      <div class="year-head">
        <span>${key}–${String(key+1).slice(2)}</span>
        ${bucket.showSummer?"":`<button class="btn secondary small" data-action="addSummer" data-term="Summer ${key+1}">+ Summer</button>`}
        ${isEmpty?`<button class="btn secondary small" data-action="removeYear" data-year="${key}">Remove year</button>`:""}
      </div>
      <div class="year-row">${cells.join("")}</div>
    </div>`;
  }).join("");

  const renderOtherGroup = (label, dropTerm) => {
    const sorted = (groups.get(label) || []).slice().sort((a,b)=>a.code.localeCompare(b.code));
    const units = sorted.reduce((s,c)=>s+(Number(c.units)||0),0);
    return `<div class="semester-group"${dropTerm!=null?` data-drop-term="${dropTerm}"`:""}>
      <h3>${escapeHtml(label)} <span class="muted">(${sorted.length} course${sorted.length===1?"":"s"}, ${fmtUnits(units)} units)</span></h3>
      ${sorted.length ? sorted.map(renderCourseRow).join("") : '<div class="muted">Drag a planned course here to unschedule it.</div>'}
    </div>`;
  };
  // "No semester set" is always shown (last) so courses can be dragged back out of a semester.
  const otherHtml = otherLabels
    .filter(label => label!=="No semester set")
    .sort((a,b)=> a.localeCompare(b))
    .map(label => renderOtherGroup(label, null))
    .join("") + renderOtherGroup("No semester set", "");

  const groupsHtml = `<div class="year-grid">${yearGridHtml}</div>
    <div class="top-actions" style="justify-content:flex-start;margin-top:-10px;margin-bottom:24px;">
      <button class="btn secondary" data-action="addPlanYear">+ Add ${nextPlanYear()}–${String(nextPlanYear()+1).slice(2)} school year</button>
    </div>
    ${otherHtml}`;
  return `
    <div class="card">
      <h2>Add a course</h2>
      <p class="muted">Enter a course number like <code>15-322</code> or <code>15322</code>. The department and (if known) the name/units auto-fill.</p>
      <form id="addCourseForm" class="row" onsubmit="return false;">
        <div class="field"><label>Course code</label><input id="newCode" placeholder="15-322" autocomplete="off"></div>
        <div class="field"><label>Department</label><input id="newDept" disabled style="width:230px;"></div>
        <div class="field" style="flex:1;min-width:220px;"><label>Course name</label><input id="newName" placeholder="Course name"></div>
        <div class="field" style="width:90px;"><label>Units</label><input id="newUnits" type="number" step="0.5" placeholder="9"></div>
        <div class="field"><label>Status</label>
          <select id="newStatus"><option value="planned">Planned</option><option value="inprogress">In progress</option><option value="taken">Taken</option></select>
        </div>
        <div class="field" style="width:130px;"><label>Semester</label><input id="newSemester" placeholder="Fall 2026"></div>
        <div class="field"><button class="btn" id="addCourseBtn" data-action="addCourse">Add Course</button></div>
      </form>
      <p class="muted" style="margin-top:14px;">Or import everything from your unofficial transcript PDF (from SIO). It's read in this browser and never uploaded. Courses you've already added are skipped.</p>
      <div class="row">
        <label class="btn secondary" style="cursor:pointer;">Import transcript PDF<input type="file" id="transcriptFile" accept=".pdf,application/pdf" style="display:none;"></label>
        <button class="btn secondary" data-action="autoAssign" title="Fills empty 'Counts toward' dropdowns with the most specific requirement that still has room. Never changes ones you've set.">Auto-fill "Counts toward"</button>
      </div>
    </div>
    <h2 class="section-heading">My Courses (${courses.length})</h2>
    ${courses.length>0 ? `<p class="muted" style="margin:-8px 0 16px;">Drag planned and in-progress courses between semesters to plan ahead.</p>` : ""}
    ${hiddenCount>0 ? `<p class="muted" style="margin:-8px 0 16px;">${hiddenCount} course${hiddenCount===1?"":"s"} hidden — ${hiddenCount===1?"it":"they"} only count${hiddenCount===1?"s":""} toward a minor that isn't part of the "${escapeHtml(activeScenario().name)}" scenario (switch scenarios in the header, or check the Programs tab).</p>` : ""}
    ${courses.length===0 ? `<div class="empty-state">${allCourses.length===0?"No courses yet — add your first one above.":"Nothing to show in this scenario — every course only counts toward minors from a different scenario."}</div>` : groupsHtml}
  `;
}
// One dropdown per program: matching categories first (most specific on top), then every other
// category grouped by section so a course can be forced anywhere.
function renderAssignSelect(course, program){
  const current = getAssignmentForProgram(course.id, program.id);
  const opt = category => `<option value="${category.id}" ${current && current.categoryId===category.id ? "selected" : ""}>${escapeHtml(category.name)}</option>`;
  const all = allCategories(program);
  const suggested = all
    .map(({category}, i) => ({category, i}))
    .filter(({category}) => categoryMatchesCourse(category, course.code))
    .map(x => ({...x, rank: matchSpecificity(x.category, course.code)}))
    .sort((a,b)=> a.rank-b.rank || a.i-b.i)
    .map(x => x.category);
  const suggestedHtml = suggested.length ? `<optgroup label="Suggested">${suggested.map(opt).join("")}</optgroup>` : "";
  const forceHtml = program.sections.map(section => {
    const others = section.categories.filter(c => !categoryMatchesCourse(c, course.code));
    return others.length ? `<optgroup label="Force → ${escapeHtml(section.name)}">${others.map(opt).join("")}</optgroup>` : "";
  }).join("");
  const currentCat = current && findCategory(program.id, current.categoryId);
  const isForced = currentCat && !categoryMatchesCourse(currentCat, course.code);
  return `<div class="assign-row">
    <span class="pname">${escapeHtml(program.name)}${isForced?' <span class="tag tag-forced">forced</span>':''}</span>
    <select data-action="assign" data-course="${course.id}" data-program="${program.id}">
      <option value="">— none —</option>${suggestedHtml}${forceHtml}
    </select>
  </div>`;
}
function renderCourseRow(course){
  const showAll = !!(courseUiState[course.id] && courseUiState[course.id].showAll);
  const matchedProgramIds = new Set(matchablePrograms(course.code).map(m=>m.program.id));
  // Programs the course doesn't match (and isn't already forced into) stay hidden until asked for.
  const isShown = p => matchedProgramIds.has(p.id) || getAssignmentForProgram(course.id, p.id);
  const hiddenCount = relevantPrograms().filter(p => !isShown(p)).length;
  const assignRows = relevantPrograms()
    .filter(p => showAll || isShown(p))
    .map(p => renderAssignSelect(course, p))
    .join("");
  const draggable = course.status !== "taken";

  return `<div class="course-row" data-course-row="${course.id}"${draggable?` draggable="true" data-drag-course="${course.id}"`:""}>
    <div class="course-row-top">
      ${draggable?'<span class="drag-grip" title="Drag to another semester">⋮⋮</span>':""}
      <span class="course-code">${escapeHtml(course.code)}</span>
      <span class="dept-tag">${escapeHtml(deptName(course.code))}</span>
      <span class="course-name">${escapeHtml(course.name)||'<span class="muted">(no name)</span>'}</span>
    </div>
    <div class="course-row-meta">
      <span class="course-units">${fmtUnits(course.units)} units</span>
      <button class="status-badge status-${course.status} status-toggle" data-action="toggleStatus" data-id="${course.id}" title="Click to mark as ${statusLabel(NEXT_STATUS[course.status] || "planned")}">${statusLabel(course.status)} ⇄</button>
      ${draggable ? renderSemesterSelect(course) : `<span class="muted">${escapeHtml(course.semester||"")}</span>`}
      <button class="icon-btn" title="Edit" data-action="editCourse" data-id="${course.id}">✏️</button>
      <button class="icon-btn" title="Delete" data-action="deleteCourse" data-id="${course.id}">🗑️</button>
    </div>
    <div class="assign-area">
      <div class="muted" style="margin-bottom:6px;">Counts toward:</div>
      ${assignRows || '<div class="muted">No matching requirements found.</div>'}
      ${hiddenCount>0 || showAll ? `<button class="btn secondary small" data-action="toggleShowAll" data-id="${course.id}">${showAll?"Hide non-matching programs":`Force into another program (${hiddenCount})`}</button>` : ""}
    </div>
  </div>`;
}

// ---------- Requirements tab (read-only dashboard) ----------
function renderScenarioBanner(){
  const scenario = activeScenario();
  const minorCount = scenario.minorProgramIds.filter(id=>findProgram(id)).length;
  const desc = minorCount>0
    ? `Main degree + ${minorCount} minor${minorCount===1?"":"s"}.`
    : "Main degree only — no minor bundled into this scenario.";
  return `<div class="card">
    <h2>Viewing: ${escapeHtml(scenario.name)}</h2>
    <p class="muted">${desc} Switch scenarios from the dropdown in the header, or create/edit scenarios in the Programs tab.</p>
  </div>`;
}
function renderRequirementsTab(){
  if(state.programs.length===0) return `<div class="empty-state">No programs defined. Add one in the Programs tab.</div>`;
  const banner = renderScenarioBanner();
  return banner + relevantPrograms().map(program => {
    const pp = programProgress(program);
    const barClass = pp.pct>=100 ? "pf-green" : (pp.pct>0 ? "pf-amber" : "pf-gray");
    const sections = program.sections.map(section => {
      const catsHtml = section.categories.map(category => {
        const prog = categoryProgress(program, category);
        let statText;
        if(category.kind==="fixed"){
          statText = `${prog.filledSlots}/${prog.totalSlots} courses`;
        } else {
          const parts = [];
          if(category.minCourses) parts.push(`${prog.coursesEarned}/${category.minCourses} courses`);
          if(category.minUnits) parts.push(`${fmtUnits(prog.unitsEarned)}/${fmtUnits(category.minUnits)} units`);
          statText = parts.join(", ") || `${fmtUnits(prog.unitsEarned)} units`;
        }
        const chips = prog.assigned.map(c=>{
          const forced = !categoryMatchesCourse(category, c.code);
          return `<span class="chip chip-${c.status}" title="${statusLabel(c.status)}${forced?" · forced into this category":""}">${escapeHtml(c.code)}${forced?"*":""}</span>`;
        }).join("");
        const hasPlanned = prog.assigned.some(c=>c.status!=="taken");
        return `<div class="cat-row">
          ${statusDot(prog.complete, prog.assigned.length>0, hasPlanned)}
          <span class="cat-name">${escapeHtml(category.name)}</span>
          <span class="cat-stat">${statText}</span>
          <span>${chips}</span>
          ${category.note?`<div class="help" style="flex-basis:100%;">${escapeHtml(category.note)}</div>`:""}
        </div>`;
      }).join("");
      return `<div class="section-block">
        <h3>${escapeHtml(section.name)}${section.unitsTarget?` <span class="muted">(${section.unitsTarget} units)</span>`:""}</h3>
        ${catsHtml || '<div class="muted">No categories yet.</div>'}
      </div>`;
    }).join("");
    const summaryText = pp.unitsTarget>0
      ? `${fmtUnits(pp.unitsEarned)} / ${fmtUnits(pp.unitsTarget)} units (${pp.pct}%)`
      : `${fmtUnits(pp.unitsEarned)} units earned (overall target not set — check category progress below)`;
    return `<div class="card">
      <div class="program-card-header">
        <h2>${escapeHtml(program.name)} <span class="tag">${escapeHtml(program.type)}</span></h2>
        <span class="muted">${summaryText}</span>
      </div>
      ${pp.unitsTarget>0 ? `<div class="progress-wrap" style="height:8px;"><div class="progress-fill ${barClass}" style="width:${pp.pct}%"></div></div>` : ""}
      ${sections}
    </div>`;
  }).join("");
}

// ---------- Programs tab (full CRUD editor) ----------
function renderScenariosCard(){
  const minorPrograms = state.programs.filter(p=>p.id!=="bcsa");
  const scenarioRows = state.scenarios.map(scenario => {
    const isActive = scenario.id === state.activeScenarioId;
    const minorNames = scenario.minorProgramIds.map(findProgram).filter(Boolean).map(p=>p.name);
    const desc = minorNames.length ? minorNames.join(", ") : "Major only";
    return `<div class="scenario-row${isActive?" active":""}">
      <div>
        <strong>${escapeHtml(scenario.name)}</strong> ${isActive?'<span class="tag">active</span>':""}
        <div class="muted">${escapeHtml(desc)}</div>
      </div>
      <div class="row">
        ${isActive?"":`<button class="btn secondary small" data-action="switchScenario" data-scenario="${scenario.id}">Switch to this</button>`}
        <button class="btn secondary small" data-action="renameScenario" data-scenario="${scenario.id}">Rename</button>
        <button class="btn danger small" data-action="deleteScenario" data-scenario="${scenario.id}">Delete</button>
      </div>
    </div>`;
  }).join("");
  const minorChecks = minorPrograms.map(p=>
    `<label class="program-toggle"><input type="checkbox" class="newScenarioMinorCheckbox" value="${p.id}"> ${escapeHtml(p.name)}</label>`
  ).join("") || '<p class="muted">No minors added yet — add one from a template or blank below, then come back here.</p>';
  const copyOptions = state.scenarios.map(s=>`<option value="${s.id}">Duplicate from "${escapeHtml(s.name)}"</option>`).join("");
  return `<div class="card">
    <h2>Scenarios</h2>
    <p class="muted">A scenario bundles the main degree with zero or more minors and keeps its own independent set of course-to-requirement assignments. Switch scenarios to compare "what if I do Minor X" vs "what if I do Minor Y" without one overwriting the other — your courses stay shared across all scenarios, only which requirement each one fulfills changes.</p>
    <div class="scenario-list">${scenarioRows}</div>
    <hr class="sep">
    <h3>+ New Scenario</h3>
    <div class="row">
      <div class="field" style="flex:1;min-width:220px;"><label>Name</label><input id="newScenarioName" placeholder="e.g. Machine Learning Minor"></div>
    </div>
    <div class="field"><label>Include minor(s)</label><div class="program-toggle-list">${minorChecks}</div></div>
    <div class="field"><label>Starting assignments</label>
      <select id="newScenarioCopyFrom">
        <option value="">Start blank</option>
        ${copyOptions}
      </select>
    </div>
    <button class="btn" data-action="createScenario">Create Scenario</button>
  </div>`;
}
function renderProgramsTab(){
  const byCollege = {};
  for(const t of MINOR_TEMPLATES) (byCollege[t.college] = byCollege[t.college] || []).push(t);
  const optgroups = Object.keys(byCollege).sort().map(college => {
    const opts = byCollege[college]
      .slice().sort((a,b)=>a.name.localeCompare(b.name))
      .map(t => `<option value="${t.id}">${escapeHtml(t.name)}${t.totalUnitsTarget?` (${t.totalUnitsTarget}+ units)`:""}</option>`)
      .join("");
    return `<optgroup label="${escapeHtml(college)}">${opts}</optgroup>`;
  }).join("");
  return renderScenariosCard() + `
    <div class="card">
      <h2>Add from Template</h2>
      <p class="muted">${MINOR_TEMPLATES.length} CMU minors pre-loaded from the course catalog (CFA, SCS, Tepper, Heinz, MCS, Engineering, Dietrich). Picking one adds an editable copy you can tweak afterward like any other program below. These were extracted at "lighter fidelity" — mostly pool/unit minimums rather than exact choice-by-choice slot logic — so double-check anything load-bearing against the real catalog.</p>
      <div class="row">
        <div class="field" style="flex:1;min-width:320px;"><label>Minor</label>
          <select id="templatePicker">
            <option value="">— choose a minor —</option>
            ${optgroups}
          </select>
        </div>
        <div class="field"><button class="btn" data-action="addFromTemplate">+ Add Selected Template</button></div>
      </div>
    </div>
    <div class="top-actions"><button class="btn secondary" data-action="addProgram">+ Add Blank Minor / Major</button></div>
    ${state.programs.map(renderProgramEditor).join("")}
  `;
}
function renderProgramEditor(program){
  const sectionsHtml = program.sections.map(section => renderSectionEditor(program, section)).join("");
  return `<details class="card" open>
    <summary>${escapeHtml(program.name)} <span class="tag">${escapeHtml(program.type)}</span></summary>
    <div class="row">
      <div class="field"><label>Name</label><input value="${escapeHtml(program.name)}" data-action="setProgramField" data-program="${program.id}" data-field="name"></div>
      <div class="field"><label>Type</label>
        <select data-action="setProgramField" data-program="${program.id}" data-field="type">
          ${["degree","minor","major","other"].map(t=>`<option value="${t}" ${program.type===t?"selected":""}>${t}</option>`).join("")}
        </select>
      </div>
      <div class="field"><button class="btn danger" data-action="deleteProgram" data-program="${program.id}">Delete Program</button></div>
    </div>
    <hr class="sep">
    ${sectionsHtml}
    <button class="btn secondary small" data-action="addSection" data-program="${program.id}">+ Add Section</button>
  </details>`;
}
function renderSectionEditor(program, section){
  const catsHtml = section.categories.map(category => renderCategoryEditor(program, section, category)).join("");
  return `<div class="section-block">
    <div class="row">
      <div class="field"><label>Section name</label><input value="${escapeHtml(section.name)}" data-action="setSectionField" data-program="${program.id}" data-section="${section.id}" data-field="name"></div>
      <div class="field"><label>Units target</label><input type="number" value="${section.unitsTarget||""}" style="width:100px;" data-action="setSectionField" data-program="${program.id}" data-section="${section.id}" data-field="unitsTarget"></div>
      <div class="field"><button class="btn secondary small" data-action="addCategory" data-program="${program.id}" data-section="${section.id}">+ Add Category</button></div>
      <div class="field"><button class="btn danger small" data-action="deleteSection" data-program="${program.id}" data-section="${section.id}">Delete Section</button></div>
    </div>
    ${catsHtml}
  </div>`;
}
function renderCategoryEditor(program, section, category){
  const isPool = category.kind==="pool";
  const slotsText = !isPool ? category.slots.map(s=>`${s.label} :: ${s.codes.join(",")}`).join("\n") : "";
  const explicitText = isPool ? (category.pool.explicit||[]).join(", ") : "";
  const excludesText = isPool ? (category.pool.excludes||[]).join(", ") : "";
  const patternsText = isPool ? (category.pool.patterns||[]).map(p=>`${p.depts==="ANY"?"ANY":p.depts.join(",")}|${p.min??0}|${p.max??999}`).join("\n") : "";
  return `<div class="category-editor">
    <div class="row">
      <div class="field" style="flex:1;min-width:200px;"><label>Category name</label><input value="${escapeHtml(category.name)}" data-action="setCatField" data-program="${program.id}" data-cat="${category.id}" data-field="name"></div>
      <div class="field"><label>Kind</label>
        <select data-action="setCatKind" data-program="${program.id}" data-cat="${category.id}">
          <option value="pool" ${isPool?"selected":""}>Pool of courses (choose N)</option>
          <option value="fixed" ${!isPool?"selected":""}>Fixed list of specific courses</option>
        </select>
      </div>
      <div class="field"><label>Target units</label><input type="number" value="${category.targetUnits??""}" style="width:90px;" data-action="setCatField" data-program="${program.id}" data-cat="${category.id}" data-field="targetUnits"></div>
      <div class="field"><label>Target courses</label><input type="number" value="${category.targetCourses??""}" style="width:90px;" data-action="setCatField" data-program="${program.id}" data-cat="${category.id}" data-field="targetCourses"></div>
      <div class="field"><button class="btn danger small" data-action="deleteCategory" data-program="${program.id}" data-cat="${category.id}">Delete</button></div>
    </div>
    ${isPool ? `
      <div class="grid2">
        <div class="field"><label>Min courses required</label><input type="number" value="${category.minCourses??""}" data-action="setCatField" data-program="${program.id}" data-cat="${category.id}" data-field="minCourses"></div>
        <div class="field"><label>Min units required</label><input type="number" value="${category.minUnits??""}" data-action="setCatField" data-program="${program.id}" data-cat="${category.id}" data-field="minUnits"></div>
      </div>
      <div class="field"><label>Explicit course codes (comma-separated)</label>
        <textarea rows="2" data-action="setPoolField" data-program="${program.id}" data-cat="${category.id}" data-field="explicit" placeholder="15-322, 15-466">${escapeHtml(explicitText)}</textarea>
      </div>
      <div class="field"><label>Department/level patterns — one per line: <code>depts|minLevel|maxLevel</code> (depts comma-separated or ANY)</label>
        <textarea rows="2" data-action="setPoolField" data-program="${program.id}" data-cat="${category.id}" data-field="patterns" placeholder="60|200|299">${escapeHtml(patternsText)}</textarea>
      </div>
      <div class="field"><label>Exclude codes (comma-separated)</label>
        <textarea rows="1" data-action="setPoolField" data-program="${program.id}" data-cat="${category.id}" data-field="excludes" placeholder="02-223, 15-351">${escapeHtml(excludesText)}</textarea>
      </div>
    ` : `
      <div class="field"><label>Slots — one per line: <code>label :: code1,code2,...</code> (commas = alternatives, pick one)</label>
        <textarea rows="4" data-action="setSlotsField" data-program="${program.id}" data-cat="${category.id}" placeholder="15-122 Principles of Imperative Computation :: 15-122">${escapeHtml(slotsText)}</textarea>
      </div>
    `}
    <div class="field"><label>Notes (optional)</label><input value="${escapeHtml(category.note||"")}" data-action="setCatField" data-program="${program.id}" data-cat="${category.id}" data-field="note"></div>
  </div>`;
}

// ---------- Settings tab ----------
function renderSettingsTab(){
  const deptRows = Object.keys(state.depts).sort().map(code => `
    <tr>
      <td><input value="${escapeHtml(code)}" disabled style="width:60px;"></td>
      <td><input value="${escapeHtml(state.depts[code])}" data-action="setDeptName" data-dept="${code}" style="width:100%;"></td>
      <td><button class="icon-btn" data-action="deleteDept" data-dept="${code}">🗑️</button></td>
    </tr>`).join("");
  return `
    <div class="card">
      <h2>Data</h2>
      <p class="muted">Everything is stored locally in this browser (localStorage). Export regularly to back it up.</p>
      <div class="row">
        <button class="btn" data-action="exportData">Export JSON</button>
        <label class="btn secondary" style="cursor:pointer;">Import JSON<input type="file" id="importFile" accept=".json" style="display:none;"></label>
        <button class="btn danger" data-action="restoreBcsaDefaults">Restore BCSA defaults</button>
        <button class="btn danger" data-action="eraseAll">Erase ALL data</button>
      </div>
    </div>
    <div class="card">
      <h2>Department code dictionary</h2>
      <p class="muted">Best-effort labels used to auto-identify a course's department from its number prefix. Fix or add any that are wrong/missing.</p>
      <table class="dept-table"><tr><th>Code</th><th>Department</th><th></th></tr>${deptRows}</table>
      <div class="row" style="margin-top:10px;">
        <div class="field"><label>New code</label><input id="newDeptCode" style="width:60px;" placeholder="67"></div>
        <div class="field" style="flex:1;"><label>Department name</label><input id="newDeptName" placeholder="Information Systems Program"></div>
        <div class="field"><button class="btn secondary" data-action="addDept">Add</button></div>
      </div>
    </div>
    <div class="card">
      <h2>How this works</h2>
      <p class="muted">Add every course you've taken or plan to take in <b>My Courses</b> — that list is shared across everything below. A <b>scenario</b> (switch from the dropdown in the header, manage in <b>Programs &amp; Minors</b>) bundles the main degree with zero or more minors and keeps its own independent set of course-to-requirement assignments, so the same course can count toward the major in one scenario and toward a minor in another without them overwriting each other. In each course's "Counts toward" section, pick which single requirement it fills <i>per program, in the active scenario</i> — that's how double-counting toward a minor works. Add your own minors/majors in <b>Programs &amp; Minors</b>; the same engine that tracks the BCSA degree tracks those too.</p>
    </div>
  `;
}

/* =========================================================================
   EVENTS
   ========================================================================= */
document.getElementById("tabs").addEventListener("click", e=>{
  const btn = e.target.closest("button[data-tab]");
  if(!btn) return;
  activeTab = btn.dataset.tab;
  render();
});

document.addEventListener("click", e=>{
  const t = e.target.closest("[data-action]");
  if(!t) return;
  const action = t.dataset.action;
  switch(action){
    case "addCourse": { handleAddCourse(); break; }
    case "toggleStatus": {
      const c = findCourse(t.dataset.id); if(!c) return;
      c.status = NEXT_STATUS[c.status] || "planned";
      saveState(); render();
      break;
    }
    case "addPlanYear": {
      const key = nextPlanYear();
      state.extraTerms.push(`Fall ${key}`, `Spring ${key+1}`);
      saveState(); render();
      break;
    }
    case "addSummer": {
      if(!state.extraTerms.includes(t.dataset.term)) state.extraTerms.push(t.dataset.term);
      saveState(); render();
      break;
    }
    case "removeTerm": {
      state.extraTerms = state.extraTerms.filter(term => term!==t.dataset.term);
      saveState(); render();
      break;
    }
    case "removeYear": {
      const key = parseInt(t.dataset.year, 10);
      state.extraTerms = state.extraTerms.filter(term => {
        const parts = parseSemesterParts(term);
        return !parts || schoolYearOf(parts.season, parts.year)!==key;
      });
      saveState(); render();
      break;
    }
    case "autoAssign": {
      const made = autoAssignCourses(state.courses.filter(courseIsRelevant));
      render();
      toast(made ? `Auto-assigned ${made} requirement${made===1?"":"s"}.` : "Nothing to auto-assign — every matching course already has a requirement.");
      break;
    }
    case "deleteCourse": {
      if(confirm("Delete this course? Its requirement assignments will be removed too.")){
        state.courses = state.courses.filter(c=>c.id!==t.dataset.id);
        state.scenarios.forEach(s => s.assignments = s.assignments.filter(a=>a.courseId!==t.dataset.id));
        saveState(); render();
      }
      break;
    }
    case "editCourse": {
      const c = findCourse(t.dataset.id); if(!c) return;
      const name = prompt("Course name:", c.name); if(name===null) return;
      const units = prompt("Units:", c.units); if(units===null) return;
      const status = prompt("Status (taken / in progress / planned):", statusLabel(c.status)); if(status===null) return;
      const semester = prompt("Semester:", c.semester||""); if(semester===null) return;
      c.name = name; c.units = parseFloat(units)||0;
      c.status = parseStatus(status);
      c.semester = semester;
      saveState(); render();
      break;
    }
    case "toggleShowAll": {
      const id = t.dataset.id;
      courseUiState[id] = courseUiState[id] || {};
      courseUiState[id].showAll = !courseUiState[id].showAll;
      render();
      break;
    }
    case "addProgram": {
      const name = prompt("New program name (e.g. 'Human-Computer Interaction Minor'):");
      if(!name) return;
      const newProgram = { id: uid("prog"), name, type:"minor", removable:true, totalUnitsTarget:null,
        sections:[{ id: uid("sec"), name:"Requirements", unitsTarget:null, categories:[] }] };
      state.programs.push(newProgram);
      saveState(); render();
      toast(`Added "${name}". Bundle it into a scenario below to start assigning courses to it.`);
      break;
    }
    case "addFromTemplate": {
      const sel = document.getElementById("templatePicker");
      const tid = sel && sel.value;
      if(!tid) return;
      const template = MINOR_TEMPLATES.find(t=>t.id===tid);
      if(!template) return;
      instantiateTemplate(template);
      render();
      toast(`Added "${template.name}". Bundle it into a scenario below to start assigning courses to it.`);
      break;
    }
    case "deleteProgram": {
      if(confirm("Delete this entire program and all its requirement categories? It will be removed from any scenarios that included it, and its assignments will be cleared everywhere.")){
        const pid = t.dataset.program;
        state.programs = state.programs.filter(p=>p.id!==pid);
        state.scenarios.forEach(s => {
          s.minorProgramIds = s.minorProgramIds.filter(id=>id!==pid);
          s.assignments = s.assignments.filter(a=>a.programId!==pid);
        });
        saveState(); render();
      }
      break;
    }
    case "switchScenario": {
      state.activeScenarioId = t.dataset.scenario;
      saveState(); render();
      toast(`Switched to "${findScenario(t.dataset.scenario).name}".`);
      break;
    }
    case "renameScenario": {
      const scenario = findScenario(t.dataset.scenario);
      const name = prompt("Rename scenario:", scenario.name);
      if(!name) return;
      scenario.name = name.trim() || scenario.name;
      saveState(); render();
      break;
    }
    case "deleteScenario": {
      if(state.scenarios.length<=1){ alert("You need at least one scenario — create another before deleting this one."); return; }
      if(!confirm('Delete this scenario and its course-to-requirement assignments? The courses themselves are not deleted.')) return;
      const id = t.dataset.scenario;
      state.scenarios = state.scenarios.filter(s=>s.id!==id);
      if(state.activeScenarioId===id) state.activeScenarioId = state.scenarios[0].id;
      saveState(); render();
      break;
    }
    case "createScenario": {
      const nameEl = document.getElementById("newScenarioName");
      const name = nameEl.value.trim();
      if(!name){ alert("Enter a scenario name."); return; }
      const minorProgramIds = Array.from(document.querySelectorAll(".newScenarioMinorCheckbox:checked")).map(cb=>cb.value);
      const copyFromId = document.getElementById("newScenarioCopyFrom").value;
      const sourceAssignments = copyFromId ? (findScenario(copyFromId)?.assignments || []) : [];
      const scenario = {
        id: uid("scn"), name, minorProgramIds,
        assignments: sourceAssignments.map(a=>({...a, id: uid("asn")}))
      };
      state.scenarios.push(scenario);
      state.activeScenarioId = scenario.id;
      saveState(); render();
      toast(`Created and switched to "${name}".`);
      break;
    }
    case "addSection": {
      const program = findProgram(t.dataset.program);
      program.sections.push({ id: uid("sec"), name:"New Section", unitsTarget:null, categories:[] });
      saveState(); render();
      break;
    }
    case "deleteSection": {
      if(confirm("Delete this section and its categories?")){
        const program = findProgram(t.dataset.program);
        const sec = program.sections.find(s=>s.id===t.dataset.section);
        const catIds = new Set(sec.categories.map(c=>c.id));
        program.sections = program.sections.filter(s=>s.id!==t.dataset.section);
        state.scenarios.forEach(s => s.assignments = s.assignments.filter(a=>!(a.programId===program.id && catIds.has(a.categoryId))));
        saveState(); render();
      }
      break;
    }
    case "addCategory": {
      const program = findProgram(t.dataset.program);
      const sec = program.sections.find(s=>s.id===t.dataset.section);
      sec.categories.push({ id: uid("cat"), name:"New Category", kind:"pool", minCourses:1, minUnits:null,
        targetUnits:null, targetCourses:null, pool:{explicit:[], patterns:[], excludes:[]}, note:"" });
      saveState(); render();
      break;
    }
    case "deleteCategory": {
      if(confirm("Delete this category?")){
        const program = findProgram(t.dataset.program);
        for(const s of program.sections) s.categories = s.categories.filter(c=>c.id!==t.dataset.cat);
        state.scenarios.forEach(s => s.assignments = s.assignments.filter(a=>!(a.programId===program.id && a.categoryId===t.dataset.cat)));
        saveState(); render();
      }
      break;
    }
    case "exportData": {
      const blob = new Blob([JSON.stringify(state, null, 2)], {type:"application/json"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "bxa-planner-backup.json";
      a.click();
      toast("Exported.");
      break;
    }
    case "restoreBcsaDefaults": {
      if(confirm("Restore the built-in BCSA program to its default catalog data? Your courses and other minors are untouched.")){
        state.programs = state.programs.filter(p=>p.id!=="bcsa");
        state.programs.unshift(defaultPrograms()[0]);
        saveState(); render();
        toast("BCSA defaults restored.");
      }
      break;
    }
    case "eraseAll": {
      if(confirm("Erase ALL data — courses, assignments, and custom minors — and start fresh? This cannot be undone.")){
        state = freshState(); saveState(); render();
      }
      break;
    }
    case "addDept": {
      const codeEl = document.getElementById("newDeptCode"), nameEl = document.getElementById("newDeptName");
      const code = normalizeCode(codeEl.value + "-000").split("-")[0];
      if(!code || !nameEl.value.trim()) return;
      state.depts[code] = nameEl.value.trim();
      saveState(); render();
      break;
    }
    case "deleteDept": {
      delete state.depts[t.dataset.dept];
      saveState(); render();
      break;
    }
  }
});

document.addEventListener("change", e=>{
  const t = e.target.closest("[data-action]");
  if(!t) return;
  const action = t.dataset.action;
  switch(action){
    case "assign": {
      setAssignment(t.dataset.course, t.dataset.program, t.value || null);
      render();
      break;
    }
    case "setSemester": {
      const course = findCourse(t.dataset.id); if(!course) return;
      course.semester = t.value;
      saveState(); render();
      toast(t.value ? `Moved ${course.code} to ${t.value}.` : `${course.code} is now unscheduled.`);
      break;
    }
    case "switchScenarioQuick": {
      state.activeScenarioId = t.value;
      saveState(); render();
      break;
    }
    case "setProgramField": {
      const program = findProgram(t.dataset.program);
      const field = t.dataset.field;
      program[field] = t.value;
      saveState(); if(field!=="name") render();
      break;
    }
    case "setSectionField": {
      const program = findProgram(t.dataset.program);
      const sec = program.sections.find(s=>s.id===t.dataset.section);
      const field = t.dataset.field;
      sec[field] = field==="unitsTarget" ? (t.value?parseFloat(t.value):null) : t.value;
      saveState();
      break;
    }
    case "setCatField": {
      const program = findProgram(t.dataset.program);
      const category = allCategories(program).map(x=>x.category).find(c=>c.id===t.dataset.cat);
      const field = t.dataset.field;
      const numericFields = ["targetUnits","targetCourses","minCourses","minUnits"];
      category[field] = numericFields.includes(field) ? (t.value===""?null:parseFloat(t.value)) : t.value;
      saveState(); render();
      break;
    }
    case "setCatKind": {
      const program = findProgram(t.dataset.program);
      const category = allCategories(program).map(x=>x.category).find(c=>c.id===t.dataset.cat);
      category.kind = t.value;
      if(t.value==="pool" && !category.pool) category.pool = {explicit:[], patterns:[], excludes:[]};
      if(t.value==="fixed" && !category.slots) category.slots = [];
      saveState(); render();
      break;
    }
    case "setPoolField": {
      const program = findProgram(t.dataset.program);
      const category = allCategories(program).map(x=>x.category).find(c=>c.id===t.dataset.cat);
      const field = t.dataset.field;
      if(field==="explicit" || field==="excludes"){
        category.pool[field] = t.value.split(",").map(s=>normalizeCode(s.trim())).filter(Boolean);
      } else if(field==="patterns"){
        category.pool.patterns = t.value.split("\n").map(line=>line.trim()).filter(Boolean).map(line=>{
          const [deptsRaw, minRaw, maxRaw] = line.split("|").map(s=>(s||"").trim());
          const depts = deptsRaw.toUpperCase()==="ANY" ? "ANY" : deptsRaw.split(",").map(s=>s.trim()).filter(Boolean);
          return {depts, min: minRaw?parseInt(minRaw,10):0, max: maxRaw?parseInt(maxRaw,10):999};
        });
      }
      saveState(); render();
      break;
    }
    case "setSlotsField": {
      const program = findProgram(t.dataset.program);
      const category = allCategories(program).map(x=>x.category).find(c=>c.id===t.dataset.cat);
      category.slots = t.value.split("\n").map(s=>s.trim()).filter(Boolean).map(line=>{
        const [label, codesRaw] = line.split("::");
        const codes = (codesRaw||"").split(",").map(s=>normalizeCode(s.trim())).filter(Boolean);
        return {label: (label||"").trim(), codes};
      });
      saveState(); render();
      break;
    }
    case "setDeptName": {
      state.depts[t.dataset.dept] = t.value;
      saveState();
      break;
    }
    case "importFile": break; // handled separately below
  }
});

document.addEventListener("input", e=>{
  if(e.target.id==="newCode"){
    const code = normalizeCode(e.target.value);
    document.getElementById("newDept").value = /^\d{2}/.test(code) ? deptName(code.slice(0,2)) : "";
    if(COURSE_CATALOG[code]){
      const [name, units] = COURSE_CATALOG[code];
      const nameEl = document.getElementById("newName"), unitsEl = document.getElementById("newUnits");
      if(!nameEl.value) nameEl.value = name;
      if(!unitsEl.value) unitsEl.value = units;
    }
  }
});

// ---------- Drag planned courses between semesters ----------
let dragCourseId = null;
let dragFromControl = false;
// A course card is draggable, but grabbing its dropdown or buttons shouldn't start a drag.
document.addEventListener("mousedown", e=>{ dragFromControl = !!e.target.closest("select,button,input,textarea"); });
document.addEventListener("dragstart", e=>{
  const card = e.target.closest && e.target.closest("[data-drag-course]");
  if(!card) return;
  if(dragFromControl){ e.preventDefault(); return; }
  dragCourseId = card.dataset.dragCourse;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", dragCourseId);
  card.classList.add("dragging");
});
document.addEventListener("dragend", ()=>{
  dragCourseId = null;
  document.querySelectorAll(".dragging, .drop-over").forEach(el => el.classList.remove("dragging", "drop-over"));
});
// Browsers barely auto-scroll during a drag, so scroll the page when the pointer nears the top/bottom edge.
const DRAG_SCROLL_EDGE = 120;
document.addEventListener("dragover", e=>{
  if(!dragCourseId) return;
  if(e.clientY < DRAG_SCROLL_EDGE) window.scrollBy(0, -Math.ceil((DRAG_SCROLL_EDGE - e.clientY) / 4));
  else if(e.clientY > window.innerHeight - DRAG_SCROLL_EDGE) window.scrollBy(0, Math.ceil((e.clientY - (window.innerHeight - DRAG_SCROLL_EDGE)) / 4));
});
document.addEventListener("dragover", e=>{
  const zone = dragCourseId && e.target.closest("[data-drop-term]");
  if(!zone) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  document.querySelectorAll(".drop-over").forEach(el => { if(el!==zone) el.classList.remove("drop-over"); });
  zone.classList.add("drop-over");
});
document.addEventListener("dragleave", e=>{
  const zone = e.target.closest && e.target.closest("[data-drop-term]");
  if(zone && !zone.contains(e.relatedTarget)) zone.classList.remove("drop-over");
});
document.addEventListener("drop", e=>{
  const zone = dragCourseId && e.target.closest("[data-drop-term]");
  if(!zone) return;
  e.preventDefault();
  const course = findCourse(dragCourseId);
  const term = zone.dataset.dropTerm;
  dragCourseId = null;
  if(!course || (course.semester||"") === term) { render(); return; }
  course.semester = term;
  saveState(); render();
  toast(term ? `Moved ${course.code} to ${term}.` : `${course.code} is now unscheduled.`);
});

document.body.addEventListener("change", e=>{
  if(e.target.id==="transcriptFile" && e.target.files[0]){
    importTranscriptPdf(e.target.files[0]);
    e.target.value = "";
  }
  if(e.target.id==="importFile" && e.target.files[0]){
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const parsed = JSON.parse(reader.result);
        if(!parsed.programs || !parsed.courses) throw new Error("Missing expected fields");
        state = migrateState(parsed); saveState(); render();
        toast("Imported.");
      }catch(err){
        alert("Could not import this file: " + err.message);
      }
    };
    reader.readAsText(e.target.files[0]);
  }
});

function handleAddCourse(){
  const code = normalizeCode(document.getElementById("newCode").value);
  const name = document.getElementById("newName").value.trim();
  const units = parseFloat(document.getElementById("newUnits").value) || 0;
  const status = document.getElementById("newStatus").value;
  const semester = document.getElementById("newSemester").value.trim();
  if(!code || !/^\d{2}-\d{2,3}$/.test(code)){
    alert("Please enter a valid course code like 15-322 or 15322.");
    return;
  }
  state.courses.push({ id: uid("crs"), code, name: name || (COURSE_CATALOG[code]?COURSE_CATALOG[code][0]:""), units, status, semester });
  saveState();
  document.getElementById("newCode").value = "";
  document.getElementById("newName").value = "";
  document.getElementById("newUnits").value = "";
  document.getElementById("newSemester").value = "";
  document.getElementById("newDept").value = "";
  render();
  toast("Course added.");
}

/* =========================================================================
   TRANSCRIPT PDF IMPORT
   ========================================================================= */
const PDFJS_BASE = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
let pdfjsPromise = null;
function loadPdfJs(){
  if(!pdfjsPromise){
    pdfjsPromise = new Promise((resolve, reject)=>{
      const s = document.createElement("script");
      s.src = PDFJS_BASE + "pdf.min.js";
      s.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_BASE + "pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      s.onerror = () => { pdfjsPromise = null; reject(new Error("Couldn't load the PDF reader (are you offline?)")); };
      document.head.appendChild(s);
    });
  }
  return pdfjsPromise;
}
// Rebuild visual lines from pdf.js text items by grouping on y position.
async function pdfToLines(file){
  const pdfjsLib = await loadPdfJs();
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const lines = [];
  for(let p=1; p<=pdf.numPages; p++){
    const content = await (await pdf.getPage(p)).getTextContent();
    const rows = [];
    for(const item of content.items){
      if(!item.str.trim()) continue;
      const x = item.transform[4], y = item.transform[5];
      let row = rows.find(r => Math.abs(r.y - y) < 3);
      if(!row){ row = { y, items: [] }; rows.push(row); }
      row.items.push({ x, str: item.str.trim() });
    }
    rows.sort((a,b)=> b.y - a.y);
    for(const r of rows) lines.push(r.items.sort((a,b)=> a.x - b.x).map(i=>i.str).join(" ").replace(/\s+/g," "));
  }
  return lines;
}
function titleCase(s){ return s.toLowerCase().replace(/\b[a-z]/g, ch => ch.toUpperCase()); }
// Parses CMU's unofficial academic record. A repeated course keeps its latest attempt.
function parseTranscriptLines(lines){
  const byCode = new Map();
  let semester = "";
  for(const line of lines){
    const sem = line.match(/^(Fall|Spring|Summer)\s+(\d{4})\b/);
    if(sem){ semester = `${sem[1]} ${sem[2]}`; continue; }
    if(/ADVANCED PLACEMENT|TRANSFER CREDIT FROM/i.test(line)){ semester = "AP/Transfer"; continue; }
    const m = line.match(/^(?:[A-Z]{2,4}\s+)?(\d{5})\s+(.+?)\s+(\d+\.\d)(?:\s+([A-Z][A-Z+-]?)(?=\s|$))?/);
    if(!m) continue;
    const [, digits, title, units, grade] = m;
    if(grade && /^(W|R|N)$/.test(grade)) continue; // withdrawn / failed / no credit
    const code = digits.slice(0,2) + "-" + digits.slice(2);
    byCode.delete(code);
    byCode.set(code, {
      code,
      name: COURSE_CATALOG[code] ? COURSE_CATALOG[code][0] : titleCase(title),
      units: parseFloat(units),
      // No grade yet: in progress if it's this term (or an earlier one), planned if registered for a future term.
      status: grade ? "taken" : (termCompare(semester) === 1 ? "planned" : "inprogress"),
      semester,
    });
  }
  return [...byCode.values()];
}
async function importTranscriptPdf(file){
  toast("Reading transcript…");
  try{
    const parsed = parseTranscriptLines(await pdfToLines(file));
    if(parsed.length === 0) throw new Error("No courses found — is this a CMU unofficial academic record?");
    const have = new Set(state.courses.map(c=>c.code));
    const fresh = parsed.filter(c => !have.has(c.code));
    const added = fresh.map(c => ({ id: uid("crs"), ...c }));
    state.courses.push(...added);
    const assigned = autoAssignCourses(added);
    render();
    const skipped = parsed.length - fresh.length;
    toast(`Imported ${added.length} course${added.length===1?"":"s"}` + (skipped ? ` (${skipped} already added)` : "") + `, auto-assigned ${assigned} requirement${assigned===1?"":"s"}.`);
  }catch(err){
    alert("Could not import transcript: " + err.message);
  }
}

render();
