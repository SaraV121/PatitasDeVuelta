# 🐾 Patitas de Vuelta
### Simulación de ecuaciones diferenciales aplicada a la recuperación comunitaria de mascotas

**Proyecto individual – Métodos Numéricos**

**Aplicación web:** https://sarav121.github.io/PatitasDeVuelta/

**Repositorio:** https://github.com/SaraV121/PatitasDeVuelta

---

## 1. Descripción del problema

La pérdida de mascotas representa una preocupación para muchas familias. La difusión de información y la colaboración de vecinos y voluntarios pueden contribuir a su recuperación.

Este proyecto plantea un modelo matemático hipotético para estudiar cómo evoluciona la cantidad de mascotas recuperadas durante un periodo de tiempo.

El objetivo es analizar cuánto tiempo podría necesitar una comunidad para recuperar al menos el 70 % de un total de 40 mascotas extraviadas.

## 2. Modelo matemático

Se utiliza una ecuación diferencial ordinaria de primer orden:

\[
\frac{dy}{dt}=k(N-y)
\]

Con la condición inicial:

\[
y(0)=5
\]

### Parámetros del modelo

| Símbolo | Descripción | Valor |
|---|---|---:|
| \(t\) | Tiempo transcurrido (días) | 0 |
| \(y(t)\) | Mascotas recuperadas | 5 |
| \(N\) | Total de mascotas extraviadas | 40 |
| \(k\) | Tasa de recuperación diaria | 0.18 |
| \(h\) | Tamaño de paso | 0.5 y 0.25 |

La ecuación diferencial particular es:

\[
\frac{dy}{dt}=0.18(40-y)
\]

### Solución analítica

La solución exacta del modelo es:

\[
\boxed{y(t)=40-35e^{-0.18t}}
\]

Esta solución permite comparar los resultados obtenidos mediante los métodos numéricos.

## 3. Métodos numéricos implementados

Se implementaron dos métodos para aproximar la solución de la ecuación diferencial:

**Método de Heun (RK2)**

Utiliza dos pendientes para calcular una aproximación más precisa que el método de Euler.

\[
K_1=f(t_n,y_n)
\]

\[
K_2=f(t_n+h,y_n+hK_1)
\]

\[
y_{n+1}=y_n+\frac{h}{2}(K_1+K_2)
\]

**Método Runge-Kutta de cuarto orden (RK4)**

Utiliza cuatro pendientes ponderadas para obtener una aproximación de mayor orden:

\[
K_1=f(t_n,y_n)
\]

\[
K_2=f(t_n+h/2,y_n+hK_1/2)
\]

\[
K_3=f(t_n+h/2,y_n+hK_2/2)
\]

\[
K_4=f(t_n+h,y_n+hK_3)
\]

\[
y_{n+1}=y_n+\frac{h}{6}(K_1+2K_2+2K_3+K_4)
\]

## 4. Comparación y análisis de errores

El simulador compara los resultados de Heun y RK4 con la solución analítica, utilizando diferentes tamaños de paso:

- \(h=0.5\) días.
- \(h=0.25\) días.

Se calculan los errores absolutos y relativos porcentuales para analizar la precisión de cada método.

El método RK4 generalmente presenta menor error que Heun cuando se utilizan condiciones y tamaños de paso equivalentes. Esto se debe a que RK4 es de cuarto orden, mientras que Heun es de segundo orden.

Al disminuir el tamaño de paso, ambos métodos tienden a mejorar su precisión.

## 5. Funcionalidades del simulador

La aplicación permite:

- Modificar la cantidad total de mascotas extraviadas.
- Modificar la cantidad inicial de mascotas recuperadas.
- Modificar la tasa de recuperación.
- Establecer el tiempo de simulación.
- Modificar los tamaños de paso.
- Ejecutar los métodos de Heun y RK4.
- Visualizar los resultados numéricos.
- Comparar los resultados con la solución analítica.
- Consultar gráficos comparativos.
- Analizar los errores absolutos y relativos.
- Obtener una interpretación de los resultados.

## 6. Tecnologías utilizadas

- **HTML5:** estructura de la aplicación.
- **CSS3:** diseño y presentación visual.
- **JavaScript:** implementación de los métodos numéricos y cálculos.
- **Chart.js:** generación de gráficos comparativos.
- **GitHub:** almacenamiento y control de versiones.
- **GitHub Pages:** publicación de la aplicación web.

## 7. Estructura del proyecto

```text
PatitasDeVuelta/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html`: contiene la estructura y el contenido de la aplicación.
- `style.css`: contiene los estilos visuales.
- `script.js`: contiene los cálculos, métodos numéricos, validaciones y generación de resultados.
- `README.md`: documentación del proyecto.

## 8. Supuestos y limitaciones

El modelo considera los siguientes supuestos:

- Existe una cantidad inicial fija de 40 mascotas extraviadas.
- La tasa de recuperación permanece constante.
- La recuperación depende de la cantidad de mascotas que todavía no han sido recuperadas.
- No ingresan nuevas mascotas extraviadas al sistema.
- Los parámetros utilizados son hipotéticos y tienen fines académicos.

El modelo no representa todos los factores que intervienen en una búsqueda real, como la participación de voluntarios, la difusión de avisos, la ubicación de las mascotas y las condiciones del entorno.

## 9. Conclusiones

El proyecto demuestra la aplicación de ecuaciones diferenciales ordinarias de primer orden en un problema de beneficio comunitario.

La solución analítica permite verificar los resultados numéricos y evaluar la precisión de los métodos de Heun y Runge-Kutta de cuarto orden.

La comparación demuestra la importancia del orden de los métodos y del tamaño de paso en la aproximación de soluciones numéricas.

Finalmente, el desarrollo de un simulador web permite visualizar e interpretar los resultados de manera interactiva.

---

**Patitas de Vuelta – Cada reencuentro cuenta.**