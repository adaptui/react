import React from "react";

import { Meta } from "@storybook/react";
import { Pagination } from "../Pagination";
import { PaginationPrev } from "../PaginationPrev";
import { PaginationNext } from "../PaginationNext";
import { PaginationItem } from "../PaginationItem";
import { usePaginationState } from "../PaginationState";

export default {
  title: "Component/Pagination",
} as Meta;

// export const Default = () => {
//   const state = usePaginationState();
//   console.log("%c state", "color: #00a3cc", state);

//   return (
//     <Pagination {...state}>
//       <ul>
//         <li>
//           <PaginationPrev {...state}>{"<"}</PaginationPrev>
//         </li>
//         <li>
//           <PaginationItem page={1} {...state}>
//             1
//           </PaginationItem>
//         </li>
//         <li>
//           <PaginationItem page={2} {...state}>
//             2
//           </PaginationItem>
//         </li>
//         <li>
//           <PaginationItem page={3} {...state}>
//             3
//           </PaginationItem>
//         </li>
//         <li>
//           <PaginationItem page={4} {...state}>
//             4
//           </PaginationItem>
//         </li>
//         <li>
//           <PaginationItem page={5} {...state}>
//             5
//           </PaginationItem>
//         </li>
//         <li>
//           <PaginationNext {...state}>{">"}</PaginationNext>
//         </li>
//       </ul>
//     </Pagination>
//   );
// };

export const Dynamic = () => {
  const state = usePaginationState();
  console.log("%c state", "color: #00fe600", state);

  return (
    <Pagination {...state}>
      <ul>
        <li>
          <PaginationPrev {...state}>{"<"}</PaginationPrev>
        </li>
        {state.pages.map(page => (
          <li>
            <PaginationItem
              page={page}
              style={{
                fontWeight: state.currentPage === page ? "bold" : undefined,
              }}
              {...state}
            >
              {page}
            </PaginationItem>
          </li>
        ))}
        <li>
          <PaginationNext {...state}>{">"}</PaginationNext>
        </li>
      </ul>
    </Pagination>
  );
};
