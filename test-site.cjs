const fs=require('fs');const assert=require('assert');const path=require('path');
const root=__dirname; const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const html=read('index.html'), css=read('style.css'), app=read('app.js'), lessons=read('lessons.js');
assert.match(html,/id="lesson-nav"/);assert.match(html,/id="lesson-view"/);assert.match(html,/id="search"/);
for(const id of ['code-panel','reveal-code','practice-answer','copy-code','download-code']) assert.ok(app.includes(`id="${id}"`),`Missing dynamic control ${id}`);
assert.match(html,/id="progress"/);assert.match(html,/id="menu-toggle"/);
assert.match(html,/independent|verify|check with your teacher/i);assert.match(html,/made with love by aloopitika\./);
assert.match(css,/@media/);assert.match(app,/localStorage/);assert.match(app,/hashchange/);assert.match(app,/escapeHtml/);
const vm=require('vm');let context={window:{}};vm.runInNewContext(lessons,context);let data=context.window.LESSONS;
assert.equal(data.length,15);assert.equal(new Set(data.map(x=>x.id)).size,15);
for(const x of data){for(const f of ['title','topic','prompt','learn','algorithm','example','code','breakdown','tryIt','check','pitfalls'])assert.ok(x[f],`lesson ${x.id} missing ${f}`);assert.ok(x.learn.length>=3);assert.ok(x.breakdown.length>=5);assert.match(x.code,/#include <iostream.h>/);}
console.log('PASS site contracts + 15 lesson structures');
