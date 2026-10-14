from pathlib import Path
import urllib.request,json,hashlib
records=[]
for dest,icon,color in [('gemini','googlegemini','#4285f4'),('claude','claude','#d97757'),('cursor','cursor','#111111'),('notebooklm','notebooklm','#111111')]:
 url=f'https://cdn.jsdelivr.net/npm/simple-icons@16.0.0/icons/{icon}.svg'
 try:
  data=urllib.request.urlopen(url,timeout=20).read().decode(); assert '<svg' in data
  data=data.replace('<svg ',f'<svg fill="{color}" ',1)
  Path(f'public/assets/tools/{dest}.svg').write_text(data)
  records.append(dict(name=dest,url=url,sha256=hashlib.sha256(data.encode()).hexdigest(),treatment='Simple Icons 16.0.0 community-maintained brand mark; tinted locally'))
 except Exception as e: records.append(dict(name=dest,url=url,error=str(e)))
Path('artifacts/visual-qa/astra/logo-retrieval.json').write_text(json.dumps(records,indent=2))
print(json.dumps(records,indent=2))
