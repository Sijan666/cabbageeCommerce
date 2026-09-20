import React, { useState, useRef } from 'react';
import { useStore } from '../../../store/useStore';
import { FiUploadCloud, FiFileText } from 'react-icons/fi';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

const BulkUpload = () => {
    const [fileName, setFileName] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const { addBulkProducts } = useStore();

    // csv file parsing
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (event) => {
        const csvText = event.target.result;
        const lines = csvText.split('\n');
        const validLines = lines.filter(line => line.trim() !== '');
        if (validLines.length <= 1) return;

        const products = [];
        // loop through rows
        for (let i = 1; i < validLines.length; i++) {
            const row = validLines[i].split(',');

            if (row.length >= 8) {
            products.push({
                title: row[0].trim(),
                price: parseFloat(row[1]) || 0,
                discountPercentage: parseFloat(row[2]) || 0,
                rating: parseFloat(row[3]) || 5,
                stock: parseInt(row[4]) || 10,
                category: row[5].trim().toLowerCase().replace(/\s+/g, '-'),
                image: row[6].trim(),
                desc: row[7].trim()
            });
            }
        }

        if (products.length > 0) {
            addBulkProducts(products);
            setIsSuccess(true);
            setTimeout(() => {
            setIsSuccess(false);
            setFileName("");
            if (fileInputRef.current) fileInputRef.current.value = "";
            }, 3000);
        }
        };

        reader.readAsText(file);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm" aria-label="Bulk Upload Form">
        <div className="mb-6">
            <h2 className="text-2xl font-bold font-int text-[#232323]">Bulk Product Upload</h2>
            <p className="text-[#546375] font-nuni text-sm mt-1">Upload a CSV file to add multiple products instantly.</p>
        </div>
        {/* upload dropzone */}
        <div 
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label="Click to browse CSV file"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
            className={`w-full border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80B500]
            ${isSuccess ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#80B500]'}
            `}
        >
            <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            tabIndex={-1}
            />
            {isSuccess ? (
            <div className="flex flex-col items-center text-green-600" aria-live="polite">
                <IoCheckmarkCircleOutline className="text-5xl mb-3" aria-hidden="true" />
                <p className="font-bold font-nuni">Products Uploaded Successfully!</p>
            </div>
            ) : (
            <div className="flex flex-col items-center text-gray-500">
                {fileName ? (
                <>
                    <FiFileText className="text-4xl mb-3 text-[#80B500]" aria-hidden="true" />
                    <p className="font-bold font-nuni text-[#232323]" aria-live="polite">{fileName}</p>
                    <p className="text-xs mt-1">Click to replace file</p>
                </>
                ) : (
                <>
                    <FiUploadCloud className="text-5xl mb-3 text-gray-400" aria-hidden="true" />
                    <p className="font-bold font-nuni text-[#232323]">Click to browse CSV file</p>
                    <p className="text-xs mt-1">Format: title, price, discount, rating, stock, category, image_url, desc</p>
                </>
                )}
            </div>
            )}
        </div>
        {/* instructions */}
        <div className="mt-6 bg-[#f4f6f8] p-4 rounded-md">
            <h4 className="text-sm font-bold font-int text-[#232323] mb-2">CSV Format Requirements:</h4>
            <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-500 font-nuni" aria-label="CSV format example">
                <thead className="bg-gray-200 text-gray-700 uppercase">
                <tr>
                    <th scope="col" className="px-3 py-2">title</th>
                    <th scope="col" className="px-3 py-2">price</th>
                    <th scope="col" className="px-3 py-2">discount</th>
                    <th scope="col" className="px-3 py-2">rating</th>
                    <th scope="col" className="px-3 py-2">stock</th>
                    <th scope="col" className="px-3 py-2">category</th>
                    <th scope="col" className="px-3 py-2">image</th>
                    <th scope="col" className="px-3 py-2">desc</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b">
                    <td className="px-3 py-2">Organic Apple</td>
                    <td className="px-3 py-2">12.50</td>
                    <td className="px-3 py-2">10</td>
                    <td className="px-3 py-2">4.8</td>
                    <td className="px-3 py-2">50</td>
                    <td className="px-3 py-2">Fruits</td>
                    <td className="px-3 py-2">https://link...</td>
                    <td className="px-3 py-2">Fresh apples...</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default BulkUpload;