document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cartBody");
    const totalVenta = document.getElementById("totalVenta");
    const totalIgv = document.getElementById("totalIgv");
    const btnAgregar = document.getElementById("btnAgregarItem");

    let carrito = [];

    btnAgregar?.addEventListener("click", () => {
        // Capturamos los valores de la fila de entrada
        const codigo = document.getElementById("inCodigo").value;
        const cant = parseFloat(document.getElementById("inCant").value);
        const medida = document.getElementById("inMedida").value;
        const desc = document.getElementById("inDesc").value;
        const precio = parseFloat(document.getElementById("inPrecio").value);

        // Validación simple
        if (!desc || isNaN(cant) || isNaN(precio) || cant <= 0) {
            alert("Por favor, completa la descripción, cantidad y precio.");
            return;
        }

        // Añadimos al objeto carrito
        carrito.push({ codigo, cant, medida, desc, precio });

        // Limpiamos los campos para el siguiente producto
        limpiarInputsFila();
        
        // Refrescamos la tabla
        renderizarTabla();
    });

    function renderizarTabla() {
        cartBody.innerHTML = "";
        let sumaTotal = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.cant * item.precio;
            sumaTotal += subtotal;

            cartBody.innerHTML += `
                <tr style="border-bottom: 1px solid var(--line); font-size: 13px;">
                    <td style="padding: 10px;">${item.codigo || '-'}</td>
                    <td style="padding: 10px;">${item.cant}</td>
                    <td style="padding: 10px;">${item.medida}</td>
                    <td style="padding: 10px;">${item.desc}</td>
                    <td style="padding: 10px;">${item.precio.toFixed(2)}</td>
                    <td style="padding: 10px; text-align: center;">
                        <button onclick="eliminarItem(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer;">❌</button>
                    </td>
                </tr>
            `;
        });

        // Cálculos (Asumiendo que el precio ingresado ya incluye IGV)
        const total = sumaTotal;
        const baseImponible = total / 1.18;
        const igv = total - baseImponible;

        totalIgv.textContent = igv.toFixed(2);
        totalVenta.textContent = total.toFixed(2);
    }

    function limpiarInputsFila() {
        document.getElementById("inCodigo").value = "";
        document.getElementById("inCant").value = "1";
        document.getElementById("inDesc").value = "";
        document.getElementById("inPrecio").value = "";
        document.getElementById("inCodigo").focus();
    }

    // Función global para eliminar items
    window.eliminarItem = (index) => {
        carrito.splice(index, 1);
        renderizarTabla();
    };
});