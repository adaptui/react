import { createHook, createComponent } from "reakit-system";
import { CompositeOptions, CompositeHTMLProps, useComposite } from "reakit";

import { ACCORDION_KEYS } from "./__keys";

export const useAccordion = createHook<AccordionOptions, AccordionHTMLProps>({
  name: "Accordion",
  compose: useComposite,
  keys: ACCORDION_KEYS,

  useComposeProps(options, htmlProps) {
    const compositeHtmlProp = useComposite(options, htmlProps);

    return {
      ...compositeHtmlProp,

      // When none selected i.e, selectedId={null}
      // as per composite https://github.com/reakit/reakit/blob/master/packages/reakit/src/Composite/Composite.ts#L372
      // it applies tabindex={0} which we need to remove it.
      tabIndex: undefined,
    };
  },
});

export const Accordion = createComponent({
  as: "div",
  memo: true,
  useHook: useAccordion,
});

export type AccordionOptions = CompositeOptions;

export type AccordionHTMLProps = CompositeHTMLProps;

export type AccordionProps = AccordionOptions & AccordionHTMLProps;
