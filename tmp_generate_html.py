import re
import json
import pathlib
import html as htmlmod

path = pathlib.Path('extraccion.html')
text = path.read_text(encoding='utf-8')
start = text.index('const productosExtraccion = {')
end = text.index('};', start)
obj_text = text[start + len('const productosExtraccion = '): end + 1]
obj_json = obj_text
obj_json = re.sub(r'([\{,])\s*"([^\"]+)"\s*:\s*', r'\1"\2":', obj_json)
obj_json = re.sub(r',\s*([\]}])', r'\1', obj_json)
obj_json = obj_json.replace('\r', ' ')
prod = json.loads(obj_json)
html_blocks = []
for key, p in prod.items():
    titulo = p.get('titulo', '')
    modelo = p.get('modelo', '')
    funcion = p.get('funcion', '')
    descF = p.get('descripcionFuncionamiento', '')
    descE = p.get('descripcionEquipo', '')
    specs = p.get('especificacionesTecnicas', [])
    specs_html = '\n'.join(f'                        <li>{htmlmod.escape(s)}</li>' for s in specs)
    block = f'''            <div class="tarjeta-maquina" data-image="img/extraccion/{htmlmod.escape(key)}">
                <div class="imagen-maquina">
                    <img src="img/extraccion/{htmlmod.escape(key)}" alt="{htmlmod.escape(titulo)}">
                </div>
                <h3 class="producto-titulo">{htmlmod.escape(titulo)}</h3>
                <div class="producto-datos">
                    <p class="producto-modelo">{htmlmod.escape(modelo)}</p>
                    <p class="producto-funcion">{htmlmod.escape(funcion)}</p>
                    <div class="producto-descripcionFuncionamiento" style="display:none;">{descF}</div>
                    <div class="producto-descripcionEquipo" style="display:none;">{descE}</div>
                    <ul class="producto-especificaciones" style="display:none;">
{specs_html}
                    </ul>
                </div>
                <button class="btn-mas-informacion"> <i class="fas fa-info-circle"></i> Más Información </button>
            </div>'''
    html_blocks.append(block)
print('---BEGINHTML---')
print('\n'.join(html_blocks))
print('---ENDHTML---')
