# Flujo de trabajo con Git y GitHub · NovaShop

Responsable del repositorio: **NASV** (Support Manager).

## Ramas
| Rama | Uso |
|---|---|
| `main` | Versión estable. Solo recibe cambios por *pull request* aprobado. |
| `develop` | Integración de los módulos antes de pasar a `main`. |
| `feature/m1-cuentas` | Registro, validación y sesión (NASV). |
| `feature/m2-busqueda` | Búsqueda por texto (MPSR). |
| `feature/m3-filtros` | Búsqueda avanzada y ordenamiento (MSSG). |
| `feature/m4-catalogo` | Cuadrícula, modal y layout (JDPC). |
| `feature/pruebas` | Casos de prueba unitarios (CCGA). |
| `feature/m5-m6-carrito` | Compra y carrito (Entrega 3). |

## Ciclo de trabajo de cada integrante
```bash
git checkout develop
git pull
git checkout -b feature/m2-busqueda      # solo la primera vez
# ... programar ...
git add js/busqueda/motor-texto.js
git commit -m "M2: búsqueda por texto sin distinguir tildes (RF04)"
git push -u origin feature/m2-busqueda
```
Luego, en GitHub: **Compare & pull request** hacia `develop`.

## Reglas de los pull requests
1. Cada pull request lo revisa **otra persona** (revisión cruzada, CR). JSS revisa el estándar y CCGA confirma que las pruebas pasan.
2. No se fusiona si `pruebas/pruebas.html` tiene alguna prueba fallida (riesgo R04 del Acta 7).
3. Los defectos encontrados en la revisión se anotan en la hoja **LOGD** del workbook de quien los encontró.
4. Al cerrar cada semana, JDPC fusiona `develop` en `main`.

## Mensajes de commit
Formato: `Módulo: qué cambió (requisito)`. Ejemplos:
- `M1: validar formato de correo en el registro (RF01)`
- `M3: mostrar aviso cuando ningún artículo cumple el filtro (RF05)`
- `Pruebas: casos UT-M3-01 a UT-M3-08`
