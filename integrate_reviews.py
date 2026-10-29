from pathlib import Path
import zipfile
root=Path(__file__).parent
with zipfile.ZipFile(root/'content/google-attribution-assets.zip') as z:
    (root/'dist/assets/google-maps-logo.svg').write_bytes(z.read('Google_Maps_Attribution_Assets/GoogleMaps_Logo_DarkGray/GoogleMaps_Logo_DarkGray.svg'))
p=root/'build.py'
s=p.read_text(encoding='utf-8')
s=s.replace('import json, html','import json, html\nfrom reviews import home_reviews, reviews_body')
s=s.replace("base=['Undercarriage wash'", "HEADER=HEADER.replace('<a href=\"faq.html\">FAQs</a>', '<a href=\"reviews.html\">Reviews</a><a href=\"faq.html\">FAQs</a>')\nFOOTER=FOOTER.replace('<a href=\"faq.html\">FAQs</a>', '<a href=\"reviews.html\">Google reviews</a><a href=\"faq.html\">FAQs</a>')\nbase=['Undercarriage wash'")
s=s.replace("page('index.html'", "home=home.replace('<section class=\"club\">', home_reviews()+'<section class=\"club\">')\nhome=home.replace(\"link-never-match\", \"\")\npage('index.html'",1)
s=s.replace("link('Customer reviews','https://www.yelp.com/biz/toms-carwash-royersford-2')", "link('Customer reviews','reviews.html')")
s=s.replace("(D/'robots.txt').write_text", "page('reviews.html','Google Reviews & Owner Responses | Tom’s Car Wash','Read all 192 supplied Google review entries for Tom’s Car Wash, with customer feedback, owner responses, search and filters.',subhero('The voices of our neighborhood','YOUR EXPERIENCES.\\nIN YOUR WORDS.','Customer feedback matters. Explore the full supplied collection of Google reviews and responses from Tom’s.')+reviews_body())\n(D/'robots.txt').write_text")
s=s.replace('Built 6 static pages','Built 7 static pages')
s=s.replace('<h2>Images & video</h2>', '<h2>Google review snapshot</h2><p>The reviews page reproduces the supplied Google Reviews text snapshot, including critical feedback and owner replies. It is not a live Google feed. Dates are shown as captured, and missing ratings, profile photos and links have not been inferred. Review wording belongs to its respective authors. Links lead to the business’s current Google review listing.</p><h2>Images & video</h2>')
p.write_text(s,encoding='utf-8')
