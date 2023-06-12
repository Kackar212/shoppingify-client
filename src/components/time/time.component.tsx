import React from "react";
import { UseFormatDate, useFormatDate } from "../../hooks/useFormatDate";
import { CalendarIcon } from "../calendar-icon/calendar-icon.component";
import styles from "./time.module.scss";

interface TimeProps extends UseFormatDate {
  className?: string;
  icon?: JSX.Element;
}

export function Time({ date, icon, className = "", ...options }: TimeProps) {
  const formattedDate = useFormatDate({ date, ...options });

  return (
    <span className={styles.container}>
      <time dateTime={date} className={`${styles.date} ${className}`}>
        {formattedDate}
      </time>
      {icon || <CalendarIcon className={styles.icon} />}
    </span>
  );
}
