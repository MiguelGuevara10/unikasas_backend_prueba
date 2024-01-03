import PDFDocument from 'pdfkit-table'
import ExcelJS from 'exceljs'

/**
 * Funcion de creacion de reportes pdf y excel,
 * recibe los siguientes parametros:
 * @param {Object} data - Objeto con la información del reporte a generar
 * @param {string} titleFile - Titulo del reporte
 * @param {string} subtitleFile - Subtitulo del reporte
 * @param {Object} res - Objeto response para poder enviar el reporte generado
 * @param {string} report - Tipo de reporte a generar pdf | excel
 */
export function generateReport(data, titleFile, subtitleFile, res, report){
    try {
        // Extraer los encabezados del primer objeto del JSON
        // const keys = Object.keys(data[0].toObject());
        let fileName = 'reporte'
        const keys = Object.keys(data[0])

        const rowsData = []
        data.forEach(task => {
            let row = keys.map(key => task[key]);
            rowsData.push(row);
        });

        if (report === 'pdf') {
            fileName = fileName + ".pdf"

            // Crear un buffer para almacenar el PDF en memoria
            let buffer = Buffer.from([]);
            let doc = new PDFDocument({ bufferPages: true, margin: 30, size: 'A3' });

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
                title: {label: titleFile, fontSize: 20, align: 'center', valign: "center"},
                subtitle: {label: subtitleFile, fontSize: 10, color: '#EA411D', align: 'center'},
                headers: keys,
                rows: rowsData,
            };

            const options = {
                width: 800,
                padding: 5, // {Number} default: 0
                columnSpacing: 5, // {Number} default: 5
                hideHeader: false, 
                minRowHeight: 0,
              }

            doc.table(table, options)

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