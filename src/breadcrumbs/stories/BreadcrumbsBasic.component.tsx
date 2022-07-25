import * as React from "react";

import { BreadcrumbLink, Breadcrumbs, BreadcrumbsProps } from "../../index";

export type BreadcrumbsBasicProps = BreadcrumbsProps & {};

export const BreadcrumbsBasic: React.FC<BreadcrumbsBasicProps> = props => {
  return (
    <Breadcrumbs className="breadcrumb">
      <ol>
        <li>
          <BreadcrumbLink href="https://www.w3.org/WAI/ARIA/apg/">
            ARIA Authoring Practices Guide
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/WAI/ARIA/apg/patterns/">
            APG Patterns
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink
            isCurrentPage
            href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/"
          >
            Breadcrumb Pattern
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/">
            Breadcrumb Example
          </BreadcrumbLink>
        </li>
      </ol>
    </Breadcrumbs>
  );
};

export default BreadcrumbsBasic;
