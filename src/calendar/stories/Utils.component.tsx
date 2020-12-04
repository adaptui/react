import * as React from "react";

export const DoubleChevronLeft = (props: any) => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

export const ChevronLeft = (props: any) => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  );
};

export const ChevronRight = (props: any) => (
  <ChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);

export const DoubleChevronRight = (props: any) => (
  <DoubleChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);
