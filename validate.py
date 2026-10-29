from pathlib import Path
from urllib.parse import urlsplit, unquote
from html.parser import HTMLParser
import json, re
ROOT=Path(__file__).parent/'dist'
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__(convert_charrefs=True); self.ids=[];self.links=[];self.h1=0;self.missing_alt=0;self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h1':self.h1+=1
        if tag=='img' and 'alt' not in a:self.missing_alt+=1
        for attr in ('href','src','poster'):
            if a.get(attr):self.links.append(a[attr])
pages={p.name:Page(p.read_text(encoding='utf-8')) for p in ROOT.glob('*.html')}
errors=[]
for name,p in pages.items():
    if p.h1!=1:errors.append(f'{name}: expected one H1')
    if len(p.ids)!=len(set(p.ids)):errors.append(f'{name}: duplicate IDs')
    if p.missing_alt:errors.append(f'{name}: missing alt text')
    for link in p.links:
        u=urlsplit(link)
        if u.scheme or u.netloc:continue
        target=unquote(u.path) or name
        if not (ROOT/target).is_file():errors.append(f'{name}: missing {target}')
        if u.fragment and target in pages and u.fragment not in pages[target].ids:errors.append(f'{name}: missing fragment {link}')
    text=(ROOT/name).read_text(encoding='utf-8')
    for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>',text):
        data=json.loads(raw)
        assert [x['price'] for x in data['hasOfferCatalog']['itemListElement']]==[9,11,14,16]
assert not errors,'\n'.join(errors)
print(f'PASS: {len(pages)} pages; local links, anchors, images, H1s, IDs, alt text and JSON-LD pricing.')
from reviews import REVIEWS
from html import escape
review_html=(ROOT/'reviews.html').read_text(encoding='utf-8')
assert review_html.count('class="review-card"')==len(REVIEWS)==192
for r in REVIEWS:
    for field in ('name','text','reply'):
        assert escape(r[field],quote=True) in review_html, f'Missing {field} for {r["name"]}'
assert sum(bool(r['text']) for r in REVIEWS)==98
assert sum(bool(r['reply']) for r in REVIEWS)==98
assert 'aggregateRating' not in review_html
home_html=(ROOT/'index.html').read_text(encoding='utf-8')
assert 'Rated 4.4 out of 5' in home_html and '192 Google reviews' in home_html
assert '5 stars: 121 reviews' in home_html and '1 stars: 7 reviews' in home_html
assert 'search.google.com/local/writereview?placeid=ChIJIRM55OCPxokR9RZgvzzTW0U' in home_html
assert 'Read Google Reviews' in home_html
assert home_html.index('rating-shortcut') < home_html.index('id="pricing"')
assert 'googlelogo_color_272x92dp.png' in home_html and 'google-maps-logo.svg' in home_html
assert (ROOT/'reviews.css').is_file() and 'prefers-reduced-motion' not in (ROOT/'reviews.css').read_text(encoding='utf-8')
print('PASS: All 192 supplied review records retained; verified Google rating, distribution, logo assets and homepage review links appear before Explore Washes.')
