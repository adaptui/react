import * as React from "react";

import {
  Tooltip,
  TooltipArrow,
  TooltipArrowContent,
  TooltipContent,
  TooltipInitialState,
  TooltipReference,
  useTooltipState,
} from "../../index";

export type TooltipCustomContentProps = {};

export const TooltipCustomContent: React.FC<TooltipCustomContentProps> =
  props => {
    return (
      <div style={{ display: "flex", gap: 20, padding: 100 }} {...props}>
        <TooltipBasic label="Heading">
          <h1>Some heading</h1>
        </TooltipBasic>

        <TooltipBasic label="Paragraph">
          <p>Some paragraph</p>
        </TooltipBasic>

        <TooltipBasic label="List">
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </TooltipBasic>

        <TooltipBasic label="Article">
          <article>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum,
            quae qui. Magnam delectus ex totam repellat amet distinctio unde,
            porro architecto voluptatibus nemo et nisi, voluptatem eligendi
            earum autem fugit.
          </article>
        </TooltipBasic>

        <TooltipBasic label="Figure">
          <figure style={{ margin: 0 }}>
            <img src="https://i.pravatar.cc/100??img=61" alt="" width={100} />
            <figcaption>Jason Todd</figcaption>
          </figure>
        </TooltipBasic>

        <TooltipBasic label="Time">
          {/* @ts-ignore */}
          <time datetime="2017-10-31T11:21:00+02:00">
            Tuesday, 31 October 2017
          </time>
        </TooltipBasic>

        <TooltipBasic label="Link">
          View in <a href="https://modulz.app">Modulz</a>
        </TooltipBasic>

        <TooltipBasic label="Form">
          <form>
            <label htmlFor="fname">First name:</label>
            <br />
            <input type="text" id="fname" name="fname" />
            <br />
            <label htmlFor="lname">Last name:</label>
            <br />
            <input type="text" id="lname" name="lname" />
          </form>
        </TooltipBasic>

        <TooltipBasic label="Mini Layout">
          <p
            style={{
              margin: 0,
              textAlign: "center",
              fontFamily:
                "apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif",
              fontSize: 14,
            }}
          >
            Start video call
            <span style={{ display: "block", color: "#999" }}>
              press{" "}
              <kbd
                style={{
                  fontFamily:
                    "apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif",
                  fontWeight: "bold",
                  color: "white",
                }}
                aria-label="c key"
              >
                c
              </kbd>
            </span>
          </p>
        </TooltipBasic>
      </div>
    );
  };

export type TooltipBasicProps = TooltipInitialState & {
  label?: string;
};

export const TooltipBasic: React.FC<TooltipBasicProps> = props => {
  const { label, children, ...restProps } = props;
  const state = useTooltipState({
    sideOffset: 5,
    arrowOffset: 10,
    ...restProps,
  });

  return (
    <>
      <TooltipReference as="button" className="trigger" {...state}>
        {label}
      </TooltipReference>

      <Tooltip className="popover" {...state}>
        <TooltipContent {...state} className="content" animation={true}>
          {children}
          <TooltipArrow {...state}>
            <TooltipArrowContent className="arrow" {...state}>
              <svg
                width={10}
                height={5}
                viewBox="0 0 30 10"
                preserveAspectRatio="none"
                style={{ display: "block" }}
                fill="#222"
              >
                <polygon points="0,0 30,0 15,10" />
              </svg>
            </TooltipArrowContent>
          </TooltipArrow>
        </TooltipContent>
      </Tooltip>
    </>
  );
};
