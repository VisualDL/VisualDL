/**
 * @file generateXLSXandAutoDownload
 * @author abingblog@gmail.com
 */
import XLSX from 'xlsx';
import FileSaver from 'file-saver';
// const JSON_TO_SHEET = XLSX.utils.json_to_sheet;
const aoaToSheet = XLSX.utils.aoa_to_sheet;
const saveAs = FileSaver.saveAs;
function s2ab(s) {
    if (typeof ArrayBuffer !== 'undefined') {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
    let buf = new Array(s.length);
    for (let i = 0; i !== s.length; ++i) {
        buf[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}
/**
 * 下载Excel
 *
 * @desc 根据传入的数据如[['A', 'B', 'C'], ['1', '2', '3'],[['1-1', '2-1', '3-1']]]生成xlsx文件并自动下载。
 * @param {Array} data 传入的表格数据
 * @param {string} name 文件名
 */
export const generateXLSXandAutoDownload = function (data, name) {
    let wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    };
    let ws = aoaToSheet(data);
    let wb = {
        SheetNames: ['Export'],
        Sheets: {},
        Props: {}
    };
    wb.Sheets.Export = ws;
    let wbout = XLSX.write(wb, wopts);
    saveAs(
        new Blob(
            [s2ab(wbout)],
            {
                type: 'application/octet-stream'
            }
        ),
        name + '.xlsx' || 'sheetjs.xlsx'
    );
};
