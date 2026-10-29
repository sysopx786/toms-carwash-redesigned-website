(() => {
  const collection = document.querySelector('#review-collection');
  if (!collection) return;
  const cards = Array.from(collection.children);
  const search = document.querySelector('#review-search');
  const filter = document.querySelector('#review-filter');
  const sort = document.querySelector('#review-sort');
  const count = document.querySelector('#review-count');
  const previous = document.querySelector('#review-prev');
  const next = document.querySelector('#review-next');
  let page=0;
  const size=12;
  const searchable = new Map(cards.map(card=>[card,card.textContent.toLocaleLowerCase()]));
  document.querySelector('.review-controls').hidden=false;
  document.querySelector('.review-pagination').hidden=false;
  function render(scroll=false) {
    const q=search.value.trim().toLocaleLowerCase();
    let matches=cards.filter(card=>(!q||searchable.get(card).includes(q))&&(filter.value==='all'||(filter.value==='written'&&card.dataset.written==='true')||(filter.value==='reply'&&card.dataset.reply==='true')||(filter.value==='empty'&&card.dataset.written==='false')));
    if(sort.value==='name')matches.sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name));
    const pages=Math.ceil(matches.length/size);
    page=Math.max(0,Math.min(page,pages-1));
    cards.forEach(card=>card.hidden=true);
    matches.forEach((card,i)=>{collection.appendChild(card);card.hidden=i<page*size||i>=(page+1)*size;});
    count.textContent=matches.length?`Showing ${page*size+1}–${Math.min((page+1)*size,matches.length)} of ${matches.length} matching entries · ${cards.length} total in the supplied snapshot`:`0 matching entries · ${cards.length} total in the supplied snapshot`;
    document.querySelector('#review-empty').hidden=matches.length>0;
    document.querySelector('#review-page').textContent=pages?`Page ${page+1} of ${pages}`:'No results';
    previous.disabled=page===0;next.disabled=!pages||page>=pages-1;
    if(scroll)count.scrollIntoView({block:'start',behavior:'auto'});
  }
  search.addEventListener('input',()=>{page=0;render();});
  [filter,sort].forEach(el=>el.addEventListener('change',()=>{page=0;render();}));
  document.querySelector('#review-reset').addEventListener('click',()=>{search.value='';filter.value='all';sort.value='source';page=0;render();search.focus();});
  previous.addEventListener('click',()=>{page--;render(true);});
  next.addEventListener('click',()=>{page++;render(true);});
  render();
})();
