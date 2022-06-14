import * as React from "react";

import { BreadcrumbLink, Breadcrumbs, BreadcrumbsProps } from "../../index";

import "./BreadcrumbsBasic.css";

export type BreadcrumbsBasicProps = BreadcrumbsProps & {};

export const BreadcrumbsBasic: React.FC<BreadcrumbsBasicProps> = props => {
  return (
    <Breadcrumbs aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/">
            WAI-ARIA Authoring Practices 1.1
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex">
            Design Patterns
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink
            isCurrentPage
            href="https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb"
          >
            Breadcrumb Pattern
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html">
            Breadcrumb Example
          </BreadcrumbLink>
        </li>
      </ol>
    </Breadcrumbs>
  );
};

export default BreadcrumbsBasic;
