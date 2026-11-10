
let grafica = null;

// Modelo diferencial:
// dy/dt = k(N - y)


function solucionAnalitica(t, N, y0, k) {

    return N - (N - y0) * Math.exp(-k * t);

}


function funcion(t, y, N, k) {

    return k * (N - y);

}

function metodoHeun(N, y0, k, tiempo, h) {

    let resultados = [];

    let t = 0;
    let y = y0;

    resultados.push({
        t: t,
        y: y
    });

    while (t < tiempo - 1e-10) {

        let paso = Math.min(h, tiempo - t);

        let k1 = funcion(t, y, N, k);
        let yPredictor = y + paso * k1;

        let k2 = funcion(
            t + paso,
            yPredictor,
            N,
            k
        );

        y = y + (paso / 2) * (k1 + k2);

        t = t + paso;

        resultados.push({
            t: t,
            y: y
        });

    }

    return resultados;

}


function metodoRK4(N, y0, k, tiempo, h) {

    let resultados = [];

    let t = 0;
    let y = y0;

    resultados.push({
        t: t,
        y: y
    });

    while (t < tiempo - 1e-10) {

        let paso = Math.min(h, tiempo - t);

        let k1 = funcion(t, y, N, k);

        let k2 = funcion(
            t + paso / 2,
            y + paso * k1 / 2,
            N,
            k
        );

        let k3 = funcion(
            t + paso / 2,
            y + paso * k2 / 2,
            N,
            k
        );

        let k4 = funcion(
            t + paso,
            y + paso * k3,
            N,
            k
        );

        y = y + (paso / 6) *
            (k1 + 2 * k2 + 2 * k3 + k4);

        t = t + paso;

        resultados.push({
            t: t,
            y: y
        });

    }

    return resultados;

}



function calcularError(exacto, aproximado) {

    let absoluto = Math.abs(exacto - aproximado);

    let relativo = null;

    let porcentual = null;

    if (Math.abs(exacto) > 1e-12) {

        relativo = absoluto / Math.abs(exacto);

        porcentual = relativo * 100;

    }

    return {
        absoluto: absoluto,
        relativo: relativo,
        porcentual: porcentual
    };

}


function formato(valor) {

    return Number(valor).toFixed(6);

}

function formatoError(valor) {

    if (valor === null) {
        return "No definido";
    }

    return formato(valor);

}



function obtenerParametros() {

    let N = Number(document.getElementById("N").value);

    let y0 = Number(document.getElementById("y0").value);

    let k = Number(document.getElementById("k").value);

    let tiempo = Number(
        document.getElementById("tiempo").value
    );

    let h1 = Number(document.getElementById("h1").value);

    let h2 = Number(document.getElementById("h2").value);

    if (
        ![N, y0, k, tiempo, h1, h2].every(Number.isFinite)
    ) {

        throw new Error(
            "Todos los campos deben contener números válidos."
        );

    }

    if (N <= 0) {

        throw new Error(
            "La cantidad de mascotas debe ser mayor que cero."
        );

    }

    if (y0 < 0 || y0 > N) {

        throw new Error(
            "La cantidad inicial recuperada debe estar entre 0 y N."
        );

    }

   if (k < 0 || k > 1) {
    alert("La tasa k debe ser mayor o igual a 0 y como máximo 1 por día.");
    return;

}

    if (tiempo <= 0 || tiempo > 365) {

        throw new Error(
            "El tiempo debe ser mayor que 0 y como máximo 365 días."
        );

    }

    if (h1 <= 0 || h2 <= 0 || h1 > tiempo || h2 > tiempo) {

        throw new Error(
            "Los tamaños de paso deben ser positivos y no superar el tiempo de simulación."
        );

    }

    return {
        N,
        y0,
        k,
        tiempo,
        h1,
        h2
    };

}


function crearTabla(heun, rk4, parametros, nombre) {

    let html = `
        <h3>Resultados con tamaño de paso ${nombre}</h3>

        <div class="tabla-contenedor">
        <table>

            <thead>
                <tr>
                    <th>Iteración</th>
                    <th>Tiempo (días)</th>
                    <th>Analítica</th>
                    <th>Heun</th>
                    <th>Error abs. Heun</th>
                    <th>Error % Heun</th>
                    <th>RK4</th>
                    <th>Error abs. RK4</th>
                    <th>Error % RK4</th>
                </tr>
            </thead>

            <tbody>
    `;

    for (let i = 0; i < heun.length; i++) {

        let t = heun[i].t;

        let exacto = solucionAnalitica(
            t,
            parametros.N,
            parametros.y0,
            parametros.k
        );

        let errorHeun = calcularError(
            exacto,
            heun[i].y
        );

        let errorRK4 = calcularError(
            exacto,
            rk4[i].y
        );

        html += `
            <tr>

                <td>${i}</td>

                <td>${formato(t)}</td>

                <td>${formato(exacto)}</td>

                <td>${formato(heun[i].y)}</td>

                <td>${formato(errorHeun.absoluto)}</td>

                <td>${formatoError(errorHeun.porcentual)}${errorHeun.porcentual === null ? "" : "%"}</td>

                <td>${formato(rk4[i].y)}</td>

                <td>${formato(errorRK4.absoluto)}</td>

                <td>${formatoError(errorRK4.porcentual)}${errorRK4.porcentual === null ? "" : "%"}</td>

            </tr>
        `;

    }

    html += `
            </tbody>
        </table>
        </div>
    `;

    return html;

}


function mostrarParametros(p) {

    document.getElementById("parametros").innerHTML = `

        <div class="resultado-card">
            <strong>N:</strong> ${p.N} mascotas
        </div>

        <div class="resultado-card">
            <strong>y₀:</strong> ${p.y0} mascotas
        </div>

        <div class="resultado-card">
            <strong>k:</strong> ${p.k} por día
        </div>

        <div class="resultado-card">
            <strong>Tiempo:</strong> ${p.tiempo} días
        </div>

        <div class="resultado-card">
            <strong>h₁:</strong> ${p.h1} días
        </div>

        <div class="resultado-card">
            <strong>h₂:</strong> ${p.h2} días
        </div>

    `;

}



function mostrarResultados(p, heun1, rk41, heun2, rk42) {

    let exacto = solucionAnalitica(
        p.tiempo,
        p.N,
        p.y0,
        p.k
    );

    let h1Heun = heun1[heun1.length - 1].y;

    let h1RK4 = rk41[rk41.length - 1].y;

    let h2Heun = heun2[heun2.length - 1].y;

    let h2RK4 = rk42[rk42.length - 1].y;

    let errorH1 = calcularError(exacto, h1Heun);

    let errorRK41 = calcularError(exacto, h1RK4);

    let errorH2 = calcularError(exacto, h2Heun);

    let errorRK42 = calcularError(exacto, h2RK4);

    document.getElementById("resultados").innerHTML = `

        <h3>Resultados al finalizar la simulación</h3>

        <div class="resultado-card">

            <p>
                <strong>Solución analítica:</strong>
                ${formato(exacto)} mascotas
            </p>

            <p>
                <strong>Heun (h₁):</strong>
                ${formato(h1Heun)}
            </p>

            <p>
                <strong>RK4 (h₁):</strong>
                ${formato(h1RK4)}
            </p>

            <p>
                <strong>Heun (h₂):</strong>
                ${formato(h2Heun)}
            </p>

            <p>
                <strong>RK4 (h₂):</strong>
                ${formato(h2RK4)}
            </p>

        </div>

        <h3>Comparación de errores finales</h3>

        <div class="tabla-contenedor">
            <table>

                <thead>
                    <tr>
                        <th>Método</th>
                        <th>Tamaño h</th>
                        <th>Error absoluto</th>
                        <th>Error porcentual</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>Heun</td>
                        <td>${p.h1}</td>
                        <td>${formato(errorH1.absoluto)}</td>
                        <td>${formatoError(errorH1.porcentual)}${errorH1.porcentual === null ? "" : "%"}</td>
                    </tr>

                    <tr>
                        <td>RK4</td>
                        <td>${p.h1}</td>
                        <td>${formato(errorRK41.absoluto)}</td>
                        <td>${formatoError(errorRK41.porcentual)}${errorRK41.porcentual === null ? "" : "%"}</td>
                    </tr>

                    <tr>
                        <td>Heun</td>
                        <td>${p.h2}</td>
                        <td>${formato(errorH2.absoluto)}</td>
                        <td>${formatoError(errorH2.porcentual)}${errorH2.porcentual === null ? "" : "%"}</td>
                    </tr>

                    <tr>
                        <td>RK4</td>
                        <td>${p.h2}</td>
                        <td>${formato(errorRK42.absoluto)}</td>
                        <td>${formatoError(errorRK42.porcentual)}${errorRK42.porcentual === null ? "" : "%"}</td>
                    </tr>

                </tbody>

            </table>
        </div>

    `;

}


function mostrarGrafica(p, heun1, rk41, heun2, rk42) {

    let puntosExactos = [];

    let cantidadPuntos = 100;

    for (let i = 0; i <= cantidadPuntos; i++) {

        let t = p.tiempo * i / cantidadPuntos;

        puntosExactos.push({

            x: t,

            y: solucionAnalitica(
                t,
                p.N,
                p.y0,
                p.k
            )

        });

    }

    let datasets = [

        {
            label: "Solución analítica",
            data: puntosExactos,
            borderColor: "#173d35",
            backgroundColor: "#173d35",
            borderWidth: 3,
            pointRadius: 0,
            showLine: true
        },

        {
            label: "Heun (h₁)",
            data: heun1.map(punto => ({
                x: punto.t,
                y: punto.y
            })),
            borderColor: "#e59b42",
            backgroundColor: "#e59b42",
            borderWidth: 2,
            pointRadius: 2,
            showLine: true
        },

        {
            label: "RK4 (h₁)",
            data: rk41.map(punto => ({
                x: punto.t,
                y: punto.y
            })),
            borderColor: "#3888c7",
            backgroundColor: "#3888c7",
            borderWidth: 2,
            pointRadius: 2,
            showLine: true
        },

        {
            label: "Heun (h₂)",
            data: heun2.map(punto => ({
                x: punto.t,
                y: punto.y
            })),
            borderColor: "#d65d5d",
            backgroundColor: "#d65d5d",
            borderWidth: 2,
            pointRadius: 2,
            showLine: true
        },

        {
            label: "RK4 (h₂)",
            data: rk42.map(punto => ({
                x: punto.t,
                y: punto.y
            })),
            borderColor: "#269b76",
            backgroundColor: "#269b76",
            borderWidth: 2,
            pointRadius: 2,
            showLine: true
        }

    ];

    if (grafica !== null) {

        grafica.destroy();

    }

    let contexto = document.getElementById("grafica");

    grafica = new Chart(contexto, {

        type: "scatter",

        data: {
            datasets: datasets
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                title: {
                    display: true,
                    text: "Evolución de mascotas recuperadas"
                },

                legend: {
                    position: "bottom"
                }

            },

            scales: {

                x: {

                    type: "linear",

                    title: {
                        display: true,
                        text: "Tiempo (días)"
                    }

                },

                y: {

                    beginAtZero: true,

                    title: {
                        display: true,
                        text: "Mascotas recuperadas"
                    }

                }

            }

        }

    });

}


function mostrarErrores(p, heun1, rk41, heun2, rk42) {

    let datos = [

        { nombre: "Heun (h₁)", lista: heun1 },

        { nombre: "RK4 (h₁)", lista: rk41 },

        { nombre: "Heun (h₂)", lista: heun2 },

        { nombre: "RK4 (h₂)", lista: rk42 }

    ];

    let html = `
        <div class="tabla-contenedor">
        <table>

            <thead>
                <tr>
                    <th>Método</th>
                    <th>Tiempo (días)</th>
                    <th>Valor exacto</th>
                    <th>Valor aproximado</th>
                    <th>Error absoluto</th>
                    <th>Error relativo (%)</th>
                </tr>
            </thead>

            <tbody>
    `;

    datos.forEach(grupo => {

        grupo.lista.forEach(punto => {

            let exacto = solucionAnalitica(
                punto.t,
                p.N,
                p.y0,
                p.k
            );

            let error = calcularError(
                exacto,
                punto.y
            );

            html += `
                <tr>

                    <td>${grupo.nombre}</td>

                    <td>${formato(punto.t)}</td>

                    <td>${formato(exacto)}</td>

                    <td>${formato(punto.y)}</td>

                    <td>${formato(error.absoluto)}</td>

                    <td>${formatoError(error.porcentual)}${error.porcentual === null ? "" : "%"}</td>

                </tr>
            `;

        });

    });

    html += `
            </tbody>
        </table>
        </div>
    `;

    document.getElementById("tablaErrores").innerHTML = html;

}


function mostrarInterpretacion(p, heun1, rk41, heun2, rk42) {

    let exacto = solucionAnalitica(
        p.tiempo,
        p.N,
        p.y0,
        p.k
    );

    let errorHeun = calcularError(
        exacto,
        heun2[heun2.length - 1].y
    ).absoluto;

    let errorRK4 = calcularError(
        exacto,
        rk42[rk42.length - 1].y
    ).absoluto;

    let mejorMetodo = errorRK4 <= errorHeun
        ? "RK4"
        : "Heun";

    let meta = 0.70 * p.N;

    let tiempoMeta = null;

    if (p.y0 >= meta) {

        tiempoMeta = 0;

    } else if (exacto >= meta) {

        tiempoMeta = -Math.log(
            (p.N - meta) / (p.N - p.y0)
        ) / p.k;

    }

    let textoMeta = tiempoMeta !== null
        ? `El modelo alcanza el 70 % de recuperación aproximadamente en ${formato(tiempoMeta)} días.`
        : `El modelo no alcanza el 70 % de recuperación dentro del intervalo de simulación.`;

    document.getElementById("conclusiones").innerHTML = `

        <div class="conclusion-item">

            <h3>Resultado del modelo</h3>

            <p>
                Al finalizar los ${p.tiempo} días,
                la solución analítica estima
                ${formato(exacto)} mascotas recuperadas
                de un total de ${p.N}.
            </p>

        </div>

        <div class="conclusion-item">

            <h3>Meta comunitaria</h3>

            <p>
                ${textoMeta}
            </p>

        </div>

        <div class="conclusion-item">

            <h3>Comparación de métodos</h3>

            <p>
                Con el tamaño de paso h₂ = ${p.h2},
                el método ${mejorMetodo}
                presenta el menor error absoluto final
                entre Heun y RK4.
            </p>

        </div>

        <div class="conclusion-item">

            <h3>Limitaciones</h3>

            <p>
                Los parámetros son hipotéticos.
                El modelo supone una tasa de recuperación
                constante y una población total fija.
                En una situación real, los resultados
                dependerían de la difusión, la participación
                de los vecinos y otros factores.
            </p>

        </div>

    `;

}


function ejecutarSimulacion() {

    let mensaje = document.getElementById("mensaje");

    try {

        let p = obtenerParametros();

        let heun1 = metodoHeun(
            p.N, p.y0, p.k, p.tiempo, p.h1
        );

        let heun2 = metodoHeun(
            p.N, p.y0, p.k, p.tiempo, p.h2
        );

        let rk41 = metodoRK4(
            p.N, p.y0, p.k, p.tiempo, p.h1
        );

        let rk42 = metodoRK4(
            p.N, p.y0, p.k, p.tiempo, p.h2
        );

        let mallasCoinciden = (a, b) => {

            return a.length === b.length &&
                a.every((punto, i) =>
                    Math.abs(punto.t - b[i].t) < 1e-9
                );

        };

        if (
            !mallasCoinciden(heun1, rk41) ||
            !mallasCoinciden(heun2, rk42)
        ) {

            throw new Error(
                "No se pudieron sincronizar los resultados numéricos."
            );

        }

        mostrarParametros(p);


        let tablas = document.getElementById("resultados");

        mostrarResultados(p, heun1, rk41, heun2, rk42);

        tablas.innerHTML += crearTabla(
            heun1, rk41, p, p.h1
        );

        tablas.innerHTML += crearTabla(
            heun2, rk42, p, p.h2
        );

    
        mostrarGrafica(p, heun1, rk41, heun2, rk42);


        mostrarErrores(p, heun1, rk41, heun2, rk42);

        mostrarInterpretacion(p, heun1, rk41, heun2, rk42);

        mensaje.className = "exito";

        mensaje.textContent =
            "Simulación ejecutada correctamente. Se calcularon Heun, RK4 y la solución analítica.";

    } catch (error) {

        mensaje.className = "error";

        mensaje.textContent = error.message;

    }

}


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("ejecutar")
        .addEventListener("click", ejecutarSimulacion);

    ejecutarSimulacion();

});
