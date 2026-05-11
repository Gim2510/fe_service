// import {useState} from "react";
//
// type Props = {
//     theme: string
// }
//
// export function UpdateJobApplicationPanel({theme}: Props) {
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const isDark = theme === "dark";
//
//     const cardBg = isDark
//         ? "bg-neutral-900/70 border-neutral-700"
//         : "bg-[#F8FAFB]/50 border-gray-200";
//
//     const textColor = isDark ? "text-white" : "text-gray-900";
//
//     const inputStyle = `w-full rounded-xl border px-3 py-2 text-sm ${
//         isDark
//             ? "bg-neutral-800 border-neutral-700 text-white"
//             : "bg-[#F8FAFB] border-gray-200 text-gray-900"
//     }`;
//
//
//     return (
//         <>
//             <div className='space-y-8'>
//                 <div className={`rounded-3xl border ${cardBg} p-6 sm:p-8 backdrop-blur`}>
//                     <h2 className={`text-2xl mb-6 ${textColor}`}>
//                         Create Job Application
//                     </h2>
//                 </div>
//             </div>
//             </>
//             )
//             }