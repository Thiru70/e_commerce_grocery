import { FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";

const ExportButtons = ({ onPDF, onExcel, onPrint }) => {

    return (

        <div className="flex gap-4 mb-5">

            <button
                onClick={onPDF}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
                <FaFilePdf />
                PDF
            </button>

            <button
                onClick={onExcel}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
                <FaFileExcel />
                Excel
            </button>

            <button
                onClick={onPrint}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
                <FaPrint />
                Print
            </button>

        </div>

    );

};

export default ExportButtons;