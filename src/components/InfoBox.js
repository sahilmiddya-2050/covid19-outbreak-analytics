import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

import "./InfoBox.css";

const InfoBox = ({
  title,
  cases,
  total,
  caseType,
  active,
  customClassName,
  ...props
}) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && `infoBox--${caseType}`}`}
    >
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__${customClassName}`}>{cases} Today</h2>
        {/* number of cases */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
        {/* total */}
      </CardContent>
    </Card>
  );
};

export default InfoBox;
