from pathlib import Path
import base64, mimetypes, re, shutil
root=Path(__file__).resolve().parent
out=root/'output'
out.mkdir(exist_ok=True)
for name in ['index.html','report.css','report.js']:
    shutil.copy2(root/name,out/name)
shutil.copytree(root/'assets',out/'assets',dirs_exist_ok=True)
pdf=root/'downloads/steel-marty-report.pdf'
if pdf.exists():
    shutil.copy2(pdf,out/pdf.name)
    shutil.copy2(pdf,out/'little-dude-report.pdf')
def data_uri(path):
    mime=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
    return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode('ascii')
fonts=(root/'assets/fonts.css').read_text()
fonts=re.sub(r'url\(([^)]+)\)',lambda m:'url('+data_uri(root/'assets'/m[1])+')',fonts)
html=(root/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="assets/fonts.css">','<style>'+fonts+'</style>')
html=html.replace('<link rel="stylesheet" href="report.css">','<style>'+(root/'report.css').read_text()+'</style>')
html=html.replace('<script src="report.js"></script>','<script>'+(root/'report.js').read_text()+'</script>')
html=re.sub(r'src="(assets/[^\"]+)"',lambda m:'src="'+data_uri(root/m[1])+'"',html)
(out/'steel-marty-report.html').write_text(html)
# Preserve links from the first report handoff.
(out/'little-dude-report.html').write_text(html)
print('Built output/index.html and standalone HTML:',round(len(html.encode())/1024/1024,2),'MB')
