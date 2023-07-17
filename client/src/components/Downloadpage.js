import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { width } from '@mui/system';

const Downloadpage = ({ rootElementId, downloadFileName }) => {
    var doc = new jsPDF();
    const downloadFileDocument = () => {

        const input = document.getElementById(rootElementId)
        html2canvas(input ,{logging : true , letterRendering : 1 , useCORS : true}).then((canvas) => {
            const width = 208;
            const height = canvas.height * width/canvas.width ;
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF("p", "px", "a3")
            pdf.addImage(imgData, "JPEG", 0,0);
            pdf.save(`${downloadFileName}`)
            window.location.reload()
        //     var doc = new jsPDF();
        //     doc.setFontSize(33);
        //     doc.setFillColor(204, 204, 204, 0);
        //     doc.rect(10, 10, 150, 160, "F");
        //     doc.addImage(imgData, 'png', 10, 10, 150, 100);
        //     doc.save(`${downloadFileName}`);
         })
    }
    return (<>
        <button className='button_search' onClick={downloadFileDocument} >Download MarkSheet</button>
    </>);
}
export default Downloadpage;