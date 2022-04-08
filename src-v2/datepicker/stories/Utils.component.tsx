import * as React from "react";

export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 36 36"
    focusable="false"
    aria-hidden="true"
    role="img"
    {...props}
  >
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

export const DoubleChevronLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      style={{ width: 16 }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  );
};

export const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      style={{ width: 16 }}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

export const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <ChevronLeft style={{ transform: "rotate(180deg)", width: 16 }} {...props} />
);

export const DoubleChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <DoubleChevronLeft
    style={{ transform: "rotate(180deg)", width: 16 }}
    {...props}
  />
);

export const CalendarStyledIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    focusable="false"
    aria-hidden="true"
    role="img"
    className="w-5 stroke-current"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
