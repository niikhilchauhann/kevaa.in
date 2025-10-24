// import React from "react";
// import "./breadCrumbs.css";

// const steps = [
//   { id: 1, name: "Address" },
//   { id: 2, name: "Shipping" },
//   { id: 3, name: "Payment" },
// ];

// function Breadcrumb({ step }) {
//   return (
//     <div className="breadcrumb-container">
//       {steps.map((item, index) => (
//         <React.Fragment key={item.id}>
//           <span
//             className={`step ${step >= item.id ? "active" : ""}`}
//           >
//             {item.name}
//           </span>
//           {index < steps.length - 1 && (
//             <span className="separator">{'>'}</span>
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// export default Breadcrumb;



import React from "react";
import "./breadCrumbs.css";

const steps = [
  { id: 1, name: "Address" },
  { id: 2, name: "Shipping" },
  { id: 3, name: "Payment" },
];

function Breadcrumb({ step }) {
  return (
    <div className="breadcrumb-container">
      {steps.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className="step-wrapper">
            {step === item.id && <span className="green-dot"></span>}
            <span className={`step ${step >= item.id ? "active" : ""}`}>
              {item.name}
            </span>
          </div>
          {index < steps.length - 1 && <span className="separator">›</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumb;
