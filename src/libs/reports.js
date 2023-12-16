import PDFDocument from 'pdfkit-table'
import ExcelJS from 'exceljs'

// Funcion de creacion de raportes pdf y excel
export function generateReport(data, fileName, titleFile, subtitleFile, res, isPdf){
    try {
        // Extraer los encabezados del primer objeto del JSON
        const keys = Object.keys(data[0].toObject());

        const rowsData = []
        data.forEach(task => {
            let row = keys.map(key => task[key]);
            rowsData.push(row);
        });

        if (isPdf) {
            fileName = fileName + ".pdf"

            // Crear un buffer para almacenar el PDF en memoria
            let buffer = Buffer.from([]);
            let doc = new PDFDocument({ bufferPages: true, margin: 30, size: 'A4' });

            // Pipe the PDF content into the buffer
            doc.on('data', chunk => {
                buffer = Buffer.concat([buffer, chunk]);
            });

            // Evento 'end' que se dispara cuando se ha completado la generación del PDF en memoria
            doc.on('end', () => {
                // Enviar el PDF generado como respuesta al navegador
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=archivo.pdf');
                res.send(buffer);
            });

            // Añadir contenido al documento PDF
            // Agregar imagen al documento
            // doc.image('../images/logo.png', {
            //     fit: [100, 100], // Tamaño de la imagen
            //     align: 'center', // Alineación de la imagen
            //     valign: 'center', // Alineación vertical de la imagen
            // });

            const table = {
                title: titleFile,
                subtitle: subtitleFile,
                headers: keys,
                rows: rowsData,
            };

            doc.table(table, {
                width: 500,
            });

            // Finalizar y cerrar el documento
            doc.end();

        } else {
            fileName = fileName + ".xlsx"
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Reporte');

            worksheet.addRow(keys)

            rowsData.forEach((row) => {
                worksheet.addRow(row);
            });

            workbook.xlsx.writeBuffer()
                .then(buffer => {
                // Enviar el archivo Excel como respuesta al navegador
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
                res.send(buffer);
                })
                .catch(err => {
                console.error('Error al generar el archivo Excel:', err);
                res.status(500).send('Error interno del servidor');
            });
        }
    } catch (error) {
        console.error(error)
    }   
}