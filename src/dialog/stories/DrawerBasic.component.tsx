import * as React from "react";
import {
  Button,
  DialogDismiss,
  DialogHeading,
  DisclosureStateProps,
  useDialogState,
} from "ariakit";

import { Drawer } from "../../index";

export type DrawerBasicProps = DisclosureStateProps & {};

export const DrawerBasic: React.FC<DrawerBasicProps> = props => {
  const dialog = useDialogState({ animated: true, ...props });

  return (
    <>
      <Button onClick={dialog.toggle} className="button">
        View details
      </Button>
      <Drawer
        state={dialog}
        className="dialog"
        backdropProps={{ className: "backdrop" }}
      >
        <header className="header">
          <DialogHeading className="heading">Apples</DialogHeading>
          <DialogDismiss className="button dismiss" />
        </header>
        <ul>
          <li>
            <strong>Calories:</strong> 95
          </li>
          <li>
            <strong>Carbs:</strong> 25 grams
          </li>
          <li>
            <strong>Fibers:</strong> 4 grams
          </li>
          <li>
            <strong>Vitamin C:</strong> 14% of the Reference Daily Intake (RDI)
          </li>
          <li>
            <strong>Potassium:</strong> 6% of the RDI
          </li>
          <li>
            <strong>Vitamin K:</strong> 5% of the RDI
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default DrawerBasic;
