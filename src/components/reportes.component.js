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
      constructor(props) {
        super(props);
        this.state = {
          mes:"Abril"
        };
      }
    render() {
      
        return (
            
            <div id='divToPrint' className=''>
                <ReporteBancos mes={this.state.mes}></ReporteBancos>
                <ReporteCuentasCobrar mes={this.state.mes}></ReporteCuentasCobrar>
                <ReporteCuentasPagar mes={this.state.mes}></ReporteCuentasPagar>
                <Factura mes={this.state.mes}></Factura>
                <button onClick={this.printDocument}>Print</button>
         
            </div>
            
            
        )

        
    }
}

