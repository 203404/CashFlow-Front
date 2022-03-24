import React from 'react';
import Factura from './reporteFlujo';
import ReporteCuentasCobrar from './reporte_cuentasCobrar';
import ReporteCuentasPagar from './reporte_cuentasPagar';
import ReporteBancos from './reporte_bancos';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint} from 'react-to-print';


export default class Reportes extends React.Component {
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input,{windowWidth: input.scrollWidth,windowHeight: input.scrollHeight,})
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({});
            let pageHeight= pdf.internal.pageSize.height
            
            pdf.addImage(imgData, 'PNG', 50, 0,100,pageHeight);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }
      
    render() {
      
        return (
            
            <div id='divToPrint' className=''>
                <ReporteBancos></ReporteBancos>
                <ReporteCuentasCobrar></ReporteCuentasCobrar>
                <ReporteCuentasPagar></ReporteCuentasPagar>
                <Factura></Factura>
                <button onClick={this.printDocument}>Print</button>
         
            </div>
            
            
        )

        
    }
}

