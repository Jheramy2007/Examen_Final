document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;
    let carrito = [];

    // LISTA DE PRODUCTOS RESTAURADA SEGÚN TUS DATOS
    const productosBase = [
        { id: 1, cod: '', desc: 'POLO', stock: -1, precio: 5.00 },
        { id: 2, cod: '', desc: 'PANTALONETAS F/TERRY NIÑAS TALLAS Y COLORES', stock: 516, precio: 5.00 },
        { id: 3, cod: '501', desc: 'Laptop Lenovo i9', stock: 100, precio: 4210.00 },
        { id: 4, cod: '502', desc: 'MOUSE INALÁMBRICO M280 LOGITECH', stock: 49, precio: 63.00 },
        { id: 5, cod: '503', desc: 'IMPRESORA XEROX DC250', stock: 100, precio: 1180.00 }
    ];

    // MODAL
    document.getElementById("btnAbrirCatalogo").onclick = () => {
        document.getElementById("modalProductos").style.display = "block";
        const lista = document.getElementById("listaProductosModal");
        lista.innerHTML = "";
        productosBase.forEach(p => {
            lista.innerHTML += `
                <tr style="border-bottom: 1px solid var(--line); text-align:center; font-size:12px;">
                    <td style="padding:10px;">${p.id}</td>
                    <td>${p.cod || '-'}</td>
                    <td style="text-align:left;">${p.desc}</td>
                    <td><span style="background:#0284c7; padding:2px 8px; border-radius:4px;">${p.stock}</span></td>
                    <td><input type="number" id="q_${p.id}" value="1" style="width:50px;"></td>
                    <td>${p.precio.toFixed(2)}</td>
                    <td><button onclick="agregar(${p.id})" class="btn primary small">+</button></td>
                </tr>`;
        });
    };

    document.getElementById("btnCerrarModal").onclick = () => document.getElementById("modalProductos").style.display = "none";

    window.agregar = (id) => {
        const p = productosBase.find(x => x.id === id);
        const cant = parseFloat(document.getElementById(`q_${id}`).value);
        carrito.push({ ...p, cant, subtotal: cant * p.precio });
        actualizarTabla();
    };

    function actualizarTabla() {
        const body = document.getElementById("cartBody");
        body.innerHTML = "";
        let total = 0;
        carrito.forEach((item, i) => {
            total += item.subtotal;
            body.innerHTML += `<tr style="text-align:center; border-bottom:1px solid var(--line); font-size:13px;">
                <td style="padding:12px;">${item.cod || '-'}</td>
                <td>${item.cant}</td>
                <td>NIU</td>
                <td style="text-align:left;">${item.desc}</td>
                <td>${item.precio.toFixed(2)}</td>
                <td>${(item.precio/1.18).toFixed(2)}</td>
                <td>${item.subtotal.toFixed(2)}</td>
                <td><button onclick="quitar(${i})" style="color:#ef4444; background:none; border:none; cursor:pointer;">🗑️</button></td>
            </tr>`;
        });
        const grav = total / 1.18;
        document.getElementById("resSubtotal").textContent = total.toFixed(2);
        document.getElementById("resGravadas").textContent = grav.toFixed(2);
        document.getElementById("resIgv").textContent = (total - grav).toFixed(2);
        document.getElementById("resTotal").textContent = total.toFixed(2);
    }

    window.quitar = (i) => { carrito.splice(i, 1); actualizarTabla(); };

    // GENERAR PDF PROFESIONAL
    document.getElementById("btnGuardarPDF").onclick = () => {
        if (carrito.length === 0) return alert("Agregue productos primero");
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setTextColor(2, 132, 199);
        doc.text("AWSPERUTIC - FACTURA F002", 10, 20);
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.text(`CLIENTE: ${document.getElementById("razonSocial").value}`, 10, 30);
        doc.text(`RUC: ${document.getElementById("numDoc").value}`, 10, 35);
        
        const rows = carrito.map(i => [i.cod || '-', i.cant, i.desc, i.precio.toFixed(2), i.subtotal.toFixed(2)]);
        doc.autoTable({ startY: 45, head: [['COD', 'CANT', 'DESCRIPCIÓN', 'P.UNIT', 'TOTAL']], body: rows, headStyles: { fillColor: [2, 132, 199] } });
        
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.text(`TOTAL: S/ ${document.getElementById("resTotal").textContent}`, 150, finalY);
        window.open(doc.output('bloburl'), '_blank');
    };

    document.getElementById("btnLimpiarTodo").onclick = () => { if(confirm("¿Limpiar todo?")) { carrito = []; actualizarTabla(); } };
});